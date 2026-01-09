import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { 
  TreePine, 
  Mountain, 
  AlertTriangle, 
  Radar,
  TrendingDown,
  TrendingUp
} from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay: number;
  color: "destructive" | "warning" | "success" | "primary";
}

const StatCard = ({ icon: Icon, label, value, suffix, trend, delay, color }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  const colorClasses = {
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    success: "bg-success/10 text-success border-success/20",
    primary: "bg-primary/10 text-primary border-primary/20",
  };

  const iconBgClasses = {
    destructive: "bg-destructive",
    warning: "bg-warning",
    success: "bg-success",
    primary: "bg-primary",
  };

  return (
    <Card
      ref={cardRef}
      className={`relative overflow-hidden p-6 bg-card shadow-card hover:shadow-card-hover transition-all duration-500 border ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Background Decoration */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${iconBgClasses[color]} opacity-5`} />
      
      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-xl ${iconBgClasses[color]} mb-4`}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>

        <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
        
        <div className="flex items-end gap-2">
          <span className="text-3xl lg:text-4xl font-display font-bold text-foreground">
            {count.toLocaleString()}
          </span>
          <span className="text-lg text-muted-foreground mb-1">{suffix}</span>
        </div>

        {trend && (
          <div className={`flex items-center gap-1 mt-3 text-sm ${
            trend.isPositive ? "text-success" : "text-destructive"
          }`}>
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-medium">{trend.value}%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>
    </Card>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: TreePine,
      label: "Forest Area Lost (Jaipur)",
      value: 1247,
      suffix: "hectares",
      trend: { value: 12, isPositive: false },
      color: "destructive" as const,
    },
    {
      icon: Mountain,
      label: "Mining Hotspots Detected",
      value: 34,
      suffix: "sites",
      trend: { value: 8, isPositive: false },
      color: "warning" as const,
    },
    {
      icon: AlertTriangle,
      label: "Active Alerts",
      value: 127,
      suffix: "alerts",
      color: "destructive" as const,
    },
    {
      icon: Radar,
      label: "Area Under Surveillance",
      value: 4850,
      suffix: "sq km",
      trend: { value: 15, isPositive: true },
      color: "success" as const,
    },
  ];

  return (
    <section id="stats" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Real-time Statistics
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Jaipur Aravalli Region Overview
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Live monitoring data from AI-powered satellite analysis covering the 
            Aravalli hill ranges in and around Jaipur district.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              {...stat}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
