import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import QuranAudioSection from "./QuranAudioSection";
import QiblaCompassView from "./QiblaCompassView";
import IslamicCampusView from "./IslamicCampusView";
import MasnoonDuasView from "./MasnoonDuasView";
import IslamicBabyNamesView from "./IslamicBabyNamesView";
import AsmaulHusnaView from "./AsmaulHusnaView";
import HijriCalendarView from "./HijriCalendarView";
import HajjUmrahGuideView from "./HajjUmrahGuideView";
import IslamicQAView from "./IslamicQAView";
import {
  ProphetsSahabahView,
  DailyVerseHadithView,
  EasyTafseerView,
  IslamicStoriesView
} from "./IslamicKnowledgeViews";
import {
  X,
  Sparkles,
  Settings,
  RefreshCw,
  Compass,
  Clock,
  Heart,
  Calculator,
  BookOpen,
  Calendar,
  Volume2,
  HelpCircle,
  Users,
  Search,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  Flame,
  RotateCcw,
  Play,
  Pause,
  Award
} from "lucide-react";

export interface FeatureItem {
  id: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  emoji: string;
  gradient: string;
  category: "daily" | "worship" | "knowledge" | "tools";
  status: "coming_soon" | "preview_ready";
}

export const ISLAMIC_FEATURES: FeatureItem[] = [
  {
    id: "quran",
    titleBn: "পবিত্র কুরআন",
    titleEn: "Holy Quran",
    subtitleBn: "সূরা, আয়াত, অর্থ ও অডিও তেলাওয়াত",
    subtitleEn: "Surahs, verses, meanings & audio recitation",
    emoji: "📖",
    gradient: "from-amber-500 via-yellow-600 to-amber-900",
    category: "worship",
    status: "preview_ready"
  },
  {
    id: "hadith",
    titleBn: "সহিহ হাদিস",
    titleEn: "Sahih Hadith",
    subtitleBn: "বুখারী, মুসলিম ও সহিহ হাদিস সংকলন",
    subtitleEn: "Bukhari, Muslim & authentic collections",
    emoji: "📜",
    gradient: "from-emerald-600 via-teal-700 to-emerald-950",
    category: "worship",
    status: "preview_ready"
  },
  {
    id: "quran-audio",
    titleBn: "কুরআন অডিও প্লেয়ার",
    titleEn: "Quran Audio Recitation",
    subtitleBn: "বিশ্বখ্যাত কারীদের কণ্ঠের অডিও তেলাওয়াত",
    subtitleEn: "Recitations by world-famous Qaris",
    emoji: "🎧",
    gradient: "from-indigo-700 via-blue-800 to-slate-950",
    category: "worship",
    status: "preview_ready"
  },
  {
    id: "prayer-times",
    titleBn: "নামাজের সময়সূচি",
    titleEn: "Prayer Times",
    subtitleBn: "দেশ ও শহরভিত্তিক সঠিক সময়",
    subtitleEn: "Accurate timings for cities worldwide",
    emoji: "🕌",
    gradient: "from-emerald-600 via-teal-700 to-emerald-900",
    category: "daily",
    status: "preview_ready"
  },
  {
    id: "qibla-finder",
    titleBn: "কিবলা ফাইন্ডার",
    titleEn: "Qibla Compass",
    subtitleBn: "কম্পাস ও সরাসরি দিকনির্ণয়",
    subtitleEn: "Live compass & direction finder",
    emoji: "🧭",
    gradient: "from-amber-600 via-yellow-700 to-amber-900",
    category: "tools",
    status: "preview_ready"
  },
  {
    id: "campus",
    titleBn: "ইসলামিক ক্যাম্পাস ও কোর্স",
    titleEn: "Islamic Campus & Courses",
    subtitleBn: "অনলাইন কোর্স, লাইভ দারস ও ফতোয়া কর্নার",
    subtitleEn: "Online courses, live dars & fatwa corner",
    emoji: "🎓",
    gradient: "from-teal-600 via-emerald-700 to-cyan-900",
    category: "knowledge",
    status: "preview_ready"
  },
  {
    id: "tasbih",
    titleBn: "ডিজিটাল তাসবিহ",
    titleEn: "Digital Tasbih",
    subtitleBn: "জিকির কাউন্টার ও গণনা",
    subtitleEn: "Dhikr counter & tracker",
    emoji: "📿",
    gradient: "from-yellow-600 via-amber-700 to-yellow-900",
    category: "tools",
    status: "preview_ready"
  },
  {
    id: "duas",
    titleBn: "৫০০+ দোয়ার সংগ্রহ",
    titleEn: "500+ Masnoon Duas",
    subtitleBn: "বিষয়ভিত্তিক সহীহ মাসনুন দোয়া",
    subtitleEn: "Authentic daily prayers by topic",
    emoji: "🤲",
    gradient: "from-teal-600 via-emerald-700 to-teal-900",
    category: "daily",
    status: "preview_ready"
  },
  {
    id: "zakat",
    titleBn: "যাকাত ক্যালকুলেটর",
    titleEn: "Zakat Calculator",
    subtitleBn: "সম্পদ ও নিসাব ভিত্তিক সঠিক হিসাব",
    subtitleEn: "Accurate calculation based on Nisab",
    emoji: "🧮",
    gradient: "from-emerald-700 via-green-800 to-emerald-950",
    category: "tools",
    status: "preview_ready"
  },
  {
    id: "names",
    titleBn: "ইসলামিক সুন্দর নাম",
    titleEn: "Islamic Baby Names",
    subtitleBn: "ছেলে-মেয়েদের নাম ও চমৎকার অর্থ",
    subtitleEn: "Meaningful names for boys & girls",
    emoji: "👶",
    gradient: "from-cyan-600 via-blue-700 to-indigo-900",
    category: "knowledge",
    status: "preview_ready"
  },
  {
    id: "allah-names",
    titleBn: "আল্লাহর ৯৯টি নাম",
    titleEn: "99 Names of Allah",
    subtitleBn: "অর্থ, ব্যাখ্যা ও ফজিলতসহ",
    subtitleEn: "Meanings, explanations & virtues",
    emoji: "📖",
    gradient: "from-amber-500 via-yellow-600 to-amber-800",
    category: "knowledge",
    status: "preview_ready"
  },
  {
    id: "hijri-calendar",
    titleBn: "ইসলামিক (হিজরি) ক্যালেন্ডার",
    titleEn: "Hijri Calendar",
    subtitleBn: "হিজরি তারিখ ও গুরুত্বপূর্ণ দিবস",
    subtitleEn: "Islamic dates & important days",
    emoji: "🌙",
    gradient: "from-indigo-600 via-purple-700 to-slate-900",
    category: "daily",
    status: "preview_ready"
  },
  {
    id: "hajj-guide",
    titleBn: "হজ ও উমরাহ গাইড",
    titleEn: "Hajj & Umrah Guide",
    subtitleBn: "ধাপে ধাপে সম্পন্ন করার নিয়ম",
    subtitleEn: "Step-by-step guidance & rituals",
    emoji: "🕌",
    gradient: "from-yellow-600 via-amber-600 to-orange-900",
    category: "worship",
    status: "preview_ready"
  },
  {
    id: "qa",
    titleBn: "ইসলামিক প্রশ্নোত্তর",
    titleEn: "Islamic Q&A",
    subtitleBn: "দৈনন্দিন মাসআলা ও সমাধান",
    subtitleEn: "Daily rulings & solutions",
    emoji: "❓",
    gradient: "from-emerald-600 via-teal-800 to-cyan-900",
    category: "knowledge",
    status: "preview_ready"
  },
  {
    id: "prophets",
    titleBn: "নবী ও সাহাবিদের জীবনী",
    titleEn: "Lives of Prophets & Sahabah",
    subtitleBn: "অনুপ্রেরণাদায়ক জীবনী কথা",
    subtitleEn: "Inspirational life stories",
    emoji: "👳",
    gradient: "from-amber-700 via-orange-800 to-amber-950",
    category: "knowledge",
    status: "preview_ready"
  },
  {
    id: "daily-verse",
    titleBn: "দৈনিক আয়াত ও হাদিস",
    titleEn: "Daily Verse & Hadith",
    subtitleBn: "প্রতিদিনের আত্মশুদ্ধির বার্তা",
    subtitleEn: "Daily messages for spiritual growth",
    emoji: "📜",
    gradient: "from-teal-600 via-emerald-800 to-slate-900",
    category: "daily",
    status: "preview_ready"
  },
  {
    id: "tafseer",
    titleBn: "সহজ ভাষায় তাফসির",
    titleEn: "Easy Quran Tafseer",
    subtitleBn: "কুরআনের বিস্তারিত ব্যাখ্যা ও মর্মার্থ",
    subtitleEn: "Detailed explanation & wisdom of Quran",
    emoji: "📚",
    gradient: "from-emerald-800 via-teal-900 to-slate-950",
    category: "knowledge",
    status: "preview_ready"
  },
  {
    id: "stories",
    titleBn: "ইসলামিক গল্প ও শিক্ষা",
    titleEn: "Islamic Stories & Lessons",
    subtitleBn: "শিক্ষণীয় ঐতিহাসিক কাহিনী",
    subtitleEn: "Educational historical events",
    emoji: "📖",
    gradient: "from-yellow-600 via-amber-700 to-stone-900",
    category: "knowledge",
    status: "preview_ready"
  }
];

interface IslamicFeaturesSuiteProps {
  activeFeatureId?: string | null;
  onResetActiveFeature?: () => void;
}

export default function IslamicFeaturesSuite({
  activeFeatureId,
  onResetActiveFeature
}: IslamicFeaturesSuiteProps = {}) {
  const { t, language } = useLanguage();
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  useEffect(() => {
    if (activeFeatureId) {
      const match = ISLAMIC_FEATURES.find((f) => f.id === activeFeatureId);
      if (match) {
        setSelectedFeature(match);
      }
    }
  }, [activeFeatureId]);

  // Helper to get feature title & subtitle dynamically based on active language
  const getFeatureTitle = (feat: FeatureItem) => {
    return language === "bn" ? feat.titleBn : feat.titleEn;
  };

  const getFeatureSubtitle = (feat: FeatureItem) => {
    return language === "bn" ? feat.subtitleBn : (feat.subtitleEn || feat.subtitleBn);
  };

  // Digital Tasbih Interactive State
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihPhraseIndex, setTasbihPhraseIndex] = useState(0);
  const tasbihPhrases = [
    { ar: "سُبْحَانَ اللَّهِ", bn: "সুবহানাল্লাহ", en: "Glory be to Allah", target: 33 },
    { ar: "الْحَمْدُ لِلَّهِ", bn: "আলহামদুলিল্লাহ", en: "Praise be to Allah", target: 33 },
    { ar: "اللَّهُ أَكْبَرُ", bn: "আল্লাহু আকবার", en: "Allah is Greatest", target: 34 },
    { ar: "أَسْتَغْفِرُ اللَّهَ", bn: "আস্তাগফিরুল্লাহ", en: "I seek forgiveness from Allah", target: 100 }
  ];

  // Zakat Calculator Interactive State
  const [cashAmount, setCashAmount] = useState<string>("50000");
  const [goldGrams, setGoldGrams] = useState<string>("");
  const handleNumberInput = (val: string) => {
    return val.replace(/[^0-9]/g, "").replace(/^0+(?=\d)/, "");
  };
  const calculatedZakat = Math.round(
    ((Number(cashAmount) || 0) + (Number(goldGrams) || 0) * 9500) * 0.025
  );

  return (
    <section id="islamic-features" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-emerald-deep/60">
      
      {/* Background Decor */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-lux/30 bg-gold-lux/10 gold-text text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-lux animate-pulse" />
            <span className="font-semibold">{t("features_badge")}</span>
          </div>
          
          <h2 className="font-serif-lux text-2xl sm:text-3xl md:text-4xl text-white font-light tracking-wide mb-3">
            {t("features_title")}
          </h2>
          <p className="text-gray-300/80 text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed">
            {t("features_subtitle")}
          </p>
        </div>

        {/* 🟡 1. TOP CIRCULAR BADGES BAR (গোল গোল বাবল আইকন বার - Quick Tap Row) */}
        <div className="mb-12">
          <div className="text-center mb-4">
            <span className="text-[11px] uppercase tracking-widest text-gold-lux/70 font-sans font-medium">
              {t("feat_tap_circles")}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-4 pt-2 px-2 scrollbar-none justify-start md:justify-center">
            {ISLAMIC_FEATURES.map((feat) => (
              <motion.button
                key={feat.id}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFeature(feat)}
                className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
              >
                {/* Circular Golden Ring Container */}
                <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr ${feat.gradient} shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-2 border-gold-lux/40 group-hover:border-gold-lux group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center`}>
                  <div className="w-full h-full rounded-full bg-emerald-950/80 backdrop-blur-md flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                    {feat.emoji}
                  </div>
                  {/* Subtle Pulse Halo */}
                  <div className="absolute -inset-0.5 rounded-full border border-gold-lux/20 animate-ping pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDuration: '2s' }} />
                </div>

                {/* Circle Label */}
                <span className="mt-2 text-[11px] sm:text-xs text-emerald-100/90 font-sans font-medium max-w-[80px] sm:max-w-[90px] text-center line-clamp-1 group-hover:text-gold-lux transition-colors">
                  {getFeatureTitle(feat)}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 🎴 2. RICH GRID CARDS (বিস্তারিত ব্যাজ গ্রিড) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {ISLAMIC_FEATURES.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedFeature(feat)}
              className="group cursor-pointer relative bg-emerald-deep/80 backdrop-blur-md rounded-2xl p-4 border border-gold-lux/20 hover:border-gold-lux/60 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Background Gradient Accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${feat.gradient} opacity-20 rounded-bl-full group-hover:opacity-40 transition-opacity pointer-events-none`} />

              <div>
                {/* Emoji Circle */}
                <div className="w-12 h-12 rounded-full bg-emerald-900/80 border border-gold-lux/30 flex items-center justify-center text-2xl mb-3 shadow-inner group-hover:scale-110 transition-transform">
                  {feat.emoji}
                </div>

                <h3 className="text-white text-sm sm:text-base font-semibold font-sans mb-1 group-hover:text-gold-lux transition-colors">
                  {getFeatureTitle(feat)}
                </h3>
                <p className="text-emerald-100/60 text-[11px] sm:text-xs font-sans line-clamp-2 leading-relaxed">
                  {getFeatureSubtitle(feat)}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-gold-lux/10 flex items-center justify-between text-[10px] text-gold-lux font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-lux animate-pulse" />
                  {t("feat_view_preview")}
                </span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔔 UPCOMING RELEASE & ENHANCEMENT NOTICE (পরবর্তী আপডেট নোটিশ) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-2 border-gold-lux/60 p-5 sm:p-7 shadow-[0_0_35px_rgba(212,175,55,0.2)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-gold-lux/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 sm:gap-6 text-center md:text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gold-lux/20 border-2 border-gold-lux flex items-center justify-center text-gold-lux shrink-0 shadow-lg">
              <Settings className="w-8 h-8 animate-spin-slow" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-lux/15 border border-gold-lux/50 text-gold-lux text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>{language === "bn" ? "পরবর্তী আপডেট ও পূর্ণাঙ্গ সংস্করণ বার্তা (ইনশাআল্লাহ)" : "Upcoming Release & Development Notice (InshaAllah)"}</span>
              </div>
              <h4 className="text-base sm:text-xl font-serif-lux text-white font-semibold leading-snug">
                {language === "bn"
                  ? "পরবর্তী আপডেট চলছে—আরও অনেক নতুন ফিচার ও অসম্পূর্ণ কাজগুলো শীঘ্রই সম্পন্ন হবে (ইনশাআল্লাহ)"
                  : "Next Major Update in Progress—More Features & Complete Integration Coming Soon (InshaAllah)"}
              </h4>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans max-w-4xl">
                {language === "bn"
                  ? "আল দাওয়াহ অফিশিয়াল অ্যাপের এই ১৮টি ইসলামিক ফিচারের প্রাথমিক সংস্করণ চালু করা হয়েছে। বর্তমানে আমাদের অভিজ্ঞ ডেভেলপার টিম ও আলিম প্যানেলের তত্ত্বাবধানে পরবর্তী আপডেটের কাজ দ্রুতগতিতে এগিয়ে চলছে। ইনশাআল্লাহ, খুব শীঘ্রই প্রতিটি ফিচারের অডিও তেলাওয়াত, বিস্তারিত মাসআলা, অফলাইন ডাটাবেজ এবং অসম্পূর্ণ কাজগুলো পূর্ণাঙ্গ রূপে যুক্ত করা হবে। আপনাদের দোয়াই আমাদের প্রেরণা।"
                  : "We have launched the initial release of these 18 Islamic features. Under the guidance of our development team and scholarly panel, continuous updates are actively in progress. InshaAllah, upcoming updates will bring complete audio recitations, comprehensive rulings, offline databases, and full implementation of all remaining features very soon! Thank you for your patience and prayers."}
              </p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* 🚀 3. INTERACTIVE FEATURE PREVIEW MODAL / DRAWER */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center ${
              selectedFeature.id === "quran-audio" ? "p-0" : "p-3 sm:p-6"
            } overflow-y-auto`}
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full ${
                selectedFeature.id === "quran-audio"
                  ? "w-full h-full min-h-screen max-w-none max-h-none rounded-none border-0 p-0"
                  : "max-w-2xl p-5 sm:p-8 rounded-3xl border border-gold-lux/40 my-auto max-h-[92vh]"
              } bg-emerald-950 shadow-[0_0_50px_rgba(212,175,55,0.25)] overflow-hidden text-white overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background Ambient Glow */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${selectedFeature.gradient} opacity-30 rounded-bl-full blur-2xl pointer-events-none`} />

              {/* Close Button for standard modals */}
              {selectedFeature.id !== "quran-audio" && (
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-emerald-900/80 border border-gold-lux/30 text-gray-300 hover:text-white hover:border-gold-lux flex items-center justify-center transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Modal Header for standard modals */}
              {selectedFeature.id !== "quran-audio" && (
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-900 to-emerald-800 border-2 border-gold-lux/50 flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                    {selectedFeature.emoji}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-gold-lux/30 bg-gold-lux/10 text-gold-lux text-[10px] uppercase font-semibold tracking-wider mb-1">
                      <Sparkles className="w-3 h-3" />
                      {t("feat_interactive_preview_badge")}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif-lux text-white">
                      {getFeatureTitle(selectedFeature)}
                    </h3>
                    <p className="text-xs text-emerald-100/70 font-sans">
                      {selectedFeature.titleEn} • {getFeatureSubtitle(selectedFeature)}
                    </p>
                  </div>
                </div>
              )}

              {/* Dynamic Feature Sub-Component Previews */}
              <div className={`relative z-10 ${["quran-audio", "duas", "names", "allah-names", "hijri-calendar"].includes(selectedFeature.id) ? "p-0 m-0 border-0 bg-transparent" : "bg-emerald-900/40 border border-gold-lux/20 rounded-2xl p-4 sm:p-6 mb-6"}`}>
                
                {/* 1. DIGITAL TASBIH INTERACTIVE DEMO */}
                {selectedFeature.id === "tasbih" && (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center gap-2 mb-2 flex-wrap">
                      {tasbihPhrases.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => { setTasbihPhraseIndex(i); setTasbihCount(0); }}
                          className={`px-3 py-1 rounded-full text-xs font-sans transition-all ${tasbihPhraseIndex === i ? "bg-gold-lux text-emerald-950 font-bold" : "bg-emerald-900/60 text-gray-300 border border-gold-lux/20"}`}
                        >
                          {language === "bn" ? p.bn : p.en}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 bg-emerald-950/90 rounded-2xl border border-gold-lux/30 text-center">
                      <p className="text-2xl font-serif-lux text-gold-lux mb-1">
                        {tasbihPhrases[tasbihPhraseIndex].ar}
                      </p>
                      <p className="text-xs text-gray-300 font-sans">
                        {language === "bn" ? tasbihPhrases[tasbihPhraseIndex].bn : tasbihPhrases[tasbihPhraseIndex].en}
                      </p>
                    </div>

                    {/* Digital Display Counter */}
                    <div className="relative w-36 h-36 mx-auto rounded-full bg-gradient-to-b from-emerald-900 to-emerald-950 border-4 border-gold-lux shadow-[0_0_30px_rgba(212,175,55,0.3)] flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                      onClick={() => setTasbihCount((prev) => prev + 1)}
                    >
                      <span className="text-4xl font-extrabold text-gold-lux font-mono">
                        {tasbihCount}
                      </span>
                      <span className="text-[10px] text-emerald-200/60 font-sans uppercase">
                        {t("feat_tap_to_count")}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => setTasbihCount(0)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 text-xs hover:bg-red-900/80 font-sans"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> {t("feat_reset")}
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. ALLAH 99 NAMES SUITE */}
                {selectedFeature.id === "allah-names" && (
                  <div className="w-full">
                    <AsmaulHusnaView />
                  </div>
                )}

                {/* 3. PRAYER TIMES DEMO */}
                {selectedFeature.id === "prayer-times" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gold-lux font-sans border-b border-gold-lux/20 pb-2">
                      <span>{language === "bn" ? "স্থান: ঢাকা, বাংলাদেশ" : "Location: Dhaka, Bangladesh"}</span>
                      <span>{language === "bn" ? "আজকের তারিখ: ১৫ মহররম, ১৪৪৮ হিজরি" : "Date: 15 Muharram, 1448 Hijri"}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                      <div className="p-2.5 bg-emerald-950/80 border border-gold-lux/20 rounded-xl">
                        <span className="block text-gray-400 text-[10px]">{language === "bn" ? "ফজর" : "Fajr"}</span>
                        <span className="block font-bold text-gold-lux mt-1">০৪:১৫ AM</span>
                      </div>
                      <div className="p-2.5 bg-emerald-950/80 border border-gold-lux/20 rounded-xl">
                        <span className="block text-gray-400 text-[10px]">{language === "bn" ? "জোহর" : "Dhuhr"}</span>
                        <span className="block font-bold text-gold-lux mt-1">১২:০৫ PM</span>
                      </div>
                      <div className="p-2.5 bg-emerald-950/80 border border-gold-lux/20 rounded-xl">
                        <span className="block text-gray-400 text-[10px]">{language === "bn" ? "আসর" : "Asr"}</span>
                        <span className="block font-bold text-gold-lux mt-1">০৪:৩০ PM</span>
                      </div>
                      <div className="p-2.5 bg-emerald-950/80 border border-gold-lux/20 rounded-xl">
                        <span className="block text-gray-400 text-[10px]">{language === "bn" ? "মাগরিব" : "Maghrib"}</span>
                        <span className="block font-bold text-gold-lux mt-1">০৬:৪৫ PM</span>
                      </div>
                      <div className="p-2.5 bg-emerald-950/80 border border-gold-lux/20 rounded-xl">
                        <span className="block text-gray-400 text-[10px]">{language === "bn" ? "এশা" : "Isha"}</span>
                        <span className="block font-bold text-gold-lux mt-1">০৮:০৫ PM</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. ZAKAT CALCULATOR DEMO */}
                {selectedFeature.id === "zakat" && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-300 block mb-1 font-sans">
                          {language === "bn" ? "নগদ টাকা ও ব্যাংক ব্যালেন্স (টাকা):" : "Cash & Bank Balance (in BDT):"}
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={cashAmount}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setCashAmount(handleNumberInput(e.target.value))}
                          placeholder="0"
                          className="w-full bg-emerald-950 border border-gold-lux/30 rounded-xl px-3 py-2 text-sm text-gold-lux outline-none focus:border-gold-lux"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-300 block mb-1 font-sans">
                          {language === "bn" ? "স্বর্ণ বা গহনা (গ্রাম হিসেবে):" : "Gold / Jewelry (in Grams):"}
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={goldGrams}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setGoldGrams(handleNumberInput(e.target.value))}
                          placeholder="0"
                          className="w-full bg-emerald-950 border border-gold-lux/30 rounded-xl px-3 py-2 text-sm text-gold-lux outline-none focus:border-gold-lux"
                        />
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-950/90 border border-gold-lux/40 rounded-xl text-center">
                      <span className="text-xs text-gray-300 block">
                        {language === "bn" ? "আপনার আনুমানিক দেওয় যাকাতের পরিমাণ (২.৫%):" : "Your estimated Zakat payable (2.5%):"}
                      </span>
                      <span className="text-2xl font-bold text-gold-lux font-mono mt-1 block">
                        ৳ {calculatedZakat.toLocaleString()} {language === "bn" ? "টাকা" : "BDT"}
                      </span>
                    </div>
                  </div>
                )}

                {/* 5. ISLAMIC BABY NAMES SUITE (80+ NAMES) */}
                {selectedFeature.id === "names" && (
                  <div className="w-full">
                    <IslamicBabyNamesView />
                  </div>
                )}

                {/* 6. HOLY QURAN DEMO */}
                {selectedFeature.id === "quran" && (
                  <div className="text-center space-y-4">
                    <div className="p-4 bg-emerald-950/90 rounded-2xl border border-gold-lux/40 text-center">
                      <span className="text-xs text-gold-lux font-semibold uppercase tracking-widest block mb-2">
                        {language === "bn" ? "সূরা আল-ফাতিহা (আয়াত ১ - ৩)" : "Surah Al-Fatihah (Verses 1 - 3)"}
                      </span>
                      <p className="text-2xl font-serif-lux text-gold-lux mb-2 leading-loose">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
                      </p>
                      <p className="text-xs text-emerald-100 font-sans leading-relaxed">
                        {language === "bn" ? '"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে শুরু করছি। সমস্ত প্রশংসা বিশ্বজগতের প্রতিপালক আল্লাহর জন্য।"' : '"In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the worlds."'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedFeature(null);
                        const element = document.getElementById("quran");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl gold-gradient text-emerald-deep font-bold text-xs shadow-lg hover:brightness-110 transition-all inline-flex items-center gap-2 cursor-pointer font-sans"
                    >
                      <span>{t("feat_go_to_quran")}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* 7. SAHIH HADITH DEMO */}
                {selectedFeature.id === "hadith" && (
                  <div className="text-center space-y-4">
                    <div className="p-4 bg-emerald-950/90 rounded-2xl border border-gold-lux/40 text-center">
                      <span className="text-xs text-gold-lux font-semibold uppercase tracking-widest block mb-2">
                        {language === "bn" ? "সহিহ বুখারী • হাদিস ১" : "Sahih Bukhari • Hadith 1"}
                      </span>
                      <p className="text-xl font-serif-lux text-gold-lux mb-2 leading-relaxed">
                        إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
                      </p>
                      <p className="text-xs text-emerald-100 font-sans leading-relaxed">
                        {language === "bn" ? '"সকল কাজই নিয়তের উপর নির্ভরশীল এবং প্রত্যেক মানুষ তার নিয়ত অনুযায়ী প্রতিদান পাবে।"' : '"Actions are judged by intentions, and every person will get what was intended."'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedFeature(null);
                        const element = document.getElementById("hadith");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl gold-gradient text-emerald-deep font-bold text-xs shadow-lg hover:brightness-110 transition-all inline-flex items-center gap-2 cursor-pointer font-sans"
                    >
                      <span>{t("feat_go_to_hadith")}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* 8. QURAN AUDIO DEMO */}
                {selectedFeature.id === "quran-audio" && (
                  <div className="w-full">
                    <QuranAudioSection onClose={() => setSelectedFeature(null)} />
                  </div>
                )}

                {/* 9. QIBLA COMPASS DEMO */}
                {selectedFeature.id === "qibla-finder" && (
                  <div className="w-full">
                    <QiblaCompassView />
                  </div>
                )}

                {/* 10. ISLAMIC CAMPUS & COURSES DEMO */}
                {selectedFeature.id === "campus" && (
                  <div className="w-full">
                    <IslamicCampusView />
                  </div>
                )}

                {/* 11. 500+ MASNOON DUAS SUITE */}
                {selectedFeature.id === "duas" && (
                  <div className="w-full">
                    <MasnoonDuasView />
                  </div>
                )}

                {/* 12. HIJRI CALENDAR & EVENTS SUITE */}
                {selectedFeature.id === "hijri-calendar" && (
                  <div className="w-full">
                    <HijriCalendarView />
                  </div>
                )}

                {/* 13. HAJJ & UMRAH GUIDE SUITE */}
                {selectedFeature.id === "hajj-guide" && (
                  <div className="w-full">
                    <HajjUmrahGuideView />
                  </div>
                )}

                {/* 14. ISLAMIC Q&A SUITE */}
                {selectedFeature.id === "qa" && (
                  <div className="w-full">
                    <IslamicQAView />
                  </div>
                )}

                {/* 15. PROPHETS & SAHABAH SUITE */}
                {selectedFeature.id === "prophets" && (
                  <div className="w-full">
                    <ProphetsSahabahView />
                  </div>
                )}

                {/* 16. DAILY VERSE & HADITH SUITE */}
                {selectedFeature.id === "daily-verse" && (
                  <div className="w-full">
                    <DailyVerseHadithView />
                  </div>
                )}

                {/* 17. EASY TAFSEER SUITE */}
                {selectedFeature.id === "tafseer" && (
                  <div className="w-full">
                    <EasyTafseerView />
                  </div>
                )}

                {/* 18. ISLAMIC STORIES SUITE */}
                {selectedFeature.id === "stories" && (
                  <div className="w-full">
                    <IslamicStoriesView />
                  </div>
                )}

                {/* DEFAULT PREVIEW FOR OTHER FEATURES */}
                {!["quran", "hadith", "quran-audio", "qibla-finder", "campus", "tasbih", "allah-names", "hijri-calendar", "prayer-times", "zakat", "names", "duas", "hajj-guide", "qa", "prophets", "daily-verse", "tafseer", "stories"].includes(selectedFeature.id) && (
                  <div className="text-center py-6 px-4 space-y-4 bg-emerald-950/80 rounded-3xl border border-gold-lux/40 max-w-lg mx-auto my-4 shadow-xl">
                    <div className="w-14 h-14 rounded-full bg-gold-lux/15 border border-gold-lux flex items-center justify-center mx-auto text-gold-lux shadow-lg">
                      <RefreshCw className="w-7 h-7 animate-spin-slow" />
                    </div>
                    <div className="space-y-1">
                      <span className="inline-block px-3 py-1 rounded-full bg-gold-lux/20 text-gold-lux text-xs font-bold uppercase tracking-wider">
                        {language === "bn" ? "পরবর্তী আপডেট চলছে (ইনশাআল্লাহ)" : "Next Update in Progress (InshaAllah)"}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-white font-serif-lux">
                        {getFeatureTitle(selectedFeature)} {language === "bn" ? "• পূর্ণাঙ্গ সংস্করণ আসছে" : "• Upcoming Full Release"}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-200 max-w-md mx-auto leading-relaxed font-sans">
                      {language === "bn"
                        ? "এই ফিচারটির প্রাথমিক লেআউট ও কাঠামো প্রস্তুত করা হয়েছে। বর্তমানে আমাদের ডেভেলপার টিম ও আলিম প্যানেলের তত্ত্বাবধানে এর বিস্তারিত ডেটাবেজ, অডিও এবং অসম্পূর্ণ কাজগুলো যুক্ত করার কাজ দ্রুতগতিতে চলছে। ইনশাআল্লাহ, পরবর্তী আপডেটে এটি সম্পূর্ণ ব্যবহারযোগ্য হবে।"
                        : "The structural layout for this feature is complete. Our development team is actively integrating comprehensive data, audio, and remaining features. InshaAllah, it will be fully operational in the upcoming release."}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-900/60 border border-gold-lux/30 text-gold-lux text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        {language === "bn" ? "আপনাদের দোয়াই আমাদের প্রেরণা" : "Thank you for your patience & prayers"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Upcoming Update Banner Inside Every Modal */}
                <div className="mt-6 p-4 rounded-2xl bg-emerald-950/90 border border-gold-lux/40 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-gold-lux/15 border border-gold-lux/40 flex items-center justify-center text-gold-lux shrink-0">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-gold-lux uppercase tracking-wider block">
                      {language === "bn" ? "পরবর্তী আপডেট ও পূর্ণাঙ্গ সংস্করণ বার্তা (ইনশাআল্লাহ)" : "Upcoming Enhancement Notice (InshaAllah)"}
                    </span>
                    <p className="text-xs text-gray-200 leading-relaxed font-sans mt-0.5">
                      {language === "bn"
                        ? "এই ফিচারসহ অ্যাপের সকল বিভাগে পরবর্তী আপডেটের কাজ চলছে। খুব শীঘ্রই আরও অনেক নতুন ফিচার, অডিও তেলাওয়াত, মাসআলা ও অসম্পূর্ণ কাজগুলো পূর্ণাঙ্গ রূপে সম্পন্ন করা হবে। আপনাদের দোয়াই আমাদের প্রেরণা।"
                        : "Continuous development update in progress. Upcoming releases will bring more comprehensive features, full audio recitations, rulings, and complete integration very soon!"}
                    </p>
                  </div>
                </div>

              </div>

              {/* Modal Footer Note */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-gray-400 border-t border-gold-lux/15">
                <span className="flex items-center gap-1.5 text-gold-lux">
                  <Award className="w-4 h-4" />
                  {language === "bn" ? "আল দাওয়াহ অফিশিয়াল ফিউচার সার্ভিস সংস্করণ ১.০" : "Al Dawah Official Future Services v1.0"}
                </span>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="px-5 py-2 rounded-xl bg-gold-lux text-emerald-950 font-bold hover:bg-yellow-400 transition-colors shadow-md w-full sm:w-auto cursor-pointer"
                >
                  {language === "bn" ? "ঠিক আছে (বন্ধ করুন)" : "OK (Close)"}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
