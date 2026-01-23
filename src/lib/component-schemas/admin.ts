export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: Record<string, string>;
}

export const adminSchemas: Record<string, ComponentSchema> = {
  SettingsPage: {
    category: "admin",
    keywords: ["settings", "page", "configuration", "preferences", "options", "admin"],
    description: "Full settings page container with navigation and sections",
    props: {
      title: "string",
      description: "string",
      sections: "{ id: string; label: string; icon?: ReactNode }[]",
      activeSection: "string",
      layout: "'sidebar' | 'tabs' | 'accordion'",
      showSearch: "boolean",
      searchPlaceholder: "string",
      showBreadcrumbs: "boolean",
      breadcrumbs: "{ label: string; href?: string }[]",
      onSectionChange: "(sectionId: string) => void",
      onSave: "() => void",
      onCancel: "() => void",
      saveButtonText: "string",
      cancelButtonText: "string",
      showSaveIndicator: "boolean",
      hasUnsavedChanges: "boolean",
      children: "ReactNode"
    }
  },

  SettingsSection: {
    category: "admin",
    keywords: ["settings", "section", "group", "panel", "category"],
    description: "Individual section within settings page",
    props: {
      id: "string",
      title: "string",
      description: "string",
      icon: "ReactNode",
      collapsible: "boolean",
      defaultCollapsed: "boolean",
      disabled: "boolean",
      badge: "string | number",
      badgeVariant: "'default' | 'success' | 'warning' | 'error'",
      showDivider: "boolean",
      actions: "ReactNode",
      children: "ReactNode"
    }
  },

  SettingsForm: {
    category: "admin",
    keywords: ["settings", "form", "configuration", "options", "preferences"],
    description: "Form component specifically for settings with auto-save support",
    props: {
      initialValues: "object",
      validationSchema: "object",
      autoSave: "boolean",
      autoSaveDelay: "number",
      showSaveStatus: "boolean",
      disabled: "boolean",
      layout: "'vertical' | 'horizontal'",
      labelWidth: "number | string",
      spacing: "number | string",
      onSubmit: "(values: object) => void | Promise<void>",
      onChange: "(values: object) => void",
      onAutoSave: "(values: object) => Promise<void>",
      onValidationError: "(errors: object) => void",
      children: "ReactNode"
    }
  },

  SettingsField: {
    category: "admin",
    keywords: ["settings", "field", "input", "option", "preference"],
    description: "Individual settings field with label, description, and control",
    props: {
      name: "string",
      label: "string",
      description: "string",
      type: "'text' | 'number' | 'select' | 'switch' | 'checkbox' | 'radio' | 'color' | 'custom'",
      value: "any",
      defaultValue: "any",
      options: "{ value: any; label: string; description?: string }[]",
      required: "boolean",
      disabled: "boolean",
      readOnly: "boolean",
      error: "string",
      hint: "string",
      placeholder: "string",
      min: "number",
      max: "number",
      step: "number",
      layout: "'inline' | 'stacked'",
      labelPosition: "'left' | 'top'",
      showResetButton: "boolean",
      onChange: "(value: any) => void",
      onReset: "() => void",
      children: "ReactNode"
    }
  },

  ProfileCard: {
    category: "admin",
    keywords: ["profile", "card", "user", "account", "identity", "avatar"],
    description: "Displays user profile information in a card format",
    props: {
      user: "{ id: string; name: string; email: string; avatar?: string; role?: string; status?: string }",
      showAvatar: "boolean",
      showEmail: "boolean",
      showRole: "boolean",
      showStatus: "boolean",
      showBio: "boolean",
      bio: "string",
      showSocialLinks: "boolean",
      socialLinks: "{ platform: string; url: string; icon?: ReactNode }[]",
      showJoinDate: "boolean",
      joinDate: "string | Date",
      showLastActive: "boolean",
      lastActive: "string | Date",
      editable: "boolean",
      variant: "'default' | 'compact' | 'detailed'",
      orientation: "'horizontal' | 'vertical'",
      onEdit: "() => void",
      onClick: "() => void"
    }
  },

  ProfileForm: {
    category: "admin",
    keywords: ["profile", "form", "edit", "user", "account", "update"],
    description: "Form for editing user profile information",
    props: {
      initialValues: "{ name?: string; email?: string; bio?: string; avatar?: string | File; phone?: string; location?: string; website?: string; [key: string]: any }",
      fields: "string[]",
      requiredFields: "string[]",
      disabledFields: "string[]",
      showAvatarUpload: "boolean",
      avatarUploadEndpoint: "string",
      maxAvatarSize: "number",
      showPasswordChange: "boolean",
      showDeleteAccount: "boolean",
      validationSchema: "object",
      layout: "'vertical' | 'horizontal' | 'grid'",
      columns: "number",
      onSubmit: "(values: object) => void | Promise<void>",
      onAvatarChange: "(file: File) => void",
      onPasswordChange: "() => void",
      onDeleteAccount: "() => void",
      onCancel: "() => void"
    }
  },

  ProfileHeader: {
    category: "admin",
    keywords: ["profile", "header", "banner", "user", "cover"],
    description: "Profile header with cover image and user info",
    props: {
      user: "{ name: string; avatar?: string; role?: string; status?: string }",
      coverImage: "string",
      showCoverImage: "boolean",
      coverHeight: "number | string",
      avatarSize: "'sm' | 'md' | 'lg' | 'xl'",
      avatarPosition: "'left' | 'center'",
      showStatus: "boolean",
      statusPosition: "'avatar' | 'name'",
      showActions: "boolean",
      actions: "ReactNode",
      editable: "boolean",
      onEditCover: "() => void",
      onEditAvatar: "() => void",
      children: "ReactNode"
    }
  },

  AccountSettings: {
    category: "admin",
    keywords: ["account", "settings", "preferences", "user", "configuration"],
    description: "Account-related settings section",
    props: {
      user: "{ email: string; username?: string; phone?: string; language?: string; timezone?: string }",
      showEmailSettings: "boolean",
      showUsernameSettings: "boolean",
      showPhoneSettings: "boolean",
      showLanguageSettings: "boolean",
      showTimezoneSettings: "boolean",
      showDeleteAccount: "boolean",
      showExportData: "boolean",
      availableLanguages: "{ code: string; name: string }[]",
      availableTimezones: "{ value: string; label: string }[]",
      emailVerified: "boolean",
      phoneVerified: "boolean",
      onEmailChange: "(email: string) => void",
      onUsernameChange: "(username: string) => void",
      onPhoneChange: "(phone: string) => void",
      onLanguageChange: "(language: string) => void",
      onTimezoneChange: "(timezone: string) => void",
      onDeleteAccount: "() => void",
      onExportData: "() => void",
      onResendVerification: "(type: 'email' | 'phone') => void"
    }
  },

  SecuritySettings: {
    category: "admin",
    keywords: ["security", "settings", "password", "2fa", "authentication", "sessions"],
    description: "Security-related settings including password and 2FA",
    props: {
      user: "{ id: string; email: string; twoFactorEnabled?: boolean; lastPasswordChange?: string }",
      showPasswordSection: "boolean",
      showTwoFactorSection: "boolean",
      showSessionsSection: "boolean",
      showLoginHistorySection: "boolean",
      showSecurityKeysSection: "boolean",
      twoFactorEnabled: "boolean",
      twoFactorMethods: "('app' | 'sms' | 'email' | 'security_key')[]",
      activeSessions: "{ id: string; device: string; location: string; lastActive: string; current: boolean }[]",
      loginHistory: "{ id: string; date: string; device: string; location: string; success: boolean }[]",
      securityKeys: "{ id: string; name: string; createdAt: string; lastUsed?: string }[]",
      passwordRequirements: "{ minLength: number; requireUppercase: boolean; requireLowercase: boolean; requireNumbers: boolean; requireSpecialChars: boolean }",
      onPasswordChange: "(currentPassword: string, newPassword: string) => Promise<void>",
      onTwoFactorToggle: "(enabled: boolean, method: string) => Promise<void>",
      onSessionRevoke: "(sessionId: string) => void",
      onRevokeAllSessions: "() => void",
      onSecurityKeyAdd: "() => void",
      onSecurityKeyRemove: "(keyId: string) => void"
    }
  },

  NotificationSettings: {
    category: "admin",
    keywords: ["notification", "settings", "alerts", "preferences", "email", "push"],
    description: "Notification preferences and channel settings",
    props: {
      settings: "Record<string, { email?: boolean; push?: boolean; sms?: boolean; inApp?: boolean }>",
      categories: "{ id: string; label: string; description?: string; items: { id: string; label: string; description?: string }[] }[]",
      channels: "('email' | 'push' | 'sms' | 'inApp')[]",
      showChannelToggles: "boolean",
      showFrequencySettings: "boolean",
      frequencyOptions: "{ value: string; label: string }[]",
      showQuietHours: "boolean",
      quietHoursStart: "string",
      quietHoursEnd: "string",
      showDigestSettings: "boolean",
      digestFrequency: "'daily' | 'weekly' | 'monthly' | 'never'",
      disabled: "boolean",
      onChange: "(settings: object) => void",
      onChannelToggle: "(channel: string, enabled: boolean) => void",
      onFrequencyChange: "(frequency: string) => void",
      onQuietHoursChange: "(start: string, end: string) => void",
      onDigestChange: "(frequency: string) => void"
    }
  },

  BillingSettings: {
    category: "admin",
    keywords: ["billing", "settings", "payment", "subscription", "invoice", "plan"],
    description: "Billing and subscription management settings",
    props: {
      currentPlan: "{ id: string; name: string; price: number; interval: 'monthly' | 'yearly'; features: string[] }",
      availablePlans: "{ id: string; name: string; price: number; interval: 'monthly' | 'yearly'; features: string[]; recommended?: boolean }[]",
      paymentMethods: "{ id: string; type: string; last4?: string; expiryDate?: string; isDefault: boolean }[]",
      billingAddress: "{ line1: string; line2?: string; city: string; state: string; postalCode: string; country: string }",
      invoices: "{ id: string; date: string; amount: number; status: string; downloadUrl?: string }[]",
      showPlanComparison: "boolean",
      showUsageMetrics: "boolean",
      usageMetrics: "{ name: string; current: number; limit: number; unit: string }[]",
      currency: "string",
      taxRate: "number",
      nextBillingDate: "string | Date",
      onPlanChange: "(planId: string) => void",
      onPaymentMethodAdd: "() => void",
      onPaymentMethodRemove: "(methodId: string) => void",
      onPaymentMethodSetDefault: "(methodId: string) => void",
      onBillingAddressChange: "(address: object) => void",
      onInvoiceDownload: "(invoiceId: string) => void",
      onCancelSubscription: "() => void"
    }
  },

  TeamSettings: {
    category: "admin",
    keywords: ["team", "settings", "members", "organization", "group", "workspace"],
    description: "Team and organization settings management",
    props: {
      team: "{ id: string; name: string; slug?: string; avatar?: string; description?: string }",
      members: "{ id: string; name: string; email: string; avatar?: string; role: string; status: string; joinedAt: string }[]",
      roles: "{ id: string; name: string; permissions: string[]; description?: string }[]",
      invitations: "{ id: string; email: string; role: string; status: string; expiresAt: string }[]",
      showMembersList: "boolean",
      showInvitations: "boolean",
      showRoleManagement: "boolean",
      showTeamInfo: "boolean",
      maxMembers: "number",
      canInvite: "boolean",
      canRemoveMembers: "boolean",
      canChangeRoles: "boolean",
      onTeamUpdate: "(team: object) => void",
      onMemberInvite: "(email: string, role: string) => void",
      onMemberRemove: "(memberId: string) => void",
      onMemberRoleChange: "(memberId: string, role: string) => void",
      onInvitationCancel: "(invitationId: string) => void",
      onInvitationResend: "(invitationId: string) => void"
    }
  },

  IntegrationSettings: {
    category: "admin",
    keywords: ["integration", "settings", "connect", "apps", "third-party", "api"],
    description: "Third-party integrations and connected apps management",
    props: {
      integrations: "{ id: string; name: string; icon?: string; description: string; category: string; connected: boolean; configurable: boolean; status?: string }[]",
      connectedIntegrations: "{ id: string; integrationId: string; connectedAt: string; lastSync?: string; status: string; config?: object }[]",
      categories: "{ id: string; name: string; description?: string }[]",
      showCategories: "boolean",
      showSearch: "boolean",
      searchPlaceholder: "string",
      showStatus: "boolean",
      layout: "'grid' | 'list'",
      onConnect: "(integrationId: string) => void",
      onDisconnect: "(connectionId: string) => void",
      onConfigure: "(connectionId: string) => void",
      onSync: "(connectionId: string) => void",
      onSearch: "(query: string) => void"
    }
  },

  APISettings: {
    category: "admin",
    keywords: ["api", "settings", "keys", "tokens", "developer", "credentials"],
    description: "API keys and developer settings management",
    props: {
      apiKeys: "{ id: string; name: string; key: string; prefix?: string; createdAt: string; lastUsed?: string; expiresAt?: string; scopes: string[] }[]",
      webhooks: "{ id: string; url: string; events: string[]; active: boolean; secret?: string; createdAt: string }[]",
      availableScopes: "{ id: string; name: string; description: string }[]",
      availableEvents: "{ id: string; name: string; description: string }[]",
      showApiKeys: "boolean",
      showWebhooks: "boolean",
      showDocumentation: "boolean",
      documentationUrl: "string",
      showUsageStats: "boolean",
      usageStats: "{ endpoint: string; calls: number; errors: number }[]",
      maxApiKeys: "number",
      maxWebhooks: "number",
      onApiKeyCreate: "(name: string, scopes: string[], expiresAt?: string) => void",
      onApiKeyRevoke: "(keyId: string) => void",
      onApiKeyRegenerate: "(keyId: string) => void",
      onWebhookCreate: "(url: string, events: string[]) => void",
      onWebhookUpdate: "(webhookId: string, config: object) => void",
      onWebhookDelete: "(webhookId: string) => void",
      onWebhookTest: "(webhookId: string) => void"
    }
  },

  WebhookSettings: {
    category: "admin",
    keywords: ["webhook", "settings", "callback", "endpoint", "events", "notifications"],
    description: "Webhook configuration and management",
    props: {
      webhooks: "{ id: string; name: string; url: string; events: string[]; active: boolean; secret?: string; createdAt: string; lastTriggered?: string; failureCount?: number }[]",
      availableEvents: "{ id: string; name: string; description: string; category?: string }[]",
      eventCategories: "{ id: string; name: string }[]",
      showEventCategories: "boolean",
      showDeliveryLogs: "boolean",
      deliveryLogs: "{ id: string; webhookId: string; event: string; timestamp: string; status: number; duration: number; request?: object; response?: object }[]",
      maxWebhooks: "number",
      showSecretKey: "boolean",
      onWebhookCreate: "(config: object) => void",
      onWebhookUpdate: "(webhookId: string, config: object) => void",
      onWebhookDelete: "(webhookId: string) => void",
      onWebhookToggle: "(webhookId: string, active: boolean) => void",
      onWebhookTest: "(webhookId: string, event?: string) => void",
      onRegenerateSecret: "(webhookId: string) => void",
      onViewLogs: "(webhookId: string) => void"
    }
  },

  UserList: {
    category: "admin",
    keywords: ["user", "list", "members", "accounts", "directory", "people"],
    description: "List of users with filtering and actions",
    props: {
      users: "{ id: string; name: string; email: string; avatar?: string; role: string; status: string; createdAt: string; lastActive?: string }[]",
      columns: "{ key: string; label: string; sortable?: boolean; width?: string }[]",
      selectedUsers: "string[]",
      showSearch: "boolean",
      searchPlaceholder: "string",
      showFilters: "boolean",
      filters: "{ roles?: string[]; statuses?: string[]; dateRange?: [Date, Date] }",
      showPagination: "boolean",
      pageSize: "number",
      currentPage: "number",
      totalUsers: "number",
      showBulkActions: "boolean",
      bulkActions: "{ id: string; label: string; icon?: ReactNode; variant?: string }[]",
      sortBy: "string",
      sortOrder: "'asc' | 'desc'",
      loading: "boolean",
      emptyMessage: "string",
      onUserClick: "(userId: string) => void",
      onUserSelect: "(userIds: string[]) => void",
      onSearch: "(query: string) => void",
      onFilterChange: "(filters: object) => void",
      onSort: "(column: string, order: string) => void",
      onPageChange: "(page: number) => void",
      onBulkAction: "(action: string, userIds: string[]) => void"
    }
  },

  UserCard: {
    category: "admin",
    keywords: ["user", "card", "member", "account", "profile", "person"],
    description: "Card displaying individual user information",
    props: {
      user: "{ id: string; name: string; email: string; avatar?: string; role: string; status: string; department?: string; location?: string }",
      showAvatar: "boolean",
      showEmail: "boolean",
      showRole: "boolean",
      showStatus: "boolean",
      showDepartment: "boolean",
      showLocation: "boolean",
      showActions: "boolean",
      actions: "{ id: string; label: string; icon?: ReactNode; onClick: () => void }[]",
      selectable: "boolean",
      selected: "boolean",
      variant: "'default' | 'compact' | 'detailed'",
      orientation: "'horizontal' | 'vertical'",
      onClick: "() => void",
      onSelect: "(selected: boolean) => void"
    }
  },

  UserDetail: {
    category: "admin",
    keywords: ["user", "detail", "profile", "information", "view", "account"],
    description: "Detailed user profile view with all information",
    props: {
      user: "{ id: string; name: string; email: string; avatar?: string; role: string; status: string; phone?: string; department?: string; location?: string; bio?: string; createdAt: string; lastActive?: string; metadata?: Record<string, any> }",
      sections: "('profile' | 'contact' | 'activity' | 'permissions' | 'sessions' | 'custom')[]",
      customSections: "{ id: string; title: string; content: ReactNode }[]",
      activities: "{ id: string; action: string; timestamp: string; details?: string }[]",
      permissions: "{ id: string; name: string; granted: boolean }[]",
      sessions: "{ id: string; device: string; location: string; lastActive: string; current: boolean }[]",
      editable: "boolean",
      showStatusBadge: "boolean",
      showLastActive: "boolean",
      layout: "'tabs' | 'sections' | 'sidebar'",
      onEdit: "() => void",
      onStatusChange: "(status: string) => void",
      onRoleChange: "(role: string) => void",
      onSessionRevoke: "(sessionId: string) => void",
      onPermissionToggle: "(permissionId: string, granted: boolean) => void"
    }
  },

  UserAvatar: {
    category: "admin",
    keywords: ["user", "avatar", "profile", "picture", "image", "icon"],
    description: "User avatar with status indicator and fallback",
    props: {
      src: "string",
      alt: "string",
      name: "string",
      size: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
      shape: "'circle' | 'square' | 'rounded'",
      showStatus: "boolean",
      status: "'online' | 'offline' | 'away' | 'busy' | 'dnd'",
      statusPosition: "'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'",
      fallback: "'initials' | 'icon' | 'image'",
      fallbackIcon: "ReactNode",
      fallbackImage: "string",
      initialsLength: "number",
      backgroundColor: "string",
      textColor: "string",
      showBorder: "boolean",
      borderColor: "string",
      borderWidth: "number",
      loading: "boolean",
      onClick: "() => void"
    }
  },

  RoleList: {
    category: "admin",
    keywords: ["role", "list", "permissions", "access", "group", "level"],
    description: "List of roles with permissions overview",
    props: {
      roles: "{ id: string; name: string; description?: string; permissions: string[]; userCount?: number; createdAt?: string; isDefault?: boolean; isSystem?: boolean }[]",
      showDescription: "boolean",
      showUserCount: "boolean",
      showPermissionCount: "boolean",
      showCreatedDate: "boolean",
      showActions: "boolean",
      actions: "{ id: string; label: string; icon?: ReactNode }[]",
      selectable: "boolean",
      selectedRoles: "string[]",
      sortBy: "string",
      sortOrder: "'asc' | 'desc'",
      searchable: "boolean",
      searchQuery: "string",
      emptyMessage: "string",
      loading: "boolean",
      onRoleClick: "(roleId: string) => void",
      onRoleSelect: "(roleIds: string[]) => void",
      onAction: "(action: string, roleId: string) => void",
      onSort: "(column: string, order: string) => void",
      onSearch: "(query: string) => void"
    }
  },

  RoleCard: {
    category: "admin",
    keywords: ["role", "card", "permission", "access", "level", "group"],
    description: "Card displaying role information and permissions",
    props: {
      role: "{ id: string; name: string; description?: string; permissions: string[]; userCount?: number; color?: string; icon?: ReactNode }",
      showDescription: "boolean",
      showPermissions: "boolean",
      maxPermissionsShown: "number",
      showUserCount: "boolean",
      showActions: "boolean",
      actions: "ReactNode",
      editable: "boolean",
      deletable: "boolean",
      isDefault: "boolean",
      isSystem: "boolean",
      selectable: "boolean",
      selected: "boolean",
      variant: "'default' | 'compact' | 'detailed'",
      onClick: "() => void",
      onEdit: "() => void",
      onDelete: "() => void",
      onSelect: "(selected: boolean) => void"
    }
  },

  PermissionMatrix: {
    category: "admin",
    keywords: ["permission", "matrix", "access", "control", "rights", "table"],
    description: "Matrix view of permissions across roles or resources",
    props: {
      rows: "{ id: string; name: string; description?: string }[]",
      columns: "{ id: string; name: string; description?: string }[]",
      values: "Record<string, Record<string, boolean | 'partial'>>",
      rowLabel: "string",
      columnLabel: "string",
      showRowDescriptions: "boolean",
      showColumnDescriptions: "boolean",
      editable: "boolean",
      readOnly: "boolean",
      showSelectAll: "boolean",
      stickyHeader: "boolean",
      stickyFirstColumn: "boolean",
      compactMode: "boolean",
      highlightChanges: "boolean",
      groupRows: "boolean",
      rowGroups: "{ id: string; name: string; rows: string[] }[]",
      onChange: "(rowId: string, columnId: string, value: boolean) => void",
      onRowSelectAll: "(rowId: string, selected: boolean) => void",
      onColumnSelectAll: "(columnId: string, selected: boolean) => void",
      onSelectAll: "(selected: boolean) => void"
    }
  },

  PermissionToggle: {
    category: "admin",
    keywords: ["permission", "toggle", "access", "grant", "revoke", "switch"],
    description: "Individual permission toggle with description",
    props: {
      permission: "{ id: string; name: string; description?: string; category?: string }",
      granted: "boolean",
      disabled: "boolean",
      readOnly: "boolean",
      showDescription: "boolean",
      showCategory: "boolean",
      variant: "'switch' | 'checkbox' | 'button'",
      size: "'sm' | 'md' | 'lg'",
      labelPosition: "'left' | 'right'",
      confirmOnChange: "boolean",
      confirmMessage: "string",
      loading: "boolean",
      onChange: "(granted: boolean) => void"
    }
  },

  AuditLog: {
    category: "admin",
    keywords: ["audit", "log", "history", "activity", "trail", "events"],
    description: "Audit log viewer with filtering and search",
    props: {
      entries: "{ id: string; timestamp: string; actor: { id: string; name: string; email?: string; avatar?: string }; action: string; resource: string; resourceId?: string; details?: object; ipAddress?: string; userAgent?: string; status?: string }[]",
      showFilters: "boolean",
      filters: "{ actors?: string[]; actions?: string[]; resources?: string[]; dateRange?: [Date, Date]; status?: string[] }",
      availableActions: "string[]",
      availableResources: "string[]",
      showSearch: "boolean",
      searchQuery: "string",
      showPagination: "boolean",
      pageSize: "number",
      currentPage: "number",
      totalEntries: "number",
      showExport: "boolean",
      exportFormats: "('csv' | 'json' | 'pdf')[]",
      showDetails: "boolean",
      expandedEntryId: "string",
      loading: "boolean",
      emptyMessage: "string",
      onSearch: "(query: string) => void",
      onFilterChange: "(filters: object) => void",
      onPageChange: "(page: number) => void",
      onEntryClick: "(entryId: string) => void",
      onExport: "(format: string) => void"
    }
  },

  SystemStatus: {
    category: "admin",
    keywords: ["system", "status", "health", "monitoring", "uptime", "dashboard"],
    description: "System status dashboard with service health indicators",
    props: {
      services: "{ id: string; name: string; status: 'operational' | 'degraded' | 'partial_outage' | 'major_outage' | 'maintenance'; latency?: number; uptime?: number; lastChecked?: string }[]",
      overallStatus: "'operational' | 'degraded' | 'partial_outage' | 'major_outage' | 'maintenance'",
      incidents: "{ id: string; title: string; status: string; severity: string; createdAt: string; updatedAt: string; affectedServices: string[] }[]",
      showIncidents: "boolean",
      showLatency: "boolean",
      showUptime: "boolean",
      showLastChecked: "boolean",
      showRefreshButton: "boolean",
      refreshInterval: "number",
      autoRefresh: "boolean",
      layout: "'grid' | 'list' | 'compact'",
      onRefresh: "() => void",
      onServiceClick: "(serviceId: string) => void",
      onIncidentClick: "(incidentId: string) => void"
    }
  },

  HealthCheck: {
    category: "admin",
    keywords: ["health", "check", "status", "service", "indicator", "monitor"],
    description: "Individual service health check indicator",
    props: {
      service: "{ id: string; name: string; description?: string; endpoint?: string }",
      status: "'healthy' | 'unhealthy' | 'degraded' | 'unknown' | 'checking'",
      latency: "number",
      uptime: "number",
      lastChecked: "string | Date",
      responseTime: "number",
      errorMessage: "string",
      showDetails: "boolean",
      showLatency: "boolean",
      showUptime: "boolean",
      showLastChecked: "boolean",
      size: "'sm' | 'md' | 'lg'",
      variant: "'badge' | 'card' | 'inline'",
      checkInterval: "number",
      autoCheck: "boolean",
      onClick: "() => void",
      onCheck: "() => void"
    }
  },

  Maintenance: {
    category: "admin",
    keywords: ["maintenance", "mode", "downtime", "scheduled", "banner", "notice"],
    description: "Maintenance mode banner and configuration",
    props: {
      active: "boolean",
      scheduledStart: "string | Date",
      scheduledEnd: "string | Date",
      title: "string",
      message: "string",
      showCountdown: "boolean",
      showProgress: "boolean",
      progress: "number",
      affectedServices: "string[]",
      showAffectedServices: "boolean",
      allowedRoutes: "string[]",
      allowedRoles: "string[]",
      variant: "'banner' | 'page' | 'modal'",
      position: "'top' | 'bottom'",
      dismissible: "boolean",
      backgroundColor: "string",
      textColor: "string",
      onDismiss: "() => void",
      onSchedule: "(start: Date, end: Date) => void",
      onActivate: "() => void",
      onDeactivate: "() => void"
    }
  },

  Backup: {
    category: "admin",
    keywords: ["backup", "restore", "snapshot", "data", "recovery", "archive"],
    description: "Backup management and restore interface",
    props: {
      backups: "{ id: string; name: string; createdAt: string; size: number; type: 'full' | 'incremental' | 'differential'; status: 'completed' | 'in_progress' | 'failed'; downloadUrl?: string }[]",
      showSchedule: "boolean",
      scheduleEnabled: "boolean",
      scheduleFrequency: "'daily' | 'weekly' | 'monthly'",
      scheduleTime: "string",
      retentionDays: "number",
      showStorageUsage: "boolean",
      storageUsed: "number",
      storageLimit: "number",
      showAutoBackup: "boolean",
      autoBackupEnabled: "boolean",
      loading: "boolean",
      creatingBackup: "boolean",
      restoringBackup: "string",
      onCreateBackup: "(type: string) => void",
      onRestoreBackup: "(backupId: string) => void",
      onDeleteBackup: "(backupId: string) => void",
      onDownloadBackup: "(backupId: string) => void",
      onScheduleChange: "(config: object) => void",
      onAutoBackupToggle: "(enabled: boolean) => void"
    }
  },

  Import: {
    category: "admin",
    keywords: ["import", "upload", "data", "migrate", "csv", "file"],
    description: "Data import wizard with mapping and validation",
    props: {
      supportedFormats: "string[]",
      maxFileSize: "number",
      targetEntity: "string",
      fields: "{ id: string; name: string; type: string; required: boolean }[]",
      showPreview: "boolean",
      previewRows: "number",
      showMapping: "boolean",
      defaultMapping: "Record<string, string>",
      validationRules: "Record<string, (value: any) => boolean | string>",
      showValidationErrors: "boolean",
      showProgress: "boolean",
      progress: "number",
      totalRows: "number",
      processedRows: "number",
      errorRows: "number",
      skipDuplicates: "boolean",
      updateExisting: "boolean",
      dryRun: "boolean",
      onFileSelect: "(file: File) => void",
      onMappingChange: "(mapping: object) => void",
      onImport: "(options: object) => void",
      onCancel: "() => void",
      onComplete: "(result: object) => void"
    }
  },

  Export: {
    category: "admin",
    keywords: ["export", "download", "data", "csv", "json", "file"],
    description: "Data export configuration and download",
    props: {
      entity: "string",
      availableFields: "{ id: string; name: string; type: string; default?: boolean }[]",
      selectedFields: "string[]",
      formats: "('csv' | 'json' | 'xlsx' | 'pdf')[]",
      selectedFormat: "string",
      filters: "object",
      showFilters: "boolean",
      showFieldSelection: "boolean",
      showPreview: "boolean",
      previewData: "object[]",
      totalRecords: "number",
      maxRecords: "number",
      includeHeaders: "boolean",
      dateFormat: "string",
      delimiter: "string",
      encoding: "string",
      compressOutput: "boolean",
      loading: "boolean",
      progress: "number",
      onFieldsChange: "(fields: string[]) => void",
      onFormatChange: "(format: string) => void",
      onFilterChange: "(filters: object) => void",
      onExport: "() => void",
      onCancel: "() => void"
    }
  },

  BulkAction: {
    category: "admin",
    keywords: ["bulk", "action", "batch", "multiple", "mass", "operation"],
    description: "Bulk action toolbar for selected items",
    props: {
      selectedCount: "number",
      totalCount: "number",
      actions: "{ id: string; label: string; icon?: ReactNode; variant?: 'default' | 'danger' | 'warning'; disabled?: boolean; requireConfirm?: boolean }[]",
      showSelectAll: "boolean",
      selectAllLabel: "string",
      deselectAllLabel: "string",
      showSelectedCount: "boolean",
      countLabel: "string",
      position: "'top' | 'bottom' | 'floating'",
      sticky: "boolean",
      visible: "boolean",
      loading: "boolean",
      loadingAction: "string",
      onAction: "(actionId: string) => void",
      onSelectAll: "() => void",
      onDeselectAll: "() => void",
      onClose: "() => void"
    }
  },

  Confirmation: {
    category: "admin",
    keywords: ["confirmation", "confirm", "dialog", "modal", "verify", "prompt"],
    description: "Confirmation dialog for user actions",
    props: {
      open: "boolean",
      title: "string",
      message: "string | ReactNode",
      type: "'info' | 'warning' | 'danger' | 'success'",
      icon: "ReactNode",
      showIcon: "boolean",
      confirmLabel: "string",
      cancelLabel: "string",
      confirmVariant: "'default' | 'primary' | 'danger'",
      requireInput: "boolean",
      inputLabel: "string",
      inputPlaceholder: "string",
      inputValue: "string",
      expectedInput: "string",
      loading: "boolean",
      disableConfirm: "boolean",
      showCancel: "boolean",
      closeOnOverlayClick: "boolean",
      closeOnEscape: "boolean",
      onConfirm: "(inputValue?: string) => void",
      onCancel: "() => void",
      onClose: "() => void"
    }
  },

  DangerZone: {
    category: "admin",
    keywords: ["danger", "zone", "destructive", "warning", "critical", "delete"],
    description: "Section for dangerous/destructive actions",
    props: {
      title: "string",
      description: "string",
      actions: "{ id: string; label: string; description?: string; icon?: ReactNode; requireConfirm?: boolean; confirmMessage?: string; disabled?: boolean }[]",
      showBorder: "boolean",
      borderColor: "string",
      backgroundColor: "string",
      icon: "ReactNode",
      showIcon: "boolean",
      collapsed: "boolean",
      collapsible: "boolean",
      warningMessage: "string",
      onAction: "(actionId: string) => void"
    }
  },

  DeleteConfirm: {
    category: "admin",
    keywords: ["delete", "confirm", "remove", "destroy", "erase", "dialog"],
    description: "Specialized confirmation for delete operations",
    props: {
      open: "boolean",
      title: "string",
      itemName: "string",
      itemType: "string",
      message: "string | ReactNode",
      showItemName: "boolean",
      requireTyping: "boolean",
      typingPhrase: "string",
      typingLabel: "string",
      warningMessage: "string",
      showWarning: "boolean",
      consequences: "string[]",
      showConsequences: "boolean",
      confirmLabel: "string",
      cancelLabel: "string",
      loading: "boolean",
      onConfirm: "() => void",
      onCancel: "() => void",
      onClose: "() => void"
    }
  },

  APIKey: {
    category: "admin",
    keywords: ["api", "key", "token", "secret", "credential", "authentication"],
    description: "API key display and management component",
    props: {
      apiKey: "{ id: string; name: string; key: string; prefix?: string; createdAt: string; lastUsed?: string; expiresAt?: string; scopes?: string[] }",
      showKey: "boolean",
      masked: "boolean",
      maskCharacter: "string",
      visibleCharacters: "number",
      showCopyButton: "boolean",
      showRevealButton: "boolean",
      showRegenerateButton: "boolean",
      showRevokeButton: "boolean",
      showScopes: "boolean",
      showDates: "boolean",
      showUsage: "boolean",
      usageCount: "number",
      variant: "'default' | 'compact' | 'detailed'",
      copySuccessMessage: "string",
      confirmRegenerate: "boolean",
      confirmRevoke: "boolean",
      onCopy: "() => void",
      onReveal: "() => void",
      onRegenerate: "() => void",
      onRevoke: "() => void",
      onEdit: "() => void"
    }
  }
};
