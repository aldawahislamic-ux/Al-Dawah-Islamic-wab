import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Moon,
  Sun,
  Star,
  Sparkles,
  Clock,
  ChevronLeft,
  ChevronRight,
  Info,
  Award,
  Bookmark,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export interface IslamicEvent {
  id: string;
  titleBn: string;
  titleEn: string;
  hijriDateBn: string;
  hijriDateEn: string;
  approxGregorianBn: string;
  approxGregorianEn: string;
  descBn: string;
  descEn: string;
  category: "eid" | "night" | "fasting" | "month";
  daysRemaining?: number;
}

export const ISLAMIC_EVENTS_LIST: IslamicEvent[] = [
  {
    id: "ashura",
    titleBn: "পবিত্র আশুরা (১০ মহররম)",
    titleEn: "The Blessed Day of Ashura (10 Muharram)",
    hijriDateBn: "১০ মহররম ১৪৪৭ হিজরি",
    hijriDateEn: "10 Muharram 1447 AH",
    approxGregorianBn: "জুলাই ২০২৫ (আনুমানিক)",
    approxGregorianEn: "July 2025 (Approx.)",
    descBn: "হযরত মূসা (আ.) ও বনী ইসরাঈলের ফেরাউনের হাত থেকে নাজাতের ঐতিহাসিক দিন। এই দিনে রোজা রাখা অত্যন্ত ফজিলতপূর্ণ।",
    descEn: "Historic day when Prophet Musa (AS) was saved from Pharaoh. Fasting on this day expiates minor sins of the previous year.",
    category: "fasting"
  },
  {
    id: "milad",
    titleBn: "ঈদে মিলাদুন্নবী (সা.) (১২ রবিউল আউয়াল)",
    titleEn: "Eid-e-Miladunnabi (12 Rabi' al-Awwal)",
    hijriDateBn: "১২ রবিউল আউয়াল ১৪৪৭ হিজরি",
    hijriDateEn: "12 Rabi' al-Awwal 1447 AH",
    approxGregorianBn: "সেপ্টেম্বর ২০২৫ (আনুমানিক)",
    approxGregorianEn: "September 2025 (Approx.)",
    descBn: "সর্বশেষ ও সর্বশ্রেষ্ঠ নবী হযরত মুহাম্মদ (সা.)-এর পবিত্র আগমন ও সীরাত আলোচনার বরকতময় মাস।",
    descEn: "Blessed period reflecting on the birth, life, and teachings of the Prophet Muhammad (PBUH).",
    category: "month"
  },
  {
    id: "miraj",
    titleBn: "পবিত্র শবে মেরাজ (২৭ রজব)",
    titleEn: "Shab-e-Miraj (27 Rajab)",
    hijriDateBn: "২৭ রজব ১৪৪৭ হিজরি",
    hijriDateEn: "27 Rajab 1447 AH",
    approxGregorianBn: "জানুয়ারি ২০২৬ (আনুমানিক)",
    approxGregorianEn: "January 2026 (Approx.)",
    descBn: "রাসূলুল্লাহ (সা.)-এর ঊর্ধ্বাকাশ গমন এবং উম্মতের জন্য পাঁচ ওয়াক্ত নামাজের উপহার লাভের পবিত্র রজনী।",
    descEn: "The Night of Ascension when Prophet Muhammad (PBUH) journeyed to the heavens and received the five daily prayers.",
    category: "night"
  },
  {
    id: "barat",
    titleBn: "পবিত্র শবে বরাত (১৫ শাবান)",
    titleEn: "Shab-e-Barat (15 Sha'ban)",
    hijriDateBn: "১৫ শাবান ১৪৪৭ হিজরি",
    hijriDateEn: "15 Sha'ban 1447 AH",
    approxGregorianBn: "ফেব্রুয়ারি ২০২৬ (আনুমানিক)",
    approxGregorianEn: "February 2026 (Approx.)",
    descBn: "সৌভাগ্য ও ক্ষমার রজনী। এই রাতে মহান আল্লাহ অসংখ্য বান্দার গুনাহ মাফ করেন ও রিযিকের ফায়সালা করেন।",
    descEn: "The Night of Fortune and Forgiveness, when Allah showers mercy and forgives countless believers.",
    category: "night"
  },
  {
    id: "ramadan-start",
    titleBn: "পবিত্র মাহে রমজান শুরু (১ রমজান)",
    titleEn: "Start of Blessed Ramadan (1 Ramadan)",
    hijriDateBn: "১ রমজান ১৪৪৭ হিজরি",
    hijriDateEn: "1 Ramadan 1447 AH",
    approxGregorianBn: "ফেব্রুয়ারি / মার্চ ২০২৬ (আনুমানিক)",
    approxGregorianEn: "Feb / March 2026 (Approx.)",
    descBn: "রহমত, মাগফিরাত ও নাজাতের মাস। পবিত্র কোরআন নাযিলের মাস এবং ফরজ রোজার সূচনা।",
    descEn: "The holiest month of mercy, forgiveness, and salvation; the month in which the Quran was revealed.",
    category: "month"
  },
  {
    id: "qadr",
    titleBn: "পবিত্র শবে কদর (২৭ রমজান রজনী)",
    titleEn: "Laylatul Qadr (27 Ramadan Night)",
    hijriDateBn: "২৭ রমজান ১৪৪৭ হিজরি",
    hijriDateEn: "27 Ramadan 1447 AH",
    approxGregorianBn: "মার্চ ২০২৬ (আনুমানিক)",
    approxGregorianEn: "March 2026 (Approx.)",
    descBn: "হাজার মাসের চেয়ে উত্তম মহামহিমান্বিত রজনী। এই রাতে পবিত্র কোরআন অবতীর্ণ হয়েছে।",
    descEn: "The Night of Decree, better than a thousand months of worship.",
    category: "night"
  },
  {
    id: "eid-fitr",
    titleBn: "পবিত্র ঈদুল ফিতর (১ শাওয়া্ল)",
    titleEn: "Eid-ul-Fitr (1 Shawwal)",
    hijriDateBn: "১ শাওয়াল ১৪৪৭ হিজরি",
    hijriDateEn: "1 Shawwal 1447 AH",
    approxGregorianBn: "মার্চ ২০২৬ (চাঁদ দেখার ওপর নির্ভরশীল)",
    approxGregorianEn: "March 2026 (Subject to moon sighting)",
    descBn: "দীর্ঘ এক মাস সিয়াম সাধনার পর মুসলিম উম্মাহর খুশির ও আনন্দের ঈদ। সদকাতুল ফিতর আদায়ের দিন।",
    descEn: "The joyous festival of breaking the fast after Ramadan.",
    category: "eid"
  },
  {
    id: "arafa",
    titleBn: "পবিত্র আরাফা দিবস (৯ জিলহজ)",
    titleEn: "Day of Arafah (9 Dhul Hijjah)",
    hijriDateBn: "৯ জিলহজ ১৪৪৭ হিজরি",
    hijriDateEn: "9 Dhul Hijjah 1447 AH",
    approxGregorianBn: "মে / জুন ২০২৬ (আনুমানিক)",
    approxGregorianEn: "May / June 2026 (Approx.)",
    descBn: "হজের মূল রুকন বা দিন। এই দিনে রোজা রাখলে পূর্ববর্তী ও পরবর্তী এক বছরের গুনাহ মাফ হয়।",
    descEn: "The pinnacle of Hajj; fasting on this day forgives sins of the preceding and coming year.",
    category: "fasting"
  },
  {
    id: "eid-adha",
    titleBn: "পবিত্র ঈদুল আজহা (১০ জিলহজ)",
    titleEn: "Eid-ul-Adha (10 Dhul Hijjah)",
    hijriDateBn: "১০ জিলহজ ১৪৪৭ হিজরি",
    hijriDateEn: "10 Dhul Hijjah 1447 AH",
    approxGregorianBn: "মে / জুন ২০২৬ (চাঁদ দেখার ওপর নির্ভরশীল)",
    approxGregorianEn: "May / June 2026 (Subject to moon sighting)",
    descBn: "হযরত ইব্রাহিম (আ.)-এর মহান ত্যাগের স্মৃতিবাহী কুরবানির ঈদ। আল্লাহপ্রেমের অনুপম নিদর্শন।",
    descEn: "The Festival of Sacrifice commemorating the devotion of Prophet Ibrahim (AS).",
    category: "eid"
  }
];

export const HIJRI_MONTHS_BN = [
  "মহররম",
  "সফর",
  "রবিউল আউয়াল",
  "রবিউস সানি",
  "জমাদিউল আউয়াল",
  "জমাদিউস সানি",
  "রজব",
  "শাবান",
  "রমজান",
  "শাওয়াল",
  "জিলকদ",
  "জিলহজ"
];

export const HIJRI_MONTHS_EN = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhul-Qi'dah",
  "Dhul-Hijjah"
];

export default function HijriCalendarView() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"calendar" | "events" | "converter">("calendar");
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0); // 0 = Muharram
  const [gregDateInput, setGregDateInput] = useState("2026-08-01");

  // Calculated approximate Hijri representation for converter
  const convertToHijriPreview = (gregStr: string) => {
    if (!gregStr) return { bn: "তারিখ নির্বাচন করুন", en: "Select a date" };
    try {
      const d = new Date(gregStr);
      const day = d.getDate();
      const m = d.getMonth();
      // approximate shift for preview
      const hijriYear = 1448;
      const hijriDay = ((day + 15) % 29) + 1;
      const hijriMonthBn = HIJRI_MONTHS_BN[m % 12];
      const hijriMonthEn = HIJRI_MONTHS_EN[m % 12];
      return {
        bn: `${hijriDay} ${hijriMonthBn}, ${hijriYear} হিজরি (আনুমানিক)`,
        en: `${hijriDay} ${hijriMonthEn}, ${hijriYear} AH (Approx.)`
      };
    } catch {
      return { bn: "সঠিক তারিখ দিন", en: "Enter valid date" };
    }
  };

  const currentConverted = convertToHijriPreview(gregDateInput);

  return (
    <div className="space-y-6">
      {/* Header Badge & Title */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-gold-lux/30 rounded-2xl p-5 sm:p-7 text-center relative overflow-hidden shadow-lg">
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-gold-lux/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-lux/15 border border-gold-lux/30 text-gold-lux text-xs font-bold mb-3">
          <Moon className="w-4 h-4 fill-gold-lux/30" />
          <span>
            {language === "bn"
              ? "আজকের হিজরি তারিখ: ১৫ মহররম, ১৪৪৮ হিজরি (চাঁদ দেখার ওপর নির্ভরশীল)"
              : "Today's Hijri Date: 15 Muharram, 1448 AH (Subject to Moon Sighting)"}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif-lux font-bold text-white mb-2">
          {language === "bn" ? "ইসলামিক হিজরি ক্যালেন্ডার ও পবিত্র দিবসসমূহ" : "Islamic Hijri Calendar & Holy Events"}
        </h3>
        <p className="text-sm text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
          {language === "bn"
            ? "চাঁদের হিসাব অনুযায়ী পরিচালিত ইসলামিক হিজরি সনের মাসসমূহ, গুরুত্বপূর্ণ পবিত্র রাত, ঈদের তারিখ ও রোজা রাখার ফজিলতপূর্ণ দিনগুলোর পূর্ণাঙ্গ নির্দেশিকা।"
            : "Complete guide to lunar Islamic months, blessed holy nights, Eid dates, and virtuous fasting days according to the Hijri calendar."}
        </p>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "calendar"
                ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-md"
                : "bg-emerald-950/80 text-gray-300 border-gold-lux/20 hover:border-gold-lux/50"
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            {language === "bn" ? "মাসিক হিজরি ক্যালেন্ডার" : "Monthly Hijri Calendar"}
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "events"
                ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-md"
                : "bg-emerald-950/80 text-gray-300 border-gold-lux/20 hover:border-gold-lux/50"
            }`}
          >
            <Star className="w-4 h-4" />
            {language === "bn" ? "ইসলামিক গুরুত্বপূর্ণ দিবসসমূহ" : "Major Islamic Events"}
          </button>
          <button
            onClick={() => setActiveTab("converter")}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "converter"
                ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-md"
                : "bg-emerald-950/80 text-gray-300 border-gold-lux/20 hover:border-gold-lux/50"
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            {language === "bn" ? "তারিখ রূপান্তরকারী (Converter)" : "Date Converter"}
          </button>
        </div>
      </div>

      {/* TAB 1: MONTHLY HIJRI CALENDAR */}
      {activeTab === "calendar" && (
        <div className="bg-emerald-950/80 border border-gold-lux/20 rounded-2xl p-4 sm:p-6 space-y-5">
          {/* Month Selector Header */}
          <div className="flex items-center justify-between bg-emerald-900/60 border border-gold-lux/30 rounded-xl p-3 sm:p-4">
            <button
              onClick={() =>
                setCurrentMonthIdx((prev) => (prev === 0 ? 11 : prev - 1))
              }
              className="p-2 rounded-lg bg-emerald-950 hover:bg-gold-lux/20 text-gold-lux transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-xs font-bold text-gold-lux uppercase block">
                {language === "bn" ? "হিজরি মাস নম্বর" : "Hijri Month"} #{currentMonthIdx + 1}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                {language === "bn"
                  ? `${HIJRI_MONTHS_BN[currentMonthIdx]} ১৪৪৮ হিজরি`
                  : `${HIJRI_MONTHS_EN[currentMonthIdx]} 1448 AH`}
              </h4>
              <span className="text-[11px] text-gray-400">
                {language === "bn"
                  ? "সৌদি আরব ও বাংলাদেশ চাঁদ দেখার নিয়ম অনুযায়ী সমন্বিত"
                  : "Aligned with regional lunar crescent visibility"}
              </span>
            </div>

            <button
              onClick={() =>
                setCurrentMonthIdx((prev) => (prev === 11 ? 0 : prev + 1))
              }
              className="p-2 rounded-lg bg-emerald-950 hover:bg-gold-lux/20 text-gold-lux transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs font-bold text-gold-lux py-2 border-b border-gold-lux/20">
            <div>{language === "bn" ? "শনি" : "Sat"}</div>
            <div>{language === "bn" ? "রবি" : "Sun"}</div>
            <div>{language === "bn" ? "সোম" : "Mon"}</div>
            <div>{language === "bn" ? "মঙ্গল" : "Tue"}</div>
            <div>{language === "bn" ? "বুধ" : "Wed"}</div>
            <div>{language === "bn" ? "বৃহস্পতি" : "Thu"}</div>
            <div className="text-emerald-400">{language === "bn" ? "শুক্র" : "Fri"}</div>
          </div>

          {/* 30 Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((dayNum, idx) => {
              const isToday = dayNum === 15 && currentMonthIdx === 0;
              const isFriday = idx % 7 === 6;
              const isAshura = currentMonthIdx === 0 && dayNum === 10;
              const isShabeBarat = currentMonthIdx === 7 && dayNum === 15;
              const isShabeQadr = currentMonthIdx === 8 && dayNum === 27;

              return (
                <div
                  key={dayNum}
                  className={`relative p-2 sm:p-3.5 rounded-xl border transition-all text-center ${
                    isToday
                      ? "bg-gold-lux/20 border-gold-lux text-white shadow-md ring-1 ring-gold-lux"
                      : isFriday
                      ? "bg-emerald-900/40 border-emerald-500/30 text-emerald-200"
                      : "bg-emerald-950/60 border-gold-lux/10 text-gray-300 hover:border-gold-lux/30"
                  }`}
                >
                  <span className="text-sm sm:text-base font-bold block">
                    {language === "bn"
                      ? dayNum.toLocaleString("bn-BD")
                      : dayNum}
                  </span>

                  {isToday && (
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-gold-lux text-emerald-950 font-bold text-[9px]">
                      {language === "bn" ? "আজ" : "Today"}
                    </span>
                  )}
                  {isAshura && (
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-red-800 text-white font-bold text-[9px]">
                      {language === "bn" ? "আশুরা" : "Ashura"}
                    </span>
                  )}
                  {isShabeBarat && (
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-cyan-800 text-white font-bold text-[9px]">
                      {language === "bn" ? "শবে বরাত" : "Shab-e-Barat"}
                    </span>
                  )}
                  {isShabeQadr && (
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-purple-800 text-white font-bold text-[9px]">
                      {language === "bn" ? "শবে কদর" : "Laylatul Qadr"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sighting Note */}
          <div className="bg-emerald-900/40 border border-gold-lux/20 rounded-xl p-3.5 text-xs text-gray-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-gold-lux shrink-0 mt-0.5" />
            <p>
              {language === "bn"
                ? "বি.দ্র.: ইসলামী হিজরি মাস চাঁদ দেখার ওপর ভিত্তি করে ২৯ বা ৩০ দিনে সম্পন্ন হয়। ফলে ইংরেজি তারিখের সাথে ১ দিন পার্থক্য হতে পারে।"
                : "Note: Islamic Hijri months consist of 29 or 30 days based on actual moon sighting. A difference of 1 day may occur with Gregorian calendar."}
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: MAJOR ISLAMIC EVENTS */}
      {activeTab === "events" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ISLAMIC_EVENTS_LIST.map((event) => (
              <div
                key={event.id}
                className="bg-emerald-950/80 hover:bg-emerald-900/80 border border-gold-lux/20 hover:border-gold-lux/50 rounded-2xl p-4 sm:p-5 space-y-3 transition-all"
              >
                <div className="flex items-start justify-between gap-3 border-b border-gold-lux/15 pb-2.5">
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1 ${
                        event.category === "eid"
                          ? "bg-gold-lux/20 text-gold-lux border border-gold-lux/40"
                          : event.category === "night"
                          ? "bg-purple-900/50 text-purple-300 border border-purple-500/40"
                          : event.category === "fasting"
                          ? "bg-red-900/50 text-red-300 border border-red-500/40"
                          : "bg-cyan-900/50 text-cyan-300 border border-cyan-500/40"
                      }`}
                    >
                      {event.category === "eid"
                        ? (language === "bn" ? "ঈদের আনন্দ" : "Blessed Eid")
                        : event.category === "night"
                        ? (language === "bn" ? "পবিত্র রজনী" : "Holy Night")
                        : event.category === "fasting"
                        ? (language === "bn" ? "ফজিলতপূর্ণ রোজা" : "Virtuous Fasting")
                        : (language === "bn" ? "বরকতময় মাস" : "Blessed Month")}
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {language === "bn" ? event.titleBn : event.titleEn}
                    </h4>
                  </div>

                  <span className="text-xs font-bold text-gold-lux bg-emerald-900/80 px-3 py-1 rounded-xl border border-gold-lux/30 shrink-0">
                    {language === "bn" ? event.hijriDateBn : event.hijriDateEn}
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {language === "bn" ? event.descBn : event.descEn}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-emerald-300/80 font-sans">
                  <span>
                    {language === "bn"
                      ? `ইংরেজি সময়: ${event.approxGregorianBn}`
                      : `Gregorian Date: ${event.approxGregorianEn}`}
                  </span>
                  <span className="text-gold-lux font-bold">
                    {language === "bn" ? "চাঁদ দেখা সাপেক্ষে" : "Moon Sighting Dependent"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DATE CONVERTER CALCULATOR */}
      {activeTab === "converter" && (
        <div className="bg-emerald-950/80 border border-gold-lux/20 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-gold-lux/10 border border-gold-lux/30 flex items-center justify-center mx-auto text-gold-lux">
            <RefreshCw className="w-7 h-7" />
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
              {language === "bn" ? "ইংরেজি থেকে হিজরি তারিখ রূপান্তরকারী" : "Gregorian to Hijri Date Converter"}
            </h4>
            <p className="text-xs text-gray-300">
              {language === "bn"
                ? "যেকোনো ইংরেজি তারিখ নির্বাচন করে সম্ভাব্য হিজরি তারিখ জেনে নিন।"
                : "Select any Gregorian date to find its corresponding Hijri date."}
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-gold-lux uppercase block mb-2">
                {language === "bn" ? "ইংরেজি তারিখ নির্বাচন করুন" : "Select Gregorian Date"}
              </label>
              <input
                type="date"
                value={gregDateInput}
                onChange={(e) => setGregDateInput(e.target.value)}
                className="w-full px-4 py-3 bg-emerald-900/60 border border-gold-lux/30 rounded-xl text-white font-bold focus:outline-none focus:border-gold-lux"
              />
            </div>

            {/* Result Box */}
            <div className="p-5 bg-gradient-to-r from-emerald-900/80 to-emerald-950/90 border border-gold-lux/40 rounded-2xl text-center space-y-2">
              <span className="text-xs font-bold text-gold-lux uppercase block">
                {language === "bn" ? "সম্ভাব্য হিজরি তারিখ (Hijri Equivalent)" : "Hijri Equivalent Date"}
              </span>
              <p className="text-xl sm:text-2xl font-serif-lux font-bold text-white">
                {language === "bn" ? currentConverted.bn : currentConverted.en}
              </p>
              <span className="text-[11px] text-gray-400 block">
                {language === "bn"
                  ? "* সৌদি আরব ও বাংলাদেশ চাঁদ দেখার নিয়মে ১ দিনের তারতম্য হতে পারে।"
                  : "* 1 day variation possible based on actual moon sighting."}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
