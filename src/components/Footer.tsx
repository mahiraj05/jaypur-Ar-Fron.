import { 
  TreePine, 
  Github, 
  ExternalLink,
  Satellite,
  Building2
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-forest-dark text-primary-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <TreePine className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Aravalli Watch</h3>
                <p className="text-sm text-primary-foreground/70">Jaipur Environmental Monitor</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 max-w-md mb-6">
              An AI-powered platform monitoring illegal mining and deforestation 
              activities in the Aravalli hills around Jaipur, Rajasthan. Using 
              satellite imagery and machine learning to protect our natural heritage.
            </p>
            <p className="text-sm text-primary-foreground/60 italic">
              "Protecting Jaipur's Aravalli Hills with AI & Satellite Intelligence."
            </p>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Satellite className="w-4 h-4" />
              Data Sources
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <ExternalLink className="w-3 h-3" />
                <a href="#">Sentinel-2 Satellite</a>
              </li>
              <li className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <ExternalLink className="w-3 h-3" />
                <a href="#">Landsat 8/9 Data</a>
              </li>
              <li className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <ExternalLink className="w-3 h-3" />
                <a href="#">ISRO Bhuvan Portal</a>
              </li>
              <li className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <ExternalLink className="w-3 h-3" />
                <a href="#">Global Forest Watch</a>
              </li>
            </ul>
          </div>

          {/* Government Partners */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Government Partners
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>Rajasthan Forest Department</li>
              <li>Jaipur District Administration</li>
              <li>Rajasthan State Pollution Control Board</li>
              <li>Ministry of Environment, Forest & Climate Change</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {/* Government Logo Placeholders */}
              <div className="flex items-center gap-3 opacity-70">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-xs text-primary-foreground/60">Govt. of Rajasthan</span>
              </div>
              <div className="flex items-center gap-3 opacity-70">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                  <TreePine className="w-5 h-5" />
                </div>
                <span className="text-xs text-primary-foreground/60">Forest Dept.</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <span className="text-primary-foreground/30">|</span>
              <a 
                href="#" 
                className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                Demo
              </a>
              <span className="text-primary-foreground/30">|</span>
              <a 
                href="#" 
                className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                API Docs
              </a>
            </div>
          </div>

          <p className="text-center text-xs text-primary-foreground/50 mt-8">
            © 2024 Aravalli Watch. Open-source project for environmental conservation. 
            Data is for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
