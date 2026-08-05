import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Compass, Mail, Film, Menu, X, Settings, Globe, Search } from "lucide-react";
import aldawahLogo from "../assets/images/aldawah_logo_1784251631919.jpg";
import { useLanguage } from "../context/LanguageContext";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSettings?: () => void;
  onOpenAdmin?: () => void;
  onOpenSearch?: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenSettings, onOpenAdmin, onOpenSearch }: NavbarProps) {
  const { t, currentLangObj, language } = useLanguage();
  const isBn = language === "bn";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: t("nav_home") },
    { id: "quran", label: t("nav_quran") },
    { id: "hadith", label: t("nav_hadith") },
    { id: "islamic-features", label: t("nav_features") },
    { id: "videos", label: t("nav_videos") },
    { id: "contact", label: t("nav_contact") },
  ];

  const renderMenuIcon = (id: string, className: string) => {
    if (id === "quran") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 21c-1.5-1.5-4-3-7-3s-3 .5-3 1.5V6C2 5 2.5 4 4.5 4s5 2 7.5 3" />
          <path d="M12 21c1.5-1.5 4-3 7-3s3 .5 3 1.5V6c0-1-.5-2-2.5-2s-5 2-7.5 3" />
          <path d="M12 7v14" />
        </svg>
      );
    }
    if (id === "hadith") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M16 5V19c0 1.1-.9 2-2 2H10c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2z" />
          <path d="M6 5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2s-.9 2-2 2H8c-1.1 0-2-.9-2-2z" />
          <path d="M6 19c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2s-.9 2-2 2H8c-1.1 0-2-.9-2-2z" />
        </svg>
      );
    }
    if (id === "islamic-features") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    }
    if (id === "salah-guide") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 22V12c0-4.4 3.6-8 8-8s8 3.6 8 8v10" />
          <path d="M12 4V1" />
          <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
          <path d="M8 22h8v-3c0-.6-.4-1-1-1H9c-.6 0-1 .4-1 1v3z" />
        </svg>
      );
    }
    if (id === "home") return <Compass className={className} />;
    if (id === "videos") return <Film className={className} />;
    if (id === "contact") return <Mail className={className} />;
    return null;
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-4 shadow-lg border-b border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo / Brand */}
        <div
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="relative w-11 h-11 flex items-center justify-center rounded-full border border-gold-lux/50 overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-gold-lux transition-all duration-300">
            <img 
              src={aldawahLogo} 
              alt="Al Dawah Islamic" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 rounded-full bg-gold-lux/5 pointer-events-none group-hover:bg-transparent transition-all duration-300" />
          </div>
          <div>
            <span className="font-serif-lux text-lg tracking-widest text-white block group-hover:text-gold-light transition-colors duration-300">
              AL DAWAH
            </span>
            <span className="text-[10px] tracking-[0.25em] text-gold-lux uppercase block font-sans">
              Islamic Official
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6" id="desktop-menu">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 font-serif-lux text-sm tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive ? "text-gold-lux" : "text-gray-300 hover:text-white"
                }`}
              >
                {renderMenuIcon(item.id, `w-4 h-4 ${isActive ? "text-gold-lux" : "text-gray-400 group-hover:text-white"}`)}
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-lux to-transparent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

          {/* Settings / Language Button */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="px-3.5 py-1.5 rounded-xl bg-gold-lux/15 border border-gold-lux/40 text-gold-lux font-sans text-xs font-semibold tracking-wider hover:bg-gold-lux/25 hover:border-gold-lux transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title="Select Language / Select Website Language"
            >
              <Globe className="w-4 h-4 text-gold-lux animate-pulse" />
              <span>Language</span>
              <span className="text-[11px] bg-emerald-950/80 px-2 py-0.5 rounded border border-gold-lux/30 text-white flex items-center gap-1">
                <span>{currentLangObj.flag}</span>
                <span>{currentLangObj.englishName}</span>
              </span>
              <Settings className="w-3.5 h-3.5 opacity-70" />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2" id="mobile-menu-btn">
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="px-2 py-1.5 rounded-lg bg-gold-lux/15 border border-gold-lux/40 text-gold-lux font-sans text-xs font-semibold hover:bg-gold-lux/25 transition-all cursor-pointer flex items-center gap-1"
              aria-label="Language & Settings"
            >
              <Globe className="w-4 h-4" />
              <span>Language</span>
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-gold-lux transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full bg-emerald-deep/95 border-b border-gold-lux/20 py-6 px-6 backdrop-blur-lg"
          id="mobile-drawer"
        >
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-4 py-3 px-4 rounded-lg font-serif-lux text-base tracking-widest transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-lux/20 text-gold-lux border-l-2 border-gold-lux"
                      : "text-gray-300 hover:bg-emerald-lux/10 hover:text-white"
                  }`}
                >
                  {renderMenuIcon(item.id, "w-5 h-5 text-gold-lux")}
                  {item.label}
                </button>
              );
            })}

            {onOpenSettings && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenSettings();
                }}
                className="flex items-center justify-between py-3 px-4 rounded-lg font-sans text-sm font-semibold tracking-wider text-gold-lux bg-gold-lux/10 border border-gold-lux/30 hover:bg-gold-lux/20 transition-all mt-2"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gold-lux" />
                  <span>Language / Select Language (ভাষা)</span>
                </div>
                <span className="text-xs bg-gold-lux/20 px-2 py-0.5 rounded text-white flex items-center gap-1">
                  <span>{currentLangObj.flag}</span>
                  <span>{currentLangObj.englishName}</span>
                </span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
