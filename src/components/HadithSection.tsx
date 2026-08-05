import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  Search,
  Bookmark,
  Copy,
  Check,
  Award,
  Sparkles,
  Heart,
  BookOpen,
  ChevronRight,
  ArrowLeft,
  X,
  Share2
} from "lucide-react";
import { hadithsData } from "../data/hadithsData";
import { Hadith } from "../types";

export default function HadithSection() {
  const { t, language } = useLanguage();
  const [isOpened, setIsOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [bookmarkedHadithIds, setBookmarkedHadithIds] = useState<number[]>([]);
  const [copiedHadithId, setCopiedHadithId] = useState<number | null>(null);

  // Load Bookmarks and check URL parameters for direct Hadith / Topic links
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aldawah_bookmarked_hadiths");
      if (saved) {
        setBookmarkedHadithIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load hadith bookmarks", e);
    }

    // Check URL parameters like ?hadith=qurbani or ?topic=কুরবানী or ?h=16
    try {
      const params = new URLSearchParams(window.location.search);
      const hadithQuery = params.get("hadith") || params.get("topic") || params.get("h");

      if (hadithQuery) {
        const decoded = decodeURIComponent(hadithQuery).trim();
        setIsOpened(true);
        setSearchQuery(decoded);

        // Smooth scroll to Hadith section
        setTimeout(() => {
          const el = document.getElementById("hadith");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      }
    } catch (e) {
      console.error("Error parsing Hadith URL param", e);
    }
  }, []);

  // Sync search query changes with URL search parameter
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    try {
      const url = new URL(window.location.href);
      if (value.trim()) {
        url.searchParams.set("hadith", value.trim());
      } else {
        url.searchParams.delete("hadith");
      }
      window.history.replaceState({}, "", url.toString());
    } catch (e) {
      console.error("Failed to update URL param", e);
    }
  };

  // Bookmark toggler
  const toggleBookmark = (id: number) => {
    const updated = bookmarkedHadithIds.includes(id)
      ? bookmarkedHadithIds.filter((bid) => bid !== id)
      : [...bookmarkedHadithIds, id];
    
    setBookmarkedHadithIds(updated);
    localStorage.setItem("aldawah_bookmarked_hadiths", JSON.stringify(updated));
  };

  // Copy helper with direct link
  const copyHadith = (hadith: Hadith) => {
    const directLink = `${window.location.origin}${window.location.pathname}?hadith=${encodeURIComponent(hadith.category.split(" (")[0])}`;
    const text = `[Al Dawah Sahih Hadith - ${hadith.source}]\nCategory: ${hadith.category}\n\nArabic: ${hadith.textAr}\n\nBangali: ${hadith.textBn}\n\nEnglish: ${hadith.textEn}\n\nGrade: ${hadith.grade}\n\nRead more at: ${directLink}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedHadithId(hadith.id);
      setTimeout(() => setCopiedHadithId(null), 2000);
    });
  };

  // Extract unique categories for filter tabs
  const categories = ["All", ...Array.from(new Set(hadithsData.map((h) => h.category.split(" (")[0])))];

  // Filtering logic
  const filteredHadiths = hadithsData.filter((hadith) => {
    const matchesSearch =
      hadith.textBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.textEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.textAr.includes(searchQuery) ||
      hadith.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      hadith.category.startsWith(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="hadith" className={`relative py-24 px-6 bg-transparent transition-all duration-300 ${isOpened ? "z-50" : "z-10"}`}>
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gold-lux/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-lux/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="font-serif-lux text-gold-lux text-xs tracking-[0.4em] uppercase block mb-3">
            Sahih Hadith
          </span>
          <h2 className="font-serif-lux text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 tracking-wider">
            {t("hadith_heading")}
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold-lux to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base font-sans leading-relaxed">
            {t("hadith_subheading")}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="closed-hadith-cta"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto mt-6"
            >
              <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-gold-lux/20 text-center relative overflow-hidden group shadow-[0_0_50px_rgba(212,175,55,0.05)] bg-emerald-deep/40">
                {/* Glowing Background Effect */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold-lux/10 rounded-full blur-3xl pointer-events-none group-hover:bg-gold-lux/20 transition-all duration-500" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-lux/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-lux/20 transition-all duration-500" />
                
                {/* Icon Container */}
                <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full border border-gold-lux/40 bg-emerald-lux/10 shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:border-gold-lux group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10 text-gold-lux group-hover:scale-110 transition-transform duration-500"
                  >
                    {/* Background Islamic Star outline */}
                    <path d="M12 2l2.4 2.4L18 4l.4 3.6L22 10l-2.4 2.4.4 3.6-3.6.4-2.4 2.4-2.4-2.4-3.6-.4-.4-3.6L2 10l2.4-2.4L4 4l3.6-.4z" stroke="currentColor" strokeWidth="0.8" opacity="0.25" strokeDasharray="2 2" />
                    {/* The Scroll of Prophet's sayings */}
                    <path d="M16 5V19c0 1.1-.9 2-2 2H10c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2z" fill="currentColor" fillOpacity="0.05" strokeWidth="1.5" />
                    {/* Scroll Rolls */}
                    <path d="M6 5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2s-.9 2-2 2H8c-1.1 0-2-.9-2-2z" strokeWidth="1.5" />
                    <path d="M6 19c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2s-.9 2-2 2H8c-1.1 0-2-.9-2-2z" strokeWidth="1.5" />
                    {/* Writing / Sayings scripture lines inside */}
                    <path d="M10 10h4M10 13h4M11 16h2" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border border-gold-lux/20 animate-ping pointer-events-none" style={{ animationDuration: "4s" }} />
                </div>

                <h3 className="font-serif-lux text-2xl font-light text-white mb-3 tracking-wide">
                  {t("hadith_card_title")}
                </h3>
                <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed font-sans">
                  {t("hadith_card_desc")}
                </p>

                <button
                  onClick={() => setIsOpened(true)}
                  className="relative px-8 py-4 bg-gradient-to-r from-gold-lux via-gold-light to-gold-lux text-emerald-deep font-semibold rounded-full text-base tracking-widest shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] active:scale-98 transition-all duration-300 cursor-pointer overflow-hidden group/btn flex items-center gap-3 mx-auto font-sans"
                  id="open-hadith-btn"
                >
                  <span className="relative z-10 tracking-wider">{t("hadith_open_btn")}</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened-hadith-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 bg-[#02140d]/98 backdrop-blur-xl text-gray-100 flex flex-col overflow-hidden font-sans"
            >
              {/* FIXED TOP BAR */}
              <div className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:p-6 border-b border-gold-lux/10 bg-[#032317]/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gold-lux/30 bg-gold-lux/5 flex items-center justify-center text-gold-lux shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-gold-lux animate-pulse"
                    >
                      {/* The Scroll of Prophet's sayings */}
                      <path d="M16 5V19c0 1.1-.9 2-2 2H10c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2z" fill="currentColor" fillOpacity="0.05" strokeWidth="1.5" />
                      {/* Scroll Rolls */}
                      <path d="M6 5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2s-.9 2-2 2H8c-1.1 0-2-.9-2-2z" strokeWidth="1.5" />
                      <path d="M6 19c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2s-.9 2-2 2H8c-1.1 0-2-.9-2-2z" strokeWidth="1.5" />
                      {/* Writing / Sayings scripture lines inside */}
                      <path d="M10 10h4M10 13h4M11 16h2" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h2 className="font-serif-lux text-base sm:text-lg font-bold text-white tracking-wide">
                      {t("hadith_top_title")}
                    </h2>
                    <p className="text-[10px] text-gray-400 font-sans">
                      {t("hadith_top_sub")}
                    </p>
                  </div>
                </div>

                {/* Back / Close button */}
                <button
                  onClick={() => setIsOpened(false)}
                  className="group flex items-center gap-2 px-4 py-2 border border-gold-lux/40 hover:border-gold-lux rounded-full bg-emerald-deep/80 text-gold-lux hover:text-white text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 cursor-pointer font-sans shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:scale-105 active:scale-95"
                  title={t("quran_back_btn")}
                >
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-gold-lux" />
                  <span>{t("quran_back_btn")}</span>
                </button>
              </div>

              {/* SCROLLABLE MAIN CONTENT */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full relative z-10">
                {/* Decorative Glowing Elements */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-gold-lux/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-emerald-lux/10 rounded-full blur-3xl pointer-events-none" />

                {/* Filters and Search Bar Container */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 relative z-10">
                  {/* Search box */}
                  <div className="relative w-full md:w-80">
                    <input
                      type="text"
                      placeholder={t("hadith_search_ph")}
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full bg-emerald-deep/40 backdrop-blur-md text-white border border-gold-lux/15 rounded-xl px-4 py-2.5 pl-11 text-sm outline-none focus:border-gold-lux transition-all placeholder:text-gray-500 font-sans"
                    />
                    <Search className="absolute left-4 top-3 w-4 h-4 text-gold-lux/60" />
                  </div>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-serif-lux tracking-wider border transition-all duration-300 cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-gold-lux text-emerald-deep border-gold-lux font-semibold"
                            : "bg-emerald-deep/30 border-gold-lux/10 text-gray-400 hover:text-white hover:border-gold-lux/30"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hadith List Grid */}
                <div className="grid grid-cols-1 gap-8 text-left relative z-10">
                  <AnimatePresence mode="popLayout">
                    {filteredHadiths.map((hadith, index) => {
                      const isBookmarked = bookmarkedHadithIds.includes(hadith.id);
                      const isCopied = copiedHadithId === hadith.id;

                      return (
                        <motion.div
                          key={hadith.id}
                          layout
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.6, delay: index * 0.05 }}
                          className="glass-panel rounded-2xl p-6 md:p-8 border border-gold-lux/15 flex flex-col gap-6 relative group overflow-hidden bg-[#032317]/40"
                        >
                          {/* Category and Source Header */}
                          <div className="flex justify-between items-center gap-4 border-b border-gold-lux/10 pb-4">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-gold-lux animate-pulse" />
                              <span className="text-xs uppercase font-serif-lux tracking-widest text-gold-light font-semibold">
                                {hadith.category}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-[10px] bg-gold-lux/10 border border-gold-lux/20 text-gold-lux px-2 py-0.5 rounded-md font-sans">
                                {hadith.grade}
                              </span>

                              {/* Action buttons */}
                              <div className="flex gap-1.5">
                                {/* Copy */}
                                <button
                                  onClick={() => copyHadith(hadith)}
                                  className="p-1.5 hover:text-gold-lux text-gray-400 transition-colors cursor-pointer rounded-lg bg-emerald-deep/30 border border-gold-lux/10 hover:border-gold-lux/30"
                                  title="Copy Hadith"
                                >
                                  {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>

                                {/* Bookmark */}
                                <button
                                  onClick={() => toggleBookmark(hadith.id)}
                                  className="p-1.5 hover:text-gold-lux text-gray-400 transition-colors cursor-pointer rounded-lg bg-emerald-deep/30 border border-gold-lux/10 hover:border-gold-lux/30"
                                  title="Bookmark Hadith"
                                >
                                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-gold-lux text-gold-lux" : ""}`} />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Arabic Text */}
                          <div className="text-right py-2">
                            <p className="font-arabic text-right text-white select-all text-2xl md:text-3xl leading-relaxed tracking-wide font-medium" dir="rtl">
                              {hadith.textAr}
                            </p>
                          </div>

                          {/* Translations stack */}
                          <div className="flex flex-col gap-4 pl-4 border-l-2 border-gold-lux/20">
                            {language === "en" ? (
                              <>
                                <div className="font-sans text-sm md:text-base text-gold-light/95 leading-relaxed">
                                  <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-gold-lux mr-2 block mb-1">
                                    {t("hadith_english_trans")}
                                  </span>
                                  {hadith.textEn}
                                </div>
                                <div className="font-bengali text-xs md:text-sm text-gray-300 leading-relaxed">
                                  <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-gold-lux/70 mr-2 block mb-1">
                                    {t("hadith_bengali_trans")}
                                  </span>
                                  {hadith.textBn}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="font-bengali text-sm md:text-base text-gold-light/95 leading-relaxed">
                                  <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-gold-lux mr-2 block mb-1">
                                    {t("hadith_bengali_trans")}
                                  </span>
                                  {hadith.textBn}
                                </div>
                                <div className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed italic">
                                  <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-gold-lux/70 mr-2 block mb-1 not-italic">
                                    {t("hadith_english_trans")}
                                  </span>
                                  {hadith.textEn}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Reference footer */}
                          <div className="mt-2 pt-4 border-t border-gold-lux/10 flex justify-between items-center text-[11px] text-gray-400 font-sans">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-3.5 h-3.5 text-gold-lux/60" />
                              <span>{hadith.source}</span>
                            </div>
                            <span className="text-gold-lux/40 select-none">Al Dawah Selected Hadith</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {filteredHadiths.length === 0 && (
                    <div className="text-center py-16 px-4 glass-panel rounded-2xl border border-gold-lux/15">
                      <p className="font-serif-lux text-gold-light text-base tracking-widest animate-pulse">
                        No Hadiths found matching "{searchQuery}"
                      </p>
                      <p className="text-xs text-gray-500 mt-2 font-sans">
                        Try searching using another keyword like 'নিয়ত', 'চরিত্র', 'সালাত' or 'faith'.
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom return button to collapse */}
                <div className="flex justify-center mt-12 mb-8 relative z-10">
                  <button
                    onClick={() => setIsOpened(false)}
                    className="flex items-center gap-2 px-6 py-3 border border-gold-lux/30 hover:border-gold-lux rounded-full bg-[#032317]/80 text-gold-lux hover:text-white text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer font-sans shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:scale-105"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t("hadith_back_btn")}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
