import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingDown, 
  TrendingUp,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AnalyticsSection = () => {
  const deforestationData = [
    { month: "Jul", area: 45 },
    { month: "Aug", area: 52 },
    { month: "Sep", area: 48 },
    { month: "Oct", area: 78 },
    { month: "Nov", area: 95 },
    { month: "Dec", area: 112 },
    { month: "Jan", area: 89 },
  ];

  const miningComparisonData = [
    { zone: "Amer", past: 12, current: 18 },
    { zone: "Jamwa", past: 8, current: 14 },
    { zone: "Chaksu", past: 15, current: 22 },
    { zone: "Bassi", past: 6, current: 9 },
    { zone: "Sanganer", past: 10, current: 12 },
  ];

  const zoneDistribution = [
    { name: "Amer", value: 28, color: "#ef4444" },
    { name: "Jamwa Ramgarh", value: 22, color: "#f97316" },
    { name: "Chaksu", value: 25, color: "#eab308" },
    { name: "Bassi", value: 15, color: "#22c55e" },
    { name: "Sanganer", value: 10, color: "#3b82f6" },
  ];

  return (
    <section id="analytics" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Data Analytics
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Jaipur Analytics Dashboard
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Comprehensive analytics filtered exclusively for Jaipur region, 
              showing trends, patterns, and area-wise distribution of environmental changes.
            </p>
          </div>
          <div className="flex gap-3 mt-6 lg:mt-0">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 6 Months
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Deforestation Trend */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Monthly Deforestation Trend (Jaipur)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Hectares of forest cover lost per month
                </p>
              </div>
              <div className="flex items-center gap-2 text-destructive">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+24% this quarter</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={deforestationData}>
                  <defs>
                    <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="area"
                    stroke="hsl(0, 72%, 51%)"
                    strokeWidth={2}
                    fill="url(#colorArea)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Zone Distribution Pie */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-1">
                Area-wise Distribution
              </h3>
              <p className="text-sm text-muted-foreground">
                Environmental incidents by zone
              </p>
            </div>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={zoneDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {zoneDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {zoneDistribution.map((zone) => (
                <div key={zone.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: zone.color }}
                    />
                    <span className="text-muted-foreground">{zone.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{zone.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Mining Comparison */}
          <Card className="lg:col-span-3 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Mining Activity Comparison (Past vs Current)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Number of detected mining sites by zone
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                  <span className="text-sm text-muted-foreground">Past (6mo ago)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-sm text-muted-foreground">Current</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={miningComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="zone" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="past" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} opacity={0.5} />
                  <Bar dataKey="current" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
