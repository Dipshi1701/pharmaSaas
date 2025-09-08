import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
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
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
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

const salesData = [
    { month: 'Jan', revenue: 1200, units: 320 },
    { month: 'Feb', revenue: 1450, units: 360 },
    { month: 'Mar', revenue: 1620, units: 400 },
    { month: 'Apr', revenue: 1380, units: 350 },
    { month: 'May', revenue: 1750, units: 430 },
    { month: 'Jun', revenue: 1900, units: 460 },
];

const trialsData = [
    { phase: 'Phase I', count: 24 },
    { phase: 'Phase II', count: 36 },
    { phase: 'Phase III', count: 18 },
    { phase: 'Post-Market', count: 12 },
];

const portfolioData = [
    { name: 'Oncology', value: 38 },
    { name: 'Cardio', value: 22 },
    { name: 'Neuro', value: 18 },
    { name: 'Immunology', value: 14 },
    { name: 'Other', value: 8 },
];

// Map each portfolio segment to a label so the custom legend shows names
const portfolioConfig = Object.fromEntries(
    portfolioData.map((d) => [d.name, { label: d.name }])
);

const tableRows = [
    { id: 'RX-102', name: 'OncoLexa', indication: 'Breast Cancer', phase: 'Phase II', sites: 42, enrollment: '380 / 520' },
    { id: 'CV-210', name: 'Cardiostat', indication: 'Hypertension', phase: 'Phase III', sites: 65, enrollment: '1,120 / 1,400' },
    { id: 'NEU-77', name: 'Neurocalm', indication: 'Epilepsy', phase: 'Phase I', sites: 12, enrollment: '44 / 60' },
    { id: 'IMM-45', name: 'Immunify', indication: 'RA', phase: 'Phase II', sites: 27, enrollment: '210 / 350' },
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Dashboard = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20 container mx-auto px-4 space-y-6 overflow-x-hidden">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle>Total Revenue (H1)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">$9.3M</div>
                            <p className="text-sm text-muted-foreground">+12.4% vs last year</p>
                        </CardContent>
                    </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle>Active Trials</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">90</div>
                            <p className="text-sm text-muted-foreground">14 countries, 226 sites</p>
                        </CardContent>
                    </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle>On-Time Shipments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">96.2%</div>
                            <p className="text-sm text-muted-foreground">Supply chain SLA</p>
                        </CardContent>
                    </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle>Adverse Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">32</div>
                            <p className="text-sm text-muted-foreground">-8.6% vs prior month</p>
                        </CardContent>
                    </Card>
                    </motion.div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Revenue & Units</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    revenue: { label: 'Revenue ($k)', color: 'hsl(var(--primary))' },
                                    units: { label: 'Units', color: 'hsl(var(--chart-2))' },
                                }}
                                className="h-80"
                            >
                                <LineChart data={salesData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="units" stroke="var(--color-units)" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Trials by Phase</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{ count: { label: 'Trials', color: 'hsl(var(--primary))' } }}
                                className="h-80 w-full"
                            >
                                <BarChart data={trialsData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }} barCategoryGap={24} barGap={4}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="phase" />
                                    <YAxis allowDecimals={false} domain={[0, 'dataMax + 5']} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="count" fill="var(--color-count)" maxBarSize={48} radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Portfolio Mix</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={portfolioConfig}
                                className="h-80 w-full"
                            >
                                <PieChart>
                                    <Pie
                                        data={portfolioData}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={50}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        label
                                    >
                                        {portfolioData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                                    <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Active Studies</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableCaption>Snapshot of key ongoing clinical programs.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Study ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Indication</TableHead>
                                        <TableHead>Phase</TableHead>
                                        <TableHead className="text-right">Sites</TableHead>
                                        <TableHead className="text-right">Enrollment</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tableRows.map((r) => (
                                        <TableRow key={r.id}>
                                            <TableCell className="font-medium">{r.id}</TableCell>
                                            <TableCell>{r.name}</TableCell>
                                            <TableCell>{r.indication}</TableCell>
                                            <TableCell>{r.phase}</TableCell>
                                            <TableCell className="text-right">{r.sites}</TableCell>
                                            <TableCell className="text-right">{r.enrollment}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;


