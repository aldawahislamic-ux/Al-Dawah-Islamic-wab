import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  Sparkles,
  BookOpen,
  BookMarked,
  Heart,
  Compass,
  Baby,
  ArrowRight,
  Filter,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
  searchGlobalIslamicData,
  GlobalSearchResult,
  SearchResultType
} from "../lib/globalSearchEngine";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: GlobalSearchResult) => void;
  initialQuery?: string;
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
  onSelectResult,
  initialQuery = ""
}: GlobalSearchModalProps) {
  const { language } = useLanguage();
  const isBn = language === "bn";

  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialQuery]);

  const rawResults = searchGlobalIslamicData(query);

  const filteredResults = rawResults.filter((res) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "allah_name") return res.type === "allah_name";
    if (activeFilter === "baby_name") return res.type === "baby_name";
    if (activeFilter === "surah") return res.type === "surah";
    if (activeFilter === "hadith") return res.type === "hadith";
    if (activeFilter === "dua") return res.type === "dua";
    if (activeFilter === "feature") return res.type === "feature";
    return true;
  });

  if (!isOpen) return null;

  const quickSearchTags = [
    { labelBn: "আল্লাহর ৯৯ নাম", labelEn: "99 Names of Allah", query: "আর-রহমান" },
    { labelBn: "বাচ্চাদের নাম", labelEn: "Baby Names", query: "মুহাম্মদ" },
    { labelBn: "সূরা ইয়াসীন", labelEn: "Surah Yaseen", query: "ইয়াসীন" },
    { labelBn: "সহিহ হাদিস", labelEn: "Sahih Hadith", query: "নিয়ত" },
    { labelBn: "মাসনুন দোয়া", labelEn: "Masnoon Duas", query: "সাইয়্যিদুল ইস্তিগফার" },
    { labelBn: "কিবলা দিক", labelEn: "Qibla Direction", query: "কিবলা" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 pt-16 sm:pt-20">
      <div className="bg-emerald-950 border-2 border-gold-lux/60 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-[0_0_60px_rgba(212,175,55,0.3)] relative text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-gold-lux/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-lux/20 border border-gold-lux flex items-center justify-center text-gold-lux shrink-0">
            <Search className="w-5 h-5 animate-pulse" />
          </div>

          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isBn
                  ? "যে কোনো ভাষায় সার্চ করুন (যেমন: রহমান, Muhammad, ইয়াসীন, দোয়া, হাদিস, কিবলা...)"
                  : "Search anything in any language (e.g., Ar-Rahman, Aisha, Yaseen, Hadith, Dua...)"
              }
              className="w-full bg-emerald-900/60 border border-gold-lux/40 rounded-2xl py-3 px-4 text-sm sm:text-base text-white placeholder:text-gray-400 focus:outline-none focus:border-gold-lux focus:ring-2 focus:ring-gold-lux/30 transition-all font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 border border-gold-lux/30 flex items-center justify-center text-gray-300 hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Tag Pills */}
        <div className="px-4 sm:px-6 py-3 bg-emerald-950/90 border-b border-gold-lux/15 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-gold-lux uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {isBn ? "জনপ্রিয় সার্চ:" : "Popular Search:"}
          </span>
          {quickSearchTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(tag.query)}
              className="px-2.5 py-1 rounded-full bg-emerald-900/50 hover:bg-gold-lux hover:text-emerald-950 border border-gold-lux/30 text-xs font-semibold text-gray-300 transition-all shrink-0 cursor-pointer"
            >
              {isBn ? tag.labelBn : tag.labelEn}
            </button>
          ))}
        </div>

        {/* Type Category Filter Tabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-emerald-950 border-b border-gold-lux/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: "all", bn: "সব ফলাফল", en: "All Results", count: rawResults.length },
            { id: "allah_name", bn: "আল্লাহর ৯৯ নাম", en: "99 Names", count: rawResults.filter((r) => r.type === "allah_name").length },
            { id: "baby_name", bn: "বাচ্চাদের নাম", en: "Baby Names", count: rawResults.filter((r) => r.type === "baby_name").length },
            { id: "surah", bn: "কুরআন সূরা", en: "Surahs", count: rawResults.filter((r) => r.type === "surah").length },
            { id: "hadith", bn: "হাদিস শরীফ", en: "Hadiths", count: rawResults.filter((r) => r.type === "hadith").length },
            { id: "dua", bn: "দোয়া ও জিকির", en: "Duas", count: rawResults.filter((r) => r.type === "dua").length },
            { id: "feature", bn: "ফিচারসমূহ", en: "Features", count: rawResults.filter((r) => r.type === "feature").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                activeFilter === tab.id
                  ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-sm"
                  : "bg-emerald-900/40 text-gray-300 border-gold-lux/20 hover:border-gold-lux/40"
              }`}
            >
              <span>{isBn ? tab.bn : tab.en}</span>
              {tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeFilter === tab.id ? "bg-emerald-950 text-gold-lux" : "bg-emerald-950 text-gold-lux"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results List View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {!query ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gold-lux/15 border border-gold-lux/40 flex items-center justify-center mx-auto text-gold-lux shadow-md">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold font-serif-lux text-gold-lux">
                {isBn ? "কুরআন, হাদিস, আল্লাহর নাম ও ইসলামিক নাম খুঁজুন" : "Search Holy Quran, Hadiths, Allah's Names & Baby Names"}
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                {isBn
                  ? "যে কোনো ভাষায় (বাংলা, আরবি বা ইংলিশ) সার্চ দিন। রেজাল্টে ক্লিক করলে সরাসরি সংশ্লিষ্ট বিষয় বা পেজে নিয়ে যাওয়া হবে।"
                  : "Type in any language (Bangla, English, Arabic). Clicking any result instantly takes you to that feature."}
              </p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-400/30 flex items-center justify-center mx-auto text-red-400">
                <HelpCircle className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white">
                {isBn ? `"${query}" সম্পর্কিত কোনো ফলাফল পাওয়া যায়নি` : `No results found for "${query}"`}
              </h4>
              <p className="text-xs text-gray-400">
                {isBn
                  ? "অনুগ্রহ করে বানান পরিবর্তন করে চেষ্টা করুন (যেমন: রহমান, মুহাম্মদ, ইয়াসীন, দোয়া)"
                  : "Please check your spelling or try searching generic words like 'Hadith', 'Rahman', 'Quran'"}
              </p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectResult(item);
                  onClose();
                }}
                className="p-4 rounded-2xl bg-emerald-900/40 hover:bg-emerald-900/80 border border-gold-lux/20 hover:border-gold-lux/60 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group shadow-sm"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  {/* Icon / Type Badge */}
                  <div className="w-11 h-11 rounded-xl bg-gold-lux/15 border border-gold-lux/40 flex items-center justify-center text-gold-lux shrink-0 group-hover:bg-gold-lux group-hover:text-emerald-950 transition-colors">
                    {item.type === "allah_name" && <Sparkles className="w-5 h-5" />}
                    {item.type === "baby_name" && <Baby className="w-5 h-5" />}
                    {item.type === "surah" && <BookOpen className="w-5 h-5" />}
                    {item.type === "hadith" && <BookMarked className="w-5 h-5" />}
                    {item.type === "dua" && <Heart className="w-5 h-5" />}
                    {item.type === "feature" && <Compass className="w-5 h-5" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-bold text-gold-lux group-hover:text-white transition-colors font-serif-lux">
                        {isBn ? item.categoryBn : item.categoryEn}
                      </span>
                      {item.badgeText && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-gold-lux/30 text-emerald-300 text-[10px] font-semibold">
                          {item.badgeText}
                        </span>
                      )}
                    </div>

                    <h5 className="text-sm sm:text-base font-bold text-white group-hover:text-gold-lux transition-colors font-serif-lux truncate">
                      {isBn ? item.titleBn : item.titleEn}
                    </h5>

                    <p className="text-xs text-gray-300 mt-0.5 truncate font-sans">
                      {isBn ? item.subtitleBn : item.subtitleEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.arabic && (
                    <span className="hidden sm:inline-block text-base font-serif-lux text-gold-lux/90 bg-black/30 px-2.5 py-1 rounded-lg border border-gold-lux/20">
                      {item.arabic}
                    </span>
                  )}
                  <div className="w-8 h-8 rounded-full bg-gold-lux/15 border border-gold-lux/40 flex items-center justify-center text-gold-lux group-hover:bg-gold-lux group-hover:text-emerald-950 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-emerald-950 border-t border-gold-lux/20 flex items-center justify-between text-xs text-gray-400">
          <span>
            {isBn ? `মোট ${filteredResults.length}টি ফলাফল পাওয়া গেছে` : `Found ${filteredResults.length} matching items`}
          </span>
          <span className="text-gold-lux font-semibold">
            {isBn ? "ক্লিক করলে সরাসরি বিস্তারিত পেজে নিয়ে যাবে" : "Click any item to navigate directly"}
          </span>
        </div>
      </div>
    </div>
  );
}
