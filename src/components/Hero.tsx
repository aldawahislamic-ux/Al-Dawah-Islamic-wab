import { motion } from "motion/react";
import { BookOpen, Star, ArrowDown, Search, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HeroProps {
  onExploreClick: () => void;
  onOpenSearch?: (query?: string) => void;
}

export default function Hero({ onExploreClick, onOpenSearch }: HeroProps) {
  const { t, language } = useLanguage();
  const isBn = language === "bn";

  // Generate random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-emerald-deep px-6 py-24"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/luxury_quran_hero_1784250583854.jpg"
          alt="Luxury Holy Quran background with mosque silhouette"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Deep luxurious color gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/90 via-emerald-deep/40 to-emerald-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep via-transparent to-emerald-deep opacity-80" />
      </div>

      {/* Floating Gold Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold-lux/60 blur-[1px]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: ["0px", "-100px", "0px"],
              x: ["0px", "50px", "0px"],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Tiny Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-lux/30 bg-gold-lux/5 gold-text text-xs uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-lux animate-ping" />
          <span className="font-semibold tracking-[0.2em] font-sans">
            {t("hero_badge")}
          </span>
        </motion.div>

        {/* Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-serif-lux text-3xl sm:text-5xl md:text-6xl font-light tracking-wider leading-tight text-white mb-6"
        >
          {t("hero_title_1")} <br />
          <span className="gold-text italic gold-glow">{t("hero_title_2")}</span>
        </motion.h1>

        {/* Display Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-emerald-100/80 font-light text-sm sm:text-base md:text-lg mb-10 max-w-2xl leading-relaxed font-sans"
        >
          {t("hero_subtitle")}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col gap-6 justify-center items-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={onExploreClick}
              className="group px-8 py-4 gold-gradient text-emerald-deep font-bold rounded-xl shadow-xl hover:opacity-90 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              {t("hero_btn_quran")}
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("features-suite");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group px-6 py-4 bg-emerald-900/80 border border-gold-lux/40 text-gold-lux font-bold rounded-xl shadow-lg hover:border-gold-lux hover:bg-emerald-900 transition-all duration-300 flex items-center gap-2 cursor-pointer font-sans"
            >
              <span>✨ {t("hero_btn_features")}</span>
              <Star className="w-4 h-4 fill-gold-lux/30 group-hover:rotate-45 transition-transform" />
            </button>
          </div>

          {/* Prompt for Hadith, Salah and Videos */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-emerald-deep/60 border border-gold-lux/20 px-6 py-3.5 rounded-2xl backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.05)] hover:border-gold-lux/40 transition-all duration-500 max-w-lg w-full">
            <span className="text-gold-light font-sans text-sm md:text-base font-medium tracking-wide text-center">
              {t("hero_scroll_hint")}
            </span>
            <span className="flex items-center gap-1.5 text-gold-lux font-semibold text-xs uppercase tracking-widest sm:border-l sm:border-gold-lux/20 sm:pl-3 select-none flex-shrink-0">
              <span className="font-sans">Scroll Down</span>
              <ArrowDown className="w-4 h-4 text-gold-lux animate-bounce" />
            </span>
          </div>
        </motion.div>

        {/* Moving Quran Illustration Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mt-16 relative w-48 h-48 md:w-56 md:h-56 pointer-events-none flex items-center justify-center animate-float"
        >
          <div className="absolute inset-0 rounded-full bg-gold-lux/5 blur-3xl animate-pulse" />
          <svg
            className="w-32 h-32 text-gold-lux/40 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            {/* Custom vector illustration of open Quran */}
            <path d="M12 21c-1.5-1.5-4-3-7-3s-3 .5-3 1.5V6C2 5 2.5 4 4.5 4s5 2 7.5 3c2.5-1 5.5-3 7.5-3s2.5 1 2.5 2v13.5c0-1-1.5-1.5-3-1.5s-5.5 1.5-7 3z" />
            <path d="M12 7v14" />
          </svg>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.button
          onClick={onExploreClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer text-gold-lux/70 hover:text-gold-lux"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-sans">Scroll to Read</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.button>
      </div>

      {/* Bottom transition border */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-emerald-deep to-transparent pointer-events-none" />
    </section>
  );
}
