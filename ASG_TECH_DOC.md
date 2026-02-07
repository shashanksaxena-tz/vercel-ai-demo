ASG Edge Plus (Lucy): Architectural Blueprint & Technical Strategy

1. Executive Summary: The "Hub & Spoke" Paradigm

The proposed architecture addresses the critical "21-Login Problem" by decoupling Global Identity from Local Authorization. We are moving from a fragmented collection of point solutions to a unified Multi-Tenant SaaS Platform.

This "Hub and Spoke" model utilizes a central Standard Layer (The Hub) for identity, configuration, and routing, while strictly maintaining physical data isolation for each client in the Tenant Layer (The Spokes). This ensures operational efficiency without compromising the SOC 2 and SOX compliance requirements mandated by "Big Four" auditors.

2. High-Level Architecture Diagram

The following diagram illustrates the interaction between the Global Control Plane (Standard) and the Isolated Data Plane (Tenants).


graph TD
    %% Nodes
    subgraph Client_Layer [User Interaction]
        UI[React Unified Dashboard]
        AdminUI[SysAdmin Portal]
    end

    subgraph Standard_Layer [The Hub: Global Control Plane]
        Auth[Unified Auth Service]
        Config[**Configuration Service**]
        SDB[(**Standard Postgres DB**)]
    end

    subgraph Routing_Layer [Traffic Management]
        Gateway[API Gateway / Load Balancer]
        Router[Tenant Routing Engine]
    end

    subgraph Tenant_Layer [The Spokes: Isolated Data Plane]
        Service_Acct[Lease Accounting Service]
        Service_Doc[Document Service]
        Service_Rpt[Reporting Engine]
    end

    subgraph Persistence_Layer [Physical Isolation]
        DB1[(Tenant DB: Warby Parker)]
        DB2[(Tenant DB: J.Crew)]
        DB3[(Tenant DB: ...n)]
    end

    %% Flows
    UI -->|1. Auth Request| Auth
    Auth -->|2. Verify Global Identity| SDB
    UI -->|3. Fetch Tenant Context| Config
    Config -->|4. Load Feature Flags/Policy| SDB
    SDB --> 
    UI -->|5. Business Request (w/ Tenant-ID)| Gateway
    Gateway -->|6. Route Request| Router
    Router -->|7. Switch Context| Service_Acct
    
    Service_Acct -->|8. Tenant A Data| DB1
    Service_Acct -->|9. Tenant B Data| DB2

    classDef primary fill:#f9f,stroke:#333,stroke-width:2px;
    classDef storage fill:#ff9,stroke:#333,stroke-width:2px;
    class Config,Auth primary;
    class SDB,DB1,DB2 storage;


3. Core Component: The Configuration Service

The Configuration Service is the "Brain" of the multi-tenant architecture. It resides in the Standard Layer and is backed by the Standard Database.

3.1 Responsibilities

Tenant Onboarding: Dynamically provisioning new tenants (e.g., adding "Denny's") by defining connection strings and S3 bucket paths in the Standard DB.

Feature Flagging: Managing client-specific customizations.

Scenario: If Denny's requires a 32nd column in a "Rent Roll" report, the Config Service serves a JSON schema specific to Denny's that the Frontend renders, without affecting Warby Parker.

Policy Aggregation: Storing security policies (Password rotation, MFA rules) for each tenant to calculate the "Greatest Common Denominator" for the user.

3.2 Standard Database Schema (Simplified)

The Standard DB is distinct from Tenant DBs. It holds Metadata, not Business Data.

Table

Purpose

Example Data

tenants

Registry of all client environments.

{id: "t_001", name: "Warby Parker", db_url: "jdbc:..."}

global_users

Single identity record for the human.

{id: "u_99", email: "dawn@asg.com", mfa_enabled: true}

tenant_configs

JSON blob for client-specific settings.

{ "report_cols": ["rent", "cam", "custom_col_1"] }

user_tenant_map

Links Global User to Tenant + Role.

{user_id: "u_99", tenant_id: "t_001", role_id: "LEASE_ADMIN"}

4. Identity & Access Management (IAM): Dual-Layer RBAC

To solve the complexity of a SysAdmin acting as an Analyst for one client and an Admin for another, we implement a Dual-Layer RBAC model.

4.1 Layer 1: Standard Roles (Global)

These roles apply to the Platform itself.

Platform Super Admin: Can create new Tenants, view the "Company Card" dashboard, and manage Global Users.

Platform User: Can login and see only the Tenants they are assigned to.

4.2 Layer 2: Tenant Roles (Local)

These roles apply within a specific Tenant context.

Tenant Admin: Full control within Tenant A (e.g., Manage Users for J.Crew only).

Lease Controller: Can approve monetary transactions and generate rent files.

Lease Analyst: Read/Write access to Lease Abstracts and Documents.

Auditor (Read-Only): View-only access for external audits (SOC/SOX).

4.3 The Context Switching Flow

Login: User authenticates as Standard Role: Platform User.

Selection: User selects "Warby Parker" card.

Token Exchange: The backend issues a short-lived Tenant Token with scopes: [tenant_id: "t_001", role: "LEASE_CONTROLLER"].

Enforcement: The API Gateway rejects any request to t_001 endpoints unless the token contains the correct scope.

5. Compliance & Data Strategy

5.1 SOC 2 & Data Isolation

Physical Separation: We utilize a Database-per-Tenant strategy (or Schema-per-Tenant). This ensures that a SQL injection or logic error in one client's query literally cannot access another client's tables.

Immutable Audit Logs: Audit logs are written to the Tenant DB. This ensures that when a client leaves, we can hand over their entire database dump (Business Data + Audit History) without scrubbing other clients' data.

5.2 SOX & Segregation of Duties (SoD)

The Configuration Service enforces SoD policies at the gateway level.

Rule: If a user holds the LEASE_CREATOR role in t_001, the system prevents assignment of the PAYMENT_APPROVER role in t_001.

6. Technical Planning Sheet (Phased Execution)

Phase 1: The "Standard" Foundation (Weeks 1-4)

Goal: Establish the Control Plane.

Deliverables:

Setup Standard DB (Postgres) and Configuration Service (Spring Boot).

Implement Unified Auth (OIDC/OAuth2).

Build the Tenant Registry API (CRUD for Tenants).

Phase 2: Dynamic Routing & Context (Weeks 5-8)

Goal: Enable the "Company Card" experience.

Deliverables:

Implement Spring AbstractRoutingDataSource to switch DB connections based on X-Tenant-ID.

Develop the Dual-Layer RBAC token exchange logic.

Frontend: Dynamic dashboard rendering based on Config Service response.

Phase 3: Core Business Logic (Weeks 9-12)

Goal: Migrate Lucernix features to Microservices.

Deliverables:

Lease Engine: Port ASC 842 logic to Java Service.

Document Service: S3 bucket isolation (Bucket-per-Tenant or Prefix-per-Tenant).

Report Service: Dynamic column generation based on Tenant Configs.

7. Success Metrics

Login Friction: 0s latency when switching between Tenants (Context Switch vs. Re-login).

Config Velocity: < 10 minutes to onboard a new Tenant (Database + Config entry).

Audit Readiness: 100% of Tenant-specific actions logged to the isolated Tenant DB.