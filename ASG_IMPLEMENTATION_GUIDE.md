# ASG Edge Plus (Lucy): Implementation Guide

> **Companion document to:** ASG_TECH_DOC2.md (Technical Architecture Document)
>
> This guide contains all code snippets, API endpoint specifications, database schemas, configuration examples, and implementation details referenced by the architecture document. It is intended for the engineering team.

---

## Table of Contents

1. [Tenant Data Routing (Spring Boot)](#1-tenant-data-routing-spring-boot)
2. [Connection Pool Management](#2-connection-pool-management)
3. [Dynamic Frontend Rendering (React)](#3-dynamic-frontend-rendering-react)
4. [Standard Database Schema](#4-standard-database-schema)
5. [Tenant Database Schema (Audit Log)](#5-tenant-database-schema-audit-log)
6. [Tenant Provisioning SQL](#6-tenant-provisioning-sql)
7. [SoD Conflict Matrix Schema](#7-sod-conflict-matrix-schema)
8. [JWT Token Structures](#8-jwt-token-structures)
9. [API Gateway Configuration](#9-api-gateway-configuration)
10. [Configuration Service API Endpoints](#10-configuration-service-api-endpoints)
11. [Feature Flag Schema](#11-feature-flag-schema)
12. [Onboarding Response Payload](#12-onboarding-response-payload)
13. [SoD Compliance Report Schema](#13-sod-compliance-report-schema)

---

## 1. Tenant Data Routing (Spring Boot)

*Architecture Reference: Section 5.2 — How Tenant Isolation Works*

The core of multi-tenant data routing uses Spring's `AbstractRoutingDataSource` to dynamically switch the JDBC connection based on a runtime context key (the `X-Tenant-ID` header).

### TenantRoutingDataSource

```java
public class TenantRoutingDataSource extends AbstractRoutingDataSource {

    @Override
    protected Object determineCurrentLookupKey() {
        return TenantContext.getCurrentTenantId();
    }
}
```

### TenantContext (ThreadLocal)

```java
public class TenantContext {
    private static final ThreadLocal<String> currentTenant = new ThreadLocal<>();

    public static void setCurrentTenantId(String tenantId) {
        currentTenant.set(tenantId);
    }

    public static String getCurrentTenantId() {
        return currentTenant.get();
    }

    public static void clear() {
        currentTenant.remove();
    }
}
```

The `TenantContext` is populated by a servlet filter or gateway interceptor that extracts `X-Tenant-ID` from the incoming request header, which is derived from the validated JWT claims.

---

## 2. Connection Pool Management

*Architecture Reference: Section 5.3 — Connection Pool Management*

Each tenant's database connection is managed via a HikariCP connection pool, lazily initialized and cached:

```java
@Service
public class TenantDataSourceProvider {

    private final ConcurrentHashMap<String, DataSource> dataSourceCache
        = new ConcurrentHashMap<>();

    public DataSource getDataSource(String tenantId) {
        return dataSourceCache.computeIfAbsent(tenantId, this::createDataSource);
    }

    private DataSource createDataSource(String tenantId) {
        TenantRecord tenant = tenantRepository.findById(tenantId)
            .orElseThrow(() -> new TenantNotFoundException(tenantId));

        DbCredentials creds = secretsManager.getSecret(tenant.getDbCredentialsArn());

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(String.format("jdbc:postgresql://%s:%d/%s",
            tenant.getDbHost(), tenant.getDbPort(), tenant.getDbName()));
        config.setUsername(creds.getUsername());
        config.setPassword(creds.getPassword());
        config.setMaximumPoolSize(10); // Per-tenant pool limit
        config.setPoolName("hikari-" + tenant.getSlug());

        return new HikariDataSource(config);
    }
}
```

**Design decisions:**
- **Lazy initialization**: Pools are created on first request, not at startup.
- **Per-tenant pool sizing**: Each tenant gets a bounded pool (max 10 connections).
- **Eviction**: Idle pools are evicted after a configurable TTL (e.g., 30 minutes).

---

## 3. Dynamic Frontend Rendering (React)

*Architecture Reference: Section 9.2 — Feature Flagging in Practice*

The frontend fetches UI schema definitions from the Configuration Service and renders components dynamically:

```typescript
// Dynamic column rendering based on tenant config
interface TenantReportConfig {
  reportId: string;
  columns: ColumnDefinition[];
  filters: FilterDefinition[];
}

const RentRollReport: React.FC<{ tenantId: string }> = ({ tenantId }) => {
  const config = useTenantConfig<TenantReportConfig>(tenantId, 'rent_roll');

  return (
    <DataGrid
      columns={config.columns.map(col => ({
        field: col.fieldName,
        headerName: col.displayLabel,
        type: col.dataType,
        width: col.width,
      }))}
      rows={data}
    />
  );
};
```

Adding a new column to a tenant's report is a config change, not a code deployment.

---

## 4. Standard Database Schema

*Architecture Reference: Section 6.3, Section 6.5*

The Standard DB holds metadata only — no business data.

```sql
-- Tenant Registry
CREATE TABLE tenants (
    id                      VARCHAR(50) PRIMARY KEY,
    name                    VARCHAR(255) NOT NULL,
    slug                    VARCHAR(100) UNIQUE NOT NULL,
    db_host                 VARCHAR(255) NOT NULL,
    db_port                 INTEGER NOT NULL DEFAULT 5432,
    db_name                 VARCHAR(100) NOT NULL,
    db_credentials_secret_arn VARCHAR(500) NOT NULL,
    s3_bucket_path          VARCHAR(500) NOT NULL,
    tier                    VARCHAR(20) NOT NULL DEFAULT 'STANDARD',
    status                  VARCHAR(20) NOT NULL DEFAULT 'PROVISIONING',
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deactivated_at          TIMESTAMPTZ
);

-- Global User Identity
CREATE TABLE global_users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    platform_role   VARCHAR(50) NOT NULL DEFAULT 'PLATFORM_USER',
    mfa_enabled     BOOLEAN NOT NULL DEFAULT false,
    mfa_method      VARCHAR(20),
    mfa_secret      VARCHAR(255),
    status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    password_changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at   TIMESTAMPTZ
);

-- User-to-Tenant Role Mapping
CREATE TABLE user_tenant_roles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES global_users(id) ON DELETE CASCADE,
    tenant_id   VARCHAR(50) NOT NULL REFERENCES tenants(id),
    role_id     VARCHAR(50) NOT NULL,
    granted_by  UUID REFERENCES global_users(id),
    granted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at  TIMESTAMPTZ,
    UNIQUE(user_id, tenant_id, role_id)
);

-- Tenant-Specific Configurations
CREATE TABLE tenant_configs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       VARCHAR(50) NOT NULL REFERENCES tenants(id),
    config_key      VARCHAR(100) NOT NULL,
    config_value    JSONB NOT NULL,
    version         INTEGER NOT NULL DEFAULT 1,
    updated_by      UUID REFERENCES global_users(id),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, config_key)
);

-- Security Policies per Tenant
CREATE TABLE security_policies (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id               VARCHAR(50) UNIQUE NOT NULL REFERENCES tenants(id),
    password_min_length     INTEGER NOT NULL DEFAULT 12,
    password_rotation_days  INTEGER NOT NULL DEFAULT 90,
    password_history_count  INTEGER NOT NULL DEFAULT 5,
    mfa_required            BOOLEAN NOT NULL DEFAULT true,
    session_timeout_min     INTEGER NOT NULL DEFAULT 30,
    max_failed_attempts     INTEGER NOT NULL DEFAULT 5,
    lockout_duration_min    INTEGER NOT NULL DEFAULT 15,
    ip_whitelist            INET[],
    sod_rules               JSONB,
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Platform Audit Log (Standard Layer events only)
CREATE TABLE platform_audit_log (
    id              BIGSERIAL PRIMARY KEY,
    event_type      VARCHAR(50) NOT NULL,
    actor_id        UUID NOT NULL,
    actor_email     VARCHAR(255) NOT NULL,
    target_type     VARCHAR(50),
    target_id       VARCHAR(100),
    action          VARCHAR(20) NOT NULL,
    details         JSONB,
    ip_address      INET,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_tenant_roles_user ON user_tenant_roles(user_id);
CREATE INDEX idx_user_tenant_roles_tenant ON user_tenant_roles(tenant_id);
CREATE INDEX idx_tenant_configs_tenant ON tenant_configs(tenant_id);
CREATE INDEX idx_platform_audit_actor ON platform_audit_log(actor_id, created_at);
CREATE INDEX idx_platform_audit_time ON platform_audit_log(created_at);
```

---

## 5. Tenant Database Schema (Audit Log)

*Architecture Reference: Section 12.2 — Audit Log Design*

Written to **each tenant's database**. The application user has INSERT-only access.

```sql
CREATE TABLE audit_log (
    id              BIGSERIAL PRIMARY KEY,
    event_type      VARCHAR(50) NOT NULL,   -- 'LEASE_CREATED', 'PAYMENT_APPROVED', etc.
    entity_type     VARCHAR(50) NOT NULL,   -- 'Lease', 'Payment', 'Document'
    entity_id       VARCHAR(100) NOT NULL,
    action          VARCHAR(20) NOT NULL,   -- 'CREATE', 'UPDATE', 'DELETE', 'READ'
    user_id         UUID NOT NULL,
    user_email      VARCHAR(255) NOT NULL,
    user_role       VARCHAR(50) NOT NULL,
    ip_address      INET,
    user_agent      TEXT,
    old_value       JSONB,                  -- Previous state (for UPDATE/DELETE)
    new_value       JSONB,                  -- New state (for CREATE/UPDATE)
    metadata        JSONB,                  -- Additional context
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Immutability: No UPDATE or DELETE grants on this table
-- Only INSERT is permitted from the application service account

CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_user ON audit_log(user_id, created_at);
CREATE INDEX idx_audit_log_time ON audit_log(created_at);
```

---

## 6. Tenant Provisioning SQL

*Architecture Reference: Section 10.1 — End-to-End Onboarding Sequence*

Example of registering a new tenant in the Standard DB:

```sql
INSERT INTO tenants (
    id, name, slug, db_host, db_port, db_name,
    db_credentials_secret_arn, s3_bucket_path,
    status, created_at
) VALUES (
    'tn_042', 'Denny''s', 'dennys',
    'dennys-db.cluster-abc123.us-east-1.rds.amazonaws.com', 5432, 'dennys_prod',
    'arn:aws:secretsmanager:us-east-1:123456789:secret:tenant/dennys/db',
    's3://asg-edge-documents/dennys/',
    'ACTIVE', NOW()
);
```

---

## 7. SoD Conflict Matrix Schema

*Architecture Reference: Section 6.4 — Segregation of Duties Enforcement*

Stored in the `security_policies.sod_rules` JSONB column:

```json
{
  "sod_rules": [
    {
      "role_a": "LEASE_CREATOR",
      "role_b": "PAYMENT_APPROVER",
      "conflict": "HARD",
      "reason": "SOX: Creator of lease obligation cannot approve payment against it"
    },
    {
      "role_a": "TENANT_ADMIN",
      "role_b": "AUDITOR",
      "conflict": "SOFT",
      "reason": "Best practice: Admin should not self-audit; requires override approval"
    }
  ]
}
```

---

## 8. JWT Token Structures

*Architecture Reference: Section 7.1 — Two-Token Architecture*

### Platform JWT Claims

```json
{
  "sub": "u_99",
  "email": "dawn@asg.com",
  "platform_role": "PLATFORM_USER",
  "tenant_assignments": ["t_001", "t_002", "t_003"],
  "iss": "asg-edge-auth",
  "iat": 1706745600,
  "exp": 1706752800
}
```

### Tenant JWT Claims

```json
{
  "sub": "u_99",
  "tenant_id": "t_001",
  "tenant_slug": "warby-parker",
  "role": "LEASE_CONTROLLER",
  "permissions": [
    "lease:read", "lease:write",
    "payment:create", "payment:approve",
    "report:read", "report:export"
  ],
  "iss": "asg-edge-auth",
  "iat": 1706745600,
  "exp": 1706746500
}
```

**Design notes:**
- **Short-lived tenant tokens** (15 minutes): Minimizes compromise window.
- **Permissions embedded in token**: Gateway can enforce access without DB lookup per request.
- **No tenant roles in platform token**: Platform token only lists tenant IDs. Prevents role escalation if platform token is intercepted.

---

## 9. API Gateway Configuration

*Architecture Reference: Section 8 — API Gateway & Request Routing*

Spring Cloud Gateway route configuration:

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: lease-service
          uri: lb://lease-service
          predicates:
            - Path=/api/v1/leases/**
          filters:
            - name: JwtTenantValidation
            - name: RequirePermission
              args:
                scope: "lease:read"
            - name: TenantRateLimit
              args:
                requests-per-second: 100
            - name: AddRequestHeader
              args:
                name: X-Request-Source
                value: gateway

        - id: document-service
          uri: lb://document-service
          predicates:
            - Path=/api/v1/documents/**
          filters:
            - name: JwtTenantValidation
            - name: RequirePermission
              args:
                scope: "document:read"
            - name: TenantRateLimit
              args:
                requests-per-second: 50

        - id: report-service
          uri: lb://report-service
          predicates:
            - Path=/api/v1/reports/**
          filters:
            - name: JwtTenantValidation
            - name: RequirePermission
              args:
                scope: "report:read"
            - name: TenantRateLimit
              args:
                requests-per-second: 30
```

---

## 10. Configuration Service API Endpoints

*Architecture Reference: Section 9 — The Configuration Service*

### Tenant Management

```
GET    /api/v1/config/tenants                    # List all tenants (admin only)
POST   /api/v1/config/tenants                    # Create new tenant
GET    /api/v1/config/tenants/{id}               # Get tenant details
PUT    /api/v1/config/tenants/{id}               # Update tenant config
DELETE /api/v1/config/tenants/{id}               # Deactivate tenant
```

### Feature Flags

```
GET    /api/v1/config/tenants/{id}/features      # Get feature flags
PUT    /api/v1/config/tenants/{id}/features      # Update feature flags
```

### UI Schema

```
GET    /api/v1/config/tenants/{id}/schema/{type} # Get UI schema (e.g., rent_roll)
PUT    /api/v1/config/tenants/{id}/schema/{type} # Update UI schema
```

### Security Policy

```
GET    /api/v1/config/tenants/{id}/policy        # Get security policy
PUT    /api/v1/config/tenants/{id}/policy        # Update security policy
```

### GCD Policy

```
GET    /api/v1/config/users/{id}/gcd-policy      # Compute GCD policy for user
```

---

## 11. Feature Flag Schema

*Architecture Reference: Section 9.2 — Feature Flagging in Practice*

```json
{
  "tenant_id": "t_001",
  "features": {
    "cam_reconciliation": {
      "enabled": true,
      "rollout_percentage": 100
    },
    "custom_report_columns": {
      "enabled": true,
      "config": {
        "max_custom_columns": 10,
        "allowed_data_types": ["STRING", "NUMBER", "DATE", "CURRENCY"]
      }
    },
    "bulk_lease_import": {
      "enabled": false
    },
    "asc842_calculator_v2": {
      "enabled": true,
      "rollout_percentage": 50
    }
  }
}
```

---

## 12. Onboarding Response Payload

*Architecture Reference: Section 10.1 — End-to-End Onboarding Sequence*

```json
{
  "tenant_id": "tn_042",
  "name": "Denny's",
  "slug": "dennys",
  "status": "PROVISIONING",
  "provisioning_steps": [
    { "step": "database_created", "status": "COMPLETE" },
    { "step": "schema_migrated", "status": "COMPLETE" },
    { "step": "s3_configured", "status": "COMPLETE" },
    { "step": "datasource_registered", "status": "COMPLETE" },
    { "step": "initial_users_assigned", "status": "COMPLETE" }
  ],
  "ready_at": "2026-02-06T14:32:00Z"
}
```

---

## 13. SoD Compliance Report Schema

*Architecture Reference: Section 12.3 — SOX Segregation of Duties Reporting*

```json
{
  "report": "Segregation of Duties Compliance",
  "tenant": "Warby Parker",
  "generated_at": "2026-02-06T10:00:00Z",
  "conflicts_detected": 0,
  "users_reviewed": 45,
  "role_assignments": [
    {
      "user": "dawn@asg.com",
      "role": "LEASE_CONTROLLER",
      "conflicting_roles_held": [],
      "status": "COMPLIANT"
    }
  ],
  "hard_conflicts_blocked": 3,
  "soft_conflicts_overridden": 1,
  "override_details": [
    {
      "user": "admin@warby.com",
      "roles": ["TENANT_ADMIN", "AUDITOR"],
      "approved_by": "superadmin@asg.com",
      "approved_at": "2026-01-15T09:00:00Z",
      "justification": "Temporary dual role during Q4 audit cycle"
    }
  ]
}
```
