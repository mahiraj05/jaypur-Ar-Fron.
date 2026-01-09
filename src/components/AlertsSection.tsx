import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin,
  Eye,
  Download,
  Filter,
  Bell
} from "lucide-react";

interface Alert {
  id: number;
  title: string;
  location: string;
  tehsil: string;
  coordinates: { lat: number; lng: number };
  status: "new" | "verified" | "action_taken";
  severity: "high" | "medium" | "low";
  type: "mining" | "deforestation";
  timestamp: string;
}

const AlertsSection = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const alerts: Alert[] = [
    {
      id: 1,
      title: "Illegal Stone Quarrying Detected",
      location: "Amer Hills",
      tehsil: "Amer",
      coordinates: { lat: 26.9855, lng: 75.8513 },
      status: "new",
      severity: "high",
      type: "mining",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "Forest Clearing Activity",
      location: "Jamwa Ramgarh Forest",
      tehsil: "Jamwa Ramgarh",
      coordinates: { lat: 27.0234, lng: 75.9189 },
      status: "verified",
      severity: "high",
      type: "deforestation",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "Unauthorized Mining Equipment",
      location: "Chaksu Quarry Zone",
      tehsil: "Chaksu",
      coordinates: { lat: 26.6045, lng: 75.9534 },
      status: "action_taken",
      severity: "medium",
      type: "mining",
      timestamp: "1 day ago",
    },
    {
      id: 4,
      title: "Vegetation Loss Alert",
      location: "Sanganer Edge",
      tehsil: "Sanganer",
      coordinates: { lat: 26.8234, lng: 75.7912 },
      status: "new",
      severity: "medium",
      type: "deforestation",
      timestamp: "3 hours ago",
    },
    {
      id: 5,
      title: "Mining Vehicle Movement",
      location: "Bassi Border Area",
      tehsil: "Bassi",
      coordinates: { lat: 26.8512, lng: 76.0423 },
      status: "verified",
      severity: "low",
      type: "mining",
      timestamp: "8 hours ago",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="destructive" className="gap-1">
            <Bell className="w-3 h-3" />
            New
          </Badge>
        );
      case "verified":
        return (
          <Badge className="bg-warning text-warning-foreground gap-1">
            <Eye className="w-3 h-3" />
            Verified
          </Badge>
        );
      case "action_taken":
        return (
          <Badge className="bg-success text-success-foreground gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Action Taken
          </Badge>
        );
      default:
        return null;
    }
  };

  const getSeverityIndicator = (severity: string) => {
    switch (severity) {
      case "high":
        return <div className="w-2 h-full bg-destructive rounded-l-lg" />;
      case "medium":
        return <div className="w-2 h-full bg-warning rounded-l-lg" />;
      case "low":
        return <div className="w-2 h-full bg-success rounded-l-lg" />;
      default:
        return null;
    }
  };

  const filteredAlerts = filterStatus === "all" 
    ? alerts 
    : alerts.filter(a => a.status === filterStatus);

  const statusCounts = {
    all: alerts.length,
    new: alerts.filter(a => a.status === "new").length,
    verified: alerts.filter(a => a.status === "verified").length,
    action_taken: alerts.filter(a => a.status === "action_taken").length,
  };

  return (
    <section id="alerts" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              Real-time Alerts
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Jaipur Alert Center
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Real-time alerts for environmental violations detected in Jaipur district,
              tagged with precise locations and status updates.
            </p>
          </div>
          <div className="flex gap-3 mt-6 lg:mt-0">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "all", label: "All Alerts" },
            { id: "new", label: "New" },
            { id: "verified", label: "Verified" },
            { id: "action_taken", label: "Action Taken" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-background/20 text-xs">
                {statusCounts[tab.id as keyof typeof statusCounts]}
              </span>
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card 
              key={alert.id} 
              className="overflow-hidden hover:shadow-card-hover transition-shadow"
            >
              <div className="flex">
                {getSeverityIndicator(alert.severity)}
                <div className="flex-1 p-4 lg:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {alert.title}
                        </h3>
                        {getStatusBadge(alert.status)}
                        <Badge variant="outline" className="capitalize">
                          {alert.type}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Tehsil:</span>
                          <span>{alert.tehsil}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-muted-foreground font-mono">
                        {alert.coordinates.lat}° N, {alert.coordinates.lng}° E
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        Locate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Alerts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AlertsSection;
