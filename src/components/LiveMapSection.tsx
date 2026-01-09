import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, 
  Satellite, 
  Mountain, 
  MapIcon,
  CircleAlert,
  TreePine,
  Shield,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info
} from "lucide-react";

interface MapMarker {
  id: number;
  name: string;
  type: "mining" | "deforestation" | "protected";
  lat: number;
  lng: number;
  confidence: number;
  riskLevel: "high" | "medium" | "low";
  date: string;
}

const LiveMapSection = () => {
  const [activeLayer, setActiveLayer] = useState<string[]>(["mining", "deforestation", "protected"]);
  const [mapView, setMapView] = useState<"satellite" | "terrain" | "road">("satellite");
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const markers: MapMarker[] = [
    { id: 1, name: "Amer Mining Zone", type: "mining", lat: 26.98, lng: 75.85, confidence: 94, riskLevel: "high", date: "2024-01-05" },
    { id: 2, name: "Jamwa Ramgarh Forest", type: "deforestation", lat: 27.02, lng: 75.92, confidence: 87, riskLevel: "medium", date: "2024-01-04" },
    { id: 3, name: "Nahargarh Reserve", type: "protected", lat: 26.94, lng: 75.81, confidence: 100, riskLevel: "low", date: "2024-01-05" },
    { id: 4, name: "Chaksu Quarry Area", type: "mining", lat: 26.60, lng: 75.95, confidence: 91, riskLevel: "high", date: "2024-01-03" },
    { id: 5, name: "Sanganer Edge Zone", type: "deforestation", lat: 26.82, lng: 75.79, confidence: 78, riskLevel: "medium", date: "2024-01-02" },
    { id: 6, name: "Bassi Protected Area", type: "protected", lat: 26.85, lng: 76.05, confidence: 100, riskLevel: "low", date: "2024-01-05" },
  ];

  const toggleLayer = (layer: string) => {
    setActiveLayer(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    );
  };

  const layers = [
    { id: "mining", label: "Illegal Mining", icon: Mountain, color: "bg-destructive" },
    { id: "deforestation", label: "Deforestation", icon: TreePine, color: "bg-warning" },
    { id: "protected", label: "Protected Areas", icon: Shield, color: "bg-success" },
  ];

  const mapViews = [
    { id: "satellite", label: "Satellite", icon: Satellite },
    { id: "terrain", label: "Terrain", icon: Mountain },
    { id: "road", label: "Road Map", icon: MapIcon },
  ];

  const getMarkerStyle = (type: string) => {
    switch (type) {
      case "mining": return "bg-destructive";
      case "deforestation": return "bg-warning";
      case "protected": return "bg-success";
      default: return "bg-primary";
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high": return <Badge variant="destructive">High Risk</Badge>;
      case "medium": return <Badge className="bg-warning text-warning-foreground">Medium Risk</Badge>;
      case "low": return <Badge className="bg-success text-success-foreground">Low Risk</Badge>;
      default: return null;
    }
  };

  return (
    <section id="map" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Live Monitoring
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Jaipur District Live Map
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive satellite map covering the Aravalli hill belt zones including 
            Amer, Jamwa Ramgarh, Chaksu, Bassi, and Sanganer regions.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Controls Sidebar */}
          <div className="space-y-6">
            {/* Map View Toggle */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Map View
              </h3>
              <div className="space-y-2">
                {mapViews.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setMapView(view.id as typeof mapView)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mapView === view.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    <view.icon className="w-4 h-4" />
                    {view.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Layers Toggle */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Map Layers
              </h3>
              <div className="space-y-2">
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeLayer.includes(layer.id)
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${layer.color}`} />
                    {layer.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Legend */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Legend
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive marker-pulse" />
                  <span className="text-muted-foreground">Illegal Mining (Active)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-muted-foreground">Deforestation Detected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-muted-foreground">Protected Forest Area</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="relative overflow-hidden h-[500px] lg:h-[600px]">
              {/* Simulated Map Background */}
              <div 
                className={`absolute inset-0 ${
                  mapView === "satellite" 
                    ? "bg-forest-dark" 
                    : mapView === "terrain"
                    ? "bg-earth-light/20"
                    : "bg-muted"
                }`}
              >
                {/* Grid overlay for map effect */}
                <div className="absolute inset-0 opacity-10" 
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                  }}
                />
                
                {/* Jaipur District Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Map placeholder with coordinates */}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs font-mono">
                      <span className="text-muted-foreground">Center: </span>
                      <span className="text-foreground">26.9124° N, 75.7873° E</span>
                    </div>
                    
                    {/* Zoom Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Simulated Markers */}
                    {markers
                      .filter(m => activeLayer.includes(m.type))
                      .map((marker, index) => (
                        <button
                          key={marker.id}
                          onClick={() => setSelectedMarker(marker)}
                          className={`absolute transform -translate-x-1/2 -translate-y-1/2 group`}
                          style={{
                            left: `${20 + (index * 12)}%`,
                            top: `${25 + (index * 10)}%`,
                          }}
                        >
                          <div className={`relative`}>
                            <div className={`w-6 h-6 rounded-full ${getMarkerStyle(marker.type)} shadow-lg flex items-center justify-center ${
                              marker.riskLevel === "high" ? "marker-pulse" : ""
                            }`}>
                              {marker.type === "mining" && <Mountain className="w-3 h-3 text-primary-foreground" />}
                              {marker.type === "deforestation" && <TreePine className="w-3 h-3 text-primary-foreground" />}
                              {marker.type === "protected" && <Shield className="w-3 h-3 text-primary-foreground" />}
                            </div>
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                              <div className="bg-card shadow-lg rounded-lg px-3 py-2 whitespace-nowrap border">
                                <p className="text-sm font-medium text-foreground">{marker.name}</p>
                                <p className="text-xs text-muted-foreground">Confidence: {marker.confidence}%</p>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}

                    {/* District boundary hint */}
                    <div className="absolute inset-8 border-2 border-dashed border-primary/30 rounded-3xl" />
                    <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                      <span className="text-xs text-muted-foreground">Jaipur District Boundary</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Marker Info Panel */}
              {selectedMarker && (
                <div className="absolute bottom-4 right-4 w-80 bg-card shadow-xl rounded-xl border overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{selectedMarker.name}</h4>
                        <p className="text-xs text-muted-foreground">Detected: {selectedMarker.date}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedMarker(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-muted rounded-lg p-2">
                        <p className="text-xs text-muted-foreground">AI Confidence</p>
                        <p className="text-lg font-bold text-foreground">{selectedMarker.confidence}%</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2">
                        <p className="text-xs text-muted-foreground">Risk Level</p>
                        <div className="mt-1">{getRiskBadge(selectedMarker.riskLevel)}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">View Details</Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <CircleAlert className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Map Note */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              💡 This is a preview. Connect a Mapbox API key for full satellite imagery and navigation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMapSection;
