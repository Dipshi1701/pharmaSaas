import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { RefreshCw, Users, ShoppingCart, DollarSign, Activity, UserPlus, BarChart3, Settings } from 'lucide-react';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import dashboardService, { type DashboardData, type QuickAction } from '@/services/dashboardService';

// Icon mapping for quick actions
const getActionIcon = (iconName: string) => {
  switch (iconName) {
    case 'user-plus': return <UserPlus className="h-5 w-5" />;
    case 'chart-bar': return <BarChart3 className="h-5 w-5" />;
    case 'cog': return <Settings className="h-5 w-5" />;
    default: return <Activity className="h-5 w-5" />;
  }
};

// Status badge colors
const getStatusColor = (status: string) => {
  switch (status) {
    case 'success': return 'bg-green-100 text-green-800';
    case 'info': return 'bg-blue-100 text-blue-800';
    case 'warning': return 'bg-yellow-100 text-yellow-800';
    case 'error': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch dashboard data on component mount
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setError(null);
            const data = await dashboardService.getDashboardData();
            setDashboardData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
            console.error('Dashboard fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            const data = await dashboardService.refreshDashboardData();
            setDashboardData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to refresh dashboard data');
        } finally {
            setRefreshing(false);
        }
    };

    const handleQuickAction = async (action: QuickAction) => {
        try {
            const success = await dashboardService.executeQuickAction(action.id);
            if (success) {
                console.log(`✅ Quick action "${action.title}" executed successfully`);
            }
        } catch (err) {
            console.error(`❌ Error executing quick action "${action.title}":`, err);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="pt-20 container mx-auto px-4 flex items-center justify-center">
                    <div className="text-center">
                        <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                        <p className="text-lg">Loading dashboard...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="pt-20 container mx-auto px-4 flex items-center justify-center">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle className="text-red-600">Error Loading Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">{error}</p>
                            <Button onClick={fetchDashboardData} className="w-full">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try Again
                            </Button>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }

    // No data state
    if (!dashboardData) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="pt-20 container mx-auto px-4 flex items-center justify-center">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>No Dashboard Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Unable to load dashboard data.</p>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20 container mx-auto px-4 space-y-6 overflow-x-hidden">
                {/* Header with refresh button */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {dashboardData.user.username}</p>
                    </div>
                    <Button 
                        onClick={handleRefresh} 
                        disabled={refreshing}
                        variant="outline"
                        size="sm"
                    >
                        <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 12 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.4, delay: 0.05 }} 
                        whileHover={{ y: -4, scale: 1.01 }} 
                        whileTap={{ scale: 0.99 }}
                    >
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{dashboardData.stats.totalUsers.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">Registered users</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 12 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.4, delay: 0.1 }} 
                        whileHover={{ y: -4, scale: 1.01 }} 
                        whileTap={{ scale: 0.99 }}
                    >
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{dashboardData.stats.activeUsers.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">Currently online</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 12 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.4, delay: 0.15 }} 
                        whileHover={{ y: -4, scale: 1.01 }} 
                        whileTap={{ scale: 0.99 }}
                    >
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{dashboardData.stats.totalOrders.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">All time orders</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 12 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.4, delay: 0.2 }} 
                        whileHover={{ y: -4, scale: 1.01 }} 
                        whileTap={{ scale: 0.99 }}
                    >
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${dashboardData.stats.revenue.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">Total revenue</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Charts Section */}
                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    data: { label: 'Users', color: 'hsl(var(--primary))' },
                                }}
                                className="h-80"
                            >
                                <LineChart 
                                    data={dashboardData.charts.userGrowth.labels.map((label, index) => ({
                                        month: label,
                                        users: dashboardData.charts.userGrowth.data[index]
                                    }))} 
                                    margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line type="monotone" dataKey="users" stroke="var(--color-data)" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue by Quarter</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{ data: { label: 'Revenue ($)', color: 'hsl(var(--primary))' } }}
                                className="h-80 w-full"
                            >
                                <BarChart 
                                    data={dashboardData.charts.revenue.labels.map((label, index) => ({
                                        quarter: label,
                                        revenue: dashboardData.charts.revenue.data[index]
                                    }))} 
                                    margin={{ left: 12, right: 12, top: 12, bottom: 12 }} 
                                    barCategoryGap={24} 
                                    barGap={4}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="quarter" />
                                    <YAxis allowDecimals={false} domain={[0, 'dataMax + 5000']} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="revenue" fill="var(--color-data)" maxBarSize={48} radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity and Quick Actions */}
                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {dashboardData.recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center space-x-4">
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium">{activity.message}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(activity.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                        <Badge className={getStatusColor(activity.status)}>
                                            {activity.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {dashboardData.quickActions.map((action) => (
                                    <Button
                                        key={action.id}
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => handleQuickAction(action)}
                                    >
                                        {getActionIcon(action.icon)}
                                        <div className="ml-2 text-left">
                                            <div className="font-medium">{action.title}</div>
                                            <div className="text-xs text-muted-foreground">{action.description}</div>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;


