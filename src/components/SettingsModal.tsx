import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  X,
  Globe,
  Settings,
  Check,
  Volume2,
  BookOpen,
  Moon,
  Sparkles,
  Sliders,
  CheckCircle2,
  Bell
} from "lucide-react";

export interface AppLanguage {
  code: string;
  nativeName: string;
  englishName: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: AppLanguage[] = [
  { code: "bn", nativeName: "বাংলা", englishName: "Bengali", flag: "🇧🇩", region: "Bangladesh & WB" },
  { code: "en", nativeName: "English", englishName: "English", flag: "🇬🇧", region: "International" },
  { code: "ar", nativeName: "العربية", englishName: "Arabic", flag: "🇸🇦", region: "Middle East" },
  { code: "ur", nativeName: "اردو", englishName: "Urdu", flag: "🇵🇰", region: "Pakistan & South Asia" },
  { code: "id", nativeName: "Bahasa Indonesia", englishName: "Indonesian", flag: "🇮🇩", region: "Indonesia" },
  { code: "tr", nativeName: "Türkçe", englishName: "Turkish", flag: "🇹🇷", region: "Turkey" },
  { code: "fr", nativeName: "Français", englishName: "French", flag: "🇫🇷", region: "France & N. Africa" },
  { code: "es", nativeName: "Español", englishName: "Spanish", flag: "🇪🇸", region: "Global" },
  { code: "hi", nativeName: "हिंदी", englishName: "Hindi", flag: "🇮🇳", region: "India" },
  { code: "ms", nativeName: "Bahasa Melayu", englishName: "Malay", flag: "🇲🇾", region: "Malaysia" },
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { language, setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);
  const [fontSize, setFontSize] = useState<string>("medium");
  const [showBangla, setShowBangla] = useState<boolean>(true);
  const [showEnglish, setShowEnglish] = useState<boolean>(true);
  const [athanAlerts, setAthanAlerts] = useState<boolean>(true);
  const [audioSpeed, setAudioSpeed] = useState<string>("1.0");
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Sync selected language when LanguageContext changes
  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  // Load stored settings on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aldawah_app_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.language) setSelectedLanguage(parsed.language);
        if (parsed.fontSize) setFontSize(parsed.fontSize);
        if (parsed.showBangla !== undefined) setShowBangla(parsed.showBangla);
        if (parsed.showEnglish !== undefined) setShowEnglish(parsed.showEnglish);
        if (parsed.athanAlerts !== undefined) setAthanAlerts(parsed.athanAlerts);
        if (parsed.audioSpeed) setAudioSpeed(parsed.audioSpeed);
      }
    } catch (e) {
      console.error("Failed to load settings", e);
    }
  }, []);

  const handleSelectLang = (code: string) => {
    setSelectedLanguage(code);
    setLanguage(code);
  };

  const handleSave = () => {
    setLanguage(selectedLanguage);
    const settings = {
      language: selectedLanguage,
      fontSize,
      showBangla,
      showEnglish,
      athanAlerts,
      audioSpeed,
      updatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem("aldawah_app_settings", JSON.stringify(settings));
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1200);
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-emerald-950 border border-gold-lux/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(212,175,55,0.3)] text-white overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-lux/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-emerald-900/80 border border-gold-lux/30 text-gray-300 hover:text-white hover:border-gold-lux flex items-center justify-center transition-all z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-6 relative z-10 border-b border-gold-lux/20 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-lux/15 border border-gold-lux/40 flex items-center justify-center text-gold-lux shadow-inner">
                <Settings className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-gold-lux/30 bg-gold-lux/10 text-gold-lux text-[10px] uppercase font-semibold tracking-wider mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  Select Website Language / ভাষা নির্বাচন
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-lux text-white">
                  Language & Settings / ভাষা ও সেটিংস
                </h3>
              </div>
            </div>

            <div className="space-y-6 relative z-10 max-h-[65vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gold-lux/30">
              
              {/* 🌐 1. LANGUAGE SELECTOR SECTION */}
              <div className="space-y-3 bg-emerald-900/40 p-4 rounded-2xl border border-gold-lux/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gold-lux/20 pb-3">
                  <div>
                    <label className="text-base font-bold text-gold-lux flex items-center gap-2 font-sans">
                      <Globe className="w-5 h-5 text-gold-lux animate-pulse" />
                      Select Language / ভাষা পরিবর্তন করুন:
                    </label>
                    <p className="text-xs text-gray-300 font-sans mt-0.5">
                      Click any language below to automatically translate the entire website into that language.
                    </p>
                  </div>
                  <span className="text-xs text-gold-lux bg-emerald-950 px-3 py-1.5 rounded-full border border-gold-lux/30 font-sans flex items-center gap-1.5 self-start sm:self-auto">
                    <span>Active Language:</span>
                    <span className="font-bold">{currentLangObj.flag} {currentLangObj.englishName}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = selectedLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLang(lang.code)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-gradient-to-r from-emerald-800 to-teal-900 border-gold-lux shadow-[0_0_15px_rgba(212,175,55,0.25)] text-white"
                            : "bg-emerald-900/40 border-gold-lux/15 hover:border-gold-lux/50 text-gray-300 hover:bg-emerald-900/70"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <span className="text-2xl flex-shrink-0">{lang.flag}</span>
                          <div className="overflow-hidden">
                            <span className="block text-xs font-bold font-sans text-white truncate">
                              {lang.nativeName}
                            </span>
                            <span className="block text-[10px] text-gray-400 font-sans truncate">
                              {lang.englishName} • {lang.region}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-gold-lux text-emerald-950 flex items-center justify-center flex-shrink-0 ml-1">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 📖 2. QURAN DISPLAY OPTIONS */}
              <div className="bg-emerald-900/40 border border-gold-lux/20 rounded-2xl p-4 space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-gold-lux font-semibold flex items-center gap-2 font-sans">
                  <BookOpen className="w-4 h-4" />
                  কুরআন পড়া ও অনুবাদ কাস্টমাইজেশন (Quran Preferences)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-sans">
                      আরবি লেখার সাইজ (Arabic Font Size):
                    </label>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full bg-emerald-950 border border-gold-lux/30 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-gold-lux font-sans"
                    >
                      <option value="small">ছোট (Small - 18px)</option>
                      <option value="medium">মাঝারি (Medium - 24px)</option>
                      <option value="large">বড় (Large - 30px)</option>
                      <option value="xlarge">অনেক বড় (Extra Large - 36px)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-sans">
                      অডিও তেলাওয়াত গতি (Recitation Speed):
                    </label>
                    <select
                      value={audioSpeed}
                      onChange={(e) => setAudioSpeed(e.target.value)}
                      className="w-full bg-emerald-950 border border-gold-lux/30 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-gold-lux font-sans"
                    >
                      <option value="0.75">০.৭৫x (ধীর গতি - Slow)</option>
                      <option value="1.0">১.০x (স্বাভাবিক - Normal)</option>
                      <option value="1.25">১.২৫x (একটু দ্রুত - Fast)</option>
                      <option value="1.5">১.৫০x (দ্রুত - Faster)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-gray-200 font-sans">
                    <input
                      type="checkbox"
                      checked={showBangla}
                      onChange={(e) => setShowBangla(e.target.checked)}
                      className="accent-amber-400 w-4 h-4 rounded cursor-pointer"
                    />
                    বাংলা অনুবাদ দেখান (Bangla Translation)
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-gray-200 font-sans">
                    <input
                      type="checkbox"
                      checked={showEnglish}
                      onChange={(e) => setShowEnglish(e.target.checked)}
                      className="accent-amber-400 w-4 h-4 rounded cursor-pointer"
                    />
                    ইংরেজি অনুবাদ দেখান (English Translation)
                  </label>
                </div>
              </div>

              {/* 🔔 3. NOTIFICATIONS & SOUND */}
              <div className="bg-emerald-900/40 border border-gold-lux/20 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-lux/10 border border-gold-lux/30 flex items-center justify-center text-gold-lux">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block font-sans">
                      আজান ও নামাজের নোটিফিকেশন অ্যালার্ট
                    </span>
                    <span className="text-[10px] text-gray-400 block font-sans">
                      পাঁচ ওয়াক্ত নামাজের সঠিক সময়ে আজানের রিমাইন্ডার পাবেন।
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setAthanAlerts(!athanAlerts)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                    athanAlerts ? "bg-gold-lux" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-emerald-950 shadow-md transform transition-transform ${
                      athanAlerts ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="mt-6 pt-4 border-t border-gold-lux/20 flex items-center justify-between gap-3 relative z-10">
              {savedSuccess ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-sans">
                  <CheckCircle2 className="w-4 h-4" />
                  সেটিংস সফলভাবে সংরক্ষিত হয়েছে!
                </div>
              ) : (
                <span className="text-[11px] text-gray-400 font-sans">
                  পছন্দসই সেটিংস সিলেক্ট করে নিচে সেভ বাটনে প্রেস করুন।
                </span>
              )}

              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-emerald-900 border border-gold-lux/30 text-gray-300 text-xs font-sans hover:text-white transition-colors cursor-pointer"
                >
                  বাতিল (Cancel)
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 rounded-xl bg-gold-lux text-emerald-950 font-bold text-xs font-sans hover:bg-yellow-400 transition-colors shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> সেভ করুন (Save Settings)
                </button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
