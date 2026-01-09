import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  TreePine, 
  Map, 
  AlertTriangle, 
  BarChart3,
  FileWarning,
  User
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Live Map", href: "#map", icon: Map },
    { name: "Analytics", href: "#analytics", icon: BarChart3 },
    { name: "Alerts", href: "#alerts", icon: AlertTriangle },
    { name: "Report Violation", href: "#report", icon: FileWarning },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`p-2 rounded-lg transition-colors ${
              isScrolled ? "bg-primary" : "bg-primary-foreground/20"
            }`}>
              <TreePine className={`w-6 h-6 ${
                isScrolled ? "text-primary-foreground" : "text-primary-foreground"
              }`} />
            </div>
            <div className="hidden sm:block">
              <span className={`font-display font-bold text-lg ${
                isScrolled ? "text-foreground" : "text-primary-foreground"
              }`}>
                Aravalli Watch
              </span>
              <span className={`block text-xs ${
                isScrolled ? "text-muted-foreground" : "text-primary-foreground/70"
              }`}>
                Jaipur Environmental Monitor
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">


            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isScrolled
                      ? "text-foreground hover:bg-muted"
                      : "text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </a>
              ))}
              <Button className="mt-2 w-full" size="sm">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
