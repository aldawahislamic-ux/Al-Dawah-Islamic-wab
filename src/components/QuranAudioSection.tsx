import { useState, useRef, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  Search,
  Sparkles,
  ChevronRight,
  Headphones,
  ArrowLeft,
  SkipBack,
  SkipForward,
  ListMusic,
  X,
  Radio,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";

export type ReciterCategory = "makkah_madinah" | "viral_trending" | "classic_legend";

export interface Reciter {
  id: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  titleBn: string;
  titleEn: string;
  urlPrefix: string;
  fallbackPrefix?: string;
  category: ReciterCategory;
  categoryLabelBn: string;
  categoryLabelEn: string;
}

export const RECITERS: Reciter[] = [
  // 🕋 ১. মক্কার ও কাবার সম্মানিত ইমামগণ (Imams of Makkah & Kaaba)
  {
    id: "sudais",
    nameBn: "আব্দুর রহমান আস-সুদাইস",
    nameEn: "Abdul Rahman Al-Sudais",
    nameAr: "عبد الرحمن السديس",
    titleBn: "মসজিদুল হারামের প্রধান খতিব ও ইমাম",
    titleEn: "Chief Imam of Masjid al-Haram, Makkah",
    urlPrefix: "https://server11.mp3quran.net/sds/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "makkah_madinah",
    categoryLabelBn: "🕋 ক্বাবা শরীফের ইমাম",
    categoryLabelEn: "🕋 Makkah Imam"
  },
  {
    id: "muaiqly",
    nameBn: "মাহের আল-মুআইকলি",
    nameEn: "Maher Al-Muaiqly",
    nameAr: "ماهر المعيقلي",
    titleBn: "ক্বাবা শরীফের সম্মানিত ইমাম ও খতিব",
    titleEn: "Honored Imam of Holy Kaaba",
    urlPrefix: "https://server12.mp3quran.net/maher/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "makkah_madinah",
    categoryLabelBn: "🕋 ক্বাবা শরীফের ইমাম",
    categoryLabelEn: "🕋 Makkah Imam"
  },
  {
    id: "yasser",
    nameBn: "ইয়াসের আল-দোসারি",
    nameEn: "Yasser Al-Dosari",
    nameAr: "ياسر الدوسري",
    titleBn: "ক্বাবা শরীফের সুললিত কণ্ঠের ইমাম (ভাইরাল)",
    titleEn: "Viral Melodious Imam of Holy Kaaba",
    urlPrefix: "https://server11.mp3quran.net/yasser/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "makkah_madinah",
    categoryLabelBn: "🕋 ক্বাবা শরীফের ইমাম",
    categoryLabelEn: "🕋 Makkah Imam"
  },
  {
    id: "balila",
    nameBn: "বান্দার বালিলা",
    nameEn: "Bandar Baleela",
    nameAr: "بندر بليلة",
    titleBn: "মসজিদুল হারামের সম্মানিত ইমাম",
    titleEn: "Imam of Masjid al-Haram, Makkah",
    urlPrefix: "https://server6.mp3quran.net/balilah/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "makkah_madinah",
    categoryLabelBn: "🕋 ক্বাবা শরীফের ইমাম",
    categoryLabelEn: "🕋 Makkah Imam"
  },
  {
    id: "jhn",
    nameBn: "আব্দুল্লাহ আওয়াদ আল-জুহাইনী",
    nameEn: "Abdullah Awad Al-Juhany",
    nameAr: "عبد الله الجهني",
    titleBn: "মসজিদুল হারামের জনপ্রিয় ইমাম",
    titleEn: "Famous Imam of Masjid al-Haram",
    urlPrefix: "https://server13.mp3quran.net/jhn/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "makkah_madinah",
    categoryLabelBn: "🕋 ক্বাবা শরীফের ইমাম",
    categoryLabelEn: "🕋 Makkah Imam"
  },
  {
    id: "shuraim",
    nameBn: "সৌদ আল-শুরাইম",
    nameEn: "Saud Al-Shuraim",
    nameAr: "سعود الشريم",
    titleBn: "ক্বাবা শরীফের সাবেক কিংবদন্তি ইমাম",
    titleEn: "Renowned Former Imam of Holy Kaaba",
    urlPrefix: "https://server7.mp3quran.net/shur/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "makkah_madinah",
    categoryLabelBn: "🕋 ক্বাবা শরীফের ইমাম",
    categoryLabelEn: "🕋 Makkah Imam"
  },
  {
    id: "a_jbr",
    nameBn: "আলী জাবের",
    nameEn: "Ali Jaber",
    nameAr: "علي جابر",
    titleBn: "মসজিদুল হারামের কালজয়ী ইমাম",
    titleEn: "Legendary Imam of Masjid al-Haram",
    urlPrefix: "https://server11.mp3quran.net/a_jbr/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "makkah_madinah",
    categoryLabelBn: "🕋 ক্বাবা শরীফের ইমাম",
    categoryLabelEn: "🕋 Makkah Imam"
  },
  {
    id: "qasm",
    nameBn: "আব্দুল মুহসিন আল-কাসিম",
    nameEn: "Abdul Muhsin Al-Qasim",
    nameAr: "عبد المحسن القاسم",
    titleBn: "মসজিদে নববীর সম্মানিত ইমাম ও খতিব",
    titleEn: "Imam & Khatib of Masjid an-Nabawi",
    urlPrefix: "https://server8.mp3quran.net/qasm/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "makkah_madinah",
    categoryLabelBn: "🕌 মসজিদে নববীর ইমাম",
    categoryLabelEn: "🕌 Madinah Imam"
  },
  {
    id: "s_bud",
    nameBn: "সালাহ আল-বুদাইর",
    nameEn: "Salah Al-Budair",
    nameAr: "صلاح البدير",
    titleBn: "মসজিده নববীর সম্মানিত ইমাম",
    titleEn: "Imam of Masjid an-Nabawi",
    urlPrefix: "https://server6.mp3quran.net/s_bud/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "makkah_madinah",
    categoryLabelBn: "🕌 মসজিদে নববীর ইমাম",
    categoryLabelEn: "🕌 Madinah Imam"
  },
  {
    id: "ayyub",
    nameBn: "মুহাম্মদ আইয়ুব",
    nameEn: "Muhammad Ayyub",
    nameAr: "محمد أيوب",
    titleBn: "মসজিদে নববীর সাবেক সম্মানিত ইমাম",
    titleEn: "Former Honored Imam of Masjid an-Nabawi",
    urlPrefix: "https://server8.mp3quran.net/ayyub/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "makkah_madinah",
    categoryLabelBn: "🕌 মসজিদে নববীর ইমাম",
    categoryLabelEn: "🕌 Madinah Imam"
  },

  // 🔥 ২. বর্তমান সময়ের ভাইরাল ও ট্রেন্ডিং ক্বারী (Viral & Trending Reciters)
  {
    id: "islam",
    nameBn: "ইসলাম সোবহি",
    nameEn: "Islam Sobhi",
    nameAr: "إسلام صبحي",
    titleBn: "বর্তমান সময়ের ভাইরাল ও হৃদয়স্পর্শী মিশরীয় ক্বারি",
    titleEn: "Viral & Emotional Reciter of Today",
    urlPrefix: "https://server14.mp3quran.net/islam/Rewayat-Hafs-A-n-Assem/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "viral_trending",
    categoryLabelBn: "🔥 ভাইরাল ক্বারি",
    categoryLabelEn: "🔥 Viral Qari"
  },
  {
    id: "hazza",
    nameBn: "হাজ্জা আল-বালুশি",
    nameEn: "Hazza Al-Balushi",
    nameAr: "هزاع البلوشي",
    titleBn: "ওমানের ভাইরাল তরুণ সুললিত কণ্ঠের ক্বারি",
    titleEn: "Viral Young Melodious Omani Qari",
    urlPrefix: "https://server11.mp3quran.net/hazza/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "viral_trending",
    categoryLabelBn: "🔥 ভাইরাল ক্বারি",
    categoryLabelEn: "🔥 Viral Qari"
  },
  {
    id: "kurdi",
    nameBn: "রাদ আল-কুরদি",
    nameEn: "Raad Al-Kurdi",
    nameAr: "رعد الكردي",
    titleBn: "কুর্দিস্তানের ভাইরাল হৃদয়গ্রাহী ক্বারি",
    titleEn: "Viral Emotional Iraqi-Kurdish Qari",
    urlPrefix: "https://server6.mp3quran.net/kurdi/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "viral_trending",
    categoryLabelBn: "🔥 ভাইরাল ক্বারি",
    categoryLabelEn: "🔥 Viral Qari"
  },
  {
    id: "alafasy",
    nameBn: "মিশারি রশিদ আল-আফাসী",
    nameEn: "Mishary Rashid Alafasy",
    nameAr: "مشاري راشد العفاسي",
    titleBn: "কুয়েতের বিশ্বখ্যাত সুললিত কণ্ঠের ক্বারি",
    titleEn: "World-Famous Kuwaiti Qari",
    urlPrefix: "https://server8.mp3quran.net/afs/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "viral_trending",
    categoryLabelBn: "🔥 ভাইরাল ও বিশ্বখ্যাত",
    categoryLabelEn: "🔥 World Famous"
  },
  {
    id: "ossi",
    nameBn: "আব্দুর রহমান আল-ওসি",
    nameEn: "Abdul Rahman Al-Ossi",
    nameAr: "عبد الرحمن العوسي",
    titleBn: "বর্তমান সময়ের ভাইরাল সৌদি ক্বারি",
    titleEn: "Viral Melodious Saudi Qari",
    urlPrefix: "https://server6.mp3quran.net/aloosi/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "viral_trending",
    categoryLabelBn: "🔥 ভাইরাল ক্বারি",
    categoryLabelEn: "🔥 Viral Qari"
  },
  {
    id: "lhdan",
    nameBn: "মুহাম্মদ আল-লুহাইদান",
    nameEn: "Muhammad Al-Luhaidan",
    nameAr: "محمد اللحيدان",
    titleBn: "হৃদয়স্পর্শী কান্নার তিলাওয়াত (ভাইরাল)",
    titleEn: "Saudi Qari Famous for Emotional Recitation",
    urlPrefix: "https://server8.mp3quran.net/lhdan/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "viral_trending",
    categoryLabelBn: "🔥 ভাইরাল ক্বারি",
    categoryLabelEn: "🔥 Viral Qari"
  },
  {
    id: "jaleel",
    nameBn: "খালিদ আল-জলিল",
    nameEn: "Khalid Al-Jalil",
    nameAr: "خالد الجليل",
    titleBn: "রিয়াদের ভাইরাল ক্বারি (সূরা গাফির তিলাওয়াতে বিখ্যাত)",
    titleEn: "Famous Qari of Riyadh, Saudi Arabia",
    urlPrefix: "https://server10.mp3quran.net/jleel/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "viral_trending",
    categoryLabelBn: "🔥 ভাইরাল ক্বারি",
    categoryLabelEn: "🔥 Viral Qari"
  },
  {
    id: "qatami",
    nameBn: "নাসের আল-কাতামি",
    nameEn: "Nasser Al-Qatami",
    nameAr: "ناصر القطامي",
    titleBn: "সৌদি আরবের অন্যতম জনপ্রিয় ক্বারি",
    titleEn: "One of Saudi Arabia's Most Popular Qaris",
    urlPrefix: "https://server6.mp3quran.net/qtm/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "viral_trending",
    categoryLabelBn: "🔥 জনপ্রিয় ক্বারি",
    categoryLabelEn: "🔥 Popular Qari"
  },
  {
    id: "shatri",
    nameBn: "আবু বকর আল-শাতরী",
    nameEn: "Abu Bakr Al-Shatri",
    nameAr: "أبو بكر الشاطري",
    titleBn: "মধুর কণ্ঠের সৌদি ক্বারি",
    titleEn: "Melodious Saudi Qari",
    urlPrefix: "https://server11.mp3quran.net/shatri/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "viral_trending",
    categoryLabelBn: "🔥 জনপ্রিয় ক্বারি",
    categoryLabelEn: "🔥 Popular Qari"
  },
  {
    id: "fares",
    nameBn: "ফারেস আব্বাদ",
    nameEn: "Fares Abbad",
    nameAr: "فارس عباد",
    titleBn: "ইয়েমেনের বিশ্বখ্যাত মধুর কণ্ঠের ক্বারি",
    titleEn: "World-Renowned Yemeni Qari",
    urlPrefix: "https://server8.mp3quran.net/frs_a/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "viral_trending",
    categoryLabelBn: "🔥 বিশ্বখ্যাত ক্বারি",
    categoryLabelEn: "🔥 World Famous"
  },

  // 👑 ৩. আন্তর্জাতিক ও কালজয়ী ক্বারী (Classic & International Legends)
  {
    id: "ghamdi",
    nameBn: "সাদ আল-গামদি",
    nameEn: "Saad Al-Ghamdi",
    nameAr: "سعد الغامدي",
    titleBn: "বিখ্যাত সৌদি ক্বারি",
    titleEn: "Renowned Saudi Qari",
    urlPrefix: "https://server7.mp3quran.net/s_gmd/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "classic_legend",
    categoryLabelBn: "👑 কালজয়ী ক্বারি",
    categoryLabelEn: "👑 Classic Legend"
  },
  {
    id: "ajmi",
    nameBn: "আহমেদ আল-আজমি",
    nameEn: "Ahmed Al-Ajmi",
    nameAr: "أحمد العجمي",
    titleBn: "সৌদি আরবের কালজয়ী ক্বারি",
    titleEn: "Classic Saudi Qari",
    urlPrefix: "https://server10.mp3quran.net/ajm/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "classic_legend",
    categoryLabelBn: "👑 কালজয়ী ক্বারি",
    categoryLabelEn: "👑 Classic Legend"
  },
  {
    id: "basit",
    nameBn: "আব্দুল বাসিত আব্দুল সামাদ",
    nameEn: "Abdul Basit Abdul Samad",
    nameAr: "عبد الباسط عبد الصمد",
    titleBn: "কালজয়ী আন্তর্জাতিক ক্বারি",
    titleEn: "Legendary International Qari",
    urlPrefix: "https://server7.mp3quran.net/basit/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "classic_legend",
    categoryLabelBn: "👑 কালজয়ী ক্বারি",
    categoryLabelEn: "👑 Classic Legend"
  },
  {
    id: "husary",
    nameBn: "মাহমুদ খলিল আল-হুসারী",
    nameEn: "Mahmoud Khalil Al-Husary",
    nameAr: "محمود خليل الحصري",
    titleBn: "মিশরের বিখ্যাত তাজবীদুল কুরআন বিশারদ",
    titleEn: "Master Tajweed Reciter of Egypt",
    urlPrefix: "https://server13.mp3quran.net/husr/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "classic_legend",
    categoryLabelBn: "👑 কালজয়ী ক্বারি",
    categoryLabelEn: "👑 Classic Legend"
  },
  {
    id: "minsh",
    nameBn: "মুহাম্মদ সিদ্দিক আল-মিনশাওয়ি",
    nameEn: "Mohamed Siddiq El-Minshawi",
    nameAr: "محمد صديق المنشاوي",
    titleBn: "মিশরের কালজয়ী সুললিত কণ্ঠের ক্বারি",
    titleEn: "Legendary Egyptian Qari",
    urlPrefix: "https://server10.mp3quran.net/minsh/",
    fallbackPrefix: "https://server8.mp3quran.net/afs/",
    category: "classic_legend",
    categoryLabelBn: "👑 কালজয়ী ক্বারি",
    categoryLabelEn: "👑 Classic Legend"
  }
];

export interface AudioSurahItem {
  id: number;
  nameAr: string;
  nameBn: string;
  nameEn: string;
  meaningBn: string;
  meaningEn: string;
  totalAyahs: number;
  type: "Meccan" | "Medinan";
}

export const SURAH_AUDIO_LIST: AudioSurahItem[] = [
  { id: 1, nameAr: "الفاتحة", nameBn: "আল-ফাতিহা", nameEn: "Al-Fatihah", meaningBn: "সূচনা", meaningEn: "The Opening", totalAyahs: 7, type: "Meccan" },
  { id: 2, nameAr: "البقرة", nameBn: "আল-বাকারা", nameEn: "Al-Baqarah", meaningBn: "বকনা বাছুর", meaningEn: "The Cow", totalAyahs: 286, type: "Medinan" },
  { id: 3, nameAr: "آل عمران", nameBn: "আলে ইমরান", nameEn: "Ali 'Imran", meaningBn: "ইমরানের পরিবার", meaningEn: "Family of Imran", totalAyahs: 200, type: "Medinan" },
  { id: 4, nameAr: "النساء", nameBn: "আন-নিসা", nameEn: "An-Nisa", meaningBn: "নারী", meaningEn: "The Women", totalAyahs: 176, type: "Medinan" },
  { id: 5, nameAr: "المائدة", nameBn: "আল-মায়িদাহ", nameEn: "Al-Ma'idah", meaningBn: "খাদ্য পরিবেশিত খাদ্যধার", meaningEn: "The Table Spread", totalAyahs: 120, type: "Medinan" },
  { id: 18, nameAr: "الكهف", nameBn: "আল-কাহফ", nameEn: "Al-Kahf", meaningBn: "গুহা", meaningEn: "The Cave", totalAyahs: 110, type: "Meccan" },
  { id: 36, nameAr: "يس", nameBn: "ইয়াসীন", nameEn: "Yaseen", meaningBn: "ইয়াসীন", meaningEn: "Yaseen", totalAyahs: 83, type: "Meccan" },
  { id: 55, nameAr: "الرحمن", nameBn: "আর-রহমান", nameEn: "Ar-Rahman", meaningBn: "পরম দয়াময়", meaningEn: "The Beneficent", totalAyahs: 78, type: "Medinan" },
  { id: 56, nameAr: "الواقعة", nameBn: "আল-ওয়াকিআহ", nameEn: "Al-Waqi'ah", meaningBn: "নিশ্চিত ঘটনা", meaningEn: "The Inevitable", totalAyahs: 96, type: "Meccan" },
  { id: 67, nameAr: "الملك", nameBn: "আল-মূল্‌ক", nameEn: "Al-Mulk", meaningBn: "সার্বভৌম কর্তৃত্ব", meaningEn: "The Sovereignty", totalAyahs: 30, type: "Meccan" },
  { id: 78, nameAr: "النبأ", nameBn: "আন-নাবা", nameEn: "An-Naba'", meaningBn: "মহাবাতা", meaningEn: "The Tidings", totalAyahs: 40, type: "Meccan" },
  { id: 97, nameAr: "القدر", nameBn: "আল-কদর", nameEn: "Al-Qadr", meaningBn: "মহিমান্বিত রাত", meaningEn: "The Power", totalAyahs: 5, type: "Meccan" },
  { id: 108, nameAr: "الكوثر", nameBn: "আল-কাওসার", nameEn: "Al-Kawthar", meaningBn: "প্রাচুর্য", meaningEn: "Abundance", totalAyahs: 3, type: "Meccan" },
  { id: 112, nameAr: "الإخلاص", nameBn: "আল-ইখলাস", nameEn: "Al-Ikhlas", meaningBn: "একনিষ্ঠতা", meaningEn: "Purity", totalAyahs: 4, type: "Meccan" },
  { id: 113, nameAr: "الفلق", nameBn: "আল-ফালাক", nameEn: "Al-Falaq", meaningBn: "প্ৰভাত", meaningEn: "The Daybreak", totalAyahs: 5, type: "Meccan" },
  { id: 114, nameAr: "الناس", nameBn: "আন-নাস", nameEn: "An-Nas", meaningBn: "মানবজাতি", meaningEn: "Mankind", totalAyahs: 6, type: "Meccan" }
];

interface QuranAudioSectionProps {
  onClose?: () => void;
}

export default function QuranAudioSection({ onClose }: QuranAudioSectionProps) {
  const { language } = useLanguage();
  const isBn = language === "bn";

  // State management
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);
  const [selectedSurah, setSelectedSurah] = useState<AudioSurahItem>(SURAH_AUDIO_LIST[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const [isUsingFallbackAudio, setIsUsingFallbackAudio] = useState<boolean>(false);
  const [isSurahModalOpen, setIsSurahModalOpen] = useState<boolean>(false);
  const [isReciterModalOpen, setIsReciterModalOpen] = useState<boolean>(false);
  const [reciterCategoryFilter, setReciterCategoryFilter] = useState<"all" | ReciterCategory>("all");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generate Audio URL for selected Surah and Reciter (with automatic fallback support)
  const getAudioUrl = (surahId: number, reciter: Reciter, useFallback = false) => {
    const formattedId = String(surahId).padStart(3, "0");
    const prefix = (useFallback && reciter.fallbackPrefix) ? reciter.fallbackPrefix : reciter.urlPrefix;
    return `${prefix}${formattedId}.mp3`;
  };

  const currentAudioUrl = getAudioUrl(selectedSurah.id, selectedReciter, isUsingFallbackAudio);

  const prevSurahIdRef = useRef<number>(selectedSurah.id);

  // Automatically load and play when Surah or Reciter changes
  useEffect(() => {
    setIsUsingFallbackAudio(false);
    const audioEl = audioRef.current;
    if (!audioEl) return;
    const targetUrl = getAudioUrl(selectedSurah.id, selectedReciter, false);

    // If only the reciter changed (same Surah), preserve the current playback position
    const isSameSurah = selectedSurah.id === prevSurahIdRef.current;
    const savedTime = isSameSurah ? (audioEl.currentTime || currentTime) : 0;
    prevSurahIdRef.current = selectedSurah.id;

    audioEl.pause();
    audioEl.src = targetUrl;
    audioEl.load();

    const restoreTime = () => {
      if (savedTime > 0) {
        try {
          audioEl.currentTime = savedTime;
        } catch (e) {
          // ignore if metadata not ready yet
        }
      }
    };

    if (savedTime > 0) {
      restoreTime();
      const onReady = () => {
        restoreTime();
        audioEl.removeEventListener("loadedmetadata", onReady);
        audioEl.removeEventListener("canplay", onReady);
      };
      audioEl.addEventListener("loadedmetadata", onReady);
      audioEl.addEventListener("canplay", onReady);
    } else {
      try {
        audioEl.currentTime = 0;
      } catch (e) {
        // ignore
      }
    }

    if (isPlaying) {
      setIsLoadingAudio(true);
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoadingAudio(false);
          })
          .catch(() => {
            setIsLoadingAudio(false);
            setIsPlaying(false);
          });
      }
    }
  }, [selectedSurah.id, selectedReciter.id]);

  // Handle Play/Pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoadingAudio(true);
      if (!audioRef.current.src || audioRef.current.src === "" || audioRef.current.src === window.location.href) {
        audioRef.current.src = currentAudioUrl;
        audioRef.current.load();
      }
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoadingAudio(false);
          })
          .catch(() => {
            setIsLoadingAudio(false);
            setIsPlaying(false);
          });
      }
    }
  };

  // Change Surah and auto-play immediately
  const handleSelectSurah = (surah: AudioSurahItem) => {
    setSelectedSurah(surah);
    setIsSurahModalOpen(false);
    setCurrentTime(0);
    setIsPlaying(true);
    setIsLoadingAudio(true);
  };

  // Next Surah
  const handleNextSurah = () => {
    const currentIndex = SURAH_AUDIO_LIST.findIndex((s) => s.id === selectedSurah.id);
    const nextIndex = (currentIndex + 1) % SURAH_AUDIO_LIST.length;
    handleSelectSurah(SURAH_AUDIO_LIST[nextIndex]);
  };

  // Previous Surah
  const handlePrevSurah = () => {
    const currentIndex = SURAH_AUDIO_LIST.findIndex((s) => s.id === selectedSurah.id);
    const prevIndex = (currentIndex - 1 + SURAH_AUDIO_LIST.length) % SURAH_AUDIO_LIST.length;
    handleSelectSurah(SURAH_AUDIO_LIST[prevIndex]);
  };

  // Change Reciter and auto-play immediately (resume from exact same playback time!)
  const handleSelectReciter = (reciter: Reciter) => {
    setSelectedReciter(reciter);
    setIsReciterModalOpen(false);
    setIsPlaying(true);
    setIsLoadingAudio(true);
  };

  // Skip forward / backward seconds
  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        Math.max(audioRef.current.currentTime + seconds, 0),
        duration
      );
    }
  };

  // Handle Seek
  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  // Handle Volume
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (newVol > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Time Formatter
  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec)) return "00:00";
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Sync Audio playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Crucial: Stop and clear audio immediately when component unmounts
  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0;
        audioEl.src = "";
      }
    };
  }, []);

  // Dedicated Close Handler to stop audio before closing modal
  const handleClose = () => {
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
      audioEl.src = "";
    }
    setIsPlaying(false);
    if (onClose) {
      onClose();
    }
  };

  // Filter Surahs based on search query
  const filteredSurahs = SURAH_AUDIO_LIST.filter(
    (s) =>
      s.nameBn.includes(searchQuery) ||
      s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameAr.includes(searchQuery) ||
      String(s.id).includes(searchQuery)
  );

  return (
    <section
      id="quran-audio"
      className={`relative bg-[#021810] text-white overflow-hidden ${
        onClose
          ? "w-full min-h-screen p-0 flex flex-col justify-between"
          : "py-8 sm:py-14 px-4 sm:px-6 lg:px-8 bg-emerald-deep/95"
      }`}
    >
      
      {/* Background Decor */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-lux/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-lux/10 rounded-full blur-3xl pointer-events-none" />

      {/* 👑 MAIN CONTAINER - FULL SCREEN EDGE TO EDGE WITHOUT SIDE BORDER IN MODAL */}
      <div className={`mx-auto relative z-10 w-full ${onClose ? "w-full max-w-none" : "max-w-6xl"}`}>
        
        <div
          className={`relative bg-[#021810]/95 backdrop-blur-2xl ${
            onClose
              ? "p-2 sm:p-6 md:p-10 border-0 rounded-none shadow-none"
              : "rounded-3xl border-2 border-gold-lux/40 p-5 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
          }`}
        >
          
          {/* Header Badge & Title */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6 pb-5 border-b border-gold-lux/30">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-lux/40 bg-gold-lux/10 text-gold-lux text-xs uppercase font-semibold tracking-widest mb-2 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <Headphones className="w-4 h-4 text-gold-lux animate-pulse" />
                <span>{isBn ? "পবিত্র কুরআন অডিও সার্ভিস" : "Holy Quran Audio Recitations"}</span>
              </div>
              <h2 className="font-serif-lux text-2xl sm:text-3xl md:text-4xl text-white font-light tracking-wide">
                {isBn ? "কোরআন অডিও প্লেয়ার (ফুল স্ক্রিন)" : "Quran Audio Player (Full Screen)"}
              </h2>
            </div>

            {/* Action Buttons to Open Surah or Qari Switcher Modal */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full lg:w-auto">
              <button
                onClick={() => setIsSurahModalOpen(true)}
                className="group px-4 py-3 rounded-xl bg-gradient-to-r from-gold-lux via-amber-400 to-yellow-500 text-emerald-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <ListMusic className="w-4 h-4" />
                <span>{isBn ? "সূরা পরিবর্তন করুন" : "Change Surah"}</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setIsReciterModalOpen(true)}
                className="group px-4 py-3 rounded-xl bg-emerald-900 border-2 border-gold-lux/60 hover:border-gold-lux text-gold-lux hover:text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Radio className="w-4 h-4 text-gold-lux group-hover:text-white" />
                <span>{isBn ? "কারি পরিবর্তন করুন" : "Change Qari"}</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              {onClose && (
                <button
                  onClick={handleClose}
                  className="px-5 py-3 rounded-xl bg-red-900/90 border-2 border-red-500/70 hover:bg-red-800 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  title="Close & Stop Audio"
                >
                  <span>{isBn ? "বন্ধ করুন ও অডিও থামান" : "Close & Stop"}</span>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Hidden HTML Audio Tag */}
          <audio
            ref={audioRef}
            preload="auto"
            onTimeUpdate={() => {
              if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
            }}
            onLoadedMetadata={() => {
              if (audioRef.current) setDuration(audioRef.current.duration);
            }}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
            onError={() => {
              console.warn("Audio element error occurred while loading audio source. Attempting automatic fallback...");
              const audioEl = audioRef.current;
              if (audioEl && !isUsingFallbackAudio && selectedReciter.fallbackPrefix) {
                setIsUsingFallbackAudio(true);
                const fallbackUrl = getAudioUrl(selectedSurah.id, selectedReciter, true);
                audioEl.src = fallbackUrl;
                audioEl.load();
                if (isPlaying) {
                  audioEl.play().catch(() => {
                    setIsLoadingAudio(false);
                    setIsPlaying(false);
                  });
                } else {
                  setIsLoadingAudio(false);
                }
              } else {
                setIsLoadingAudio(false);
                setIsPlaying(false);
              }
            }}
          />

          {/* 🎵 2. MAIN PLAYER CARD (EDGE TO EDGE WHEN ONCLOSE IS TRUE) */}
          <div
            className={`relative bg-gradient-to-br from-[#021810] via-[#03281b] to-[#021810] ${
              onClose
                ? "w-full max-w-full p-3 sm:p-8 md:p-10 border-0 rounded-none shadow-none"
                : "border-2 border-gold-lux/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
            } overflow-hidden`}
          >
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-lux/10 rounded-full blur-3xl pointer-events-none" />

            {/* Seamless Fallback Notice */}
            {isUsingFallbackAudio && (
              <div className="relative z-20 mb-4 p-3 rounded-2xl bg-amber-950/80 border border-amber-400/40 text-amber-200 text-xs flex items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚠️</span>
                  <span>
                    {isBn
                      ? `${selectedReciter.nameBn || selectedReciter.nameEn}-এর কণ্ঠে এই সূরাটির অডিও সার্ভারে অনুপস্থিত থাকায় স্বয়ংক্রিয়ভাবে মিশারী আল-আফাসীর সুললিত তিলাওয়াত বাজানো হচ্ছে।`
                      : `Surah audio unavailable for ${selectedReciter.nameEn} on server. Seamlessly playing fallback recitation (Mishary Alafasy).`}
                  </span>
                </div>
                <button
                  onClick={() => setIsUsingFallbackAudio(false)}
                  className="text-amber-400 hover:text-white font-bold px-2 py-0.5"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mb-6">
              
              {/* Surah Details */}
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-lux/10 border border-gold-lux/30 text-gold-lux text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isBn ? `সূরা নং: ${selectedSurah.id}` : `Surah No. ${selectedSurah.id}`}</span>
                  <span>•</span>
                  <span>{selectedSurah.type === "Meccan" ? (isBn ? "মাক্কী" : "Meccan") : (isBn ? "মাদানী" : "Medinan")}</span>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-baseline gap-3">
                  <h3 className="text-2xl sm:text-4xl font-bold font-serif-lux text-white">
                    {isBn ? selectedSurah.nameBn : selectedSurah.nameEn}
                  </h3>
                  <span className="text-3xl font-serif-lux text-gold-lux">
                    ({selectedSurah.nameAr})
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 font-sans mt-2">
                  {isBn ? `অর্থ: ${selectedSurah.meaningBn}` : `Meaning: ${selectedSurah.meaningEn}`} • {isBn ? `${selectedSurah.totalAyahs}টি আয়াত` : `${selectedSurah.totalAyahs} Verses`}
                </p>

                {/* Active Qari Name Display */}
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900/60 border border-gold-lux/30">
                  <span className="text-xs text-gray-300">{isBn ? "বর্তমান ক্বারি:" : "Active Qari:"}</span>
                  <span className="text-sm font-bold text-gold-lux font-serif-lux">
                    {isBn ? selectedReciter.nameBn : selectedReciter.nameEn}
                  </span>
                </div>
              </div>

              {/* Sound Wave Visualizer */}
              <div className="flex flex-col items-center md:items-end gap-2.5">
                <div className="flex items-center gap-1.5 h-10 px-4 py-1.5 bg-emerald-900/50 rounded-2xl border border-gold-lux/30">
                  {[40, 75, 25, 90, 60, 30, 85, 45, 100, 35, 70, 50, 80, 20, 65].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-gold-lux rounded-full"
                      animate={
                        isPlaying
                          ? { height: [`${Math.max(15, h * 0.4)}%`, `${h}%`, `${Math.max(10, h * 0.2)}%`] }
                          : { height: "20%" }
                      }
                      transition={
                        isPlaying
                          ? { repeat: Infinity, duration: 0.6 + (i % 5) * 0.15, ease: "easeInOut" }
                          : { duration: 0.3 }
                      }
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Audio Progress Bar */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-gold-lux font-mono font-semibold">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="relative flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2.5 bg-emerald-900/80 rounded-lg appearance-none cursor-pointer accent-gold-lux focus:outline-none"
                />
              </div>
            </div>

            {/* Player Controls - Designed for zero clipping on any screen */}
            <div className="mt-6 pt-5 border-t border-gold-lux/20 space-y-5">
              
              {/* Main Center Row: Prev Icon | Rewind | Play | Forward | Next Icon */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 w-full">
                
                {/* Previous Surah Round Button */}
                <button
                  onClick={handlePrevSurah}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-900 border border-gold-lux/50 text-gold-lux hover:bg-gold-lux hover:text-emerald-950 flex items-center justify-center transition-all shadow cursor-pointer flex-shrink-0"
                  title={isBn ? "পূর্ববর্তী সূরা" : "Previous Surah"}
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>

                {/* Rewind 10s */}
                <button
                  onClick={() => handleSkip(-10)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-900/80 border border-gold-lux/30 text-gold-lux hover:text-white hover:border-gold-lux flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                  title={isBn ? "১০ সেকেন্ড পিছনে" : "Rewind 10s"}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Main Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  disabled={isLoadingAudio}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-gold-lux via-amber-400 to-yellow-500 text-emerald-950 font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 flex-shrink-0"
                  title={isPlaying ? (isBn ? "থামান" : "Pause") : (isBn ? "চালান" : "Play")}
                >
                  {isLoadingAudio ? (
                    <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>{isBn ? "থামান" : "Pause"}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>{isBn ? "প্লে করুন" : "Play Audio"}</span>
                    </>
                  )}
                </button>

                {/* Forward 10s */}
                <button
                  onClick={() => handleSkip(10)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-900/80 border border-gold-lux/30 text-gold-lux hover:text-white hover:border-gold-lux flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                  title={isBn ? "১০ সেকেন্ড সামনে" : "Forward 10s"}
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Next Surah Round Button */}
                <button
                  onClick={handleNextSurah}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-900 border border-gold-lux/50 text-gold-lux hover:bg-gold-lux hover:text-emerald-950 flex items-center justify-center transition-all shadow cursor-pointer flex-shrink-0"
                  title={isBn ? "পরবর্তী সূরা" : "Next Surah"}
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>

              </div>

              {/* Bottom Row: Full text Prev Surah | Speed | Full text Next Surah + Volume */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gold-lux/10">
                
                {/* Text Previous Surah button */}
                <button
                  onClick={handlePrevSurah}
                  className="px-3.5 py-2 rounded-xl bg-emerald-900/80 border border-gold-lux/40 text-gold-lux hover:bg-gold-lux hover:text-emerald-950 flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer shadow hover:scale-105 active:scale-95"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                  <span>{isBn ? "পূর্ববর্তী সূরা" : "Previous Surah"}</span>
                </button>

                {/* Playback speed selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-300 font-sans mr-1">{isBn ? "গতি:" : "Speed:"}</span>
                  {[1, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setPlaybackRate(rate)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        playbackRate === rate
                          ? "bg-gold-lux text-emerald-950 font-bold shadow"
                          : "bg-emerald-900/60 text-gray-300 hover:text-white border border-gold-lux/20"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                {/* Text Next Surah button */}
                <button
                  onClick={handleNextSurah}
                  className="px-3.5 py-2 rounded-xl bg-emerald-900/80 border border-gold-lux/40 text-gold-lux hover:bg-gold-lux hover:text-emerald-950 flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer shadow hover:scale-105 active:scale-95"
                >
                  <span>{isBn ? "পরবর্তী সূরা" : "Next Surah"}</span>
                  <SkipForward className="w-3.5 h-3.5" />
                </button>

              </div>

              {/* Volume Slider row */}
              <div className="flex items-center justify-center sm:justify-end gap-2 pt-2">
                <button
                  onClick={toggleMute}
                  className="text-gold-lux hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1.5 bg-emerald-900/80 rounded-lg appearance-none cursor-pointer accent-gold-lux focus:outline-none"
                />
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 📜 SURAH SELECTOR MODAL (FULL SCREEN POPUP WHEN CLICKING "সূরা পরিবর্তন করুন") */}
      <AnimatePresence>
        {isSurahModalOpen && (
          <div className="fixed inset-0 z-[100] bg-[#021810] flex flex-col overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full h-full max-w-7xl mx-auto p-4 sm:p-8 flex flex-col"
            >
              {/* Full Screen Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gold-lux/30 mb-6">
                <div className="flex items-center gap-3">
                  <ListMusic className="w-6 h-6 text-gold-lux" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-serif-lux">
                      {isBn ? "পবিত্র সূরা নির্বাচন করুন" : "Select Holy Surah"}
                    </h3>
                    <p className="text-xs text-gold-lux/80">
                      {isBn ? "যেকোনো সূরার ওপর ক্লিক করলে অডিও তেলাওয়াত চালু হবে" : "Click any Surah to start audio recitation"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSurahModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-emerald-900/80 border border-gold-lux/40 text-gold-lux hover:text-white hover:bg-emerald-800 transition-all cursor-pointer flex items-center gap-2 font-bold text-sm"
                >
                  <span>{isBn ? "বন্ধ করুন" : "Close"}</span>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Field */}
              <div className="relative mb-6 max-w-xl">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gold-lux/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isBn ? "সূরার নাম বা নম্বর লিখে খুঁজুন..." : "Search Surah name or number..."}
                  className="w-full bg-emerald-950/80 border-2 border-gold-lux/40 rounded-2xl pl-12 pr-4 py-3 text-base text-gold-lux placeholder-gray-400 outline-none focus:border-gold-lux transition-all"
                />
              </div>

              {/* Full-Screen Surahs Grid List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 overflow-y-auto pr-2 flex-1 scrollbar-thin scrollbar-thumb-gold-lux/30 pb-12">
                {filteredSurahs.map((surah) => {
                  const isCurrent = selectedSurah.id === surah.id;
                  return (
                    <button
                      key={surah.id}
                      onClick={() => handleSelectSurah(surah)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                        isCurrent
                          ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-[0_0_25px_rgba(212,175,55,0.4)] font-bold scale-[1.02]"
                          : "bg-emerald-950/80 text-gray-200 border-gold-lux/20 hover:border-gold-lux hover:bg-emerald-900/80"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${isCurrent ? "bg-emerald-950 text-gold-lux" : "bg-gold-lux/20 text-gold-lux"}`}>
                          {surah.id}
                        </span>
                        <span className="font-serif-lux text-lg">{surah.nameAr}</span>
                      </div>

                      <div>
                        <span className="text-base font-bold block truncate">
                          {isBn ? surah.nameBn : surah.nameEn}
                        </span>
                        <span className={`text-xs block truncate mt-0.5 ${isCurrent ? "text-emerald-950/80" : "text-gray-400"}`}>
                          {isBn ? `অর্থ: ${surah.meaningBn}` : `Meaning: ${surah.meaningEn}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 👳 QARI SELECTOR MODAL (FULL SCREEN POPUP WITH LARGE BOLD TEXT, NO PHOTOS) */}
      <AnimatePresence>
        {isReciterModalOpen && (
          <div className="fixed inset-0 z-[100] bg-[#021810] flex flex-col overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full h-full max-w-7xl mx-auto p-4 sm:p-8 flex flex-col"
            >
              {/* Full Screen Modal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gold-lux/30 mb-4 gap-3">
                <div className="flex items-center gap-3">
                  <Radio className="w-6 h-6 text-gold-lux shrink-0" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-serif-lux">
                      {isBn ? "বিশ্বখ্যাত কারি নির্বাচন করুন (নামে ক্লিক করুন)" : "Select World-Renowned Qari"}
                    </h3>
                    <p className="text-xs text-gold-lux/80">
                      {isBn ? "পছন্দের কারির ওপর ক্লিক করলে সেই কারির তেলাওয়াত চালু হবে" : "Click any Qari to listen to their recitation"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsReciterModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-emerald-900/80 border border-gold-lux/40 text-gold-lux hover:text-white hover:bg-emerald-800 transition-all cursor-pointer flex items-center gap-2 font-bold text-sm self-end sm:self-auto"
                >
                  <span>{isBn ? "বন্ধ করুন" : "Close"}</span>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {[
                  { id: "all", labelBn: "✨ সকল ক্বারি", labelEn: "✨ All Qaris" },
                  { id: "makkah_madinah", labelBn: "🕋 মক্কা ও কাবার ইমাম", labelEn: "🕋 Makkah & Madinah Imams" },
                  { id: "viral_trending", labelBn: "🔥 ভাইরাল ও ট্রেন্ডিং", labelEn: "🔥 Viral & Trending" },
                  { id: "classic_legend", labelBn: "👑 কালজয়ী কিংবদন্তি", labelEn: "👑 Classic Legends" }
                ].map((tab) => {
                  const isActive = reciterCategoryFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setReciterCategoryFilter(tab.id as any)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                        isActive
                          ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                          : "bg-emerald-950/80 text-gray-200 border-gold-lux/30 hover:border-gold-lux hover:bg-emerald-900/80"
                      }`}
                    >
                      {isBn ? tab.labelBn : tab.labelEn}
                    </button>
                  );
                })}
              </div>

              {/* Full-Screen Reciters Grid List - Large Text, No Photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2 flex-1 scrollbar-thin scrollbar-thumb-gold-lux/30 pb-12">
                {RECITERS.filter(r => reciterCategoryFilter === "all" ? true : r.category === reciterCategoryFilter).map((reciter) => {
                  const isSelected = selectedReciter.id === reciter.id;
                  return (
                    <button
                      key={reciter.id}
                      onClick={() => handleSelectReciter(reciter)}
                      className={`p-5 rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-gold-lux via-amber-400 to-gold-lux text-emerald-950 border-gold-lux shadow-[0_0_30px_rgba(212,175,55,0.45)] font-bold scale-[1.02]"
                          : "bg-emerald-950/90 text-gray-100 border-gold-lux/30 hover:border-gold-lux hover:bg-emerald-900/80"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <span className={`text-xs font-mono tracking-wider uppercase ${isSelected ? "text-emerald-950/80 font-bold" : "text-gold-lux/80"}`}>
                          {reciter.nameAr}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isSelected ? "bg-emerald-950 text-gold-lux" : "bg-emerald-900/80 text-gold-lux border border-gold-lux/30"
                          }`}>
                            {isBn ? reciter.categoryLabelBn : reciter.categoryLabelEn}
                          </span>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-gold-lux text-[10px] font-bold uppercase tracking-wide">
                              {isBn ? "নির্বাচিত" : "Selected"}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="my-1">
                        {/* LARGE BOLD QARI NAME - AS REQUESTED */}
                        <h4 className={`text-xl sm:text-2xl font-extrabold font-serif-lux leading-snug ${isSelected ? "text-emerald-950" : "text-gold-lux"}`}>
                          {isBn ? reciter.nameBn : reciter.nameEn}
                        </h4>
                      </div>

                      <p className={`text-xs sm:text-sm font-sans mt-2 ${isSelected ? "text-emerald-950/90 font-semibold" : "text-gray-300"}`}>
                        {isBn ? reciter.titleBn : reciter.titleEn}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
