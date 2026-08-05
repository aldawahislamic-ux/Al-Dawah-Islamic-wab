import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  Search,
  Filter,
  Bookmark,
  BookOpen,
  Sparkles,
  Copy,
  Check,
  Sun,
  Moon,
  ChevronRight,
  X,
  Share2,
  AlertCircle,
  Play,
  Pause,
  Loader2,
  Volume2,
  ArrowLeft
} from "lucide-react";
import { surahsMetadata } from "../data/surahsMetadata";
import { fallbackSurahs } from "../data/fallbackSurahs";
import { Ayah, SurahMetadata } from "../types";

// Helper to resolve queries like "yaseen", "36", "রহমান", "mulk", "kahf", "18", "baqarah", "2" to Surah number
function resolveSurahFromQuery(raw: string, surahList: SurahMetadata[]): number | null {
  if (!raw) return null;
  const clean = decodeURIComponent(raw).trim().toLowerCase().replace(/^(surah|sura|সূরা)[-_ ]?/gi, "");
  
  const num = parseInt(clean, 10);
  if (!isNaN(num) && num >= 1 && num <= 114) {
    return num;
  }

  const surahAliasMap: Record<string, number> = {
    fatiha: 1, fatihah: 1, "ফাতেহা": 1, "আল-ফাতেহা": 1,
    baqarah: 2, baqara: 2, "বাকারা": 2, "আল-বাকারা": 2,
    yaseen: 36, yasin: 36, "ya-sin": 36, "ইয়াসীন": 36, "ইয়াসিন": 36,
    rahman: 55, "রহমান": 55, "আর-রহমান": 55,
    mulk: 67, "মুলক": 67, "আল-মুলক": 67,
    kahf: 18, "কাহফ": 18, "আল-কাহফ": 18,
    waqiah: 56, waqia: 56, "ওয়াকিয়াহ": 56, "ওয়াক্বিয়াহ": 56,
    yusuf: 12, "ইউসুফ": 12,
    maryam: 19, "মরিয়ম": 19, "মরিয়ম": 19,
    ikhlas: 112, "ইখলাস": 112,
    falaq: 113, "ফালাক": 113,
    nas: 114, naas: 114, "নাস": 114,
    naba: 78, "নাবা": 78,
    muzammil: 73, "মুযযাম্মিল": 73,
    jin: 72, jinn: 72, "জিন": 72
  };

  if (surahAliasMap[clean]) return surahAliasMap[clean];

  const found = surahList.find((s) => 
    s.englishName.toLowerCase().replace(/[^a-z0-9]/g, "").includes(clean.replace(/[^a-z0-9]/g, "")) ||
    s.englishNameTranslation.toLowerCase().replace(/[^a-z0-9]/g, "").includes(clean.replace(/[^a-z0-9]/g, ""))
  );

  return found ? found.number : null;
}

export default function QuranSection() {
  const { t, language } = useLanguage();
  // Strip duplicate Bismillah from the first verse of any Surah (except Fatihah and Tawbah)
  const getCleanArabicText = (text: string, surahNum: number, ayahNum: number): string => {
    if (surahNum !== 1 && surahNum !== 9 && ayahNum === 1) {
      const bismillahSimple = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
      const bismillahWithWasla = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
      
      if (text.startsWith(bismillahSimple)) {
        return text.substring(bismillahSimple.length).trim();
      }
      if (text.startsWith(bismillahWithWasla)) {
        return text.substring(bismillahWithWasla.length).trim();
      }
      
      // Look for the last word of Bismillah "الرَّحِيمِ" in first 50 chars
      if (text.includes("الرَّحِيمِ") && text.indexOf("الرَّحِيمِ") < 50) {
        const idx = text.indexOf("الرَّحِيمِ") + "الرَّحِيمِ".length;
        return text.substring(idx).trim();
      }
      if (text.includes("ٱلرَّحِيمِ") && text.indexOf("ٱلرَّحِيمِ") < 50) {
        const idx = text.indexOf("ٱلرَّحِيمِ") + "ٱلرَّحِيمِ".length;
        return text.substring(idx).trim();
      }
    }
    return text;
  };

  const [isOpened, setIsOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRevelation, setSelectedRevelation] = useState<"All" | "Meccan" | "Medinan" | "Bookmarked">("All");
  const [selectedSurahNum, setSelectedSurahNum] = useState<number>(1);
  const [activeAyahs, setActiveAyahs] = useState<Ayah[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Audio Player states
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isAutoPlaySurah, setIsAutoPlaySurah] = useState(false); // Play full surah
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Resets audio state when surah changes
  useEffect(() => {
    setIsAutoPlaySurah(false);
    setPlayingAyahNumber(null);
    setIsAudioPlaying(false);
    setIsAudioLoading(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [selectedSurahNum]);

  // Cleanup audio player when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Stop audio completely
  const stopAudio = () => {
    setIsAutoPlaySurah(false);
    setPlayingAyahNumber(null);
    setIsAudioPlaying(false);
    setIsAudioLoading(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  // Scroll active ayah into view on both Desktop & Mobile containers
  const scrollToActiveAyah = (ayahNum: number) => {
    setTimeout(() => {
      // Desktop card
      const desktopEl = document.getElementById(`desktop-ayah-card-${ayahNum}`);
      if (desktopEl && desktopEl.offsetParent !== null) {
        desktopEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // Mobile card
      const mobileEl = document.getElementById(`mobile-ayah-card-${ayahNum}`);
      if (mobileEl && mobileEl.offsetParent !== null) {
        mobileEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 120);
  };

  useEffect(() => {
    if (playingAyahNumber) {
      scrollToActiveAyah(playingAyahNumber);
    }
  }, [playingAyahNumber]);

  // Audio Playback handler
  const handlePlayAyah = (ayahNumber: number, autoPlayNext = false) => {
    // If clicking the currently playing ayah, toggle pause/play
    if (playingAyahNumber === ayahNumber) {
      if (isAudioPlaying) {
        if (audioRef.current) audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        if (audioRef.current) {
          setIsAudioLoading(true);
          audioRef.current.play().then(() => {
            setIsAudioPlaying(true);
            setIsAudioLoading(false);
            scrollToActiveAyah(ayahNumber);
          }).catch((err) => {
            console.error("Error playing audio", err);
            setIsAudioPlaying(false);
            setIsAudioLoading(false);
          });
        }
      }
      return;
    }

    // Stop existing audio
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setIsAudioLoading(true);
    setPlayingAyahNumber(ayahNumber);
    setIsAudioPlaying(true);

    const newAudio = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`);
    audioRef.current = newAudio;

    newAudio.oncanplaythrough = () => {
      setIsAudioLoading(false);
    };

    newAudio.onplay = () => {
      setIsAudioPlaying(true);
      setIsAudioLoading(false);
      scrollToActiveAyah(ayahNumber);
    };

    newAudio.onpause = () => {
      setIsAudioPlaying(false);
    };

    newAudio.onerror = () => {
      setIsAudioLoading(false);
      setIsAudioPlaying(false);
      setPlayingAyahNumber(null);
    };

    newAudio.onended = () => {
      setIsAudioPlaying(false);
      // Auto-play the next verse by default
      const currentIndex = activeAyahs.findIndex((a) => a.number === ayahNumber);
      if (currentIndex !== -1 && currentIndex < activeAyahs.length - 1) {
        const nextAyah = activeAyahs[currentIndex + 1];
        // Delay briefly for high-quality transitioning experience
        setTimeout(() => {
          handlePlayAyah(nextAyah.number, true);
        }, 800);
      } else {
        // Finished surah or last ayah
        setPlayingAyahNumber(null);
        setIsAutoPlaySurah(false);
      }
    };

    newAudio.play().catch((err) => {
      console.error("Play failed", err);
      setIsAudioPlaying(false);
      setIsAudioLoading(false);
      setPlayingAyahNumber(null);
    });
  };

  const handleTogglePlaySurah = () => {
    if (activeAyahs.length === 0) return;

    if (isAutoPlaySurah) {
      if (isAudioPlaying) {
        if (audioRef.current) audioRef.current.pause();
        setIsAudioPlaying(false);
      } else if (playingAyahNumber) {
        setIsAudioLoading(true);
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsAudioPlaying(true);
            setIsAudioLoading(false);
          }).catch(() => {
            setIsAudioPlaying(false);
            setIsAudioLoading(false);
          });
        }
      } else {
        setIsAutoPlaySurah(false);
      }
    } else {
      setIsAutoPlaySurah(true);
      handlePlayAyah(activeAyahs[0].number, true);
    }
  };

  // Reader Settings
  const [isReadingDarkMode, setIsReadingDarkMode] = useState(true);
  const [fontSizeAr, setFontSizeAr] = useState<"sm" | "md" | "lg">("md");

  // Bookmarks saved in local storage
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState<number[]>([]);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<string[]>([]); // format: "surah_num:ayah_num"

  // Mobile Reading Drawer state
  const [isMobileReaderOpen, setIsMobileReaderOpen] = useState(false);

  // Clipboard feedbacks
  const [copiedVerseKey, setCopiedVerseKey] = useState<string | null>(null);
  const [copiedSurahFeedback, setCopiedSurahFeedback] = useState(false);

  const readerContainerRef = useRef<HTMLDivElement>(null);

  // Load Bookmarks on mount and check URL parameters for direct Surah deep-linking
  useEffect(() => {
    try {
      const savedSurahs = localStorage.getItem("aldawah_bookmarked_surahs");
      const savedVerses = localStorage.getItem("aldawah_bookmarked_verses");
      if (savedSurahs) setBookmarkedSurahs(JSON.parse(savedSurahs));
      if (savedVerses) setBookmarkedVerses(JSON.parse(savedVerses));
    } catch (e) {
      console.error("Failed to load bookmarks", e);
    }

    // Check URL search parameters or Hash for direct Surah links (e.g. ?surah=36 or ?surah=yaseen or #surah-36)
    try {
      const params = new URLSearchParams(window.location.search);
      const surahParam = params.get("surah") || params.get("s") || params.get("q");
      const hash = window.location.hash;

      let targetSurah: number | null = null;
      if (surahParam) {
        targetSurah = resolveSurahFromQuery(surahParam, surahsMetadata);
      } else if (hash && hash.includes("surah")) {
        targetSurah = resolveSurahFromQuery(hash, surahsMetadata);
      }

      if (targetSurah) {
        setSelectedSurahNum(targetSurah);
        setIsOpened(true);
        setTimeout(() => {
          const el = document.getElementById("quran");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      }
    } catch (e) {
      console.error("Error parsing URL surah param", e);
    }
  }, []);

  // Prevent background body scroll when Quran reader is open in fullscreen mode
  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  // Map supported language codes to Al Quran Cloud edition codes
  const API_EDITIONS: Record<string, { code: string; name: string }> = {
    bn: { code: "bn.bengali", name: "বাংলা" },
    en: { code: "en.sahih", name: "English" },
    ur: { code: "ur.jalandhry", name: "اردو" },
    id: { code: "id.indonesian", name: "Bahasa Indonesia" },
    tr: { code: "tr.ates", name: "Türkçe" },
    fr: { code: "fr.hamidullah", name: "Français" },
    es: { code: "es.cortes", name: "Español" },
    hi: { code: "hi.farooq", name: "हिंदी" },
    ms: { code: "ms.basmeih", name: "Bahasa Melayu" },
    ar: { code: "quran-simple", name: "العربية" },
  };

  // Fetch / Load selected Surah verses
  useEffect(() => {
    let active = true;
    const loadSurah = async () => {
      setIsLoading(true);
      setError(null);

      // 1. Fetch from Al Quran Cloud API dynamically according to active language
      try {
        const langConfig = API_EDITIONS[language] || API_EDITIONS.en;
        const requestedEditions = ["quran-simple", "en.sahih", "bn.bengali"];
        if (langConfig.code !== "quran-simple" && !requestedEditions.includes(langConfig.code)) {
          requestedEditions.push(langConfig.code);
        }

        const res = await fetch(
          `https://api.alquran.cloud/v1/surah/${selectedSurahNum}/editions/${requestedEditions.join(",")}`
        );
        if (!res.ok) throw new Error("Connection failed. Please verify your internet connection.");
        const json = await res.json();
        
        if (json.code === 200 && json.data && json.data.length >= 3) {
          const arAyahs = json.data[0].ayahs;
          const enAyahs = json.data[1].ayahs;
          const bnAyahs = json.data[2].ayahs;
          const langAyahs = json.data.length > 3 ? json.data[3].ayahs : null;

          const combined: Ayah[] = arAyahs.map((ayah: any, index: number) => ({
            number: ayah.number,
            numberInSurah: ayah.numberInSurah,
            textAr: ayah.text,
            textEn: enAyahs[index]?.text || "",
            textBn: bnAyahs[index]?.text || "",
            textLang: langAyahs ? langAyahs[index]?.text : undefined,
            langName: langConfig.name,
          }));

          if (active) {
            setActiveAyahs(combined);
            setIsLoading(false);
            // Scroll to top
            if (readerContainerRef.current) {
              readerContainerRef.current.scrollTop = 0;
            }
          }
        } else {
          throw new Error("Unable to fetch translated editions from standard servers.");
        }
      } catch (err: any) {
        if (active) {
          if (fallbackSurahs[selectedSurahNum]) {
            setActiveAyahs(fallbackSurahs[selectedSurahNum]);
            setIsLoading(false);
            if (readerContainerRef.current) {
              readerContainerRef.current.scrollTop = 0;
            }
          } else {
            setError(err.message || "Failed to load verses. Please try again.");
            setIsLoading(false);
          }
        }
      }
    };

    loadSurah();
    return () => {
      active = false;
    };
  }, [selectedSurahNum, language]);

  // Handle Surah bookmarks
  const toggleSurahBookmark = (surahNum: number, e?: MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Avoid triggering Surah selection
    }
    const updated = bookmarkedSurahs.includes(surahNum)
      ? bookmarkedSurahs.filter((n) => n !== surahNum)
      : [...bookmarkedSurahs, surahNum];
    
    setBookmarkedSurahs(updated);
    localStorage.setItem("aldawah_bookmarked_surahs", JSON.stringify(updated));
  };

  // Handle Verse bookmarks
  const toggleVerseBookmark = (surahNum: number, verseNum: number) => {
    const key = `${surahNum}:${verseNum}`;
    const updated = bookmarkedVerses.includes(key)
      ? bookmarkedVerses.filter((k) => k !== key)
      : [...bookmarkedVerses, key];
    
    setBookmarkedVerses(updated);
    localStorage.setItem("aldawah_bookmarked_verses", JSON.stringify(updated));
  };

  // Filter Surahs based on search query and revelation type
  const filteredSurahs = surahsMetadata.filter((surah) => {
    const matchesSearch =
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.name.includes(searchQuery) ||
      surah.number.toString() === searchQuery;

    const matchesRevelation =
      selectedRevelation === "All" ||
      (selectedRevelation === "Meccan" && surah.revelationType === "Meccan") ||
      (selectedRevelation === "Medinan" && surah.revelationType === "Medinan") ||
      (selectedRevelation === "Bookmarked" && bookmarkedSurahs.includes(surah.number));

    return matchesSearch && matchesRevelation;
  });

  const activeSurahDetails = surahsMetadata.find((s) => s.number === selectedSurahNum);

  // Copy specific verse to clipboard
  const copyVerseToClipboard = (ayah: Ayah) => {
    const cleanAr = getCleanArabicText(ayah.textAr, selectedSurahNum, ayah.numberInSurah);
    const verseText = `[Quran ${selectedSurahNum}:${ayah.numberInSurah}]\nArabic: ${cleanAr}\n\nBengali: ${ayah.textBn}\n\nEnglish: ${ayah.textEn}`;
    navigator.clipboard.writeText(verseText).then(() => {
      setCopiedVerseKey(`${selectedSurahNum}:${ayah.numberInSurah}`);
      setTimeout(() => setCopiedVerseKey(null), 2000);
    });
  };

  // Copy Surah details or share direct link
  const copySurahToClipboard = () => {
    if (!activeSurahDetails) return;
    const currentDomain = window.location.origin + window.location.pathname;
    const directLink = `${currentDomain}?surah=${activeSurahDetails.number}`;
    const text = `Read Surah ${activeSurahDetails.englishName} (${activeSurahDetails.englishNameTranslation}) on Al Dawah Islamic Official.\n${activeSurahDetails.numberOfAyahs} Verses with Audio & Bengali Translation.\nDirect Link: ${directLink}`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSurahFeedback(true);
      setTimeout(() => setCopiedSurahFeedback(false), 2000);
    });
  };

  // Select Surah helper for desktop and mobile (with URL parameter sync)
  const handleSelectSurah = (surahNum: number) => {
    setSelectedSurahNum(surahNum);
    setIsMobileReaderOpen(true);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("surah", surahNum.toString());
      window.history.replaceState({}, "", url.toString());
    } catch (e) {
      console.error("Could not sync URL state", e);
    }
  };

  // Arabic Font Sizes Classes
  const getArabicFontSizeClass = () => {
    switch (fontSizeAr) {
      case "sm":
        return "text-2xl md:text-3xl leading-relaxed";
      case "lg":
        return "text-4xl md:text-5xl leading-loose";
      case "md":
      default:
        return "text-3xl md:text-4xl leading-loose";
    }
  };

  return (
    <section id="quran" className={`relative py-24 px-6 bg-emerald-deep/95 transition-all duration-300 ${isOpened ? "z-50" : "z-10"}`}>
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold-lux/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-lux/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-serif-lux text-gold-lux text-xs tracking-[0.4em] uppercase block mb-3">
            Al-Quran Al-Kareem
          </span>
          <h2 className="font-serif-lux text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 tracking-wider">
            {t("quran_heading")}
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold-lux to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t("quran_subheading")}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="closed-cta"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto"
            >
              <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-gold-lux/20 text-center relative overflow-hidden group shadow-[0_0_50px_rgba(212,175,55,0.05)]">
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
                    {/* Rehal Crossed Legs */}
                    <path d="M6 19l12-10M18 19L6 9" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                    <path d="M4 21h4M16 21h4" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                    {/* Holy Quran Pages */}
                    <path d="M12 11c-1.5-1.5-3.5-2.5-6.5-2.5s-2.5.5-2.5 1.5v-6C3 3 3.5 2 5.5 2s4 1.5 6.5 2.5c2.5-1 4.5-2.5 6.5-2.5s2.5 1 2.5 2v6c0-1-1.5-1.5-2.5-1.5s-5 1-6.5 2.5z" fill="currentColor" fillOpacity="0.05" strokeWidth="1.5" />
                    <path d="M12 4.5V11" strokeWidth="1.5" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border border-gold-lux/20 animate-ping pointer-events-none" style={{ animationDuration: "4s" }} />
                </div>

                <h3 className="font-serif-lux text-2xl font-light text-white mb-3 tracking-wide">
                  {t("quran_card_title")}
                </h3>
                <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed font-sans">
                  {t("quran_card_desc")}
                </p>

                <button
                  onClick={() => setIsOpened(true)}
                  className="relative px-8 py-4 bg-gradient-to-r from-gold-lux via-gold-light to-gold-lux text-emerald-deep font-semibold rounded-full text-base tracking-widest shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] active:scale-98 transition-all duration-300 cursor-pointer overflow-hidden group/btn flex items-center gap-3 mx-auto font-sans"
                  id="open-quran-btn"
                >
                  <span className="relative z-10 tracking-wider">{t("quran_open_btn")}</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 bg-[#031d14] flex flex-col text-gray-100 overflow-hidden font-sans"
              id="fullscreen-quran-dashboard"
            >
              {/* IMMERSIVE TOP HEADER BAR */}
              <div className="border-b border-gold-lux/20 px-6 py-4 bg-emerald-deep/95 backdrop-blur flex justify-between items-center z-10 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gold-lux/30 flex items-center justify-center bg-gold-lux/5 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-gold-lux animate-pulse"
                    >
                      {/* Rehal Crossed Legs */}
                      <path d="M6 19l12-10M18 19L6 9" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                      <path d="M4 21h4M16 21h4" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                      {/* Holy Quran Pages */}
                      <path d="M12 11c-1.5-1.5-3.5-2.5-6.5-2.5s-2.5.5-2.5 1.5v-6C3 3 3.5 2 5.5 2s4 1.5 6.5 2.5c2.5-1 4.5-2.5 6.5-2.5s2.5 1 2.5 2v6c0-1-1.5-1.5-2.5-1.5s-5 1-6.5 2.5z" fill="currentColor" fillOpacity="0.05" strokeWidth="1.5" />
                      <path d="M12 4.5V11" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h2 className="font-serif-lux text-base sm:text-lg font-light text-white tracking-wider flex items-center gap-2">
                      {t("quran_top_title")} <span className="text-xs bg-gold-lux/15 border border-gold-lux/30 text-gold-lux px-2 py-0.5 rounded-full font-serif-lux uppercase">Al Quran</span>
                    </h2>
                    <p className="text-[10px] text-gray-400 font-sans">{t("quran_top_sub")}</p>
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

              {/* SPLIT-PANE CONTENT CONTAINER */}
              <div className="flex-1 flex overflow-hidden relative p-4 sm:p-6 gap-6">
                
                {/* Decorative Glowing Elements */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-gold-lux/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-emerald-lux/10 rounded-full blur-3xl pointer-events-none" />

                {/* LEFT PANEL: Surah List (35% or 400px on Desktop, 100% on Mobile) */}
                <div className="w-full lg:w-[350px] xl:w-[400px] flex flex-col gap-4 h-full flex-shrink-0 z-10">
                  
                  {/* Search Box & Tab Filter */}
                  <div className="glass-panel p-4 rounded-2xl border border-gold-lux/15 flex flex-col gap-3 bg-emerald-deep/40 backdrop-blur-md">
                    {/* Search input */}
                    <div className="relative">
                      <Search className="absolute left-3.5 top-3 w-4 h-4 text-gold-lux/50" />
                      <input
                        type="text"
                        placeholder={t("quran_search_ph")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-emerald-deep/50 border border-gold-lux/20 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-lux focus:ring-1 focus:ring-gold-lux transition-all duration-300"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-3 text-gray-500 hover:text-white transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Revelation Type Tabs */}
                    <div className="flex gap-1 bg-emerald-deep/60 p-1 rounded-xl border border-gold-lux/10">
                      {(["All", "Meccan", "Medinan", "Bookmarked"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setSelectedRevelation(tab)}
                          className={`flex-1 text-[10px] font-serif-lux tracking-widest py-1.5 rounded-lg cursor-pointer transition-all duration-300 ${
                            selectedRevelation === tab
                              ? "bg-gold-lux text-emerald-deep font-semibold"
                              : "text-gray-400 hover:text-white hover:bg-emerald-lux/10"
                          }`}
                        >
                          {tab === "All"
                            ? t("quran_tab_all")
                            : tab === "Meccan"
                            ? t("quran_tab_meccan")
                            : tab === "Medinan"
                            ? t("quran_tab_medinan")
                            : t("quran_tab_bookmarked")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable Surah Grid (Fully flexed to occupy remaining height) */}
                  <div className="glass-panel rounded-2xl border border-gold-lux/15 flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-emerald-deep/30 backdrop-blur-md">
                  {filteredSurahs.length > 0 ? (
                    filteredSurahs.map((surah) => {
                      const isSelected = selectedSurahNum === surah.number;
                      const isBookmarked = bookmarkedSurahs.includes(surah.number);
                      return (
                        <div
                          key={surah.number}
                          onClick={() => handleSelectSurah(surah.number)}
                          className={`group w-full p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-300 ${
                            isSelected
                              ? "bg-gradient-to-r from-emerald-lux/30 to-emerald-lux/10 border border-gold-lux/40 text-white"
                              : "border border-transparent hover:bg-emerald-lux/10 text-gray-300 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Surah Number Icon */}
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold font-serif-lux border ${
                                isSelected
                                  ? "border-gold-lux bg-gold-lux/15 text-gold-lux"
                                  : "border-gold-lux/20 bg-emerald-deep/40 text-gray-400"
                              }`}
                            >
                              {surah.number}
                            </div>
                            
                            {/* Surah Names */}
                            <div className="text-left">
                              <span className="font-serif-lux text-sm font-medium tracking-wide block">
                                {surah.englishName}
                              </span>
                              <span className="text-[10px] text-gray-400 block tracking-wider uppercase font-sans">
                                {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayahs
                              </span>
                            </div>
                          </div>

                          {/* Right actions: Arabic text, Revelation and bookmark */}
                          <div className="flex items-center gap-3">
                            <div className="text-right flex flex-col items-end">
                              <span className="font-arabic text-gold-light text-base leading-none">
                                {surah.name}
                              </span>
                              <span className="text-[9px] text-gold-lux/70 uppercase tracking-widest font-sans mt-0.5">
                                {surah.revelationType === "Meccan" ? t("quran_tab_meccan") : t("quran_tab_medinan")}
                              </span>
                            </div>
                            
                            {/* Bookmark Button */}
                            <button
                              onClick={(e) => toggleSurahBookmark(surah.number, e)}
                              className="text-gray-400 hover:text-gold-lux transition-colors p-1"
                            >
                              <Bookmark
                                className={`w-4 h-4 ${isBookmarked ? "fill-gold-lux text-gold-lux" : "text-gray-500"}`}
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 px-4">
                      <AlertCircle className="w-8 h-8 text-gold-lux/60 mx-auto mb-3 animate-pulse" />
                      <p className="font-serif-lux text-gold-light/80 text-sm tracking-wider">
                        {t("quran_no_surahs")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 font-sans">
                        {t("quran_no_surahs_desc")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT PANEL: Surah Active Reader (Desktop only) */}
              <div className="hidden lg:flex flex-1 flex-col h-full border border-gold-lux/15 rounded-2xl overflow-hidden glass-panel bg-[#041d14]/60 backdrop-blur-md shadow-2xl z-10">
                
                {/* Header controls of active reading pane */}
                <div className="border-b border-gold-lux/10 p-5 bg-emerald-deep/40 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif-lux text-xl md:text-2xl font-bold text-white">
                        Surah {activeSurahDetails?.englishName}
                      </h3>
                      <span className="text-xs bg-gold-lux/10 border border-gold-lux/20 text-gold-lux px-2 py-0.5 rounded-full font-serif-lux">
                        {activeSurahDetails?.revelationType === "Meccan" ? t("quran_tab_meccan") : t("quran_tab_medinan")}
                      </span>
                    </div>
                    <p className="text-xs text-gold-light/80 tracking-widest font-serif-lux uppercase mt-1">
                      {activeSurahDetails?.englishNameTranslation} • {activeSurahDetails?.numberOfAyahs} Ayahs
                    </p>
                  </div>

                  {/* Toolbar */}
                  <div className="flex items-center gap-3">
                    {/* Play/Pause Surah Audio */}
                    <button
                      onClick={handleTogglePlaySurah}
                      disabled={isLoading || !!error || activeAyahs.length === 0}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-xs tracking-wider transition-all duration-300 disabled:opacity-50 cursor-pointer ${
                        isAutoPlaySurah && isAudioPlaying
                          ? "bg-gold-lux text-emerald-deep border-gold-lux font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                          : "bg-emerald-deep/60 border-gold-lux/15 text-gold-light hover:text-white hover:border-gold-lux"
                      }`}
                      title={isAutoPlaySurah && isAudioPlaying ? "Pause Surah Recitation" : "Play Surah Recitation"}
                    >
                      {isAudioLoading && isAutoPlaySurah ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : isAutoPlaySurah && isAudioPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                      <span className="font-sans">
                        {isAutoPlaySurah && isAudioPlaying ? t("quran_pause_btn") : t("quran_listen_btn")}
                      </span>
                    </button>

                    {/* Font Size controls */}
                    <div className="flex items-center border border-gold-lux/15 rounded-lg overflow-hidden bg-emerald-deep/60">
                      {(["sm", "md", "lg"] as const).map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setFontSizeAr(sz)}
                          className={`text-[10px] uppercase tracking-widest px-2.5 py-1.5 font-sans cursor-pointer ${
                            fontSizeAr === sz
                              ? "bg-gold-lux text-emerald-deep font-semibold"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>

                    {/* Light/Dark background toggle */}
                    <button
                      onClick={() => setIsReadingDarkMode(!isReadingDarkMode)}
                      className="p-2 border border-gold-lux/15 rounded-lg bg-emerald-deep/60 text-gold-light hover:text-white hover:border-gold-lux transition-colors"
                      title="Toggle Light/Dark Reading Mode"
                    >
                      {isReadingDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>

                    {/* Share Surah Info */}
                    <button
                      onClick={copySurahToClipboard}
                      className="p-2 border border-gold-lux/15 rounded-lg bg-emerald-deep/60 text-gold-light hover:text-white hover:border-gold-lux transition-colors relative flex items-center justify-center"
                      title="Copy Surah details"
                    >
                      {copiedSurahFeedback ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                    </button>

                    {/* Favorite Bookmark */}
                    <button
                      onClick={() => toggleSurahBookmark(selectedSurahNum)}
                      className="p-2 border border-gold-lux/15 rounded-lg bg-emerald-deep/60 text-gold-light hover:text-white hover:border-gold-lux transition-colors"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          bookmarkedSurahs.includes(selectedSurahNum) ? "fill-gold-lux text-gold-lux" : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* READING VIEWPORT */}
                <div
                  ref={readerContainerRef}
                  className={`flex-1 overflow-y-auto p-6 md:p-8 transition-colors duration-300 ${
                    isReadingDarkMode ? "bg-[#02180f]/90 text-white" : "bg-white/5 text-white border-t border-gold-lux/5"
                  }`}
                >
                  {/* Shimmer loading */}
                  {isLoading && (
                    <div className="flex flex-col gap-6 py-12 items-center justify-center h-full">
                      <div className="w-10 h-10 border-2 border-t-gold-lux border-gold-lux/20 rounded-full animate-spin" />
                      <p className="font-serif-lux text-gold-light text-sm tracking-widest animate-pulse">
                        Retrieving Divine Verses...
                      </p>
                    </div>
                  )}

                  {/* Error fallback */}
                  {error && !isLoading && (
                    <div className="max-w-md mx-auto text-center py-12 px-6 border border-red-500/20 bg-red-500/5 rounded-2xl flex flex-col items-center">
                      <AlertCircle className="w-10 h-10 text-red-500 mb-4 animate-bounce" />
                      <p className="font-serif-lux text-white text-base font-semibold mb-2">
                        Connection Issue
                      </p>
                      <p className="text-gray-400 text-xs mb-6">
                        {error}
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setSelectedSurahNum(selectedSurahNum)}
                          className="px-5 py-2.5 bg-gold-lux hover:bg-gold-light text-emerald-deep rounded-full text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                        >
                          Retry Connection
                        </button>
                        <button
                          onClick={() => setSelectedSurahNum(1)}
                          className="px-5 py-2.5 border border-gold-lux/20 text-white rounded-full text-xs font-semibold tracking-wider hover:bg-white/5 transition-colors"
                        >
                          Load Al-Fatihah Offline
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Verse cards loop */}
                  {!isLoading && !error && (
                    <div className="flex flex-col gap-8 md:gap-12">
                      {/* Surah Header / Arabic Calligraphy title */}
                      <div className="text-center py-6 border-b border-gold-lux/10">
                        <h2 className="font-arabic text-gold-lux text-5xl md:text-6xl mb-4 gold-glow">
                          {activeSurahDetails?.name}
                        </h2>
                        
                        {/* Bismillah (if not Surah At-Tawbah, and not Surah Fatihah verse 1 which has its own Bismillah) */}
                        {selectedSurahNum !== 9 && selectedSurahNum !== 1 && (
                          <p className="font-arabic text-3xl text-gold-light tracking-wide py-4">
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                          </p>
                        )}
                      </div>

                      {activeAyahs.map((ayah, i) => {
                        const isVerseBookmarked = bookmarkedVerses.includes(`${selectedSurahNum}:${ayah.numberInSurah}`);
                        const isCopied = copiedVerseKey === `${selectedSurahNum}:${ayah.numberInSurah}`;
                        const isPlayingThis = playingAyahNumber === ayah.number;
                        return (
                          <div
                            key={ayah.numberInSurah}
                            id={`desktop-ayah-card-${ayah.number}`}
                            className={`group flex flex-col gap-5 border-b border-gold-lux/10 pb-8 md:pb-10 last:border-0 relative transition-all duration-500 rounded-2xl p-5 -mx-2 ${
                              isPlayingThis
                                ? "bg-gold-lux/10 border-l-4 border-l-gold-lux shadow-[0_0_25px_rgba(212,175,55,0.15)] ring-1 ring-gold-lux/40 scale-[1.01]"
                                : ""
                            }`}
                          >
                            {/* Top verse metadata & utilities row */}
                            <div className="flex justify-between items-center gap-4">
                              {/* Verse number tag */}
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-serif-lux text-xs font-medium transition-colors ${
                                  isPlayingThis
                                    ? "border-gold-lux bg-gold-lux/15 text-gold-lux"
                                    : "border-gold-lux/40 bg-gold-lux/5 text-gold-lux"
                                }`}>
                                  {ayah.numberInSurah}
                                </div>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">
                                  Ayah {selectedSurahNum}:{ayah.numberInSurah}
                                </span>
                                {isPlayingThis && isAudioPlaying && (
                                  <span className="flex items-center gap-1 text-[10px] text-gold-lux tracking-wider uppercase font-sans animate-pulse">
                                    <Volume2 className="w-3 h-3" /> Playing
                                  </span>
                                )}
                              </div>

                              {/* Action tools */}
                              <div className="flex gap-2 opacity-100 lg:opacity-30 lg:group-hover:opacity-100 transition-opacity duration-300">
                                {/* Play/Pause button */}
                                <button
                                  onClick={() => handlePlayAyah(ayah.number)}
                                  className={`p-1.5 transition-colors cursor-pointer rounded-lg bg-emerald-deep/30 border ${
                                    isPlayingThis && isAudioPlaying
                                      ? "text-gold-lux border-gold-lux"
                                      : "text-gray-500 hover:text-gold-lux border-gold-lux/10 hover:border-gold-lux/30"
                                  }`}
                                  title={isPlayingThis && isAudioPlaying ? "Pause verse recitation" : "Play verse recitation"}
                                >
                                  {isAudioLoading && isPlayingThis ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-gold-lux" />
                                  ) : isPlayingThis && isAudioPlaying ? (
                                    <Pause className="w-3.5 h-3.5 fill-current" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                  )}
                                </button>

                                {/* Copy button */}
                                <button
                                  onClick={() => copyVerseToClipboard(ayah)}
                                  className="p-1.5 hover:text-gold-lux text-gray-400 transition-colors cursor-pointer rounded-lg bg-emerald-deep/30 border border-gold-lux/10 hover:border-gold-lux/30"
                                  title="Copy verse"
                                >
                                  {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>

                                {/* Bookmark button */}
                                <button
                                  onClick={() => toggleVerseBookmark(selectedSurahNum, ayah.numberInSurah)}
                                  className="p-1.5 hover:text-gold-lux text-gray-400 transition-colors cursor-pointer rounded-lg bg-emerald-deep/30 border border-gold-lux/10 hover:border-gold-lux/30"
                                  title="Bookmark verse"
                                >
                                  <Bookmark
                                    className={`w-3.5 h-3.5 ${isVerseBookmarked ? "fill-gold-lux text-gold-lux" : ""}`}
                                  />
                                </button>
                              </div>
                            </div>

                            {/* Arabic text - Large elegant centered/right-aligned */}
                            <p
                              className={`font-arabic text-right text-white select-all leading-loose tracking-wide ${getArabicFontSizeClass()}`}
                              dir="rtl"
                            >
                              {getCleanArabicText(ayah.textAr, selectedSurahNum, ayah.numberInSurah)}
                            </p>

                            {/* Translations stack */}
                            <div className="flex flex-col gap-3 mt-2 pl-4 border-l-2 border-gold-lux/20">
                              {language === "en" ? (
                                <>
                                  <div className="text-left font-sans text-sm text-gold-light/95 leading-relaxed">
                                    <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-gold-lux mr-2">
                                      English
                                    </span>
                                    {ayah.textEn}
                                  </div>
                                  <div className="text-left font-bengali text-xs text-gray-400 leading-relaxed italic">
                                    <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-gold-lux/70 mr-2 not-italic">
                                      বাংলা
                                    </span>
                                    {ayah.textBn}
                                  </div>
                                </>
                              ) : language === "bn" ? (
                                <>
                                  <div className="text-left font-bengali text-sm text-gold-light/95 leading-relaxed">
                                    <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-gold-lux mr-2">
                                      বাংলা
                                    </span>
                                    {ayah.textBn}
                                  </div>
                                  <div className="text-left font-sans text-xs text-gray-400 leading-relaxed italic">
                                    <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-gold-lux/70 mr-2 not-italic">
                                      English
                                    </span>
                                    {ayah.textEn}
                                  </div>
                                </>
                              ) : (
                                <>
                                  {ayah.textLang && (
                                    <div className="text-left font-sans text-sm text-gold-light/95 leading-relaxed">
                                      <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-gold-lux mr-2">
                                        {ayah.langName || "Translation"}
                                      </span>
                                      {ayah.textLang}
                                    </div>
                                  )}
                                  <div className="text-left font-sans text-xs text-gray-300 leading-relaxed">
                                    <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-gold-lux/70 mr-2">
                                      English
                                    </span>
                                    {ayah.textEn}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div> {/* Extra div to close the split-pane content container */}
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* MOBILE READER OVERLAY DRAWER (Slides up from bottom when Surah is selected on mobile) */}
      <AnimatePresence>
        {isMobileReaderOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-emerald-deep/95 backdrop-blur-md lg:hidden flex flex-col"
            id="mobile-reader-drawer"
          >
            {/* Header controls */}
            <div className="border-b border-gold-lux/20 p-4 bg-emerald-deep flex justify-between items-center">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-lux text-lg font-bold text-white">
                    Surah {activeSurahDetails?.englishName}
                  </h3>
                  <span className="text-[10px] bg-gold-lux/10 border border-gold-lux/20 text-gold-lux px-1.5 py-0.5 rounded-full font-serif-lux">
                    {activeSurahDetails?.revelationType}
                  </span>
                </div>
                <p className="text-[10px] text-gold-light/80 tracking-widest font-serif-lux uppercase">
                  {activeSurahDetails?.englishNameTranslation} • {activeSurahDetails?.numberOfAyahs} Ayahs
                </p>
              </div>

              {/* Close Button & Actions */}
              <div className="flex items-center gap-2">
                {/* Play/Pause Surah Audio */}
                <button
                  onClick={handleTogglePlaySurah}
                  disabled={isLoading || !!error || activeAyahs.length === 0}
                  className={`p-2 border rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
                    isAutoPlaySurah && isAudioPlaying
                      ? "bg-gold-lux text-emerald-deep border-gold-lux"
                      : "border-gold-lux/15 bg-emerald-deep/40 text-gold-light hover:text-white"
                  }`}
                  title={isAutoPlaySurah && isAudioPlaying ? "Pause Surah Recitation" : "Play Surah Recitation"}
                >
                  {isAudioLoading && isAutoPlaySurah ? (
                    <Loader2 className="w-4 h-4 animate-spin text-gold-lux" />
                  ) : isAutoPlaySurah && isAudioPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                </button>

                <button
                  onClick={() => toggleSurahBookmark(selectedSurahNum)}
                  className="p-2 border border-gold-lux/15 rounded-lg bg-emerald-deep/40 text-gold-light hover:text-white"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      bookmarkedSurahs.includes(selectedSurahNum) ? "fill-gold-lux text-gold-lux" : "text-gray-400"
                    }`}
                  />
                </button>
                <button
                  onClick={() => {
                    stopAudio();
                    setIsMobileReaderOpen(false);
                  }}
                  className="p-2 px-3 border border-gold-lux/15 rounded-lg bg-emerald-deep/40 text-gold-light hover:text-white flex items-center gap-1 text-xs font-sans cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t("quran_back_btn")}</span>
                </button>
              </div>
            </div>

            {/* Mobile Viewport Toolbar */}
            <div className="flex justify-between items-center p-3 border-b border-gold-lux/10 bg-emerald-deep/60 px-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-sans">Font Size:</span>
                <div className="flex items-center border border-gold-lux/15 rounded-md overflow-hidden">
                  {(["sm", "md", "lg"] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSizeAr(sz)}
                      className={`text-[9px] uppercase tracking-widest px-2 py-1 font-sans ${
                        fontSizeAr === sz
                          ? "bg-gold-lux text-emerald-deep font-semibold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reading Theme selector */}
              <button
                onClick={() => setIsReadingDarkMode(!isReadingDarkMode)}
                className="flex items-center gap-1.5 text-[10px] text-gold-light uppercase tracking-widest font-sans"
              >
                {isReadingDarkMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5" /> <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5" /> <span>Dark</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Content viewport */}
            <div
              className={`flex-1 overflow-y-auto p-5 pb-16 ${
                isReadingDarkMode ? "bg-emerald-deep/10 text-white" : "bg-emerald-deep text-white border-t border-gold-lux/5"
              }`}
            >
              {/* Shimmer loading */}
              {isLoading && (
                <div className="flex flex-col gap-6 py-24 items-center justify-center">
                  <div className="w-8 h-8 border-2 border-t-gold-lux border-gold-lux/20 rounded-full animate-spin" />
                  <p className="font-serif-lux text-gold-light text-xs tracking-widest animate-pulse">
                    Retrieving Divine Verses...
                  </p>
                </div>
              )}

              {/* Error fallback */}
              {error && !isLoading && (
                <div className="text-center py-12 px-4 border border-red-500/20 bg-red-500/5 rounded-2xl flex flex-col items-center max-w-sm mx-auto">
                  <AlertCircle className="w-8 h-8 text-red-500 mb-3 animate-bounce" />
                  <p className="font-serif-lux text-white text-sm font-semibold mb-1">
                    Connection Issue
                  </p>
                  <p className="text-gray-400 text-[11px] mb-4">
                    {error}
                  </p>
                  <div className="flex flex-col gap-2 w-full">
                    <button
                      onClick={() => setSelectedSurahNum(selectedSurahNum)}
                      className="w-full py-2 bg-gold-lux text-emerald-deep rounded-full text-xs font-semibold tracking-wider cursor-pointer"
                    >
                      Retry Connection
                    </button>
                    <button
                      onClick={() => setSelectedSurahNum(1)}
                      className="w-full py-2 border border-gold-lux/20 text-white rounded-full text-xs font-semibold tracking-wider hover:bg-white/5"
                    >
                      Load Al-Fatihah Offline
                    </button>
                  </div>
                </div>
              )}

              {/* Verses Loop */}
              {!isLoading && !error && (
                <div className="flex flex-col gap-6">
                  {/* Surah Header / Arabic Calligraphy title */}
                  <div className="text-center py-4 border-b border-gold-lux/10">
                    <h2 className="font-arabic text-gold-lux text-4xl mb-3 gold-glow">
                      {activeSurahDetails?.name}
                    </h2>
                    
                    {/* Bismillah */}
                    {selectedSurahNum !== 9 && selectedSurahNum !== 1 && (
                      <p className="font-arabic text-2xl text-gold-light tracking-wide py-2">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </p>
                    )}
                  </div>

                  {activeAyahs.map((ayah) => {
                    const isVerseBookmarked = bookmarkedVerses.includes(`${selectedSurahNum}:${ayah.numberInSurah}`);
                    const isCopied = copiedVerseKey === `${selectedSurahNum}:${ayah.numberInSurah}`;
                    const isPlayingThis = playingAyahNumber === ayah.number;
                    return (
                      <div
                        key={ayah.numberInSurah}
                        id={`mobile-ayah-card-${ayah.number}`}
                        className={`flex flex-col gap-4 border-b border-gold-lux/10 pb-6 last:border-0 relative transition-all duration-500 rounded-xl p-4 -mx-2 ${
                          isPlayingThis
                            ? "bg-gold-lux/10 border-l-4 border-l-gold-lux shadow-[0_0_20px_rgba(212,175,55,0.15)] ring-1 ring-gold-lux/40 scale-[1.01]"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full border flex items-center justify-center font-serif-lux text-[10px] font-medium transition-colors ${
                              isPlayingThis
                                ? "border-gold-lux bg-gold-lux/15 text-gold-lux"
                                : "border-gold-lux/40 bg-gold-lux/5 text-gold-lux"
                            }`}>
                              {ayah.numberInSurah}
                            </div>
                            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-sans">
                              Ayah {selectedSurahNum}:{ayah.numberInSurah}
                            </span>
                            {isPlayingThis && isAudioPlaying && (
                              <span className="flex items-center gap-0.5 text-[9px] text-gold-lux uppercase font-sans animate-pulse">
                                <Volume2 className="w-2.5 h-2.5" /> Playing
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {/* Play/Pause individual verse on mobile */}
                            <button
                              onClick={() => handlePlayAyah(ayah.number)}
                              className={`p-1 transition-colors cursor-pointer ${
                                isPlayingThis && isAudioPlaying
                                  ? "text-gold-lux"
                                  : "text-gray-400 hover:text-gold-lux"
                              }`}
                            >
                              {isAudioLoading && isPlayingThis ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-gold-lux" />
                              ) : isPlayingThis && isAudioPlaying ? (
                                <Pause className="w-3.5 h-3.5 fill-current" />
                              ) : (
                                <Play className="w-3.5 h-3.5 fill-current" />
                              )}
                            </button>

                            {/* Copy */}
                            <button
                              onClick={() => copyVerseToClipboard(ayah)}
                              className="p-1 text-gray-400 hover:text-gold-lux cursor-pointer"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                            {/* Bookmark */}
                            <button
                              onClick={() => toggleVerseBookmark(selectedSurahNum, ayah.numberInSurah)}
                              className="p-1 text-gray-400 hover:text-gold-lux cursor-pointer"
                            >
                              <Bookmark
                                className={`w-3.5 h-3.5 ${isVerseBookmarked ? "fill-gold-lux text-gold-lux" : ""}`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Arabic Text */}
                        <p
                          className={`font-arabic text-right text-white select-all tracking-wide ${getArabicFontSizeClass()}`}
                          dir="rtl"
                        >
                          {getCleanArabicText(ayah.textAr, selectedSurahNum, ayah.numberInSurah)}
                        </p>

                        {/* Translations Stack */}
                        <div className="flex flex-col gap-2 pl-3 border-l border-gold-lux/20">
                          {language === "en" ? (
                            <>
                              <div className="text-left font-sans text-xs text-gold-light/95 leading-relaxed">
                                <span className="text-[8px] font-sans font-medium uppercase tracking-widest text-gold-lux mr-1">
                                  English
                                </span>
                                {ayah.textEn}
                              </div>
                              <div className="text-left font-bengali text-[11px] text-gray-400 leading-relaxed italic">
                                <span className="text-[8px] font-sans font-medium uppercase tracking-widest text-gold-lux/70 mr-1 not-italic">
                                  বাংলা
                                </span>
                                {ayah.textBn}
                              </div>
                            </>
                          ) : language === "bn" ? (
                            <>
                              <div className="text-left font-bengali text-xs text-gold-light/95 leading-relaxed">
                                <span className="text-[8px] font-sans font-medium uppercase tracking-widest text-gold-lux mr-1">
                                  বাংলা
                                </span>
                                {ayah.textBn}
                              </div>
                              <div className="text-left font-sans text-[11px] text-gray-400 leading-relaxed italic">
                                <span className="text-[8px] font-sans font-medium uppercase tracking-widest text-gold-lux/70 mr-1 not-italic">
                                  English
                                </span>
                                {ayah.textEn}
                              </div>
                            </>
                          ) : (
                            <>
                              {ayah.textLang && (
                                <div className="text-left font-sans text-xs text-gold-light/95 leading-relaxed">
                                  <span className="text-[8px] font-sans font-medium uppercase tracking-widest text-gold-lux mr-1">
                                    {ayah.langName || "Translation"}
                                  </span>
                                  {ayah.textLang}
                                </div>
                              )}
                              <div className="text-left font-sans text-[11px] text-gray-300 leading-relaxed">
                                <span className="text-[8px] font-sans font-medium uppercase tracking-widest text-gold-lux/70 mr-1">
                                  English
                                </span>
                                {ayah.textEn}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sticky Mini Audio Controller Bar */}
      <AnimatePresence>
        {playingAyahNumber !== null && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-emerald-950/95 border border-gold-lux/60 backdrop-blur-xl rounded-2xl p-3 shadow-[0_10px_35px_rgba(0,0,0,0.7)] z-50 flex items-center justify-between gap-3 font-sans"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gold-lux/20 border border-gold-lux/50 flex items-center justify-center text-gold-lux flex-shrink-0 animate-pulse">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate font-serif-lux">
                  Surah {activeSurahDetails?.englishName} ({activeSurahDetails?.name})
                </p>
                <p className="text-[11px] text-gold-lux truncate font-sans">
                  {t("quran_ayah_no")} {activeAyahs.find(a => a.number === playingAyahNumber)?.numberInSurah || playingAyahNumber} • {t("quran_reciting")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Play / Pause Toggle */}
              <button
                onClick={() => {
                  if (isAudioPlaying) {
                    if (audioRef.current) audioRef.current.pause();
                    setIsAudioPlaying(false);
                  } else if (audioRef.current) {
                    audioRef.current.play().catch(console.error);
                    setIsAudioPlaying(true);
                  }
                }}
                className="w-8 h-8 rounded-xl gold-gradient text-emerald-deep flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
                title={isAudioPlaying ? t("quran_pause_btn") : t("quran_listen_btn")}
              >
                {isAudioLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-deep" />
                ) : isAudioPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
              </button>

              {/* Stop & Close Audio Button */}
              <button
                onClick={stopAudio}
                className="w-8 h-8 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 hover:text-white hover:bg-red-900 flex items-center justify-center transition-colors cursor-pointer shadow-md"
                title="Close Audio Player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
