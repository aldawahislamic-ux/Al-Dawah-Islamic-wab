import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NotificationBanner from "./components/NotificationBanner";
import IslamicFeaturesSuite from "./components/IslamicFeaturesSuite";
import QuranSection from "./components/QuranSection";
import HadithSection from "./components/HadithSection";
import SalahSection from "./components/SalahSection";
import VideoSection from "./components/VideoSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import SettingsModal from "./components/SettingsModal";
import GlobalSearchModal from "./components/GlobalSearchModal";
import { GlobalSearchResult, searchGlobalIslamicData } from "./lib/globalSearchEngine";
import aldawahLogo from "./assets/images/aldawah_logo_1784251631919.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSubFeatureId, setActiveSubFeatureId] = useState<string | null>(null);

  // Fade out preloader on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderActive(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Handle URL Query parameters for automatic direct search & deep-linking
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const surahVal = params.get("surah") || params.get("s");
      const hadithVal = params.get("hadith") || params.get("h");
      const nameVal = params.get("name") || params.get("allah");
      const babyVal = params.get("baby") || params.get("babyname");
      const duaVal = params.get("dua") || params.get("zikir");
      const queryVal = params.get("q") || params.get("query") || params.get("search");

      if (surahVal) {
        setActiveTab("quran");
        setTimeout(() => {
          const el = document.getElementById("quran");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 600);
      } else if (hadithVal) {
        setActiveTab("hadith");
        setTimeout(() => {
          const el = document.getElementById("hadith");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 600);
      } else if (nameVal) {
        setActiveTab("islamic-features");
        setActiveSubFeatureId("allah-names");
        setTimeout(() => {
          const el = document.getElementById("islamic-features");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 600);
      } else if (babyVal) {
        setActiveTab("islamic-features");
        setActiveSubFeatureId("names");
        setTimeout(() => {
          const el = document.getElementById("islamic-features");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 600);
      } else if (duaVal) {
        setActiveTab("islamic-features");
        setActiveSubFeatureId("duas");
        setTimeout(() => {
          const el = document.getElementById("islamic-features");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 600);
      } else if (queryVal) {
        const matches = searchGlobalIslamicData(queryVal);
        if (matches && matches.length > 0) {
          handleSelectSearchResult(matches[0]);
        }
      }
    } catch (e) {
      console.error("Error reading URL search params", e);
    }
  }, []);

  // Synchronize Active Navigation Tab during user scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "quran", "hadith", "islamic-features", "videos", "contact"];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExploreClick = () => {
    setActiveTab("quran");
    const element = document.getElementById("quran");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToFeatures = () => {
    setActiveTab("islamic-features");
    const element = document.getElementById("islamic-features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectSearchResult = (result: GlobalSearchResult) => {
    setIsSearchOpen(false);
    setActiveTab(result.targetTab);

    if (result.subFeatureId) {
      setActiveSubFeatureId(result.subFeatureId);
      setTimeout(() => {
        const element = document.getElementById("islamic-features");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    } else {
      setTimeout(() => {
        const element = document.getElementById(result.targetTab);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  };

  return (
    <div className="bg-emerald-deep min-h-screen text-gray-100 font-sans selection:bg-gold-lux/30 selection:text-white overflow-x-hidden relative">
      
      {/* Absolute Frosted Glass Atmospheric Layers */}
      <div className="absolute inset-0 islamic-pattern pointer-events-none opacity-20 z-0" />
      
      {/* Floating Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-lux rounded-full blur-[120px] opacity-40 pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-gold-lux rounded-full blur-[160px] opacity-10 pointer-events-none z-0" />
      <div className="absolute top-[50%] left-[-10%] w-[500px] h-[500px] bg-emerald-lux rounded-full blur-[180px] opacity-20 pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-gold-lux rounded-full blur-[150px] opacity-10 pointer-events-none z-0" />
      
      {/* Universal Multi-Language Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Luxury Islamic Preloader */}
      <AnimatePresence>
        {preloaderActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-emerald-deep z-[100] flex flex-col items-center justify-center"
            id="preloader"
          >
            {/* Elegant Glowing Emblem */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              {/* Islamic Calligraphic/Geometric SVG */}
              <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-2 border-gold-lux overflow-hidden shadow-[0_0_35px_rgba(212,175,55,0.4)]">
                <img 
                  src={aldawahLogo} 
                  alt="Al Dawah Islamic Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Micro outer glowing ring */}
                <div className="absolute inset-0 rounded-full border border-gold-lux/40 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
              </div>
              
              {/* Title */}
              <div>
                <h1 className="font-serif-lux text-2xl tracking-[0.25em] text-white font-bold block mb-1">
                  AL DAWAH
                </h1>
                <span className="text-xs tracking-[0.35em] text-gold-lux uppercase block font-sans">
                  Islamic Official
                </span>
              </div>

              {/* Progress shimmer */}
              <div className="w-32 h-[1px] bg-gold-lux/20 relative overflow-hidden mt-6 rounded-full">
                <motion.div
                  className="absolute h-full bg-gradient-to-r from-transparent via-gold-lux to-transparent"
                  style={{ width: "100%" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Reveal */}
      {!preloaderActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col"
          id="main-app-container"
        >
          {/* Transparent Floating Glassmorphic Navbar */}
          <Navbar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Settings & Language Selection Modal */}
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />

          {/* Luxury Main Page Header */}
          <Hero 
            onExploreClick={handleExploreClick} 
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Notification Announcement Banner for 15+ Islamic Features */}
          <NotificationBanner onScrollToFeatures={handleScrollToFeatures} />

          {/* Islamic Features & Services Suite (With Quran & Hadith Cards at Top) */}
          <IslamicFeaturesSuite activeFeatureId={activeSubFeatureId} />

          {/* Integrated Quran Explorer */}
          <QuranSection />
          
          {/* Prophetic Wisdom Hadith Section */}
          <HadithSection />
          
          {/* Inspirational Media Grid */}
          <VideoSection />
          
          {/* Elegant Contact Form / Touchpoints */}
          <ContactSection />
          
          {/* High-End Footer */}
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
