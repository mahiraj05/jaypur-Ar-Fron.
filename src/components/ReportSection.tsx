import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Upload, 
  Camera,
  Send,
  CheckCircle2,
  Navigation
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportSection = () => {
  const { toast } = useToast();
  const [isLocating, setIsLocating] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
    files: [] as File[],
  });

  const handleGetLocation = () => {
    setIsLocating(true);
    // Simulated GPS location for Jaipur
    setTimeout(() => {
      setCoordinates({ lat: 26.9124, lng: 75.7873 });
      setIsLocating(false);
      toast({
        title: "Location detected",
        description: "GPS coordinates captured for Jaipur region.",
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report submitted successfully!",
      description: "Your environmental violation report has been received. Reference: JRP-2024-0127",
    });
    // Reset form
    setFormData({ name: "", phone: "", description: "", files: [] });
    setCoordinates(null);
  };

  return (
    <section id="report" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
              Public Reporting
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Report Environmental Violation
            </h2>
            <p className="text-muted-foreground mb-8">
              Help protect Jaipur's Aravalli hills by reporting illegal mining or 
              deforestation activities. Your reports are anonymous and directly 
              submitted to local forest authorities.
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              <Card className="p-4 flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Auto-detect Jaipur Location
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    GPS automatically detects if you're within Jaipur district boundaries.
                  </p>
                </div>
              </Card>

              <Card className="p-4 flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Upload Photo/Video Evidence
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Attach images or videos to strengthen your report.
                  </p>
                </div>
              </Card>

              <Card className="p-4 flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Track Your Report
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Get a reference number to track the status of your submission.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Form */}
          <Card className="p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Location *</Label>
                {coordinates ? (
                  <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Location Captured</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {coordinates.lat.toFixed(4)}° N, {coordinates.lng.toFixed(4)}° E
                      </p>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setCoordinates(null)}
                    >
                      Reset
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      className="h-12"
                    >
                      <Navigation className={`w-4 h-4 mr-2 ${isLocating ? "animate-pulse" : ""}`} />
                      {isLocating ? "Detecting..." : "Use GPS"}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      className="h-12"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Pin on Map
                    </Button>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Name (Optional)
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Phone (Optional)
                  </Label>
                  <Input
                    id="phone"
                    placeholder="For updates"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you observed (e.g., illegal excavation, tree felling, suspicious activity...)"
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  Evidence (Photos/Videos)
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop files here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports: JPG, PNG, MP4 (Max 20MB)
                  </p>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*,video/*"
                    multiple
                  />
                </div>
              </div>

              {/* Submit */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={!coordinates || !formData.description}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to our privacy policy. Reports are 
                forwarded to Jaipur Forest Department.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReportSection;
