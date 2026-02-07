# ASG Edge Plus (Lucy) — 10-Minute Technical Walkthrough

**Audience:** Client IT team, architects
**Format:** Fast-paced, diagram-driven, no live code

---

## MINUTE 0–2: THE PROBLEM

> "We run 21 standalone deployments today — one per client. Each has its own auth, its own database, its own codebase fork. Three consequences:"

1. **21-Login Problem** — operators juggle 21 credentials, 21 sessions daily. No centralized user directory.
2. **Configuration drift** — client-specific customizations live as code forks. Every upgrade is a multi-week cross-environment project.
3. **Audit pain** — SOC 2 evidence requires extracting logs from 21 systems independently.

> "Lucy replaces this with a Control Plane / Data Plane split."

---

## MINUTE 2–5: ARCHITECTURE & DATA ISOLATION

*[Show the architecture diagram — this is your main visual for the whole talk]*

> "Two planes:"

- **Control Plane (Hub)** — Auth Service, Configuration Service, one Standard PostgreSQL DB. Holds metadata only: user identities, tenant registry, RBAC mappings, feature flags. **Never touches business data.**
- **Data Plane (Spokes)** — One physically separate PostgreSQL database per tenant. Warby Parker gets its own DB, J.Crew gets its own DB, Denny's gets its own DB. Plus per-tenant S3 prefixes for documents.

> "The routing works like this:"

```
Request with JWT → API Gateway validates token, extracts tenant_id
  → Routing Engine resolves tenant_id to a specific DB connection (HikariCP pool)
    → Business Service executes query against THAT database only
```

> "There is no shared database, no `WHERE tenant_id = ?` filter, no super-connection that can reach multiple tenants. The JDBC connection itself is the isolation boundary. Cross-tenant access is structurally impossible — not just policy-prohibited."

> "Business services contain zero tenant logic. They talk to 'the database' — the routing engine already pointed them at the right one."

### Data Isolation — Layer by Layer

> "Isolation isn't just at the database. It's enforced at every layer of the stack:"

| Layer | Isolation Mechanism | What It Prevents |
|---|---|---|
| **Network** | VPC with 3-tier subnets — Public (ALB only), Private App, Private Data. Tenant DBs sit in the data subnet, unreachable from the internet. | Direct DB access, network-level cross-tenant probing |
| **Authentication** | Two-token model — Tenant Token scoped to exactly one tenant, 15-min TTL. Platform Token carries no roles or permissions. | Token reuse across tenants, privilege leakage from intercepted tokens |
| **API Gateway** | Validates JWT, extracts `tenant_id`, checks `permissions` array against route scope. Rejects requests before they reach any service. | Unauthorized access, permission escalation, unauthenticated requests |
| **Routing Engine** | `AbstractRoutingDataSource` resolves one JDBC connection per request via ThreadLocal. No API exists to request a different tenant's connection. | Application-level cross-tenant queries, rogue service access |
| **Database** | Physically separate PostgreSQL instance per tenant. Separate DB credentials stored in AWS Secrets Manager. No shared tables for business data. | SQL injection crossing tenant boundaries, credential sharing, shared-schema privilege escalation |
| **Object Storage** | Per-tenant S3 prefix (`s3://bucket/warby-parker/*`) with IAM policies scoped to that prefix only. | Document access across tenants, bulk storage leakage |
| **Encryption** | AES-256 at rest (RDS + S3 SSE), TLS 1.2+ in transit (public), mutual TLS (internal service-to-service). | Data exposure at rest or in transit, man-in-the-middle between services |

> "The point: if any single layer fails, the layers above and below still enforce isolation. A gateway bypass doesn't help if the DB connection is physically scoped. A compromised service can't reach another tenant's DB because it has no connection to it."

---

## MINUTE 5–7: AUTH & ACCESS CONTROL

> "Two-token OIDC model:"

| Token | Issued When | TTL | Contains |
|---|---|---|---|
| **Platform Token** | At login | 2 hours | User ID, email, list of assigned tenant IDs — no roles |
| **Tenant Token** | On context switch (click a tenant card) | 15 min | Tenant ID, role, granular permissions (`lease:read`, `payment:approve`, etc.) |

> "Why two? The platform token doesn't reveal what you can do inside any tenant — safe if intercepted. The tenant token is short-lived and carries embedded permissions so the gateway enforces access on every request without a DB lookup."

> "Context switching is a token exchange — under 200ms, no re-authentication."

**RBAC:** Dual-layer. Dawn can be a Lease Controller for Warby Parker and a read-only Auditor for J.Crew simultaneously. Different roles per tenant, enforced by the tenant token.

**SoD:** The Config Service maintains a conflict matrix. Hard conflicts (lease creator + payment approver) are system-blocked. Soft conflicts require documented Super Admin override.

---

## MINUTE 7–9: OPERATIONS & COMPLIANCE

**Tenant onboarding** — one API call triggers automated provisioning:
- Creates PostgreSQL database + dedicated DB user
- Stores credentials in AWS Secrets Manager
- Runs schema migration
- Creates S3 prefix with scoped IAM policy
- Registers connection in routing engine
- **Under 10 minutes from trigger to production-ready tenant**

**Tenant offboarding** — four phases: Deactivate → Export full DB + audit logs → Archive to Glacier → Purge after retention. No data scrubbing needed because isolation was physical from day one.

### Audit Trail Architecture

> "Every tenant database contains an immutable audit log:"

- **INSERT-only** — the application DB user has no UPDATE or DELETE grants on the audit table. Tampering requires DBA-level access with a separate change request process.
- Every record captures: **who** (user ID, email, role, IP), **what** (entity type, entity ID, action), **when** (timestamp), **before** (previous state as JSONB), **after** (new state as JSONB).
- Auditors can reconstruct the exact state of any entity at any point in time.
- On client offboarding, the full audit log exports with the database — no separate extraction, no cross-tenant contamination.

### SOC 2 Type II Control Mapping

| SOC 2 Control Area | How Lucy Addresses It |
|---|---|
| **Access Control (CC6.1–6.3)** | Dual-Layer RBAC — platform roles + per-tenant roles. Time-bound access via `expires_at` on role assignments. MFA enforced via GCD policy (strictest tenant's policy wins). |
| **Logical & Physical Access (CC6.4–6.6)** | Database-per-tenant — no shared tables. Network isolation via VPC subnets. DB credentials in Secrets Manager, rotated automatically. |
| **System Operations (CC7.1–7.2)** | Per-tenant monitoring (Prometheus metrics tagged by `tenant_id`). Auto-scaling with health checks. Blue/Green deployments with auto-rollback. |
| **Change Management (CC8.1)** | All config changes versioned in Standard DB with `updated_by` + `updated_at`. CI/CD pipeline requires manual approval gate before production. |
| **Risk Mitigation (CC9.1)** | Automated SoD conflict matrix — HARD conflicts system-blocked, SOFT conflicts require documented Super Admin override with justification. |
| **Availability (A1.1–A1.2)** | Multi-AZ RDS for all databases. Stateless services with min 2 instances. Per-tenant PITR backup. Independent restore without cross-tenant impact. |

### SOX Segregation of Duties

> "The platform auto-generates SoD compliance reports per tenant. Two conflict types:"

- **HARD** — system rejects the role assignment entirely. Example: Lease Creator cannot also be Payment Approver (the person who creates an obligation cannot approve payment against it).
- **SOFT** — system allows it but requires Platform Super Admin approval with documented justification + audit event generated.

> "This replaces the manual spreadsheet-based SoD process currently run across 21 systems. Auditors get a single API call: `GET /api/v1/config/tenants/{id}/sod-report` — users reviewed, conflicts detected, overrides with who-approved-when-and-why."

### Compliance Evidence — Before vs After

| Evidence Request | Today (21 systems) | Lucy |
|---|---|---|
| "Who has access to Warby Parker?" | Export user lists from Warby Parker's standalone system, manually reconcile | Query `user_tenant_roles` WHERE `tenant_id = 'warby-parker'` — one table, one query |
| "Prove data isolation" | Describe the deployment architecture for each system | "Separate database instances, separate credentials, separate VPC subnets" |
| "Show SoD compliance" | Manual spreadsheet per client, cross-referenced role assignments | Automated report — conflicts detected, blocked, overridden with justification |
| "Full audit trail for entity X" | Find the right system, grep logs, correlate timestamps | `SELECT * FROM audit_log WHERE entity_id = 'X' ORDER BY created_at` — per-tenant DB, immutable, complete |
| "Prove encryption" | Document each system's encryption config separately | AES-256 at rest (RDS default), TLS 1.2+ in transit, mutual TLS internal — uniform across all tenants |

**Deployment:** All services stateless on ECS Fargate, Blue/Green with canary (10% traffic, auto-rollback if error rate > 1%). No session affinity needed.

---

## MINUTE 9–10: SUMMARY & OPEN

> "Five architectural decisions that matter:"

| Decision | Why |
|---|---|
| **Database-per-tenant** | Physical isolation — auditor answer is "separate databases, separate credentials" |
| **Two-token auth** | Platform token for identity, short-lived tenant token for authorization — minimal blast radius |
| **Dynamic routing via `AbstractRoutingDataSource`** | One deployed service set, not one per tenant — connection resolved at runtime |
| **Config-driven UI** | Feature flags + UI schemas from Config Service — no code forks for customization |
| **Stateless services** | Horizontal scaling, independent per-tenant DB backup/restore |

> "Happy to go deeper on any of these — routing engine internals, the schema design, CI/CD pipeline, or the compliance controls. What's most relevant for your team?"

*[Open for questions]*

---

## APPENDIX: COMPONENT REFERENCE

*[Use this as a leave-behind or pull up if someone asks "what does X do?"]*

### Client Layer

| Component | Function | Tech |
|---|---|---|
| **React Unified Dashboard (SPA)** | Single-page app that all users interact with. Renders the Company Card dashboard after login. Dynamically renders tenant-specific UI (report columns, filters, workflows) by fetching JSON schemas from the Config Service — no hardcoded client screens. | React + TypeScript, served via CloudFront CDN |
| **SysAdmin Portal** | Admin-only interface for platform management — creating/deactivating tenants, managing user-tenant assignments, viewing platform health, triggering onboarding workflows. | React + TypeScript, same SPA with role-gated routes |

### Standard Layer (The Hub — Control Plane)

| Component | Function | Tech |
|---|---|---|
| **Unified Auth Service** | Handles all authentication — login, MFA challenges (TOTP, SMS, FIDO2), token issuance (Platform + Tenant tokens), token refresh, and session management. Single identity store for all users across all tenants. Enforces GCD security policy (most restrictive policy across a user's tenant assignments). | OIDC / OAuth 2.0 via Keycloak or AWS Cognito |
| **Configuration Service** | The platform's central nervous system. Manages the tenant registry, feature flags (per-tenant toggles with rollout percentages), UI schema definitions (what columns/fields/filters each tenant sees), security policies, SoD conflict matrix evaluation, and GCD policy computation. Orchestrates the full tenant onboarding/offboarding lifecycle. | Spring Boot 3.x (Java 17+) |
| **Standard PostgreSQL DB** | Metadata-only database. Stores: tenant registry (connection endpoints, S3 paths, tier, status), global user identities, user-to-tenant role mappings (`user_tenant_roles`), per-tenant config and feature flags, security policies + SoD rules, and platform-level audit log. **Contains zero business data** — no leases, no financials, no documents. | PostgreSQL 15+, RDS Multi-AZ |

### Routing Layer (Traffic Management)

| Component | Function | Tech |
|---|---|---|
| **API Gateway** | Single entry point for all business requests. Five responsibilities: (1) Validate JWT signature, expiry, issuer. (2) Extract `tenant_id` from token claims. (3) Check `permissions` array against the route's required scope. (4) Apply per-tenant rate limiting (Standard: 100 req/s, Premium: 500, Audit Window: 1000). (5) Inject internal headers (`X-Tenant-ID`, `X-User-ID`, `X-User-Role`) and log every request. | Spring Cloud Gateway |
| **Tenant Routing Engine** | Receives the `X-Tenant-ID` header from the gateway, looks up the corresponding database connection from the tenant registry, and binds that connection to the current request thread via `ThreadLocal`. Uses `AbstractRoutingDataSource` so business services don't contain any tenant-switching logic. Manages per-tenant HikariCP connection pools (lazy init, max 10 connections per tenant, auto-eviction after 30 min idle). | Spring Boot + HikariCP |

### Tenant Layer (The Spokes — Data Plane)

| Component | Function | Tech |
|---|---|---|
| **Lease Accounting Service** | Core business service — manages lease abstracts, rent rolls, CAM reconciliations, payment batches, ASC 842 calculations. Executes all queries against the tenant database resolved by the routing engine. Contains zero tenant-selection logic — it just talks to "the database." | Spring Boot 3.x, stateless |
| **Document Service** | Manages document upload, download, versioning, and metadata. Documents stored in the tenant's scoped S3 prefix (`s3://bucket/{tenant-slug}/`). IAM policies restrict access to that prefix only. | Spring Boot 3.x + AWS S3 SDK |
| **Reporting Engine** | Generates reports with dynamic columns defined by the Config Service UI schemas. Supports tenant-specific report layouts, custom calculated fields, and scheduled report generation. Compute-heavy — scales independently with a higher CPU threshold (80%). | Spring Boot 3.x, stateless |

### Persistence Layer (Physical Isolation)

| Component | Function | Tech |
|---|---|---|
| **Tenant Database (per client)** | Physically separate PostgreSQL database for each tenant. Contains all business data (leases, payments, documents metadata, financial records) and the immutable audit log (INSERT-only). Has its own credentials (stored in Secrets Manager), its own backup schedule, its own point-in-time recovery. Can be exported as a complete package on offboarding — no scrubbing needed. | PostgreSQL 15+, RDS with per-tenant instance |
| **AWS S3 (per-tenant prefix)** | Document storage with tenant-level isolation via S3 prefix paths and IAM policies. Each tenant's documents live under `/{tenant-slug}/*`. IAM policies scoped per prefix prevent cross-tenant access at the AWS level. On offboarding, documents move to Glacier cold storage before purge. | AWS S3 + IAM + Glacier |
| **AWS Secrets Manager** | Stores per-tenant database credentials at `tenant/{slug}/db-creds`. The routing engine fetches credentials at pool creation time — no passwords in config files, environment variables, or application code. Supports automatic credential rotation. | AWS Secrets Manager |
| **Redis** | Session store for auth sessions, tenant config cache (5-min TTL read-through), and rate limiting counters. Serves as a read-through fallback if the Standard DB is briefly unavailable — active tenant sessions continue working because the Tenant Token is self-contained. | Redis (ElastiCache) |

### Cross-Cutting

| Component | Function | Tech |
|---|---|---|
| **ALB (Application Load Balancer)** | HTTPS termination point. Only internet-facing component. Routes traffic to the API Gateway and Auth Service in the private app subnet. Health checks on all backend targets. | AWS ALB |
| **CloudFront** | CDN for the React SPA. Serves static assets globally with low latency. The SPA itself contains no business data — it fetches everything via API calls through the gateway. | AWS CloudFront |
| **Monitoring Stack** | Metrics tagged with `tenant_id` labels — per-tenant request rate, error rate, p50/p95/p99 latency, connection pool utilization. Dashboards filter by tenant. Alerting rules fire per-tenant. | Prometheus + Grafana / CloudWatch |
| **CI/CD Pipeline** | Automated build → test (unit + integration) → security scan (dependency + container CVEs) → staging deploy (Blue/Green) → smoke + contract tests → manual approval gate → production deploy (Blue/Green + canary at 10%, auto-rollback if error rate > 1%). | GitHub Actions / Jenkins |
