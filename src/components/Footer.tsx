import { Compass, BookOpen, Film, Mail, Star, ArrowUp, Lock } from "lucide-react";
import aldawahLogo from "../assets/images/aldawah_logo_1784251631919.jpg";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const { t, language } = useLanguage();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative glass border-t border-white/10 overflow-hidden">
      {/* Subtle decorative background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-gold-lux to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        {/* Brand Emblem */}
        <div className="flex flex-col items-center gap-3 mb-8 cursor-pointer" onClick={handleScrollToTop}>
          <div className="relative w-14 h-14 flex items-center justify-center rounded-full border-2 border-gold-lux overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            <img 
              src={aldawahLogo} 
              alt="Al Dawah Islamic Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 rounded-full bg-gold-lux/5 pointer-events-none" />
          </div>
          <div className="text-center">
            <span className="font-serif-lux text-xl tracking-[0.2em] text-white block font-bold">
              AL DAWAH
            </span>
            <span className="text-[10px] tracking-[0.3em] text-gold-lux uppercase block font-sans mt-0.5">
              Islamic Official
            </span>
          </div>
        </div>

        {/* Spiritual Guidance Quote */}
        <div className="max-w-md text-center mb-10">
          <div className="flex justify-center gap-1.5 mb-3 text-gold-lux">
            <Star className="w-3.5 h-3.5 fill-gold-lux" />
            <Star className="w-3.5 h-3.5" />
            <Star className="w-3.5 h-3.5 fill-gold-lux" />
          </div>
          <p className="font-serif-lux text-gold-light italic text-base sm:text-lg tracking-wide">
            "May Allah guide us to the Straight Path."
          </p>
        </div>

        {/* Minimal jump navigation */}
        <div className="flex justify-center gap-8 flex-wrap mb-10">
          {[
            { id: "home", label: t("nav_home"), icon: Compass },
            { id: "quran", label: t("nav_quran"), icon: BookOpen },
            { id: "videos", label: t("nav_videos"), icon: Film },
            { id: "contact", label: t("nav_contact"), icon: Mail },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-gold-lux transition-all cursor-pointer font-serif-lux font-semibold"
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Scroll back to top bubble */}
        <button
          onClick={handleScrollToTop}
          className="w-10 h-10 rounded-full border border-gold-lux/30 bg-emerald-lux/10 hover:bg-gold-lux hover:text-emerald-deep hover:border-gold-lux text-gold-lux flex items-center justify-center transition-all duration-300 cursor-pointer mb-8"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* Copyright notice */}
        <div className="text-center border-t border-gold-lux/10 pt-8 w-full space-y-2">
          <p className="text-[11px] sm:text-xs text-gray-400 tracking-wider">
            {t("footer_rights")}
          </p>
          <p className="text-sm font-serif-lux text-gold-lux tracking-wide">
            {t("footer_owner")}
          </p>
        </div>
      </div>
    </footer>
  );
}

