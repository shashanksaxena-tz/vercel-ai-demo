
import { z } from 'zod';

const stylesSchema = z.record(z.string(), z.any()).optional();

export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: z.ZodObject<z.ZodRawShape>;
}

export const dashboardSchemas: Record<string, ComponentSchema> = {
  Dashboard: {
    category: 'dashboard',
    keywords: ['dashboard', 'overview', 'admin', 'analytics'],
    description: 'Dashboard container layout',
    props: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      children: z.array(z.any()),
      layout: z.enum(['default', 'compact', 'wide']).optional(),
      theme: z.enum(['light', 'dark', 'system']).optional(),
      style: stylesSchema,
    }),
  },

  DashboardHeader: {
    category: 'dashboard',
    keywords: ['header', 'navigation', 'breadcrumbs', 'search'],
    description: 'Dashboard header with navigation and actions',
    props: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      breadcrumbs: z.array(z.object({
        label: z.string(),
        href: z.string().optional(),
      })).optional(),
      actions: z.array(z.any()).optional(),
      showSearch: z.boolean().optional(),
      showNotifications: z.boolean().optional(),
      userMenu: z.any().optional(),
      style: stylesSchema,
    }),
  },

  DashboardSidebar: {
    category: 'dashboard',
    keywords: ['sidebar', 'navigation', 'menu'],
    description: 'Dashboard sidebar navigation',
    props: z.object({
      items: z.array(z.object({
        id: z.string(),
        label: z.string(),
        icon: z.string().optional(),
        href: z.string().optional(),
        children: z.array(z.any()).optional(),
        badge: z.string().optional(),
      })),
      activeItem: z.string().optional(),
      collapsed: z.boolean().optional(),
      position: z.enum(['left', 'right']).optional(),
      onItemClick: z.string().optional(),
      onCollapsedChange: z.string().optional(),
      style: stylesSchema,
    }),
  },

  DashboardContent: {
    category: 'dashboard',
    keywords: ['content', 'main', 'body'],
    description: 'Dashboard main content area',
    props: z.object({
      children: z.any(),
      padding: z.enum(['none', 'sm', 'md', 'lg']).optional(),
      maxWidth: z.string().optional(),
      style: stylesSchema,
    }),
  },

  DashboardGrid: {
    category: 'dashboard',
    keywords: ['grid', 'layout'],
    description: 'Dashboard grid layout',
    props: z.object({
      children: z.array(z.any()),
      columns: z.number().optional(),
      rows: z.number().optional(),
      gap: z.number().optional(),
      responsive: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  Widget: {
    category: 'dashboard',
    keywords: ['widget', 'card', 'panel'],
    description: 'Dashboard widget container',
    props: z.object({
      id: z.string().optional(),
      title: z.string().optional(),
      children: z.any(),
      loading: z.boolean().optional(),
      error: z.string().optional(),
      actions: z.array(z.any()).optional(),
      collapsible: z.boolean().optional(),
      collapsed: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  WidgetGrid: {
    category: 'dashboard',
    keywords: ['widget', 'grid', 'layout'],
    description: 'Grid layout for dashboard widgets',
    props: z.object({
      widgets: z.array(z.any()),
      columns: z.number().optional(),
      gap: z.number().optional(),
      draggable: z.boolean().optional(),
      onReorder: z.string().optional(),
      style: stylesSchema,
    }),
  },

  WidgetHeader: {
    category: 'dashboard',
    keywords: ['widget', 'header', 'title'],
    description: 'Widget header with title and actions',
    props: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      icon: z.string().optional(),
      actions: z.array(z.any()).optional(),
      onCollapse: z.string().optional(),
      onRefresh: z.string().optional(),
      onRemove: z.string().optional(),
      style: stylesSchema,
    }),
  },

  WidgetBody: {
    category: 'dashboard',
    keywords: ['widget', 'body', 'content'],
    description: 'Widget body content',
    props: z.object({
      children: z.any(),
      loading: z.boolean().optional(),
      error: z.string().optional(),
      emptyState: z.any().optional(),
      padding: z.enum(['none', 'sm', 'md', 'lg']).optional(),
      style: stylesSchema,
    }),
  },

  WidgetFooter: {
    category: 'dashboard',
    keywords: ['widget', 'footer', 'actions'],
    description: 'Widget footer with actions',
    props: z.object({
      children: z.any().optional(),
      actions: z.array(z.any()).optional(),
      showDivider: z.boolean().optional(),
      alignment: z.enum(['left', 'center', 'right', 'between']).optional(),
      style: stylesSchema,
    }),
  },

  AnalyticsCard: {
    category: 'dashboard',
    keywords: ['analytics', 'metrics', 'card', 'kpi'],
    description: 'Analytics card displaying key metrics',
    props: z.object({
      title: z.string(),
      value: z.string().or(z.number()),
      previousValue: z.string().or(z.number()).optional(),
      change: z.number().optional(),
      changeType: z.enum(['increase', 'decrease', 'neutral']).optional(),
      icon: z.string().optional(),
      chart: z.any().optional(),
      period: z.string().optional(),
      style: stylesSchema,
    }),
  },

  AnalyticsChart: {
    category: 'dashboard',
    keywords: ['analytics', 'chart', 'graph', 'visualization'],
    description: 'Chart for analytics data visualization',
    props: z.object({
      type: z.enum(['line', 'bar', 'area', 'pie', 'donut', 'scatter', 'radar']),
      data: z.array(z.record(z.string(), z.any())),
      xAxis: z.string().optional(),
      yAxis: z.string().optional(),
      series: z.array(z.object({
        key: z.string(),
        label: z.string().optional(),
        color: z.string().optional(),
      })).optional(),
      title: z.string().optional(),
      legend: z.boolean().optional(),
      tooltip: z.boolean().optional(),
      height: z.number().optional(),
      style: stylesSchema,
    }),
  },

  AnalyticsStat: {
    category: 'dashboard',
    keywords: ['analytics', 'stat', 'metric', 'number'],
    description: 'Single analytics statistic display',
    props: z.object({
      label: z.string(),
      value: z.string().or(z.number()),
      prefix: z.string().optional(),
      suffix: z.string().optional(),
      trend: z.number().optional(),
      trendLabel: z.string().optional(),
      icon: z.string().optional(),
      color: z.string().optional(),
      style: stylesSchema,
    }),
  },

  AnalyticsTable: {
    category: 'dashboard',
    keywords: ['analytics', 'table', 'data', 'report'],
    description: 'Table for displaying analytics data',
    props: z.object({
      columns: z.array(z.object({
        key: z.string(),
        header: z.string(),
        sortable: z.boolean().optional(),
        width: z.string().optional(),
      })),
      data: z.array(z.record(z.string(), z.any())),
      sortBy: z.string().optional(),
      sortOrder: z.enum(['asc', 'desc']).optional(),
      onSort: z.string().optional(),
      showPagination: z.boolean().optional(),
      pageSize: z.number().optional(),
      style: stylesSchema,
    }),
  },

  ReportCard: {
    category: 'dashboard',
    keywords: ['report', 'metrics', 'card', 'summary'],
    description: 'Report card with multiple metrics',
    props: z.object({
      title: z.string(),
      description: z.string().optional(),
      metrics: z.array(z.object({
        label: z.string(),
        value: z.string().or(z.number()),
        change: z.number().optional(),
      })),
      chart: z.any().optional(),
      period: z.string().optional(),
      onExport: z.string().optional(),
      style: stylesSchema,
    }),
  },

  ReportTable: {
    category: 'dashboard',
    keywords: ['report', 'table', 'export', 'data'],
    description: 'Report table with export functionality',
    props: z.object({
      title: z.string().optional(),
      columns: z.array(z.object({
        key: z.string(),
        header: z.string(),
        type: z.enum(['text', 'number', 'currency', 'percentage', 'date']).optional(),
        align: z.enum(['left', 'center', 'right']).optional(),
      })),
      data: z.array(z.record(z.string(), z.any())),
      summary: z.record(z.string(), z.any()).optional(),
      exportable: z.boolean().optional(),
      onExport: z.string().optional(),
      style: stylesSchema,
    }),
  },

  ReportChart: {
    category: 'dashboard',
    keywords: ['report', 'chart', 'visualization'],
    description: 'Chart component for reports',
    props: z.object({
      title: z.string().optional(),
      type: z.enum(['line', 'bar', 'area', 'pie', 'composed']),
      data: z.array(z.record(z.string(), z.any())),
      series: z.array(z.object({
        key: z.string(),
        label: z.string(),
        type: z.enum(['line', 'bar', 'area']).optional(),
        color: z.string().optional(),
      })),
      xAxisKey: z.string(),
      annotations: z.array(z.any()).optional(),
      style: stylesSchema,
    }),
  },

  ReportSummary: {
    category: 'dashboard',
    keywords: ['report', 'summary', 'metrics', 'highlights'],
    description: 'Report summary with highlights',
    props: z.object({
      title: z.string(),
      period: z.string(),
      metrics: z.array(z.object({
        label: z.string(),
        value: z.string().or(z.number()),
        change: z.number().optional(),
        changeLabel: z.string().optional(),
      })),
      highlights: z.array(z.string()).optional(),
      style: stylesSchema,
    }),
  },

  ActivityFeed: {
    category: 'dashboard',
    keywords: ['activity', 'feed', 'timeline', 'audit'],
    description: 'Activity feed displaying recent actions',
    props: z.object({
      activities: z.array(z.any()),
      maxItems: z.number().optional(),
      showLoadMore: z.boolean().optional(),
      groupByDate: z.boolean().optional(),
      onLoadMore: z.string().optional(),
      style: stylesSchema,
    }),
  },

  ActivityItem: {
    category: 'dashboard',
    keywords: ['activity', 'item', 'action', 'event'],
    description: 'Single activity item',
    props: z.object({
      id: z.string(),
      type: z.string(),
      actor: z.object({
        name: z.string(),
        avatar: z.string().optional(),
      }),
      action: z.string(),
      target: z.string().optional(),
      timestamp: z.string(),
      metadata: z.record(z.string(), z.any()).optional(),
      style: stylesSchema,
    }),
  },

  AuditLog: {
    category: 'dashboard',
    keywords: ['audit', 'log', 'compliance', 'history'],
    description: 'Audit log with filtering',
    props: z.object({
      entries: z.array(z.any()),
      filters: z.object({
        dateRange: z.any().optional(),
        users: z.array(z.string()).optional(),
        actions: z.array(z.string()).optional(),
      }).optional(),
      showFilters: z.boolean().optional(),
      onFilterChange: z.string().optional(),
      style: stylesSchema,
    }),
  },

  AuditItem: {
    category: 'dashboard',
    keywords: ['audit', 'item', 'change', 'history'],
    description: 'Single audit log entry',
    props: z.object({
      id: z.string(),
      timestamp: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().optional(),
      }),
      action: z.string(),
      resource: z.string(),
      resourceId: z.string().optional(),
      changes: z.array(z.object({
        field: z.string(),
        oldValue: z.any().optional(),
        newValue: z.any().optional(),
      })).optional(),
      ipAddress: z.string().optional(),
      style: stylesSchema,
    }),
  },

  NotificationPanel: {
    category: 'dashboard',
    keywords: ['notification', 'alerts', 'inbox'],
    description: 'Notification panel container',
    props: z.object({
      notifications: z.array(z.any()),
      unreadCount: z.number().optional(),
      showMarkAllRead: z.boolean().optional(),
      showClearAll: z.boolean().optional(),
      emptyMessage: z.string().optional(),
      onMarkAllRead: z.string().optional(),
      onClearAll: z.string().optional(),
      style: stylesSchema,
    }),
  },

  NotificationItem: {
    category: 'dashboard',
    keywords: ['notification', 'alert', 'message'],
    description: 'Single notification item',
    props: z.object({
      id: z.string(),
      type: z.enum(['info', 'success', 'warning', 'error']),
      title: z.string(),
      message: z.string(),
      timestamp: z.string(),
      read: z.boolean().optional(),
      icon: z.string().optional(),
      action: z.object({
        label: z.string(),
        href: z.string().optional(),
        onClick: z.string().optional(),
      }).optional(),
      onRead: z.string().optional(),
      onDismiss: z.string().optional(),
      style: stylesSchema,
    }),
  },

  NotificationBadge: {
    category: 'dashboard',
    keywords: ['notification', 'badge', 'count', 'indicator'],
    description: 'Notification count badge',
    props: z.object({
      count: z.number(),
      max: z.number().optional(),
      showZero: z.boolean().optional(),
      color: z.string().optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      style: stylesSchema,
    }),
  },

  TaskList: {
    category: 'dashboard',
    keywords: ['task', 'todo', 'list', 'project'],
    description: 'Task list with filtering and sorting',
    props: z.object({
      tasks: z.array(z.any()),
      showCompleted: z.boolean().optional(),
      sortBy: z.enum(['dueDate', 'priority', 'status', 'created']).optional(),
      groupBy: z.enum(['status', 'priority', 'assignee', 'none']).optional(),
      onTaskClick: z.string().optional(),
      onTaskComplete: z.string().optional(),
      style: stylesSchema,
    }),
  },

  TaskItem: {
    category: 'dashboard',
    keywords: ['task', 'todo', 'item', 'checkbox'],
    description: 'Single task item',
    props: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      status: z.enum(['todo', 'in_progress', 'review', 'done']),
      priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
      dueDate: z.string().optional(),
      assignee: z.object({
        name: z.string(),
        avatar: z.string().optional(),
      }).optional(),
      tags: z.array(z.string()).optional(),
      completed: z.boolean().optional(),
      onComplete: z.string().optional(),
      onClick: z.string().optional(),
      style: stylesSchema,
    }),
  },

  TaskBoard: {
    category: 'dashboard',
    keywords: ['task', 'kanban', 'board', 'project'],
    description: 'Kanban-style task board',
    props: z.object({
      columns: z.array(z.object({
        id: z.string(),
        title: z.string(),
        tasks: z.array(z.any()),
        limit: z.number().optional(),
      })),
      draggable: z.boolean().optional(),
      onTaskMove: z.string().optional(),
      onTaskClick: z.string().optional(),
      style: stylesSchema,
    }),
  },

  ProjectCard: {
    category: 'dashboard',
    keywords: ['project', 'card', 'status', 'team'],
    description: 'Project card with status and team',
    props: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      status: z.enum(['active', 'paused', 'completed', 'archived']),
      progress: z.number().optional(),
      dueDate: z.string().optional(),
      team: z.array(z.object({
        name: z.string(),
        avatar: z.string().optional(),
      })).optional(),
      taskCount: z.number().optional(),
      completedTaskCount: z.number().optional(),
      onClick: z.string().optional(),
      style: stylesSchema,
    }),
  },

  MilestoneTracker: {
    category: 'dashboard',
    keywords: ['milestone', 'progress', 'timeline', 'goal'],
    description: 'Milestone progress tracker',
    props: z.object({
      milestones: z.array(z.object({
        id: z.string(),
        title: z.string(),
        dueDate: z.string(),
        status: z.enum(['pending', 'in_progress', 'completed', 'overdue']),
        progress: z.number().optional(),
      })),
      showProgress: z.boolean().optional(),
      orientation: z.enum(['horizontal', 'vertical']).optional(),
      style: stylesSchema,
    }),
  },

  GoalProgress: {
    category: 'dashboard',
    keywords: ['goal', 'progress', 'target', 'metric'],
    description: 'Goal progress indicator',
    props: z.object({
      title: z.string(),
      current: z.number(),
      target: z.number(),
      unit: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      showPercentage: z.boolean().optional(),
      color: z.string().optional(),
      style: stylesSchema,
    }),
  },

  LeaderBoard: {
    category: 'dashboard',
    keywords: ['leaderboard', 'ranking', 'competition'],
    description: 'Leaderboard with rankings',
    props: z.object({
      title: z.string().optional(),
      entries: z.array(z.object({
        rank: z.number(),
        name: z.string(),
        avatar: z.string().optional(),
        score: z.number(),
        change: z.number().optional(),
        metadata: z.record(z.string(), z.any()).optional(),
      })),
      maxEntries: z.number().optional(),
      showChange: z.boolean().optional(),
      highlightTop: z.number().optional(),
      style: stylesSchema,
    }),
  },

  Ranking: {
    category: 'dashboard',
    keywords: ['rank', 'position', 'badge'],
    description: 'Ranking position display',
    props: z.object({
      rank: z.number(),
      totalRanks: z.number().optional(),
      previousRank: z.number().optional(),
      label: z.string().optional(),
      showTrend: z.boolean().optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      style: stylesSchema,
    }),
  },

  Comparison: {
    category: 'dashboard',
    keywords: ['comparison', 'vs', 'metric', 'chart'],
    description: 'Comparison between metrics',
    props: z.object({
      items: z.array(z.object({
        label: z.string(),
        value: z.number(),
        color: z.string().optional(),
      })),
      type: z.enum(['bar', 'percentage', 'value']).optional(),
      showDifference: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  TrendIndicator: {
    category: 'dashboard',
    keywords: ['trend', 'arrow', 'change', 'indicator'],
    description: 'Trend direction indicator',
    props: z.object({
      value: z.number(),
      direction: z.enum(['up', 'down', 'neutral']),
      label: z.string().optional(),
      period: z.string().optional(),
      showIcon: z.boolean().optional(),
      positive: z.enum(['up', 'down']).optional(),
      style: stylesSchema,
    }),
  },

  ChangeIndicator: {
    category: 'dashboard',
    keywords: ['change', 'delta', 'percentage', 'indicator'],
    description: 'Change percentage indicator',
    props: z.object({
      current: z.number(),
      previous: z.number(),
      format: z.enum(['percentage', 'absolute', 'both']).optional(),
      showIcon: z.boolean().optional(),
      invertColors: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  Benchmark: {
    category: 'dashboard',
    keywords: ['benchmark', 'comparison', 'target', 'goal'],
    description: 'Benchmark comparison display',
    props: z.object({
      label: z.string(),
      value: z.number(),
      benchmark: z.number(),
      unit: z.string().optional(),
      showComparison: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  Target: {
    category: 'dashboard',
    keywords: ['target', 'goal', 'objective', 'progress'],
    description: 'Target achievement tracker',
    props: z.object({
      label: z.string(),
      current: z.number(),
      target: z.number(),
      unit: z.string().optional(),
      showProgress: z.boolean().optional(),
      status: z.enum(['on_track', 'at_risk', 'behind', 'achieved']).optional(),
      style: stylesSchema,
    }),
  },

  Forecast: {
    category: 'dashboard',
    keywords: ['forecast', 'prediction', 'trend', 'projection'],
    description: 'Forecast with confidence intervals',
    props: z.object({
      title: z.string().optional(),
      data: z.array(z.object({
        date: z.string(),
        actual: z.number().optional(),
        forecast: z.number(),
        lowerBound: z.number().optional(),
        upperBound: z.number().optional(),
      })),
      showConfidenceInterval: z.boolean().optional(),
      showActual: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  Overview: {
    category: 'dashboard',
    keywords: ['overview', 'summary', 'dashboard', 'metrics'],
    description: 'Dashboard overview section',
    props: z.object({
      title: z.string().optional(),
      metrics: z.array(z.object({
        label: z.string(),
        value: z.string().or(z.number()),
        change: z.number().optional(),
        icon: z.string().optional(),
      })),
      chart: z.any().optional(),
      period: z.string().optional(),
      layout: z.enum(['grid', 'row', 'column']).optional(),
      style: stylesSchema,
    }),
  },
};