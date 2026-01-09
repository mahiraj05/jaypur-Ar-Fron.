import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import LiveMapSection from "@/components/LiveMapSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import AlertsSection from "@/components/AlertsSection";
import ReportSection from "@/components/ReportSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <LiveMapSection />
        <AnalyticsSection />
        <AlertsSection />
        <ReportSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
