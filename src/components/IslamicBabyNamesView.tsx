import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Bookmark,
  Copy,
  Check,
  Volume2,
  Sparkles,
  Heart,
  Baby,
  UserCheck,
  BookOpen,
  Sun,
  Award,
  Filter,
  Share2
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playIslamicAudio } from "../lib/islamicAudio";

export interface IslamicBabyName {
  id: string;
  gender: "boy" | "girl";
  nameBn: string;
  nameEn: string;
  nameAr: string;
  meanBn: string;
  meanEn: string;
  category: "prophetic" | "abd" | "quranic" | "modern" | "character";
  originBn: string;
  originEn: string;
  firstLetterBn: string;
  firstLetterEn: string;
}

export const ISLAMIC_BABY_NAMES: IslamicBabyName[] = [
  // ==================== BOYS NAMES (ছেলেদের নাম) ====================
  // 1. Prophetic & Sahaba (নবী-রাসূল ও সাহাবীদের নাম)
  {
    id: "boy-1",
    gender: "boy",
    nameBn: "মুহাম্মদ",
    nameEn: "Muhammad",
    nameAr: "مُحَمَّد",
    meanBn: "সর্বাধিক প্রশংসিত, প্রশংসনীয় ব্যক্তি",
    meanEn: "The most praised one, praiseworthy",
    category: "prophetic",
    originBn: "বিশ্বনবী ও শেষ নবী হযরত মুহাম্মদ (সা.)-এর পবিত্র নাম",
    originEn: "Name of the final Prophet Muhammad (PBUH)",
    firstLetterBn: "ম",
    firstLetterEn: "M"
  },
  {
    id: "boy-2",
    gender: "boy",
    nameBn: "আহমদ",
    nameEn: "Ahmad",
    nameAr: "أَحْمَد",
    meanBn: "অধিক প্রশংসাকারী, প্রশংসনীয়",
    meanEn: "One who praises Allah more, commendable",
    category: "prophetic",
    originBn: "রাসূলুল্লাহ (সা.)-এর কোরআনে উল্লেখিত আরেকটি নাম",
    originEn: "Another blessed name of Prophet Muhammad (PBUH) in the Quran",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "boy-3",
    gender: "boy",
    nameBn: "ইব্রাহিম",
    nameEn: "Ibrahim",
    nameAr: "إِبْرَاهِيم",
    meanBn: "জাতির পিতা, পরম করুণাময়ের বন্ধু (খলিলুল্লাহ)",
    meanEn: "Father of nations, Friend of Allah (Khalilullah)",
    category: "prophetic",
    originBn: "হযরত ইব্রাহিম (আ.)-এর নাম, মুসলিম জাতির পিতা",
    originEn: "Name of Prophet Ibrahim (AS), Father of the Muslims",
    firstLetterBn: "ই",
    firstLetterEn: "I"
  },
  {
    id: "boy-4",
    gender: "boy",
    nameBn: "ইউসুফ",
    nameEn: "Yusuf",
    nameAr: "يُوسُف",
    meanBn: "সৌন্দর্য ও ধৈর্যশীলতার প্রতীক, আল্লাহ বৃদ্ধি করবেন",
    meanEn: "Symbol of beauty and patience, God increases",
    category: "prophetic",
    originBn: "অরূপ সৌন্দর্য ও ধৈর্যের অধিকারী নবী হযরত ইউসুফ (আ.)",
    originEn: "Name of Prophet Yusuf (AS), known for immense beauty and patience",
    firstLetterBn: "ই",
    firstLetterEn: "Y"
  },
  {
    id: "boy-5",
    gender: "boy",
    nameBn: "আলী",
    nameEn: "Ali",
    nameAr: "عَلِيّ",
    meanBn: "উচ্চ মর্যাদাপূর্ণ, মহীয়ান, শ্রেষ্ঠ",
    meanEn: "High, elevated, noble, champion",
    category: "prophetic",
    originBn: "চতুর্থ খলিফা ও রাসূল (সা.)-এর জামাতা হযরত আলী (রা.)",
    originEn: "Fourth Caliph and cousin/son-in-law of the Prophet (PBUH)",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "boy-6",
    gender: "boy",
    nameBn: "উমর",
    nameEn: "Umar",
    nameAr: "عُمَر",
    meanBn: "দীর্ঘায়ু, জীবন, সমৃদ্ধি ও ইনসাফ প্রতিষ্ঠাকারী",
    meanEn: "Flourishing, prosperous, long-lived",
    category: "prophetic",
    originBn: "দ্বিতীয় খলিফা হযরত উমর ইবনুল খাত্তাব (রা.)-এর নাম",
    originEn: "Second Caliph Umar ibn al-Khattab (RA)",
    firstLetterBn: "উ",
    firstLetterEn: "U"
  },
  {
    id: "boy-7",
    gender: "boy",
    nameBn: "উসমান",
    nameEn: "Uthman",
    nameAr: "عُثْمَان",
    meanBn: "জ্ঞানী, বিচক্ষণ, দানশীল ও বিশ্বস্ত সাথি",
    meanEn: "Wise, intuitive, generous companion",
    category: "prophetic",
    originBn: "তৃতীয় খলিফা হযরত উসমান ইবনু আফফান (রা.)-এর নাম",
    originEn: "Third Caliph Uthman ibn Affan (RA), compiler of the Quran",
    firstLetterBn: "উ",
    firstLetterEn: "U"
  },
  {
    id: "boy-8",
    gender: "boy",
    nameBn: "হামজা",
    nameEn: "Hamza",
    nameAr: "حَمْزَة",
    meanBn: "সিংহ, অকুতোভয় বীর ও শক্তিশালী সাহাবী",
    meanEn: "Lion, steadfast, fearless warrior",
    category: "prophetic",
    originBn: "রাসূল (সা.)-এর চাচা ও ইসলামের শহীদ বীর হযরত হামজা (রা.)",
    originEn: "Uncle of the Prophet (PBUH), known as Lion of Allah",
    firstLetterBn: "হ",
    firstLetterEn: "H"
  },
  {
    id: "boy-9",
    gender: "boy",
    nameBn: "বিলাল",
    nameEn: "Bilal",
    nameAr: "بِلَال",
    meanBn: "শীতল পানি, তৃষ্ণা নিবারণকারী, সতেজতা",
    meanEn: "Water, moisture, refreshingly cool",
    category: "prophetic",
    originBn: "ইসলামের প্রথম মুয়াজ্জিন হযরত বিলাল ইবনু রাবাহ (রা.)",
    originEn: "First Muazzin of Islam, Bilal ibn Rabah (RA)",
    firstLetterBn: "ব",
    firstLetterEn: "B"
  },
  {
    id: "boy-10",
    gender: "boy",
    nameBn: "তালহা",
    nameEn: "Talha",
    nameAr: "طَلْحَة",
    meanBn: "ফলবন্ত বৃক্ষ, জান্নাতের কলাগাছ বা ছায়াদার গাছ",
    meanEn: "Fruitful tree, banana tree of Paradise",
    category: "prophetic",
    originBn: "জান্নাতের সুসংবাদপ্রাপ্ত ১০ জন সাহাবীর একজন হযরত তালহা (রা.)",
    originEn: "One of the ten companions promised Paradise",
    firstLetterBn: "ত",
    firstLetterEn: "T"
  },
  {
    id: "boy-11",
    gender: "boy",
    nameBn: "যুবায়ের",
    nameEn: "Zubair",
    nameAr: "زُبَيْر",
    meanBn: "দৃঢ়, বলবান, শক্তিশালী বুদ্ধিমান ব্যক্তি",
    meanEn: "Strong, resolute, intelligent leader",
    category: "prophetic",
    originBn: "জান্নাতের সুসংবাদপ্রাপ্ত সাহাবী হযরত যুবায়ের ইবনু আওয়াম (রা.)",
    originEn: "One of the ten companions promised Paradise",
    firstLetterBn: "য",
    firstLetterEn: "Z"
  },
  {
    id: "boy-12",
    gender: "boy",
    nameBn: "আনাস",
    nameEn: "Anas",
    nameAr: "أَنَس",
    meanBn: "স্নেহশীল, আপনজন, আনন্দদাতা বন্ধু",
    meanEn: "Affectionate, friendly, companion",
    category: "prophetic",
    originBn: "রাসূলুল্লাহ (সা.)-এর খাদেম ও সাহাবী হযরত আনাস ইবনু মালিক (রা.)",
    originEn: "Dedicated companion Anas ibn Malik (RA)",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "boy-13",
    gender: "boy",
    nameBn: "মুসয়াব",
    nameEn: "Mus'ab",
    nameAr: "مُصْعَب",
    meanBn: "দৃঢ়চেতা, ধৈর্যশীল ও ইসলামের প্রথম রাষ্ট্রদূত",
    meanEn: "Strong, resolute, first ambassador of Islam",
    category: "prophetic",
    originBn: "মদিনায় ইসলামের প্রথম প্রচারক সাহাবী হযরত মুসয়াব ইবনু উমায়ের (রা.)",
    originEn: "First ambassador of Islam Mus'ab ibn Umair (RA)",
    firstLetterBn: "ম",
    firstLetterEn: "M"
  },
  {
    id: "boy-14",
    gender: "boy",
    nameBn: "দাওয়ুদ",
    nameEn: "Dawud",
    nameAr: "دَاوُد",
    meanBn: "প্রিয়তম, অত্যন্ত ভালোবাসা ও সুরম্য কণ্ঠের অধিকারী",
    meanEn: "Beloved, possessor of beautiful voice and wisdom",
    category: "prophetic",
    originBn: "নবী হযরত দাওয়ুদ (আ.), যার কণ্ঠে যাবূর কিতাব নাযিল হয়েছিল",
    originEn: "Prophet Dawud (AS), known for sweet Psalms",
    firstLetterBn: "দ",
    firstLetterEn: "D"
  },

  // 2. Abd & Allah names (আল্লাহর নামের সাথে সম্পর্কিত)
  {
    id: "boy-15",
    gender: "boy",
    nameBn: "আব্দুল্লাহ",
    nameEn: "Abdullah",
    nameAr: "عَبْدُ اللَّه",
    meanBn: "আল্লাহর বান্দা বা দাস (সবচেয়ে উত্তম নামগুলোর একটি)",
    meanEn: "Servant of Allah (One of the most beloved names to Allah)",
    category: "abd",
    originBn: "সহীহ হাদিস অনুযায়ী আল্লাহর কাছে সবচেয়ে প্রিয় নামগুলোর একটি",
    originEn: "One of the two most beloved names to Allah according to Sahih Hadith",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "boy-16",
    gender: "boy",
    nameBn: "আব্দুর রহমান",
    nameEn: "Abdur Rahman",
    nameAr: "عَبْدُ الرَّحْمَٰن",
    meanBn: "পরম করুণাময় আল্লাহর বান্দা",
    meanEn: "Servant of the Most Gracious",
    category: "abd",
    originBn: "আল্লাহর কাছে সর্বাধিক প্রিয় নামগুলোর দ্বিতীয়টি",
    originEn: "Second of the most beloved names to Allah",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "boy-17",
    gender: "boy",
    nameBn: "আব্দুর রহীম",
    nameEn: "Abdur Rahim",
    nameAr: "عَبْدُ الرَّحِيم",
    meanBn: "অসীম দয়ালু আল্লাহর বান্দা",
    meanEn: "Servant of the Most Merciful",
    category: "abd",
    originBn: "আল্লাহর সিফাতি নাম 'আর-রহীম' এর সাথে সম্পর্কিত",
    originEn: "Related to Allah's divine name Ar-Raheem",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "boy-18",
    gender: "boy",
    nameBn: "আব্দুল আজিজ",
    nameEn: "Abdul Aziz",
    nameAr: "عَبْدُ الْعَزِيز",
    meanBn: "মহাপরাক্রমশালী ও সম্মানদাতা আল্লাহর বান্দা",
    meanEn: "Servant of the Almighty and Honorable",
    category: "abd",
    originBn: "আল্লাহর গুণবাচক নাম 'আল-আজিজ' থেকে গৃহীত",
    originEn: "Derived from Allah's attribute Al-Aziz",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "boy-19",
    gender: "boy",
    nameBn: "আব্দুল কারীম",
    nameEn: "Abdul Karim",
    nameAr: "عَبْدُ الْكَرِيم",
    meanBn: "মহামহিম ও পরম দাতা আল্লাহর বান্দা",
    meanEn: "Servant of the Most Generous",
    category: "abd",
    originBn: "আল্লাহর গুণবাচক নাম 'আল-কারীম' থেকে গৃহীত",
    originEn: "Derived from Allah's attribute Al-Karim",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "boy-20",
    gender: "boy",
    nameBn: "আব্দুল বাসির",
    nameEn: "Abdul Basir",
    nameAr: "عَبْدُ الْبَصِير",
    meanBn: "সর্বদ্রষ্টা আল্লাহর বান্দা",
    meanEn: "Servant of the All-Seeing",
    category: "abd",
    originBn: "আল্লাহর সিফাতি নাম 'আল-বাসির' থেকে গৃহীত",
    originEn: "Derived from Allah's attribute Al-Basir",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },

  // 3. Quranic & Paradise Words (কোরআনের সুন্দর শব্দ ও জান্নাতী নাম)
  {
    id: "boy-21",
    gender: "boy",
    nameBn: "রায়হান",
    nameEn: "Rayhan",
    nameAr: "رَيْحَان",
    meanBn: "জান্নাতের সুগন্ধি ফুল, মিষ্টি সুবাস ও প্রশান্তি",
    meanEn: "Fragrant flower of Paradise, sweet scent of heaven",
    category: "quranic",
    originBn: "সূরা আর-রহমান (আয়াত ১২) এবং সূরা আল-ওয়াকিয়াহ (আয়াত ৮৯) এ উল্লেখিত",
    originEn: "Mentioned in Surah Ar-Rahman (12) and Surah Al-Waqi'ah (89)",
    firstLetterBn: "র",
    firstLetterEn: "R"
  },
  {
    id: "boy-22",
    gender: "boy",
    nameBn: "আয়ান",
    nameEn: "Ayaan",
    nameAr: "عَيَان",
    meanBn: "আল্লাহর বিশেষ উপহার, প্রকাশ্য, স্পষ্ট প্রমাণ",
    meanEn: "Gift of Allah, manifest, clear evidence",
    category: "quranic",
    originBn: "আরবি শব্দ যা আল্লাহর রহমতের স্পষ্ট প্রকাশ বোঝায়",
    originEn: "Arabic word meaning clear evidence of Allah's blessing",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "boy-23",
    gender: "boy",
    nameBn: "যাইদান",
    nameEn: "Zaidan",
    nameAr: "زَيْدَان",
    meanBn: "প্রবৃদ্ধি, উন্নতি, প্রাচুর্য ও কল্যাণ বৃদ্ধি",
    meanEn: "Growth, abundance, increasing in virtue and success",
    category: "quranic",
    originBn: "কোরআনের 'যিয়াদাহ' বা প্রাচুর্য মূল ধাতু থেকে আগত",
    originEn: "Derived from Arabic root of growth and prosperity",
    firstLetterBn: "য",
    firstLetterEn: "Z"
  },
  {
    id: "boy-24",
    gender: "boy",
    nameBn: "ফুরকান",
    nameEn: "Furqan",
    nameAr: "فُرْقَان",
    meanBn: "সত্য ও মিথ্যার পার্থক্যকারী, পবিত্র কোরআনের অপর নাম",
    meanEn: "The Criterion that distinguishes truth from falsehood",
    category: "quranic",
    originBn: "সূরা আল-ফুরকান এবং পবিত্র কোরআনের একটি গুণবাচক নাম",
    originEn: "Surah Al-Furqan and a title of the Holy Quran",
    firstLetterBn: "ফ",
    firstLetterEn: "F"
  },
  {
    id: "boy-25",
    gender: "boy",
    nameBn: "তাওহিদ",
    nameEn: "Tawhid",
    nameAr: "تَوْحِيد",
    meanBn: "আল্লাহর একত্ববাদ, একনিষ্ঠ বিশ্বাস",
    meanEn: "Oneness of Allah, monotheism",
    category: "quranic",
    originBn: "ইসলামের মূল ভিত্তি তাওহিদ বা একত্ববাদ",
    originEn: "Core foundation of Islamic belief",
    firstLetterBn: "ত",
    firstLetterEn: "T"
  },

  // 4. Modern & Popular Islamic (আধুনিক ও জনপ্রিয় ইসলামিক নাম)
  {
    id: "boy-26",
    gender: "boy",
    nameBn: "জাওয়াদ",
    nameEn: "Jawad",
    nameAr: "جَوَاد",
    meanBn: "অত্যন্ত দানশীল, উদার ও মহামহিম ব্যক্তি",
    meanEn: "Extremely generous, open-handed, noble",
    category: "modern",
    originBn: "উদারতা ও দানশীলতার উত্তম ইসলামিক প্রতীক",
    originEn: "Classic Islamic symbol of generosity and kindness",
    firstLetterBn: "জ",
    firstLetterEn: "J"
  },
  {
    id: "boy-27",
    gender: "boy",
    nameBn: "ফাহিম",
    nameEn: "Fahim",
    nameAr: "فَهِيم",
    meanBn: "বুদ্ধিমান, বিচক্ষণ, গভীর উপলব্ধি সম্পন্ন",
    meanEn: "Intelligent, discerning, insightful",
    category: "modern",
    originBn: "জ্ঞান ও প্রজ্ঞার প্রতীক হিসেবে সমাদৃত নাম",
    originEn: "Renowned name symbolizing wisdom and intellect",
    firstLetterBn: "ফ",
    firstLetterEn: "F"
  },
  {
    id: "boy-28",
    gender: "boy",
    nameBn: "নাবিল",
    nameEn: "Nabil",
    nameAr: "نَبِيل",
    meanBn: "সম্ভ্রান্ত, উচ্চ মর্যাদাপূর্ণ, সদ্ব্যবহারকারী",
    meanEn: "Noble, honorable, gentlemanly",
    category: "modern",
    originBn: "উচ্চ মর্যাদা ও উত্তম চরিত্রের প্রতীক",
    originEn: "Represents noble character and dignity",
    firstLetterBn: "ন",
    firstLetterEn: "N"
  },
  {
    id: "boy-29",
    gender: "boy",
    nameBn: "শারিয়ার",
    nameEn: "Shahriyar",
    nameAr: "شَهْرِيَار",
    meanBn: "রাজা, নেতা, জনপদের রক্ষক",
    meanEn: "King, ruler, protector of people",
    category: "modern",
    originBn: "জনপ্রিয় মুসলিম নাম যা নেতৃত্ব ও সুরক্ষার বার্তা দেয়",
    originEn: "Popular Muslim name conveying leadership and protection",
    firstLetterBn: "শ",
    firstLetterEn: "S"
  },
  {
    id: "boy-30",
    gender: "boy",
    nameBn: "ফারহান",
    nameEn: "Farhan",
    nameAr: "فَرْحَان",
    meanBn: "আনন্দিত, প্রফুল্ল, সুখী ও হাস্যোজ্জ্বল",
    meanEn: "Happy, joyful, cheerful",
    category: "modern",
    originBn: "প্রশান্তি ও আনন্দের প্রতীক ইসলামিক নাম",
    originEn: "Islamic name symbolizing happiness and optimism",
    firstLetterBn: "ফ",
    firstLetterEn: "F"
  },
  {
    id: "boy-31",
    gender: "boy",
    nameBn: "আরিফ",
    nameEn: "Arif",
    nameAr: "عَارِف",
    meanBn: "জ্ঞানী, আধ্যাত্মিক উপলব্ধিকারী, খোদাপ্রেমী",
    meanEn: "Knowledgeable, spiritual knower, wise",
    category: "character",
    originBn: "দ্বীন ও জ্ঞানের গভীর উপলব্ধির প্রতীক",
    originEn: "Represents spiritual wisdom and understanding",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "boy-32",
    gender: "boy",
    nameBn: "তারিক",
    nameEn: "Tariq",
    nameAr: "طَارِق",
    meanBn: "ভোরের তারা, রাতের অতিথি, উজ্জ্বল নক্ষত্র",
    meanEn: "Morning star, night visitor, bright celestial star",
    category: "quranic",
    originBn: "সূরা আত-তারিক এবং বীর সেনাপতি তারিক ইবন যিয়াদের নাম",
    originEn: "Surah At-Tariq and renowned Muslim commander",
    firstLetterBn: "ত",
    firstLetterEn: "T"
  },
  {
    id: "boy-33",
    gender: "boy",
    nameBn: "শাকিল",
    nameEn: "Shakil",
    nameAr: "شَاكِل",
    meanBn: "সুদর্শন, সুন্দর অবয়ব ও মার্জিত চরিত্রের অধিকারী",
    meanEn: "Handsome, well-formed, graceful",
    category: "modern",
    originBn: "সুন্দর চেহারা ও চরিত্রের সমন্বয় বোঝায়",
    originEn: "Meaning beauty in form and character",
    firstLetterBn: "শ",
    firstLetterEn: "S"
  },
  {
    id: "boy-34",
    gender: "boy",
    nameBn: "ওয়াসিম",
    nameEn: "Wasim",
    nameAr: "وَسِيم",
    meanBn: "অত্যন্ত সুদর্শন, সৌম্য দর্শন ও রুচিশীল",
    meanEn: "Graceful, handsome, distinguished",
    category: "character",
    originBn: "সৌম্য ও শান্ত ব্যক্তিত্বের প্রতীক",
    originEn: "Symbolizing graceful appearance and manners",
    firstLetterBn: "ও",
    firstLetterEn: "W"
  },
  {
    id: "boy-35",
    gender: "boy",
    nameBn: "হানিফ",
    nameEn: "Hanif",
    nameAr: "حَنِيف",
    meanBn: "একনিষ্ঠ সত্যের অনুসারী, খাঁটি তাওহিদী বিশ্বাসী",
    meanEn: "True believer, upright, monotheist",
    category: "quranic",
    originBn: "কোরআনে হযরত ইব্রাহিম (আ.)-এর বিশেষণ হিসেবে ব্যবহৃত",
    originEn: "Quranic description of Prophet Ibrahim's pure faith",
    firstLetterBn: "হ",
    firstLetterEn: "H"
  },
  {
    id: "boy-36",
    gender: "boy",
    nameBn: "জুনাইদ",
    nameEn: "Junaid",
    nameAr: "جُنَيْد",
    meanBn: "ক্ষুদ্র সৈন্য, আল্লাহর পথের সাহসী সৈনিক",
    meanEn: "Little warrior, soldier of truth",
    category: "character",
    originBn: "বিখ্যাত সুফি সাধক জুনাইদ বাগদাদী (রহ.)-এর নাম",
    originEn: "Renowned scholar and spiritual leader Junaid al-Baghdadi",
    firstLetterBn: "জ",
    firstLetterEn: "J"
  },
  {
    id: "boy-37",
    gender: "boy",
    nameBn: "সালমান",
    nameEn: "Salman",
    nameAr: "سَلْمَان",
    meanBn: "নিরাপদ, শান্তিময়, ত্রুটিমুক্ত ও সুস্থ",
    meanEn: "Safe, peaceful, sound, wholesome",
    category: "prophetic",
    originBn: "বিখ্যাত সাহাবী হযরত সালমান ফারসী (را.)-এর নাম",
    originEn: "Renowned companion Salman al-Farsi (RA)",
    firstLetterBn: "স",
    firstLetterEn: "S"
  },
  {
    id: "boy-38",
    gender: "boy",
    nameBn: "মুয়াজ",
    nameEn: "Mu'adh",
    nameAr: "مُعَاذ",
    meanBn: "সুরক্ষিত, আল্লাহর আশ্রয়ে থাকা সম্মানিত ব্যক্তি",
    meanEn: "Protected, sheltered by Allah",
    category: "prophetic",
    originBn: "কোরআনের জ্ঞানে শ্রেষ্ঠ সাহাবী হযরত মুয়াজ ইবনু জাবাল (রা.)",
    originEn: "Great scholar companion Mu'adh ibn Jabal (RA)",
    firstLetterBn: "ম",
    firstLetterEn: "M"
  },
  {
    id: "boy-39",
    gender: "boy",
    nameBn: "আম্মার",
    nameEn: "Ammar",
    nameAr: "عَمَّار",
    meanBn: "দীর্ঘজীবী, ঈমানে অটল, নির্মাতা ও আবাদকারী",
    meanEn: "Long-lived, steadfast in faith, builder",
    category: "prophetic",
    originBn: "প্রাথমিক যুগের শহীদ পরিবারের সাহাবী হযরত আম্মার ইবনু ইয়াসির (রা.)",
    originEn: "Steadfast early companion Ammar ibn Yasir (RA)",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "boy-40",
    gender: "boy",
    nameBn: "রিজওয়ান",
    nameEn: "Ridwan",
    nameAr: "رِضْوَان",
    meanBn: "আল্লাহর সন্তুষ্টি, জান্নাতের প্রধান ফেরেশতা ও রক্ষক",
    meanEn: "Pleasure of Allah, guardian angel of Paradise",
    category: "quranic",
    originBn: "কোরআনে বর্ণিত আল্লাহর সর্বোচ্চ সন্তুষ্টি ও জান্নাতের ফেরেশতার নাম",
    originEn: "Highest divine pleasure and guardian angel of Paradise",
    firstLetterBn: "র",
    firstLetterEn: "R"
  },

  // ==================== GIRLS NAMES (মেয়েদের নাম) ====================
  // 1. Prophetic Family & Sahabiyyat (নবী পরিবার ও সাহাবিয়্যাত)
  {
    id: "girl-1",
    gender: "girl",
    nameBn: "ফাতিমা",
    nameEn: "Fatima",
    nameAr: "فَاطِمَة",
    meanBn: "পাপ ও জাহান্নাম থেকে মুক্ত, পবিত্র ও সংযমী নারী",
    meanEn: "One who abstains, protected from fire, pure",
    category: "prophetic",
    originBn: "রাসূলুল্লাহ (সা.)-এর আদরের কনিষ্ঠ কন্যা ও জান্নাতী নারীদের নেত্রী",
    originEn: "Beloved daughter of the Prophet (PBUH) & leader of women in Paradise",
    firstLetterBn: "ফ",
    firstLetterEn: "F"
  },
  {
    id: "girl-2",
    gender: "girl",
    nameBn: "আয়িশা",
    nameEn: "Aisha",
    nameAr: "عَائِشَة",
    meanBn: "জীবন্ত, সমৃদ্ধশীল, সুখময় জীবন যাপনকারী নারী",
    meanEn: "Living, prosperous, full of life",
    category: "prophetic",
    originBn: "উম্মুল মু'মিনীন হযরত আয়িশা (রা.), অধিক হাদিস বর্ণনাকারী মহীয়সী নারী",
    originEn: "Wife of the Prophet (PBUH) and great scholar of Islam",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "girl-3",
    gender: "girl",
    nameBn: "খাদিজা",
    nameEn: "Khadija",
    nameAr: "خَدِيجَة",
    meanBn: "বিশ্বস্ত, মর্যাদাশীল ও ইসলামের প্রথম নারী বিশ্বাসী",
    meanEn: "Trustworthy, premature born, first believer of Islam",
    category: "prophetic",
    originBn: "উম্মুল মু'মিনীন হযরত খাদিজা (রা.), রাসূল (সা.)-এর প্রথম স্ত্রী",
    originEn: "First wife of Prophet Muhammad (PBUH) and first believer",
    firstLetterBn: "খ",
    firstLetterEn: "K"
  },
  {
    id: "girl-4",
    gender: "girl",
    nameBn: "মারিয়াম",
    nameEn: "Mariyam",
    nameAr: "مَرْيَم",
    meanBn: "ইবাদতকারিণী, সতী-সাধ্বী ও পরম পবিত্র নারী",
    meanEn: "Devout worshipper, pious, chaste woman",
    category: "quranic",
    originBn: "নবী হযরত ঈসা (আ.)-এর মাতা, যার নামে কোরআনে পূর্ণ একটি সূরা রয়েছে",
    originEn: "Mother of Prophet Isa (AS), only woman named in a Quran Surah title",
    firstLetterBn: "ম",
    firstLetterEn: "M"
  },
  {
    id: "girl-5",
    gender: "girl",
    nameBn: "আসিয়া",
    nameEn: "Asiya",
    nameAr: "آسِيَة",
    meanBn: "আশ্রয়দাত্রী, দুঃখ নিবারণকারী ও ঈমানে অটল নারী",
    meanEn: "One who tends to the weak, comfort, healer",
    category: "quranic",
    originBn: "ফেরাউনের স্ত্রী যিনি ঈমানের ওপর অটল থেকে জান্নাতী হয়েছিলেন",
    originEn: "Righteous queen Asiya (AS), praised in the Quran",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "girl-6",
    gender: "girl",
    nameBn: "যয়নব",
    nameEn: "Zaynab",
    nameAr: "زَيْنَب",
    meanBn: "মরুভূমির সুগন্ধি ফুল, পিতার শোভা ও দানশীল নারী",
    meanEn: "Fragrant desert flower, beauty of her father",
    category: "prophetic",
    originBn: "রাসূলুল্লাহ (সা.)-এর জ্যেষ্ঠ কন্যা ও উম্মুল মু'মিনীনদের নাম",
    originEn: "Name of daughter and wife of the Prophet (PBUH)",
    firstLetterBn: "য",
    firstLetterEn: "Z"
  },
  {
    id: "girl-7",
    gender: "girl",
    nameBn: "হাফসা",
    nameEn: "Hafsa",
    nameAr: "حَفْصَة",
    meanBn: "সিংহী, সুরক্ষাকারিণী, কোরআন সংগ্রাহক নারী",
    meanEn: "Lioness, guardian, protector of scripture",
    category: "prophetic",
    originBn: "উম্মুল মু'মিনীন হযরত হাফসা (রা.), খলিফা উমরের (রা.) কন্যা",
    originEn: "Wife of the Prophet (PBUH) who guarded the first compiled Quran",
    firstLetterBn: "হ",
    firstLetterEn: "H"
  },
  {
    id: "girl-8",
    gender: "girl",
    nameBn: "রুকাইয়া",
    nameEn: "Ruqayyah",
    nameAr: "رُقَيَّة",
    meanBn: "উচ্চ মর্যাদা, কোমলতা, সৌন্দর্য ও উন্নতি",
    meanEn: "Gentle, ascending, elevated beauty",
    category: "prophetic",
    originBn: "রাসূলুল্লাহ (সা.)-এর কন্যা এবং হযরত উসমানের (রা.) স্ত্রী",
    originEn: "Daughter of the Prophet (PBUH) and wife of Uthman (RA)",
    firstLetterBn: "র",
    firstLetterEn: "R"
  },
  {
    id: "girl-9",
    gender: "girl",
    nameBn: "সুমাইয়া",
    nameEn: "Sumayyah",
    nameAr: "سُمَيَّة",
    meanBn: "উচ্চ মর্যাদাপূর্ণ, সুউচ্চ, ইসলামের প্রথম শহীদ নারী",
    meanEn: "High above, exalted, first martyr of Islam",
    category: "prophetic",
    originBn: "ইসলামের ইতিহাসে প্রথম শহীদ সাহাবিয়্যা হযরত সুমাইয়া (রা.)",
    originEn: "First martyr of Islam, Sumayyah bint Khayyat (RA)",
    firstLetterBn: "স",
    firstLetterEn: "S"
  },
  {
    id: "girl-10",
    gender: "girl",
    nameBn: "নুসায়বা",
    nameEn: "Nusaybah",
    nameAr: "نُسَيْبَة",
    meanBn: "উচ্চ বংশীয়, বীর নারী, উহুদের রণাঙ্গনের রক্ষাকারিণী",
    meanEn: "Noble lineage, warrior companion who defended the Prophet",
    category: "prophetic",
    originBn: "উহুদ যুদ্ধে রাসূল (সা.)-কে জীবন বাজি রেখে রক্ষাকারিণী সাহাবিয়্যা",
    originEn: "Heroic female warrior Nusaybah bint Ka'ab (RA)",
    firstLetterBn: "ন",
    firstLetterEn: "N"
  },

  // 2. Quranic & Paradise Words (কোরআন ও জান্নাতী নাম)
  {
    id: "girl-11",
    gender: "girl",
    nameBn: "আইরা",
    nameEn: "Aira",
    nameAr: "عَائِرة",
    meanBn: "সম্মানিত, উচ্চ মর্যাদাপূর্ণ, উজ্জ্বল ও প্রগতিশীল",
    meanEn: "Respected, noble, bright, progressive",
    category: "modern",
    originBn: "উচ্চ মর্যাদা ও মহত্ত্বের প্রতীক সুন্দর ইসলামিক নাম",
    originEn: "Modern Islamic name symbolizing honor and light",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "girl-12",
    gender: "girl",
    nameBn: "সাইফা",
    nameEn: "Saifa",
    nameAr: "صَيْفَة",
    meanBn: "খোদাভীরু, সত্যনিষ্ঠ, বিশুদ্ধ চরিত্রের নারী",
    meanEn: "God-fearing, truthful, pure woman",
    category: "modern",
    originBn: "তাকওয়া ও সত্যবাদিতার প্রতীক",
    originEn: "Symbolizing piety and truthfulness",
    firstLetterBn: "স",
    firstLetterEn: "S"
  },
  {
    id: "girl-13",
    gender: "girl",
    nameBn: "তাসনিম",
    nameEn: "Tasnim",
    nameAr: "تَسْنِيم",
    meanBn: "জান্নাতের সুউচ্চ ও পবিত্রতম পানির ঝর্ণা",
    meanEn: "Fountain of Paradise, crystal clear spring of heaven",
    category: "quranic",
    originBn: "সূরা আল-মুতাফফিফীন (আয়াত ২৭) এ উল্লেখিত জান্নাতী ঝর্ণা",
    originEn: "Mentioned in Surah Al-Mutaffifin (27) as a heavenly spring",
    firstLetterBn: "ত",
    firstLetterEn: "T"
  },
  {
    id: "girl-14",
    gender: "girl",
    nameBn: "সিদরাতুল মুনতাহা",
    nameEn: "Sidratul Muntaha",
    nameAr: "سِدْرَةُ الْمُنْتَهَىٰ",
    meanBn: "সপ্তম আসমানের শেষ প্রান্তের বরকতময় কুলগাছ",
    meanEn: "The Lote tree of the utmost boundary in highest heaven",
    category: "quranic",
    originBn: "সূরা আন-নাজম (আয়াত ১৪) এ বর্ণিত মিরাজের রাতের স্বর্গীয় স্থান",
    originEn: "Mentioned in Surah An-Najm (14) during the Night of Ascension",
    firstLetterBn: "স",
    firstLetterEn: "S"
  },
  {
    id: "girl-15",
    gender: "girl",
    nameBn: "আফনান",
    nameEn: "Afnan",
    nameAr: "أَفْنَان",
    meanBn: "জান্নাতের বৃক্ষের ফলবন্ত ডালপালা ও সবুজ ছায়া",
    meanEn: "Tree branches of Paradise, full of fruits and shade",
    category: "quranic",
    originBn: "সূরা আর-রহমান (আয়াত ৪৮) এ জান্নাতের সৌন্দর্যের বর্ণনায় উল্লেখিত",
    originEn: "Mentioned in Surah Ar-Rahman (48) describing heavenly trees",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "girl-16",
    gender: "girl",
    nameBn: "ইনশিরাহ",
    nameEn: "Inshirah",
    nameAr: "إِنْشِرَاح",
    meanBn: "হৃদয়ের প্রশান্তি, আনন্দ, বক্ষ উন্মুক্ত হওয়া",
    meanEn: "Relief, joy, expansion of the heart",
    category: "quranic",
    originBn: "সূরা আল-ইনশিরাহ এর নাম, যা দুশ্চিন্তা মুক্তির বার্তা দেয়",
    originEn: "Name of Surah 94, symbolizing relief after difficulty",
    firstLetterBn: "ই",
    firstLetterEn: "I"
  },
  {
    id: "girl-17",
    gender: "girl",
    nameBn: "ত্বাহিরা",
    nameEn: "Tahirah",
    nameAr: "طَاهِرَة",
    meanBn: "নিষ্কলঙ্ক, পবিত্র, সতী ও খাঁটি চরিত্রের নারী",
    meanEn: "Pure, chaste, immaculate, virtuous",
    category: "quranic",
    originBn: "কোরআনে পবিত্র ও নিষ্কলঙ্ক নারীদের বর্ণনায় ব্যবহৃত শব্দ",
    originEn: "Quranic term meaning purity and chastity",
    firstLetterBn: "ত",
    firstLetterEn: "T"
  },
  {
    id: "girl-18",
    gender: "girl",
    nameBn: "হাদিয়া",
    nameEn: "Hadiyah",
    nameAr: "هَادِيَة",
    meanBn: "সত্য পথের দিশারী, পথপ্রদর্শক, আল্লাহর উপহার",
    meanEn: "Guide to righteous path, gift from Allah",
    category: "quranic",
    originBn: "হেদায়াত বা সত্য পথের দিকনির্দেশনা থেকে আগত",
    originEn: "Derived from guidance to light and truth",
    firstLetterBn: "হ",
    firstLetterEn: "H"
  },
  {
    id: "girl-19",
    gender: "girl",
    nameBn: "জান্নাতুল ফেরদাউস",
    nameEn: "Jannatul Firdaus",
    nameAr: "جَنَّاتُ الْفِرْدَوْس",
    meanBn: "সর্বোচ্চ ও শ্রেষ্ঠ স্বর্গ উদ্যান",
    meanEn: "Highest garden of Paradise",
    category: "quranic",
    originBn: "সূরা আল-কাহফ (১০৭) ও মু'মিনূনে উল্লেখিত জান্নাতের সর্বোচ্চ স্তর",
    originEn: "Mentioned in Surah Al-Kahf (107) as the highest level of Paradise",
    firstLetterBn: "জ",
    firstLetterEn: "J"
  },
  {
    id: "girl-20",
    gender: "girl",
    nameBn: "সাদিয়া",
    nameEn: "Sadia",
    nameAr: "سَعْدِيَّة",
    meanBn: "সৌভাগ্যবতী, সুখী, আনন্দময় জীবন যাপনকারী",
    meanEn: "Fortunate, happy, blessed woman",
    category: "modern",
    originBn: "রাসূল (সা.)-এর ধাত্রী মা হযরত হালিমা সাদিয়া (রা.)-এর নামের সাথে সম্পৃক্ত",
    originEn: "Associated with Halima Sadia, foster mother of the Prophet",
    firstLetterBn: "স",
    firstLetterEn: "S"
  },

  // 3. Modern & Character Names (আধুনিক ও চরিত্রবান নারী নাম)
  {
    id: "girl-21",
    gender: "girl",
    nameBn: "রাইসা",
    nameEn: "Raisa",
    nameAr: "رَئِيسَة",
    meanBn: "নেত্রী, রানী, সম্ভ্রান্ত ও মর্যাদাবান নারী",
    meanEn: "Leader, queen, noble woman",
    category: "modern",
    originBn: "নেতৃত্ব ও সম্ভ্রান্ত মর্যাদার প্রতীক",
    originEn: "Symbolizing leadership and royalty",
    firstLetterBn: "র",
    firstLetterEn: "R"
  },
  {
    id: "girl-22",
    gender: "girl",
    nameBn: "নাফিসা",
    nameEn: "Nafisa",
    nameAr: "نَفِيسَة",
    meanBn: "অমূল্য রত্ন, অত্যন্ত মূল্যবান ও উত্তম নারী",
    meanEn: "Precious gem, extremely valuable, delicate",
    category: "character",
    originBn: "বিখ্যাত ইসলামিক বিদূষী সায়্যিদা নাফিসা (রহ.)-এর নাম",
    originEn: "Renowned Islamic scholar Sayyida Nafisa",
    firstLetterBn: "ন",
    firstLetterEn: "N"
  },
  {
    id: "girl-23",
    gender: "girl",
    nameBn: "আফিয়া",
    nameEn: "Afiya",
    nameAr: "عَافِيَة",
    meanBn: "সুস্থতা, নিরাপত্তা, সব ধরনের ক্ষতি থেকে সুরক্ষিত",
    meanEn: "Well-being, safety, protection from harm",
    category: "quranic",
    originBn: "হাদিসে বর্ণিত 'আফিয়াহ' বা পূর্ণ নিরাপত্তা ও সুস্থতা",
    originEn: "Hadith term representing complete health and safety",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "girl-24",
    gender: "girl",
    nameBn: "সামিহা",
    nameEn: "Samiha",
    nameAr: "سَمِيحَة",
    meanBn: "উদার, ক্ষমাশীল, দয়ালু ও নম্র হৃদয়ের নারী",
    meanEn: "Generous, forgiving, kind-hearted",
    category: "character",
    originBn: "উদারতা ও ক্ষমার উত্তম চরিত্র বোঝায়",
    originEn: "Meaning generosity and forgiving nature",
    firstLetterBn: "স",
    firstLetterEn: "S"
  },
  {
    id: "girl-25",
    gender: "girl",
    nameBn: "মালিহা",
    nameEn: "Maliha",
    nameAr: "مَلِيحَة",
    meanBn: "সুন্দরী, মিষ্টভাষী, হাস্যোজ্জ্বল ও মার্জিত",
    meanEn: "Beautiful, sweet, charming, pleasant",
    category: "modern",
    originBn: "বাহ্যিক ও অভ্যন্তরীণ সৌন্দর্যের প্রতীক",
    originEn: "Symbolizing grace and charming personality",
    firstLetterBn: "ম",
    firstLetterEn: "M"
  },
  {
    id: "girl-26",
    gender: "girl",
    nameBn: "লাবিবা",
    nameEn: "Labiba",
    nameAr: "لَبِيبَة",
    meanBn: "বুদ্ধিমতী, বিচক্ষণ, গভীর প্রজ্ঞার অধিকারী",
    meanEn: "Intelligent, wise, discerning",
    category: "character",
    originBn: "কোরআনের 'উলুল আলবাব' বা প্রজ্ঞাবান শব্দ থেকে আগত",
    originEn: "Derived from Quranic term for people of understanding",
    firstLetterBn: "ল",
    firstLetterEn: "L"
  },
  {
    id: "girl-27",
    gender: "girl",
    nameBn: "ফারিহা",
    nameEn: "Fariha",
    nameAr: "فَرِحَة",
    meanBn: "আনন্দিতা, সুখী, হাস্যোজ্জ্বল ও প্রফুল্ল নারী",
    meanEn: "Happy, joyous, cheerful",
    category: "modern",
    originBn: "হৃদয়ের আনন্দ ও প্রসন্নতার প্রতীক",
    originEn: "Represents happiness and cheerful spirit",
    firstLetterBn: "ফ",
    firstLetterEn: "F"
  },
  {
    id: "girl-28",
    gender: "girl",
    nameBn: "তাসনিয়া",
    nameEn: "Tasnia",
    nameAr: "تَسْنِيَة",
    meanBn: "প্রশংসিত, উচ্চ মর্যাদায় উন্নীত, উত্তম স্বীকৃতি",
    meanEn: "Praiseworthy, elevated, appreciated",
    category: "modern",
    originBn: "উত্তম কাজ ও প্রশংসার প্রতীক",
    originEn: "Meaning appreciation and excellence",
    firstLetterBn: "ত",
    firstLetterEn: "T"
  },
  {
    id: "girl-29",
    gender: "girl",
    nameBn: "তাহমিনা",
    nameEn: "Tahmina",
    nameAr: "تَهْمِينَة",
    meanBn: "শক্তিশালী, সাহসী, দৃঢ়চেতা ও আত্মবিশ্বাসী নারী",
    meanEn: "Strong, courageous, valiant woman",
    category: "character",
    originBn: "সাহস ও আত্মবিশ্বাসের প্রতীক ইসলামিক নাম",
    originEn: "Symbolizing courage and inner strength",
    firstLetterBn: "ত",
    firstLetterEn: "T"
  },
  {
    id: "girl-30",
    gender: "girl",
    nameBn: "রুবাঈয়া",
    nameEn: "Rubaiyah",
    nameAr: "رُبَيِّع",
    meanBn: "বসন্তের সূচনা, সতেজতা, নবীপ্রেমী সাহাবিয়্যা",
    meanEn: "Spring season, freshness, blessed companion",
    category: "prophetic",
    originBn: "বিখ্যাত সাহাবিয়্যা হযরত রুবাইয়ি বিনতে মুয়াউইজ (রা.)-এর নাম",
    originEn: "Renowned companion Rubaiyi bint Mu'awwidh (RA)",
    firstLetterBn: "র",
    firstLetterEn: "R"
  },
  {
    id: "girl-31",
    gender: "girl",
    nameBn: "নুসরাত",
    nameEn: "Nusrat",
    nameAr: "نُصْرَة",
    meanBn: "আল্লাহর সাহায্য, বিজয় ও সমর্থন",
    meanEn: "Help from Allah, victory, divine support",
    category: "quranic",
    originBn: "সূরা আন-নসর এবং কোরআনে বর্ণিত আল্লাহর সাহায্য",
    originEn: "Quranic term meaning divine assistance and victory",
    firstLetterBn: "ন",
    firstLetterEn: "N"
  },
  {
    id: "girl-32",
    gender: "girl",
    nameBn: "হালিমা",
    nameEn: "Halima",
    nameAr: "حَلِيمَة",
    meanBn: "ধৈর্যশীলা, নম্র, কোমল হৃদয় ও সহনশীল নারী",
    meanEn: "Patient, gentle, tolerant, compassionate",
    category: "prophetic",
    originBn: "রাসূলুল্লাহ (সা.)-এর ধাত্রী মা হযরত হালিমা সাদিয়া (রা.)",
    originEn: "Foster mother of Prophet Muhammad (PBUH)",
    firstLetterBn: "হ",
    firstLetterEn: "H"
  },
  {
    id: "girl-33",
    gender: "girl",
    nameBn: "সামিয়া",
    nameEn: "Samiya",
    nameAr: "سَامِيَة",
    meanBn: "সুউচ্চ, উন্নত মর্যাদাপূর্ণ, সম্মানিত",
    meanEn: "Exalted, elevated, supreme status",
    category: "modern",
    originBn: "উচ্চ মর্যাদা ও মহীয়ান ব্যক্তিত্বের প্রতীক",
    originEn: "Representing noble status and elevation",
    firstLetterBn: "স",
    firstLetterEn: "S"
  },
  {
    id: "girl-34",
    gender: "girl",
    nameBn: "তানজিলা",
    nameEn: "Tanzila",
    nameAr: "تَنْزِيلَة",
    meanBn: "আল্লাহর পক্ষ থেকে অবতীর্ণ রহমত বা বাণী",
    meanEn: "Sent down by Allah, heavenly revelation",
    category: "quranic",
    originBn: "কোরআন নাযিল বা অবতীর্ণ হওয়ার আরবি ধাতু থেকে আগত",
    originEn: "Derived from Quranic revelation terminology",
    firstLetterBn: "ত",
    firstLetterEn: "T"
  },
  {
    id: "girl-35",
    gender: "girl",
    nameBn: "নাজিফা",
    nameEn: "Nazifa",
    nameAr: "نَظِيفَة",
    meanBn: "পবিত্র, পরিচ্ছন্ন, নিষ্কলঙ্ক ও পরিপাটি",
    meanEn: "Pure, clean, neat, unblemished",
    category: "character",
    originBn: "ইসলামে পবিত্রতা ও পরিচ্ছন্নতার উত্তম প্রতীক",
    originEn: "Symbolizing physical and spiritual cleanliness",
    firstLetterBn: "ন",
    firstLetterEn: "N"
  },
  {
    id: "girl-36",
    gender: "girl",
    nameBn: "রাবেয়া",
    nameEn: "Rabia",
    nameAr: "رَابِعَة",
    meanBn: "বসন্তকালীন বাগান, পরম খোদাপ্রেমী সুফি নারী",
    meanEn: "Spring garden, fourth, ascetic saint",
    category: "character",
    originBn: "বিখ্যাত সুফি সাধিকা হযরত রাবেয়া বসরী (রহ.)-এর নাম",
    originEn: "Famous saint Rabia al-Adawiyya of Basra",
    firstLetterBn: "র",
    firstLetterEn: "R"
  },
  {
    id: "girl-37",
    gender: "girl",
    nameBn: "ফারহানা",
    nameEn: "Farhana",
    nameAr: "فَرْحَانَة",
    meanBn: "আনন্দিতা, সুখে ভরপুর, প্রফুল্ল মনের অধিকারী",
    meanEn: "Delighted, happy, joyous",
    category: "modern",
    originBn: "পারিবারিক সুখ ও আনন্দের প্রতীক",
    originEn: "Symbolizing happiness and cheerfulness",
    firstLetterBn: "ফ",
    firstLetterEn: "F"
  },
  {
    id: "girl-38",
    gender: "girl",
    nameBn: "আকলিমা",
    nameEn: "Aklima",
    nameAr: "إِقْلِيمَة",
    meanBn: "জগতের সৌন্দর্য, মার্জিত ও বুদ্ধিমতী নারী",
    meanEn: "Beauty of the world, graceful, intelligent",
    category: "prophetic",
    originBn: "হযরত আদম (আ.)-এর প্রথম কন্যা ও সুন্দর চরিত্রের অধিকারী",
    originEn: "Daughter of Prophet Adam (AS)",
    firstLetterBn: "আ",
    firstLetterEn: "A"
  },
  {
    id: "girl-39",
    gender: "girl",
    nameBn: "সুমাইরা",
    nameEn: "Sumaira",
    nameAr: "سُمَيْرَة",
    meanBn: "রাতের গল্পসঙ্গী, মিষ্টি ও কোমল স্বরের অধিকারী",
    meanEn: "Night companion, gentle narrator",
    category: "modern",
    originBn: "মিষ্টভাষী ও উত্তম সঙ্গীর প্রতীক",
    originEn: "Meaning pleasant companion in conversation",
    firstLetterBn: "স",
    firstLetterEn: "S"
  },
  {
    id: "girl-40",
    gender: "girl",
    nameBn: "জুই",
    nameEn: "Jui",
    nameAr: "جُوي",
    meanBn: "সুগন্ধি শুভ্র ফুল, নম্র ও কোমল হৃদয়ের নারী",
    meanEn: "White jasmine flower, pure and gentle",
    category: "modern",
    originBn: "পবিত্রতা ও স্নিগ্ধতার প্রতীক জনপ্রিয় নাম",
    originEn: "Popular Bengali-Islamic name symbolizing jasmine purity",
    firstLetterBn: "জ",
    firstLetterEn: "J"
  }
];

const GENDER_TABS: { id: "boy" | "girl" | "all"; labelBn: string; labelEn: string; icon: React.ReactNode }[] = [
  { id: "all", labelBn: "সকল নাম (৮০+ সংগ্রহ)", labelEn: "All Names (80+ Collection)", icon: <Sparkles className="w-4 h-4 text-gold-lux" /> },
  { id: "boy", labelBn: "ছেলেদের ইসলামিক নাম", labelEn: "Boys' Islamic Names", icon: <Baby className="w-4 h-4 text-cyan-400" /> },
  { id: "girl", labelBn: "মেয়েদের ইসলামিক নাম", labelEn: "Girls' Islamic Names", icon: <Heart className="w-4 h-4 text-pink-400" /> }
];

const CATEGORY_TABS: { id: "all" | IslamicBabyName["category"]; labelBn: string; labelEn: string; icon: React.ReactNode }[] = [
  { id: "all", labelBn: "সব বিভাগ", labelEn: "All Categories", icon: <Filter className="w-3.5 h-3.5" /> },
  { id: "prophetic", labelBn: "নবী ও সাহাবীদের নাম", labelEn: "Prophets & Sahaba", icon: <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> },
  { id: "abd", labelBn: "আল্লাহর নামের সাথে", labelEn: "Abd / Allah Names", icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
  { id: "quranic", labelBn: "কোরআনি ও জান্নাতী নাম", labelEn: "Quranic & Paradise", icon: <Sparkles className="w-3.5 h-3.5 text-gold-lux" /> },
  { id: "modern", labelBn: "আধুনিক ও জনপ্রিয়", labelEn: "Modern & Popular", icon: <Award className="w-3.5 h-3.5 text-cyan-400" /> },
  { id: "character", labelBn: "উত্তম চরিত্রের নাম", labelEn: "Noble Character", icon: <UserCheck className="w-3.5 h-3.5 text-purple-400" /> }
];

const BANGLA_LETTERS = ["সব", "অ", "আ", "ই", "উ", "ক", "খ", "জ", "ত", "দ", "ن", "ন", "ফ", "ব", "ম", "র", "ল", "শ", "স", "হ"];
const ENGLISH_LETTERS = ["ALL", "A", "B", "D", "F", "H", "I", "J", "K", "L", "M", "N", "R", "S", "T", "U", "W", "Y", "Z"];

export default function IslamicBabyNamesView() {
  const { language } = useLanguage();
  const isBn = language === "bn";

  const [genderFilter, setGenderFilter] = useState<"boy" | "girl" | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | IslamicBabyName["category"]>("all");
  const [selectedLetter, setSelectedLetter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("islamic_baby_names_favorites");
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("islamic_baby_names_favorites", JSON.stringify(favorites));
    } catch (e) {
      // ignore storage error
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopy = (item: IslamicBabyName) => {
    const text = `${isBn ? item.nameBn : item.nameEn} (${item.nameAr})\n\nMeaning:\n${isBn ? item.meanBn : item.meanEn}\n\nSignificance: ${isBn ? item.originBn : item.originEn}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const playArabicPronunciation = (item: IslamicBabyName) => {
    setPlayingId(item.id);
    playIslamicAudio(
      item.nameAr,
      "ar",
      () => setPlayingId(item.id),
      () => setPlayingId(null)
    );
  };

  const filteredNames = useMemo(() => {
    return ISLAMIC_BABY_NAMES.filter((item) => {
      if (showOnlyFavorites && !favorites.includes(item.id)) return false;
      if (genderFilter !== "all" && item.gender !== genderFilter) return false;
      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;

      if (selectedLetter !== "all" && selectedLetter !== "সব" && selectedLetter !== "ALL") {
        if (isBn) {
          if (item.firstLetterBn !== selectedLetter) return false;
        } else {
          if (item.firstLetterEn !== selectedLetter) return false;
        }
      }

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.nameBn.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.nameAr.includes(q) ||
        item.meanBn.toLowerCase().includes(q) ||
        item.meanEn.toLowerCase().includes(q) ||
        item.originBn.toLowerCase().includes(q) ||
        item.originEn.toLowerCase().includes(q)
      );
    });
  }, [genderFilter, categoryFilter, selectedLetter, searchQuery, showOnlyFavorites, favorites, isBn]);

  const boyCount = ISLAMIC_BABY_NAMES.filter((n) => n.gender === "boy").length;
  const girlCount = ISLAMIC_BABY_NAMES.filter((n) => n.gender === "girl").length;

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* 🌟 Hero Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900/90 to-emerald-950 border border-gold-lux/40 shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-lux/15 border border-gold-lux/40 text-gold-lux text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isBn
                ? `ছেলে ও মেয়েদের ৮০+ অর্থপূর্ণ ইসলামিক নাম (ছেলে: ${boyCount}টি, মেয়ে: ${girlCount}টি)`
                : `80+ Authentic Islamic Baby Names (Boys: ${boyCount}, Girls: ${girlCount})`}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-lux text-white">
            {isBn ? "সোনামণিদের জন্য অর্থপূর্ণ ও বরকতময় ইসলামিক নাম" : "Blessed & Meaningful Islamic Baby Names"}
          </h2>
          <p className="text-xs text-emerald-100/80 leading-relaxed max-w-2xl">
            {isBn
              ? "নবী-রাসূল, সাহাবী ও কোরআনের বরকতময় শব্দ থেকে বাছাই করা ছেলে ও মেয়েদের সুন্দর নাম, আরবি ক্যালিগ্রাফি, সঠিক উচ্চারণ ও বিস্তারিত অর্থসহ।"
              : "Curated collection of blessed names from Prophets, Sahaba, and the Holy Quran with Arabic calligraphy, pronunciations, and deep meanings."}
          </p>
        </div>

        {/* Favorite Bookmarks Toggle */}
        <button
          onClick={() => setShowOnlyFavorites((prev) => !prev)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer whitespace-nowrap ${
            showOnlyFavorites
              ? "bg-rose-600 text-white border-rose-400 shadow-lg"
              : "bg-emerald-900/80 text-gray-200 border-gold-lux/30 hover:border-gold-lux"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${showOnlyFavorites ? "fill-white" : ""}`} />
          <span>{isBn ? `পছন্দের নাম (${favorites.length})` : `Saved Names (${favorites.length})`}</span>
        </button>
      </div>

      {/* 🔍 Search & Gender Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-lux" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isBn
                ? "নাম বা অর্থ দিয়ে খুঁজুন (যেমন: মুহাম্মদ, জান্নাত, পবিত্র, আলো, মারিয়াম...)"
                : "Search by name or meaning (e.g., Muhammad, paradise, pure, light...)"
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-emerald-950/80 border border-gold-lux/30 text-white text-xs placeholder-gray-400 focus:border-gold-lux outline-none transition-all"
          />
        </div>

        {/* Gender Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {GENDER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setGenderFilter(tab.id);
                setShowOnlyFavorites(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 border transition-all cursor-pointer ${
                genderFilter === tab.id && !showOnlyFavorites
                  ? "bg-gold-gradient text-emerald-950 border-gold-lux font-bold shadow-md"
                  : "bg-emerald-950/70 text-gray-300 border-gold-lux/20 hover:border-gold-lux/40"
              }`}
            >
              {tab.icon}
              <span>{isBn ? tab.labelBn : tab.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 🏷️ Category Pills Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-gold-lux/10">
        {CATEGORY_TABS.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setCategoryFilter(cat.id);
              setShowOnlyFavorites(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-1.5 border transition-all cursor-pointer ${
              categoryFilter === cat.id && !showOnlyFavorites
                ? "bg-emerald-800 text-gold-lux border-gold-lux/60 font-bold"
                : "bg-emerald-950/50 text-gray-300 border-emerald-800/50 hover:border-gold-lux/30"
            }`}
          >
            {cat.icon}
            <span>{isBn ? cat.labelBn : cat.labelEn}</span>
          </button>
        ))}
      </div>

      {/* 🔡 Alphabet / Letter Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-gold-lux mr-1 whitespace-nowrap">
          {isBn ? "অক্ষর দিয়ে খুঁজুন:" : "Filter by Letter:"}
        </span>
        {(isBn ? BANGLA_LETTERS : ENGLISH_LETTERS).map((char) => {
          const isAllChar = char === "সব" || char === "ALL";
          const isActive = isAllChar ? selectedLetter === "all" : selectedLetter === char;
          return (
            <button
              key={char}
              onClick={() => setSelectedLetter(isAllChar ? "all" : char)}
              className={`min-w-[32px] px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                isActive
                  ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-sm"
                  : "bg-emerald-950/70 text-gray-300 border-gold-lux/20 hover:border-gold-lux/40"
              }`}
            >
              {char}
            </button>
          );
        })}
      </div>

      {/* 📜 Names Cards Grid */}
      {filteredNames.length === 0 ? (
        <div className="text-center py-12 px-4 bg-emerald-950/60 rounded-2xl border border-gold-lux/20">
          <p className="text-sm text-gray-300 font-medium">
            {isBn
              ? "কোনো নাম পাওয়া যায়নি। অন্য অক্ষর বা শব্দ দিয়ে খুঁজুন।"
              : "No names found matching your filter or query."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNames.map((item) => {
            const isFav = favorites.includes(item.id);
            const isCopied = copiedId === item.id;
            const isPlaying = playingId === item.id;
            const isBoy = item.gender === "boy";

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/90 via-emerald-900/60 to-emerald-950/90 border border-gold-lux/30 shadow-lg hover:border-gold-lux/60 transition-all space-y-3.5 relative overflow-hidden group flex flex-col justify-between"
              >
                {/* Header: Name, Gender Badge & Arabic Calligraphy */}
                <div className="flex items-start justify-between gap-3 border-b border-gold-lux/15 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                          isBoy
                            ? "bg-cyan-950/80 text-cyan-300 border-cyan-400/40"
                            : "bg-pink-950/80 text-pink-300 border-pink-400/40"
                        }`}
                      >
                        {isBoy ? (isBn ? "ছেলে" : "Boy") : (isBn ? "মেয়ে" : "Girl")}
                      </span>
                      <span className="text-xs text-gold-lux/80 font-medium">
                        {item.category === "prophetic"
                          ? (isBn ? "নবী-সাহাবী" : "Prophetic/Sahaba")
                          : item.category === "abd"
                          ? (isBn ? "আল্লাহর নাম সংবলিত" : "Abd/Allah")
                          : item.category === "quranic"
                          ? (isBn ? "কোরআনি শব্দ" : "Quranic")
                          : item.category === "character"
                          ? (isBn ? "উত্তম চরিত্র" : "Noble Character")
                          : (isBn ? "আধুনিক ও জনপ্রিয়" : "Modern")}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-serif-lux text-white flex items-center gap-2">
                      <span>{isBn ? item.nameBn : item.nameEn}</span>
                      <span className="text-xs text-gray-400 font-sans font-normal">
                        ({isBn ? item.nameEn : item.nameBn})
                      </span>
                    </h3>
                  </div>

                  {/* Arabic Calligraphy & Action Buttons */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xl sm:text-2xl font-serif-lux text-gold-lux tracking-wide" dir="rtl">
                      {item.nameAr}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => playArabicPronunciation(item)}
                        title={isBn ? "আরবি উচ্চারণ শুনুন" : "Listen to Arabic pronunciation"}
                        className={`p-1.5 rounded-lg transition-all border cursor-pointer ${
                          isPlaying
                            ? "bg-gold-lux text-emerald-950 border-gold-lux animate-pulse scale-110 shadow-md shadow-gold-lux/50"
                            : "bg-emerald-900/80 text-gold-lux hover:bg-emerald-800 hover:scale-105 border-gold-lux/30"
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleCopy(item)}
                        title={isBn ? "নাম ও অর্থ কপি করুন" : "Copy Name & Meaning"}
                        className="p-1.5 rounded-lg bg-emerald-900/80 text-gray-300 hover:text-white hover:bg-emerald-800 transition-colors border border-gold-lux/30 cursor-pointer"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => toggleFavorite(item.id)}
                        title={isBn ? "পছন্দের তালিকায় রাখুন" : "Bookmark Name"}
                        className={`p-1.5 rounded-lg transition-colors border cursor-pointer ${
                          isFav
                            ? "bg-rose-900/80 text-rose-300 border-rose-400"
                            : "bg-emerald-900/80 text-gray-300 hover:text-white border-gold-lux/30"
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFav ? "fill-rose-300" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Meaning Section */}
                <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/40 space-y-1">
                  <span className="text-xs font-bold text-gold-lux block">
                    {isBn ? "অর্থ / তাৎপর্য:" : "Meaning:"}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                    {isBn ? item.meanBn : item.meanEn}
                  </p>
                </div>

                {/* Significance Footer */}
                <div className="pt-1 text-xs text-emerald-200/80 flex items-center gap-1.5">
                  <span>📖</span>
                  <span>{isBn ? item.originBn : item.originEn}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
