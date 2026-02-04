// Sample data for dashboard demos
export const sampleData = {
    // KPI Metrics
    metrics: {
        totalRevenue: { value: '$45,231.89', trend: 20.1, direction: 'up' },
        activeUsers: { value: '2,350', trend: 5.4, direction: 'up' },
        conversionRate: { value: '3.24%', trend: -0.5, direction: 'down' },
        orderCount: { value: '1,234', trend: 12.3, direction: 'up' },
    },

    // Sales Data for Charts
    salesData: [
        { month: 'Jan', sales: 4000, revenue: 2400, profit: 1200 },
        { month: 'Feb', sales: 3000, revenue: 1398, profit: 900 },
        { month: 'Mar', sales: 2000, revenue: 9800, profit: 1500 },
        { month: 'Apr', sales: 2780, revenue: 3908, profit: 1100 },
        { month: 'May', sales: 1890, revenue: 4800, profit: 800 },
        { month: 'Jun', sales: 2390, revenue: 3800, profit: 1000 },
    ],

    // User Table Data
    users: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
    ],

    // Product Data
    products: [
        { id: 1, name: 'Product A', category: 'Electronics', price: 299.99, stock: 45 },
        { id: 2, name: 'Product B', category: 'Clothing', price: 49.99, stock: 120 },
        { id: 3, name: 'Product C', category: 'Electronics', price: 599.99, stock: 23 },
        { id: 4, name: 'Product D', category: 'Home', price: 89.99, stock: 67 },
    ],

    // Traffic Data
    trafficData: [
        { source: 'Organic', visitors: 4500, percentage: 45 },
        { source: 'Direct', visitors: 2500, percentage: 25 },
        { source: 'Social', visitors: 1500, percentage: 15 },
        { source: 'Referral', visitors: 1000, percentage: 10 },
        { source: 'Email', visitors: 500, percentage: 5 },
    ],
};

export type SampleData = typeof sampleData;
