import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Sparkles, ArrowRight, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface NotificationBannerProps {
  onScrollToFeatures: () => void;
}

export default function NotificationBanner({ onScrollToFeatures }: NotificationBannerProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        className="w-full bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 border-y border-gold-lux/40 py-3 px-4 sm:px-8 shadow-[0_4px_20px_rgba(212,175,55,0.15)] relative z-30"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          
          {/* Announcement text & Badge */}
          <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-lux/20 border border-gold-lux/50 text-gold-lux text-[11px] font-bold uppercase tracking-wider animate-pulse">
              <Bell className="w-3.5 h-3.5 text-gold-lux" />
              <span>Notice</span>
            </span>

            <p className="text-xs sm:text-sm font-medium text-white flex items-center gap-2 font-sans">
              <Sparkles className="w-4 h-4 text-gold-lux hidden sm:inline" />
              <span>{t("notice_title")}</span>
            </p>
          </div>

          {/* Action button & Dismiss */}
          <div className="flex items-center gap-3">
            <button
              onClick={onScrollToFeatures}
              className="px-4 py-1.5 rounded-xl gold-gradient text-emerald-deep font-bold text-xs shadow-md hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer font-sans whitespace-nowrap"
            >
              <span>{t("notice_btn")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              title="Close Notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
