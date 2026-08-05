import React, { useState, useMemo } from "react";
import {
  Search,
  Volume2,
  Bookmark,
  Heart,
  Sparkles,
  BookOpen,
  Check,
  Share2,
  Info,
  Filter,
  Grid,
  List
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playIslamicAudio } from "../lib/islamicAudio";

export interface AllahName {
  id: number;
  ar: string;
  bn: string;
  en: string;
  transliteration: string;
  meanBn: string;
  meanEn: string;
  virtueBn: string;
  virtueEn: string;
}

export const ASMAUL_HUSNA_99: AllahName[] = [
  {
    id: 1,
    ar: "الرَّحْمَٰنُ",
    bn: "আর-রহমান",
    en: "Ar-Rahman",
    transliteration: "Ar-Rahman",
    meanBn: "পরম করুণাময়, সর্বব্যাপী দয়ালু",
    meanEn: "The Most Gracious, All-Compassionate",
    virtueBn: "প্রতিদিন নামাজের পর ১০০ বার পাঠ করলে মন থেকে কাঠিন্য দূর হয় এবং স্মৃতিশক্তি বৃদ্ধি পায়।",
    virtueEn: "Reciting 100 times after obligatory prayers removes hardness of heart and increases memory."
  },
  {
    id: 2,
    ar: "الرَّحِيمُ",
    bn: "আর-রহীম",
    en: "Ar-Rahim",
    transliteration: "Ar-Rahim",
    meanBn: "অসীম দয়ালু, পরম দয়াময়",
    meanEn: "The Most Merciful",
    virtueBn: "প্রতিদিন ১০০ বার পাঠ করলে সকল প্রকার বিপদ-আপদ ও উদ্বেগ থেকে আল্লাহ সুরক্ষা প্রদান করেন।",
    virtueEn: "Reciting 100 times daily safeguards from worldly calamities and anxiety."
  },
  {
    id: 3,
    ar: "الْمَلِكُ",
    bn: "আল-মালিক",
    en: "Al-Malik",
    transliteration: "Al-Malik",
    meanBn: "মহাধিরাজ, পরম ক্ষমতার অধিকারী",
    meanEn: "The Sovereign Lord, The King",
    virtueBn: "ফজর নামাজের পর বেশি বেশি পাঠ করলে সম্পদ ও সম্মান বৃদ্ধি পায় এবং অভাব দূর হয়।",
    virtueEn: "Reciting frequently after Fajr brings dignity, wealth and self-sufficiency."
  },
  {
    id: 4,
    ar: "الْقُدُّوسُ",
    bn: "আল-ক্বুদ্দুস",
    en: "Al-Quddus",
    transliteration: "Al-Quddus",
    meanBn: "অতি পবিত্র, মহামহিম ও নিষ্কলঙ্ক",
    meanEn: "The Most Holy, The Pure One",
    virtueBn: "প্রতিদিন ১০০ বার পাঠ করলে মনের সকল প্রকার কুমন্ত্রণা ও খারাপ চিন্তা দূর হয়।",
    virtueEn: "Reciting 100 times daily purifies the heart from anxiety and evil thoughts."
  },
  {
    id: 5,
    ar: "السَّلَامُ",
    bn: "আস-সালাম",
    en: "As-Salam",
    transliteration: "As-Salam",
    meanBn: "শান্তিদাতা, নিরাপত্তা ও শান্তির উৎস",
    meanEn: "The Source of Peace, The Flawless",
    virtueBn: "অসুস্থ বা দুশ্চিন্তাগ্রস্ত ব্যক্তির সামনে ১৬০ বার পাঠ করলে শান্তি ও আরোগ্য লাভ হয়।",
    virtueEn: "Reciting 160 times to a sick person brings recovery and tranquility."
  },
  {
    id: 6,
    ar: "الْمُؤْمِنُ",
    bn: "আল-মু'মিন",
    en: "Al-Mu'min",
    transliteration: "Al-Mu'min",
    meanBn: "নিরাপত্তাদাতা, ঈমান ও আশ্রয়ের উৎস",
    meanEn: "The Giver of Security, The Inspirer of Faith",
    virtueBn: "ভয়ের সময় এই নাম বেশি বেশি পাঠ করলে আল্লাহর পক্ষ থেকে পূর্ণ নিরাপত্তা লাভ হয়।",
    virtueEn: "Reciting during fear or distress grants divine protection and safety."
  },
  {
    id: 7,
    ar: "الْمُهَيْمِنُ",
    bn: "আল-মুহাইমিন",
    en: "Al-Muhaimin",
    transliteration: "Al-Muhaimin",
    meanBn: "রক্ষক, অভিভাবক ও পর্যবেক্ষণকারী",
    meanEn: "The Guardian, The Protector",
    virtueBn: "ওজু অবস্থায় ১০০ বার পাঠ করলে আত্মা পবিত্র হয় এবং মনের আলো বৃদ্ধি পায়।",
    virtueEn: "Reciting 100 times after ablution brings inner spiritual illumination."
  },
  {
    id: 8,
    ar: "الْعَزِيزُ",
    bn: "আল-আযীয",
    en: "Al-Aziz",
    transliteration: "Al-Aziz",
    meanBn: "মহাপরাক্রমশালী, অপরাজেয় ও মর্যাদাদাতা",
    meanEn: "The Almighty, The Invincible",
    virtueBn: "টানা ৪০ দিন ফজরের পর ৪০ বার পাঠ করলে সমাজে সম্মান ও মর্যাদা বহুগুণ বৃদ্ধি পায়।",
    virtueEn: "Reciting 40 times after Fajr for 40 days grants honor and independence."
  },
  {
    id: 9,
    ar: "الْجَبَّارُ",
    bn: "আল-জাব্বার",
    en: "Al-Jabbar",
    transliteration: "Al-Jabbar",
    meanBn: "প্রবল প্রতাপশালী, ভগ্ন হৃদয় জোড়াদানকারী",
    meanEn: "The Compeller, The Restorer",
    virtueBn: "ভগ্ন হৃদয় বা বিপদগ্রস্ত অবস্থায় এই নাম পাঠ করলে অন্তরে শক্তি ও সান্ত্বনা মেলে।",
    virtueEn: "Reciting heals broken hearts and protects from tyranny."
  },
  {
    id: 10,
    ar: "الْمُتَكَبِّرُ",
    bn: "আল-মুতাকাব্বির",
    en: "Al-Mutakabbir",
    transliteration: "Al-Mutakabbir",
    meanBn: "সর্বশ্রেষ্ঠ ও মহীয়ান, অহংকারের একমাত্র অধিকারী",
    meanEn: "The Supreme, The Majestic",
    virtueBn: "কোনো নেক কাজের শুরুতে এই নাম পাঠ করলে কাজে সফলতা ও বরকত লাভ হয়।",
    virtueEn: "Reciting before undertaking important tasks brings success and dignity."
  },
  {
    id: 11,
    ar: "الْخَالِقُ",
    bn: "আল-খালিক্ব",
    en: "Al-Khaliq",
    transliteration: "Al-Khaliq",
    meanBn: "সৃষ্টিকর্তা, সবকিছুর উদ্ভাবক",
    meanEn: "The Creator, The Maker",
    virtueBn: "গভীর রাতে ১০০ বার পাঠ করলে মন থেকে হতাশা দূর হয় এবং নেক সন্তান লাভ হয়।",
    virtueEn: "Reciting 100 times at night brings peace and righteous offspring."
  },
  {
    id: 12,
    ar: "الْبَارِئُ",
    bn: "আল-বারি",
    en: "Al-Bari",
    transliteration: "Al-Bari",
    meanBn: "উৎসরণকারী, সুনিপুণ স্রষ্টা",
    meanEn: "The Evolver, The Maker of Order",
    virtueBn: "গর্ভবতী মা বা সন্তান কামনাকারী ব্যক্তি এই নাম পাঠ করলে আল্লাহর রহমত লাভ করে।",
    virtueEn: "Beneficial for mothers seeking safe delivery and healthy children."
  },
  {
    id: 13,
    ar: "الْمُصَوِّرُ",
    bn: "আল-মুসাওয়ির",
    en: "Al-Musawwir",
    transliteration: "Al-Musawwir",
    meanBn: "রূপদানকারী, অবয়ব ও সৌন্দর্য সৃষ্টিকারী",
    meanEn: "The Fashioner of Forms, The Shaper",
    virtueBn: "আল-খালিক্ব, আল-বারি, আল-মুসাওয়ির একসাথে ২১ বার পাঠ করলে উত্তম সন্তান লাভ হয়।",
    virtueEn: "Recited together with Al-Khaliq and Al-Bari for blessed offspring."
  },
  {
    id: 14,
    ar: "الْغَفَّارُ",
    bn: "আল-গফফার",
    en: "Al-Ghaffar",
    transliteration: "Al-Ghaffar",
    meanBn: "পরম ক্ষমাশীল, পাপ গোপনকারী",
    meanEn: "The All-Forgiving, The Concealer of Sins",
    virtueBn: "জুমার নামাজের পর ১০০ বার পাঠ করলে আল্লাহ গুনাহ মাফ করেন ও ক্ষমা দান করেন।",
    virtueEn: "Reciting 100 times after Friday prayer brings divine forgiveness."
  },
  {
    id: 15,
    ar: "الْقَهَّارُ",
    bn: "আল-ক্বহহার",
    en: "Al-Qahhar",
    transliteration: "Al-Qahhar",
    meanBn: "মহাপ্রতাপশালী, সবকিছুর ওপর বিজয়ী",
    meanEn: "The Subduer, The Ever-Dominating",
    virtueBn: "নফস বা রিপুর কুমন্ত্রণা দমনে এবং শত্রুর অন্যায় থেকে রক্ষায় এই নাম উপকারী।",
    virtueEn: "Helps conquer base desires and protects from injustice."
  },
  {
    id: 16,
    ar: "الْوَهَّابُ",
    bn: "আল-ওয়াহহাব",
    en: "Al-Wahhab",
    transliteration: "Al-Wahhab",
    meanBn: "মহাদাতা, নিঃস্বার্থ ও অসীম দানকারী",
    meanEn: "The Supreme Bestower, The Giver of All",
    virtueBn: "চাশত বা দুহার নামাজের পর সাজদায় গিয়ে পাঠ করলে রিজিকে অভাবনীয় বরকত আসে।",
    virtueEn: "Reciting after Duha prayer opens doors of provision and blessings."
  },
  {
    id: 17,
    ar: "الرَّزَّاقُ",
    bn: "আর-রযযাক্ব",
    en: "Ar-Razzaq",
    transliteration: "Ar-Razzaq",
    meanBn: "রিজিকদাতা, সর্বজীবের অন্নদাতা",
    meanEn: "The Total Provider, The Sustainer",
    virtueBn: "ফজরের নামাজের আগে বা পরে নিয়মিত পাঠ করলে রিজিকে প্রাচুর্য ও বরকত হয়।",
    virtueEn: "Reciting regularly before Fajr increases lawful sustenance."
  },
  {
    id: 18,
    ar: "الْفَتَّاحُ",
    bn: "আল-ফাত্তাহ",
    en: "Al-Fattah",
    transliteration: "Al-Fattah",
    meanBn: "বিজয়দাতা, কল্যাণের দ্বার উন্মোচনকারী",
    meanEn: "The Supreme Opener, The Victory Giver",
    virtueBn: "ফজরের পর বুকে হাত রেখে ৭০ বার পাঠ করলে অন্তর জ্ঞান ও হেদায়াতের আলোয় আলোকিত হয়।",
    virtueEn: "Reciting 70 times after Fajr opens the heart to wisdom and success."
  },
  {
    id: 19,
    ar: "الْعَلِيمُ",
    bn: "আল-আলীম",
    en: "Al-Alim",
    transliteration: "Al-Alim",
    meanBn: "সর্বজ্ঞানী, সবকিছু সম্পর্কে অবগত",
    meanEn: "The All-Knowing, The Omniscient",
    virtueBn: "নিয়মিত পাঠ করলে জ্ঞান, প্রজ্ঞা ও স্মরণশক্তি বহুগুণ বৃদ্ধি পায়।",
    virtueEn: "Reciting regularly enhances knowledge, memory, and intuition."
  },
  {
    id: 20,
    ar: "الْقَابِضُ",
    bn: "আল-ক্ববিদ্ব",
    en: "Al-Qabid",
    transliteration: "Al-Qabid",
    meanBn: "সংকোচনকারী, নিয়ন্ত্রণকারী",
    meanEn: "The Restrainer, The Withholder",
    virtueBn: "নিয়মিত পাঠ করলে ক্ষুধা ও পিপাসার কষ্ট দূর হয় এবং আত্মনিয়ন্ত্রণ বৃদ্ধি পায়।",
    virtueEn: "Reciting helps gain self-control and resilience in hardship."
  },
  {
    id: 21,
    ar: "الْبَاسِطُ",
    bn: "আল-বাসিত্ব",
    en: "Al-Basit",
    transliteration: "Al-Basit",
    meanBn: "সম্প্রসারণকারী, প্রাচুর্য দানকারী",
    meanEn: "The Expander, The Reliever",
    virtueBn: "চাশতের নামাজের পর হাত তুলে ১০ বার পাঠ করলে মন ও রিজিকে প্রশস্ততা আসে।",
    virtueEn: "Reciting 10 times after Duha prayer expands heart and provision."
  },
  {
    id: 22,
    ar: "الْخَافِضُ",
    bn: "আল-খফিদ্ব",
    en: "Al-Khafid",
    transliteration: "Al-Khafid",
    meanBn: "অহংকারীদের অবনমিতকারী",
    meanEn: "The Abaser, The Humbler",
    virtueBn: "অহংকার ও আত্মগর্ব থেকে মুক্ত হতে এই নাম নিয়মিত পাঠ করা উপকারী।",
    virtueEn: "Helps overcome pride and protects from arrogance."
  },
  {
    id: 23,
    ar: "الرَّافِعُ",
    bn: "আর-রফিই",
    en: "Ar-Rafi",
    transliteration: "Ar-Rafi",
    meanBn: "উচ্চ মর্যাদাদাতা, সমুন্নতকারী",
    meanEn: "The Exalter, The Elevator",
    virtueBn: "প্রতিদিন ১০০ বার পাঠ করলে আল্লাহ সমাজে সম্মান ও মর্যাদা বৃদ্ধি করেন।",
    virtueEn: "Reciting 100 times daily elevates honor and rank among people."
  },
  {
    id: 24,
    ar: "الْمُعِزُّ",
    bn: "আল-মুইযযু",
    en: "Al-Mu'izz",
    transliteration: "Al-Mu'izz",
    meanBn: "সম্মানদাতা, শক্তিশালীকারী",
    meanEn: "The Bestower of Honor, The Empowerer",
    virtueBn: "সোমবার বা শুক্রবার মাগরিবের পর ১৪০ বার পাঠ করলে মানুষের চোখে সম্মান বাড়ে।",
    virtueEn: "Reciting 140 times after Maghrib on Monday/Friday brings respect."
  },
  {
    id: 25,
    ar: "الْمُذِلُّ",
    bn: "আল-মুযিললু",
    en: "Al-Muzill",
    transliteration: "Al-Muzill",
    meanBn: "অহংকারী ও জালিমদের লাঞ্ছিতকারী",
    meanEn: "The Dishonorer, The Humiliator of Tyrants",
    virtueBn: "জালিম বা অত্যাচারী শত্রুর ক্ষতি থেকে বাঁচার জন্য এই নাম পাঠ করা হয়।",
    virtueEn: "Reciting provides protection from oppressors and envious people."
  },
  {
    id: 26,
    ar: "السَّمِيعُ",
    bn: "আস-সামীই'",
    en: "As-Sami",
    transliteration: "As-Sami",
    meanBn: "সর্বশ্রোতা, সব প্রার্থনা শ্রবণকারী",
    meanEn: "The All-Hearing, The Hearer of All",
    virtueBn: "দোয়া কবুলের উদ্দেশ্যে ১০০ বার এই নাম পাঠ করে আল্লাহর কাছে দোয়া করলে কবুল হয়।",
    virtueEn: "Reciting 100 times before supplication helps prayers be answered."
  },
  {
    id: 27,
    ar: "الْبَصِيرُ",
    bn: "আল-বাছীর",
    en: "Al-Basir",
    transliteration: "Al-Basir",
    meanBn: "সর্বদ্রষ্টা, সবকিছুর প্রত্যক্ষকারী",
    meanEn: "The All-Seeing",
    virtueBn: "জুমার নামাজের পর ১০০ বার পাঠ করলে চোখের জ্যোতি ও অন্তরের দৃষ্টিশক্তি বৃদ্ধি পায়।",
    virtueEn: "Reciting 100 times after Friday prayer strengthens physical and spiritual vision."
  },
  {
    id: 28,
    ar: "الْحَكَمُ",
    bn: "আল-হাকাম",
    en: "Al-Hakam",
    transliteration: "Al-Hakam",
    meanBn: "পরম বিচারক, চূড়ান্ত ফায়সালাকারী",
    meanEn: "The Judge, The Arbiter",
    virtueBn: "গভীর রাতে ওজু অবস্থায় পাঠ করলে আল্লাহ অন্তরে সঠিক সিদ্ধান্তের ক্ষমতা দেন।",
    virtueEn: "Reciting at night grants clarity and discernment in difficult matters."
  },
  {
    id: 29,
    ar: "الْعَدْلُ",
    bn: "আল-আদলুল",
    en: "Al-Adl",
    transliteration: "Al-Adl",
    meanBn: "পরম ন্যায়বিচারক, ইনসাফের প্রতীক",
    meanEn: "The Utterly Just, The Embodiment of Justice",
    virtueBn: "জুমার দিনে রুটিতে এই নাম লিখে খেলে আল্লাহর প্রতি আনুগত্য বৃদ্ধি পায়।",
    virtueEn: "Reciting brings justice and fairness in personal and professional life."
  },
  {
    id: 30,
    ar: "اللَّطِيفُ",
    bn: "আল-লাত্বীফ",
    en: "Al-Latif",
    transliteration: "Al-Latif",
    meanBn: "পরম সূক্ষ্মদর্শী, কোমল ও মেহেরবান",
    meanEn: "The Subtle One, The Most Gentle",
    virtueBn: "কঠিন বিপদ বা দুশ্চিন্তায় ১২৯ বার পাঠ করলে আল্লাহ অতি সহজে সমাধান করে দেন।",
    virtueEn: "Reciting 129 times in times of difficulty brings gentle divine relief."
  },
  {
    id: 31,
    ar: "الْخَبِيرُ",
    bn: "আল-খবীর",
    en: "Al-Khabir",
    transliteration: "Al-Khabir",
    meanBn: "সর্ববিষয় সম্পর্কে সম্যক অবগত",
    meanEn: "The All-Aware, The Fully Informed",
    virtueBn: "খারাপ অভ্যাস ও বদস্বভাব থেকে মুক্ত হতে এই নাম নিয়মিত পাঠ করা অত্যন্ত ফলপ্রসূ।",
    virtueEn: "Reciting helps overcome bad habits and secret sins."
  },
  {
    id: 32,
    ar: "الْحَلِيمُ",
    bn: "আল-হালীম",
    en: "Al-Halim",
    transliteration: "Al-Halim",
    meanBn: "পরম সহনশীল, অতি ধৈর্যশীল",
    meanEn: "The Forbearing, The Gentle",
    virtueBn: "রাগ ও ক্রোধ দমনে এবং মানসিক শান্তিতে এই নাম বেশি বেশি পাঠ করলে উপকার মেলে।",
    virtueEn: "Reciting cools anger and grants patience and emotional calm."
  },
  {
    id: 33,
    ar: "الْعَظِيمُ",
    bn: "আল-আযীম",
    en: "Al-Azim",
    transliteration: "Al-Azim",
    meanBn: "মহীয়ান, সুমহান ও অতুলনীয়",
    meanEn: "The Magnificent, The Supreme Glory",
    virtueBn: "নিয়মিত পাঠ করলে আল্লাহ মানুষের অন্তরে আপনার প্রতি সম্মান ও ভালোবাসা সৃষ্টি করবেন।",
    virtueEn: "Reciting regularly brings dignity and respect from others."
  },
  {
    id: 34,
    ar: "الْغَفُورُ",
    bn: "আল-গফুর",
    en: "Al-Ghafur",
    transliteration: "Al-Ghafur",
    meanBn: "পরম ক্ষমাশীল, পাপ মার্জনা কারী",
    meanEn: "The Much-Forgiving, The Ever-Pardoning",
    virtueBn: "মাথাব্যথা বা শারীরিক অসুস্থতার সময় এবং ক্ষমা প্রার্থনায় এটি অত্যন্ত ফলপ্রসূ।",
    virtueEn: "Reciting brings relief from sickness and divine pardon for sins."
  },
  {
    id: 35,
    ar: "الشَّكُورُ",
    bn: "আশ-শাকুর",
    en: "Ash-Shakur",
    transliteration: "Ash-Shakur",
    meanBn: "গুণগ্রাহী, অল্প আমলে অধিক প্রতিদানকারী",
    meanEn: "The Most Appreciative, The Rewarder of Thankfulness",
    virtueBn: "আর্থিক ও মানসিক সংকটে এই নাম পাঠ করলে আল্লাহ নেয়ামতের দুয়ার খুলে দেন।",
    virtueEn: "Reciting in hardship opens doors of gratitude and blessings."
  },
  {
    id: 36,
    ar: "الْعَلِيُّ",
    bn: "আল-আলী",
    en: "Al-Aliyy",
    transliteration: "Al-Aliyy",
    meanBn: "সর্বোচ্চ, সুউচ্চ ও মহীয়ান",
    meanEn: "The Most High, The Exalted",
    virtueBn: "এই নাম লিখে সঙ্গে রাখলে বা নিয়মিত পাঠ করলে মর্যাদা ও মনোবল বৃদ্ধি পায়।",
    virtueEn: "Reciting elevates rank and builds inner confidence and faith."
  },
  {
    id: 37,
    ar: "الْكَبِيرُ",
    bn: "আল-কবীর",
    en: "Al-Kabir",
    transliteration: "Al-Kabir",
    meanBn: "সুমহান, সর্বশ্রেষ্ঠ ও বিরাট",
    meanEn: "The Greatest, The Most Grand",
    virtueBn: "চাকরি বা কর্মক্ষেত্রে সম্মান ও পদোন্নতির জন্য প্রতিদিন ১০০ বার পাঠ করা উপকারী।",
    virtueEn: "Reciting 100 times daily brings respect and success in professional life."
  },
  {
    id: 38,
    ar: "الْحَفِيظُ",
    bn: "আল-হাফীয",
    en: "Al-Hafiz",
    transliteration: "Al-Hafiz",
    meanBn: "পরম রক্ষকর্তা, সবকিছুর হেফাজতকারী",
    meanEn: "The Preserver, The All-Protecting",
    virtueBn: "ভ্রমণ বা বিপদের সময় পাঠ করলে আল্লাহ সকল প্রকার দুর্ঘটনা থেকে হেফাজত করেন।",
    virtueEn: "Reciting during travel or danger safeguards from all harm."
  },
  {
    id: 39,
    ar: "الْمُقِيتُ",
    bn: "আল-মুক্বীত",
    en: "Al-Muqit",
    transliteration: "Al-Muqit",
    meanBn: "অন্নদাতা, শক্তি ও খাদ্যের জোগানদাতা",
    meanEn: "The Nourisher, The Sustainer",
    virtueBn: "পানির ওপর ৭ বার পড়ে অবাধ্য সন্তানকে খাওয়ালে তার চরিত্র উত্তম ও অনুগত হয়।",
    virtueEn: "Reciting over water for children helps cultivate good behavior."
  },
  {
    id: 40,
    ar: "الْحَسِيبُ",
    bn: "আল-হাসীব",
    en: "Al-Hasib",
    transliteration: "Al-Hasib",
    meanBn: "হিসাব গ্রহণকারী, বান্দার জন্য যথেষ্ট",
    meanEn: "The Reckoner, The Sufficient",
    virtueBn: "ভয় বা বিপদের সময় 'হাসবিয়াল্লাহুল হাসীব' পাঠ করলে আল্লাহই যথেষ্ট হয়ে যান।",
    virtueEn: "Reciting in times of fear makes Allah sufficient against all odds."
  },
  {
    id: 41,
    ar: "الْجَلِيلُ",
    bn: "আল-জালীল",
    en: "Al-Jalil",
    transliteration: "Al-Jalil",
    meanBn: "মহিমান্বিত, প্রতাপশালী ও গৌরবের অধিকারী",
    meanEn: "The Majestic, The Sublime One",
    virtueBn: "নিয়মিত পাঠ করলে মানুষের অন্তরে আপনার প্রতি সম্মান ও সম্ভ্রম জন্মায়।",
    virtueEn: "Reciting regularly inspires reverence and respect in others."
  },
  {
    id: 42,
    ar: "الْكَرِيمُ",
    bn: "আল-কারীম",
    en: "Al-Karim",
    transliteration: "Al-Karim",
    meanBn: "পরম দাতা, মহামহিম ও উদার",
    meanEn: "The Most Generous, The Bountiful",
    virtueBn: "ঘুমানোর আগে পাঠ করলে আল্লাহ সম্মানিত করেন এবং অভাব দূর করে দেন।",
    virtueEn: "Reciting before sleep brings honor and divine generosity."
  },
  {
    id: 43,
    ar: "الرَّقِيبُ",
    bn: "আর-রক্বীব",
    en: "Ar-Raqib",
    transliteration: "Ar-Raqib",
    meanBn: "সদা পর্যবেক্ষণকারী, সদাজাগ্রত রক্ষক",
    meanEn: "The Watchful Guardian, The Observer",
    virtueBn: "পরিবারের সুরক্ষা ও খারাপ দৃষ্টি থেকে বাঁচার জন্য ৭ বার পাঠ করে ফু দেওয়া উপকারী।",
    virtueEn: "Reciting 7 times protects family and wealth from harm."
  },
  {
    id: 44,
    ar: "الْمُجِيبُ",
    bn: "আল-মুজীব",
    en: "Al-Mujib",
    transliteration: "Al-Mujib",
    meanBn: "প্রার্থনা কবুলকারী, সাড়াদাতা",
    meanEn: "The Responsive, The Answerer of Prayers",
    virtueBn: "দোয়ার শেষে এই নাম পাঠ করলে আল্লাহর রহমতে দোয়া দ্রুত কবুল হয়।",
    virtueEn: "Reciting after supplication ensures prayers are heard and answered."
  },
  {
    id: 45,
    ar: "الْوَاسِعُ",
    bn: "আল-ওয়াসি'",
    en: "Al-Wasi",
    transliteration: "Al-Wasi",
    meanBn: "সর্বব্যাপী, অসীম প্রাচুর্যের অধিকারী",
    meanEn: "The All-Encompassing, The Boundless",
    virtueBn: "দারিদ্র্য ও সংকটের সময় নিয়মিত পাঠ করলে রিজিকে প্রাচুর্য ও প্রশান্তি আসে।",
    virtueEn: "Reciting in financial difficulty opens wide doors of provision."
  },
  {
    id: 46,
    ar: "الْحَكِيمُ",
    bn: "আল-হাকীম",
    en: "Al-Hakim",
    transliteration: "Al-Hakim",
    meanBn: "পরম প্রজ্ঞাময়, সুবিজ্ঞ",
    meanEn: "The All-Wise",
    virtueBn: "কঠিন কাজের শুরুতে এবং জ্ঞান অর্জনের সময় পাঠ করলে প্রজ্ঞা লাভ হয়।",
    virtueEn: "Reciting brings wisdom, intuition, and success in learning."
  },
  {
    id: 47,
    ar: "الْوَدُودُ",
    bn: "আল-ওয়াদুদ",
    en: "Al-Wadud",
    transliteration: "Al-Wadud",
    meanBn: "পরম স্নেহশীল, বান্দার প্রতি প্রেমময়",
    meanEn: "The Most Loving, The Affectionate",
    virtueBn: "স্বামী-স্ত্রী বা পরিবারের সদস্যদের মাঝে সম্প্রীতি ও ভালোবাসা বৃদ্ধিতে ১০০০ বার পাঠ উপকারী।",
    virtueEn: "Reciting 1000 times over food restores love and harmony in family."
  },
  {
    id: 48,
    ar: "الْمَجِيدُ",
    bn: "আল-মাজীদ",
    en: "Al-Majid",
    transliteration: "Al-Majid",
    meanBn: "মহিমান্বিত, গৌরবের সর্বোচ্চ অধিকারী",
    meanEn: "The Glorious, The Most Honorable",
    virtueBn: "অসুস্থতা বা মানসিক অবসাদ দূর করতে এই নাম পাঠ করা অত্যন্ত ফলপ্রসূ।",
    virtueEn: "Reciting brings spiritual healing and glory to one's character."
  },
  {
    id: 49,
    ar: "الْبَاعِثُ",
    bn: "আল-বাইস",
    en: "Al-Ba'ith",
    transliteration: "Al-Ba'ith",
    meanBn: "পুনরুত্থানকারী, প্রেরণে সক্ষম",
    meanEn: "The Resurrector, The Awakener",
    virtueBn: "ঘুমানোর আগে বুকে হাত রেখে ১০০ বার পাঠ করলে অন্তরে আল্লাহর ভয় ও হেদায়াত আসে।",
    virtueEn: "Reciting 100 times before sleep with hand on chest brings wisdom."
  },
  {
    id: 50,
    ar: "الشَّهِيدُ",
    bn: "আশ-শাহীদ",
    en: "Ash-Shahid",
    transliteration: "Ash-Shahid",
    meanBn: "সর্বজ্ঞ সাক্ষী, সবকিছুর প্রত্যক্ষদর্শী",
    meanEn: "The Witness, The All-Observing",
    virtueBn: "অবাধ্য সন্তান বা পরিবারের কারো সংশোধনের জন্য এই নাম পাঠ করে দোয়া করলে সুফল মেলে।",
    virtueEn: "Reciting over disobedient family members softens their hearts."
  },
  {
    id: 51,
    ar: "الْحَقُّ",
    bn: "আল-হাক্ব",
    en: "Al-Haqq",
    transliteration: "Al-Haqq",
    meanBn: "পরম সত্য, বাস্তব ও অপরিবর্তনীয়",
    meanEn: "The Absolute Truth",
    virtueBn: "হারানো জিনিস ফিরে পেতে বা মিথ্যা অপবাদ থেকে মুক্ত হতে এই নাম পাঠ করা উপকারী।",
    virtueEn: "Reciting helps find lost things and clears from false accusations."
  },
  {
    id: 52,
    ar: "الْوَكِيلُ",
    bn: "আল-ওয়াকীল",
    en: "Al-Wakil",
    transliteration: "Al-Wakil",
    meanBn: "পরম কর্মবিধায়ক, উত্তম অভিভাবক",
    meanEn: "The Supreme Trustee, The Dependable Guardian",
    virtueBn: "যেকোনো কঠিন পরিস্থিতিতে 'হাসবিয়াল্লাহু ওয়া নি'মাল ওয়াকীল' পাঠ করলে আল্লাহই যথেষ্ট হন।",
    virtueEn: "Reciting places full trust in Allah and solves impossible problems."
  },
  {
    id: 53,
    ar: "الْقَوِيُّ",
    bn: "আল-ক্ববিয়্যু",
    en: "Al-Qawiyy",
    transliteration: "Al-Qawiyy",
    meanBn: "মহা শক্তিশালী, অক্ষয় শক্তির অধিকারী",
    meanEn: "The All-Strong, The Possessor of All Strength",
    virtueBn: "শারীরিক দুর্বলতা বা শত্রুর ভয়ে এই নাম পাঠ করলে অসীম শক্তি ও সাহস মেলে।",
    virtueEn: "Reciting removes physical weakness and grants courage against danger."
  },
  {
    id: 54,
    ar: "الْمَتِينُ",
    bn: "আল-মাতীন",
    en: "Al-Matin",
    transliteration: "Al-Matin",
    meanBn: "সুদৃঢ়, অটল ও অপ্রতিরোধ্য",
    meanEn: "The Firm, The Steadfast One",
    virtueBn: "ঈমান ও আমলে দৃঢ়তা লাভের জন্য এই নাম নিয়মিত পাঠ করা অত্যন্ত উপকারী।",
    virtueEn: "Reciting grants firmness in faith and resilience against hardships."
  },
  {
    id: 55,
    ar: "الْوَلِيُّ",
    bn: "আল-ওয়ালিয়্যু",
    en: "Al-Waliyy",
    transliteration: "Al-Waliyy",
    meanBn: "পরম বন্ধু, সাহায্যকারী ও অভিভাবক",
    meanEn: "The Protecting Friend, The Patron",
    virtueBn: "নিয়মিত পাঠ করলে আল্লাহ বান্দাকে নিজের বিশেষ বন্ধু ও প্রিয় বান্দা হিসেবে গ্রহণ করেন।",
    virtueEn: "Reciting regularly brings one closer to Allah as a beloved friend."
  },
  {
    id: 56,
    ar: "الْحَمِيدُ",
    bn: "আল-হামীদ",
    en: "Al-Hamid",
    transliteration: "Al-Hamid",
    meanBn: "প্রশংসিত, সকল প্রশংসার যোগ্য",
    meanEn: "The Praiseworthy, The All-Laudable",
    virtueBn: "প্রতিদিন ৯৩ বার পাঠ করলে চরিত্র সুন্দর হয় এবং সমাজে প্রিয়পাত্র হওয়া যায়।",
    virtueEn: "Reciting 93 times daily refines manners and earns love from people."
  },
  {
    id: 57,
    ar: "الْمُحْصِيُ",
    bn: "আল-মুহসী",
    en: "Al-Muhsi",
    transliteration: "Al-Muhsi",
    meanBn: "গণনাকারী, সবকিছুর হিসাব রক্ষক",
    meanEn: "The Accounter, The Numberer of All",
    virtueBn: "নিয়মিত পাঠ করলে শেষ বিচারের দিনে হিসাব সহজ হয় এবং পাপের প্রতি ঘৃণা আসে।",
    virtueEn: "Reciting regularly makes one vigilant over actions and eases Reckoning."
  },
  {
    id: 58,
    ar: "الْمُبْدِئُ",
    bn: "আল-মুবদি'",
    en: "Al-Mubdi",
    transliteration: "Al-Mubdi",
    meanBn: "প্রথম স্রষ্টা, সূচনাকারী",
    meanEn: "The Originator, The Initiator",
    virtueBn: "কোনো কাজের শুরুতে পাঠ করলে কাজটি সুন্দরভাবে সম্পন্ন হয়।",
    virtueEn: "Reciting before starting projects ensures successful initiation."
  },
  {
    id: 59,
    ar: "الْمُعِيدُ",
    bn: "আল-মুঈদু",
    en: "Al-Mu'id",
    transliteration: "Al-Mu'id",
    meanBn: "পুনরায় সৃষ্টিকারী, ফিরিয়ে আনয়নকারী",
    meanEn: "The Restorer, The Reinstater",
    virtueBn: "হারানো বস্তু বা নিখোঁজ ব্যক্তির নিরাপদে ফিরে আসার জন্য ৭০ বার পাঠ উপকারী।",
    virtueEn: "Reciting 70 times helps recover lost property or return absent loved ones."
  },
  {
    id: 60,
    ar: "الْمُحْيِي",
    bn: "আল-মুহযী",
    en: "Al-Muhyi",
    transliteration: "Al-Muhyi",
    meanBn: "জীবনদানকারী, প্রাণসঞ্চারক",
    meanEn: "The Giver of Life, The Reviver",
    virtueBn: "অসুস্থ রোগীর সুস্থতার জন্য নিয়মিত পাঠ করে দম করলে আল্লাহর রহমতে আরোগ্য হয়।",
    virtueEn: "Reciting over the sick brings vitality and divine healing."
  },
  {
    id: 61,
    ar: "الْمُمِيتُ",
    bn: "আল-মুমীত",
    en: "Al-Mumit",
    transliteration: "Al-Mumit",
    meanBn: "মৃত্যুদাতা, জীবনের সমাপ্তি ঘটানোর মালিক",
    meanEn: "The Creator of Death, The Destroyer",
    virtueBn: "নফস ও খারাপ আসক্তি ধ্বংস করার জন্য এই নাম পাঠ করা উপকারী।",
    virtueEn: "Reciting helps eliminate ego, bad habits, and base passions."
  },
  {
    id: 62,
    ar: "الْحَيُّ",
    bn: "আল-হাইয়্যু",
    en: "Al-Hayy",
    transliteration: "Al-Hayy",
    meanBn: "চিরঞ্জীব, সর্বদা জীবিত ও অমরণশীল",
    meanEn: "The Ever-Living One",
    virtueBn: "৩০০০ বার পাঠ করলে অসুস্থতা দূর হয় এবং দীর্ঘায়ু ও সুস্বাস্থ্য লাভ হয়।",
    virtueEn: "Reciting brings spiritual vitality, good health, and long life."
  },
  {
    id: 63,
    ar: "الْقَيُّومُ",
    bn: "আল-ক্বইয়্যুম",
    en: "Al-Qayyum",
    transliteration: "Al-Qayyum",
    meanBn: "স্বয়ংসম্পূর্ণ, সবকিছুর ধারক ও রক্ষক",
    meanEn: "The Self-Subsisting, The Sustainer of All",
    virtueBn: "'ইয়া হাইয়্যু ইয়া কাইয়্যুম' নিয়মিত পাঠ করলে সকল প্রকার দুশ্চিন্তা ও ক্লান্তি দূর হয়।",
    virtueEn: "Recited with Al-Hayy as the greatest prayer for relief from distress."
  },
  {
    id: 64,
    ar: "الْوَاجِدُ",
    bn: "আল-ওয়াজিদ",
    en: "Al-Wajid",
    transliteration: "Al-Wajid",
    meanBn: "অবস্থানকারী, যা ইচ্ছা তা পাওয়ার অধিকারী",
    meanEn: "The Finder, The Unfailing",
    virtueBn: "খাবারের সময় পাঠ করলে অন্তর আলোকিত হয় এবং মানসিক শক্তি বৃদ্ধি পায়।",
    virtueEn: "Reciting promotes inner strength and richness of heart."
  },
  {
    id: 65,
    ar: "الْمَاجِدُ",
    bn: "আল-মাজিদ",
    en: "Al-Majid",
    transliteration: "Al-Majid",
    meanBn: "মহিমান্বিত, সুমহান ও ঔদার্যের অধিকারী",
    meanEn: "The Illustrious, The Magnificent",
    virtueBn: "নিয়মিত পাঠ করলে অন্তরে নূর সৃষ্টি হয় এবং চরিত্রে মহত্ত্ব আসে।",
    virtueEn: "Reciting illuminates the heart with sincerity and nobility."
  },
  {
    id: 66,
    ar: "الْوَاحِدُ",
    bn: "আল-ওয়াহিদ",
    en: "Al-Wahid",
    transliteration: "Al-Wahid",
    meanBn: "এক ও অদ্বিতীয়, লা-শরীক",
    meanEn: "The One, The Unique",
    virtueBn: "১০০০ বার পাঠ করলে মন থেকে সকল প্রকার ভয় ও একাকীত্ব দূর হয়।",
    virtueEn: "Reciting 1000 times removes fear and loneliness from the heart."
  },
  {
    id: 67,
    ar: "الْأَحَدُ",
    bn: "আল-আহাদ",
    en: "Al-Ahad",
    transliteration: "Al-Ahad",
    meanBn: "একক, অতুলনীয় ও অনন্য",
    meanEn: "The Absolute One, The Indivisible",
    virtueBn: "তাওহিদের বিশ্বাস সুদৃঢ় করতে এবং আল্লাহর নৈকট্য পেতে এই নাম অত্যন্ত ফলপ্রসূ।",
    virtueEn: "Reciting deepens monotheistic faith and spiritual closeness to Allah."
  },
  {
    id: 68,
    ar: "الصَّمَدُ",
    bn: "আস-সমাদ",
    en: "As-Samad",
    transliteration: "As-Samad",
    meanBn: "অমুখাপেক্ষী, যার ওপর সবাই নির্ভরশীল",
    meanEn: "The Eternal Refuge, The Self-Sufficient",
    virtueBn: "সজদায় গিয়ে বা বিপদের সময় পাঠ করলে আল্লাহ সকল প্রয়োজন পূরণ করে দেন।",
    virtueEn: "Reciting in prostration fulfills needs and removes dependency on others."
  },
  {
    id: 69,
    ar: "الْقَادِرُ",
    bn: "আল-ক্বদির",
    en: "Al-Qadir",
    transliteration: "Al-Qadir",
    meanBn: "সর্বশক্তিমান, সবকিছুর ওপর ক্ষমতাবান",
    meanEn: "The Capable, The All-Powerful",
    virtueBn: "কঠিন কাজের আগে বা শত্রুর মোকাবেলায় পাঠ করলে আল্লাহ বিজয় ও শক্তি দান করেন।",
    virtueEn: "Reciting grants capability and victory over difficult challenges."
  },
  {
    id: 70,
    ar: "الْمُقْتَدِرُ",
    bn: "আল-মুক্বতাদির",
    en: "Al-Muqtadir",
    transliteration: "Al-Muqtadir",
    meanBn: "প্রভাবশালী, নিরঙ্কুশ ক্ষমতার অধিকারী",
    meanEn: "The Creator of All Power, The Dominant",
    virtueBn: "ঘুম থেকে উঠে ২০ বার পাঠ করলে কাজে বরকত ও অলসতা দূর হয়।",
    virtueEn: "Reciting 20 times upon waking removes lethargy and brings productivity."
  },
  {
    id: 71,
    ar: "الْمُقَدِّمُ",
    bn: "আল-মুক্বাদ্দিম",
    en: "Al-Muqaddim",
    transliteration: "Al-Muqaddim",
    meanBn: "অগ্রসরকারী, এগিয়ে দেওয়ার মালিক",
    meanEn: "The Expediter, The Promoter",
    virtueBn: "যুদ্ধের ময়দানে বা পরীক্ষাক্ষেত্রে পাঠ করলে ভয় দূর হয় ও সফলতা আসে।",
    virtueEn: "Reciting during tests or competition grants courage and advancement."
  },
  {
    id: 72,
    ar: "الْمُؤَخِّرُ",
    bn: "আল-মুয়াখখির",
    en: "Al-Mu'akhkhir",
    transliteration: "Al-Mu'akhkhir",
    meanBn: "বিলম্বকারী, অবকাশ দানকারী",
    meanEn: "The Delayer, The Postponer",
    virtueBn: "প্রতিদিন ১০০ বার পাঠ করলে আল্লাহর আনুগত্যে মন নিবেদিত হয়।",
    virtueEn: "Reciting 100 times daily helps stay devoted to good deeds."
  },
  {
    id: 73,
    ar: "الْأَوَّلُ",
    bn: "আল-আউয়াল",
    en: "Al-Awwal",
    transliteration: "Al-Awwal",
    meanBn: "অনাদি, যার কোনো শুরু নেই",
    meanEn: "The First, The Beginning-less",
    virtueBn: "সন্তান কামনায় বা নতুন কোনো উদ্যোগের শুরুতে ৪০ বার পাঠ করলে বরকত হয়।",
    virtueEn: "Reciting 40 times before new beginnings brings divine blessings."
  },
  {
    id: 74,
    ar: "الْآخِرُ",
    bn: "আল-আখির",
    en: "Al-Akhir",
    transliteration: "Al-Akhir",
    meanBn: "অনন্ত, যার কোনো শেষ নেই",
    meanEn: "The Last, The Endless",
    virtueBn: "নিয়মিত পাঠ করলে জীবনের শেষ পরিণতি (খাতেমা বিল খায়ের) সুন্দর হয়।",
    virtueEn: "Reciting regularly ensures a blessed and peaceful end to life."
  },
  {
    id: 75,
    ar: "الظَّاهِرُ",
    bn: "আজ-যহির",
    en: "Az-Zahir",
    transliteration: "Az-Zahir",
    meanBn: "প্রকাশ্য, যার অস্তিত্বের প্রমাণ সর্বত্র",
    meanEn: "The Manifest, The Evident",
    virtueBn: "জুমার পর ১৫ বার পাঠ করলে অন্তরের আলো ও প্রজ্ঞা বৃদ্ধি পায়।",
    virtueEn: "Reciting 15 times after Friday prayer brings spiritual clarity."
  },
  {
    id: 76,
    ar: "الْبَاطِنُ",
    bn: "আল-বাত্বিন",
    en: "Al-Batin",
    transliteration: "Al-Batin",
    meanBn: "গুপ্ত, অদৃশ্য ও অন্তরের খবর জান্তা",
    meanEn: "The Hidden, The Knower of Secret",
    virtueBn: "দিনে ৩৩ বার পাঠ করলে অন্তরের গোপন সত্য ও আধ্যাত্মিক প্রজ্ঞা লাভ হয়।",
    virtueEn: "Reciting 33 times daily opens inner wisdom and intuition."
  },
  {
    id: 77,
    ar: "الْوَالِي",
    bn: "আল-ওয়ালী",
    en: "Al-Wali",
    transliteration: "Al-Wali",
    meanBn: "পরম শাসক, সমস্ত সৃষ্টির কর্মবিধায়ক",
    meanEn: "The Governor, The Sole Ruler",
    virtueBn: "ঘরের সুরক্ষায় বা বিপদ থেকে বাঁচতে এই নাম পাঠ করলে আল্লাহর পাহারা মেলে।",
    virtueEn: "Reciting safeguards home and family from unexpected calamities."
  },
  {
    id: 78,
    ar: "الْمُتَعَالِي",
    bn: "আল-মুতা'আলী",
    en: "Al-Muta'ali",
    transliteration: "Al-Muta'ali",
    meanBn: "সর্বোচ্চ মহিমান্বিত, সুউচ্চ মর্যাদাবান",
    meanEn: "The Supreme, The Most Exalted",
    virtueBn: "কঠিন সমস্যা বা রাজদরবারে যাওয়ার আগে পাঠ করলে সফলতা ও সম্মান মেলে।",
    virtueEn: "Reciting before authorities brings favor and positive outcomes."
  },
  {
    id: 79,
    ar: "الْبَرُّ",
    bn: "আল-বারর",
    en: "Al-Barr",
    transliteration: "Al-Barr",
    meanBn: "পরম উপকারী, অশেষ কল্যাণময়",
    meanEn: "The Source of All Goodness, The Benign",
    virtueBn: "সন্তানের সুন্দর চরিত্র ও সুরক্ষার জন্য এই নাম পাঠ করে দোয়া করা অত্যন্ত ফলপ্রসূ।",
    virtueEn: "Reciting over children safeguards them and instills righteousness."
  },
  {
    id: 80,
    ar: "التَّوَّابُ",
    bn: "আত-তাওয়াব",
    en: "At-Tawwab",
    transliteration: "At-Tawwab",
    meanBn: "তওবা কবুলকারী, ক্ষমাশীল",
    meanEn: "The Ever-Acceptor of Repentance",
    virtueBn: "চাশতের নামাজের পর ৩৬০ বার পাঠ করলে আল্লাহ খাঁটি তওবা করার তৌফিক দেন।",
    virtueEn: "Reciting 360 times after Duha prayer leads to sincere repentance."
  },
  {
    id: 81,
    ar: "الْمُنْتَقِمُ",
    bn: "আল-মুনতাক্বিম",
    en: "Al-Muntaqim",
    transliteration: "Al-Muntaqim",
    meanBn: "প্রতিশোধ গ্রহণকারী, অন্যায়ের শাস্তিদাতা",
    meanEn: "The Avenger, The Retaliator",
    virtueBn: "অত্যাচারী শত্রুর জুলুম থেকে রক্ষা পেতে আল্লাহর কাছে ইনসাফ চেয়ে এটি পাঠ করা হয়।",
    virtueEn: "Reciting protects the innocent from relentless tyrants."
  },
  {
    id: 82,
    ar: "الْعَفُوُّ",
    bn: "আল-আফুউ",
    en: "Al-Afuww",
    transliteration: "Al-Afuww",
    meanBn: "পরম মার্জনা কারী, পাপ মুছে দেওয়াকারী",
    meanEn: "The Supreme Pardoner, The Effacer of Sins",
    virtueBn: "শবে কদরে বা প্রতিদিন ক্ষমা প্রার্থনায় 'আল্লাহুম্মা ইন্নাকা আফুউউন...' পাঠ অতি উত্তম।",
    virtueEn: "The essential prayer on Laylatul Qadr for complete pardon of sins."
  },
  {
    id: 83,
    ar: "الرَّؤُوفُ",
    bn: "আর-রউফ",
    en: "Ar-Ra'uf",
    transliteration: "Ar-Ra'uf",
    meanBn: "পরম স্নেহশীল, অতি সদয়",
    meanEn: "The Most Kind, The Tenderly Merciful",
    virtueBn: "রাগ দমনে এবং মানুষের ভালোবাসা ও সহানুভূতি পেতে ১০ বার পাঠ করা উপকারী।",
    virtueEn: "Reciting 10 times softens anger and brings affection from others."
  },
  {
    id: 84,
    ar: "مَالِكُ الْمُلْكِ",
    bn: "মালিকুল মুলক",
    en: "Malikul-Mulk",
    transliteration: "Malikul-Mulk",
    meanBn: "সার্বভৌম ক্ষমতার অধিকারী, রাজ্যের মালিক",
    meanEn: "The Master of the Kingdom, Owner of All",
    virtueBn: "নিয়মিত পাঠ করলে আল্লাহ বান্দাকে সম্মান ও অমুখাপেক্ষিতা দান করেন।",
    virtueEn: "Reciting regularly grants dignity, wealth, and self-esteem."
  },
  {
    id: 85,
    ar: "ذُو الْجَلَالِ وَالْإِكْرَامِ",
    bn: "যুল জালালি ওয়াল ইকরাম",
    en: "Dhul-Jalali wal-Ikram",
    transliteration: "Dhul-Jalali wal-Ikram",
    meanBn: "মহিমা ও মহানুভবতার পরম অধিকারী",
    meanEn: "Lord of Majesty and Bounty",
    virtueBn: "দোয়ার শুরুতে এই নাম বেশি বেশি পাঠ করলে দোয়া দ্রুত কবুল হয়।",
    virtueEn: "Reciting frequently in supplication ensures prayers are answered."
  },
  {
    id: 86,
    ar: "الْمُقْسِطُ",
    bn: "আল-মুক্বসিত্ব",
    en: "Al-Muqsit",
    transliteration: "Al-Muqsit",
    meanBn: "ন্যায়পরায়ণ, ইনসাফ প্রতিষ্ঠাকারী",
    meanEn: "The Equitable, The Just",
    virtueBn: "মনের সন্দেহ ও ওয়াসওয়াসা দূর করতে প্রতিদিন ১০০ বার পাঠ করা উপকারী।",
    virtueEn: "Reciting 100 times daily removes negative doubts and brings harmony."
  },
  {
    id: 87,
    ar: "الْجَامِعُ",
    bn: "আল-জামিই'",
    en: "Al-Jami",
    transliteration: "Al-Jami",
    meanBn: "একত্রকারী, হাশরের ময়দানে সমবেতকারী",
    meanEn: "The Gatherer, The Uniter",
    virtueBn: "হারানো বস্তু বা বিচ্ছিন্ন আত্মীয়-স্বজনের মিলনের উদ্দেশ্যে পাঠ করলে সুফল মেলে।",
    virtueEn: "Reciting helps reunite estranged families and recover lost things."
  },
  {
    id: 88,
    ar: "الْغَنِيُّ",
    bn: "আল-গণিয়্যু",
    en: "Al-Ghaniyy",
    transliteration: "Al-Ghaniyy",
    meanBn: "অমুখাপেক্ষী, পরম ধনী ও অভাবমুক্ত",
    meanEn: "The Self-Sufficient, The Wealthy",
    virtueBn: "দেনা বা ঋণমুক্তি এবং আর্থিক সচ্ছলতার জন্য প্রতিদিন ৭০ বার পাঠ উপকারী।",
    virtueEn: "Reciting 70 times daily helps relieve debts and financial distress."
  },
  {
    id: 89,
    ar: "الْمُغْنِيُّ",
    bn: "আল-মুগণী",
    en: "Al-Mughni",
    transliteration: "Al-Mughni",
    meanBn: "সমৃদ্ধি দানকারী, অভাব মোচনকারী",
    meanEn: "The Enricher, The Bestower of Wealth",
    virtueBn: "ফজরের পর ১০০০ বার বা ১১১১ বার পাঠ করলে আল্লাহ অভাবনীয় প্রাচুর্য দান করেন।",
    virtueEn: "Reciting 1000 times brings spiritual and material enrichment."
  },
  {
    id: 90,
    ar: "الْمَانِعُ",
    bn: "আল-মানিই'",
    en: "Al-Mani",
    transliteration: "Al-Mani",
    meanBn: "প্রতিরোধকারী, ক্ষতির পথ বন্ধকারী",
    meanEn: "The Withholder, The Shielder from Harm",
    virtueBn: "পারিবারিক কলহ ও খারাপ মানুষের অনিষ্ট থেকে বাঁচতে পাঠ করা উপকারী।",
    virtueEn: "Reciting protects family from harm and prevents negative outcomes."
  },
  {
    id: 91,
    ar: "الضَّارُّ",
    bn: "আদ-দ্বরর",
    en: "Ad-Darr",
    transliteration: "Ad-Darr",
    meanBn: "ক্ষতি করার ক্ষমতার মালিক (পরীক্ষা স্বরূপ)",
    meanEn: "The Creator of Harm (for wisdom and testing)",
    virtueBn: "শনিবার রাতে ১০০ বার পাঠ করলে বিপদ-আপদ ও বালা-মুসিবত থেকে রক্ষা মেলে।",
    virtueEn: "Reciting 100 times protects from worldly trials and calamities."
  },
  {
    id: 92,
    ar: "النَّافِعُ",
    bn: "আন-নাফিই'",
    en: "An-Nafi",
    transliteration: "An-Nafi",
    meanBn: "কল্যাণকারী, উপকার ও মঙ্গলের উৎস",
    meanEn: "The Benefactor, The Source of Good",
    virtueBn: "কোনো কাজের শুরুতে ৪১ বার পাঠ করলে কাজে বরকত ও সাফল্য লাভ হয়।",
    virtueEn: "Reciting 41 times before starting tasks ensures benefit and success."
  },
  {
    id: 93,
    ar: "النُّورُ",
    bn: "আন-নূর",
    en: "An-Nur",
    transliteration: "An-Nur",
    meanBn: "পরম আলো, আসমান ও জমিনের জ্যোতি",
    meanEn: "The Light, The Illuminator",
    virtueBn: "সূরা নূরের আয়াতের সাথে এই নাম পাঠ করলে চেহারা ও অন্তরে নূর সৃষ্টি হয়।",
    virtueEn: "Reciting illuminates the heart, mind, and countenance with divine light."
  },
  {
    id: 94,
    ar: "الْهَادِي",
    bn: "আল-হাদী",
    en: "Al-Hadi",
    transliteration: "Al-Hadi",
    meanBn: "পথপ্রদর্শক, হেদায়েত ও সত্যের দিশারী",
    meanEn: "The Guide, The Leader to the Right Path",
    virtueBn: "সত্য ও সঠিক পথের দিশা পেতে হাত তুলে এই নাম পাঠ করে দোয়া করা উপকারী।",
    virtueEn: "Reciting grants guidance, clarity, and spiritual direction."
  },
  {
    id: 95,
    ar: "الْبَدِيعُ",
    bn: "আল-বাদীই'",
    en: "Al-Badi",
    transliteration: "Al-Badi",
    meanBn: "অভিনব স্রষ্টা, অনুপম সৃষ্টির উদ্ভাবক",
    meanEn: "The Incomparable Originator",
    virtueBn: "কঠিন বিপদে 'ইয়া বাদীআ'স সামাওয়াতি ওয়াল আরদ' পাঠ করলে আল্লাহ মুক্তি দেন।",
    virtueEn: "Reciting 70 times solves apparently impossible crises and sorrows."
  },
  {
    id: 96,
    ar: "الْبَاقِي",
    bn: "আল-বাক্বী",
    en: "Al-Baqi",
    transliteration: "Al-Baqi",
    meanBn: "চিরস্থায়ী, অবিনশ্বর ও অনন্ত",
    meanEn: "The Everlasting, The Eternal",
    virtueBn: "প্রতিদিন ১০০ বার পাঠ করলে নেক আমল ও সম্পদ স্থায়ী হয় এবং ক্ষতি থেকে বাঁচা যায়।",
    virtueEn: "Reciting 100 times daily safeguards good deeds and lawful wealth."
  },
  {
    id: 97,
    ar: "الْوَارِثُ",
    bn: "আল-ওয়ারিস",
    en: "Al-Warith",
    transliteration: "Al-Warith",
    meanBn: "উত্তরাধিকারী, সবকিছুর শেষ মালিক",
    meanEn: "The Supreme Inheritor of All",
    virtueBn: "সূর্যোদয়ের সময় ১০০ বার পাঠ করলে দুঃখ-কষ্ট দূর হয় ও জীবনে প্রশান্তি আসে।",
    virtueEn: "Reciting 100 times at sunrise brings peace and protection from sorrow."
  },
  {
    id: 98,
    ar: "الرَّشِيدُ",
    bn: "আর-রশীদ",
    en: "Ar-Rashid",
    transliteration: "Ar-Rashid",
    meanBn: "সঠিক পথের নির্দেশক, পরম বিচক্ষণ",
    meanEn: "The Guide to Right Path, The Infallible Teacher",
    virtueBn: "মাগরিব ও এশার মাঝখানে ১০০০ বার পাঠ করলে কাজে সঠিক সিদ্ধান্ত নেওয়ার প্রজ্ঞা আসে।",
    virtueEn: "Reciting between Maghrib and Isha grants infallible wisdom in decisions."
  },
  {
    id: 99,
    ar: "الصَّبُورُ",
    bn: "আস-সবুর",
    en: "As-Sabur",
    transliteration: "As-Sabur",
    meanBn: "পরম ধৈর্যশীল, অতি সহনশীল",
    meanEn: "The Most Patient, The Ever-Enduring",
    virtueBn: "সূর্যোদয়ের আগে ১০০ বার পাঠ করলে বিপদ-আপদে ধৈর্য ধারণের শক্তি ও শান্তি মেলে।",
    virtueEn: "Reciting 100 times before sunrise grants immense patience and inner calm."
  }
];

export default function AsmaulHusnaView() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedName, setSelectedName] = useState<AllahName | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("aldawah_allah_names_fav");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  // Toggle favorite
  const toggleFavorite = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("aldawah_allah_names_fav", JSON.stringify(next));
      } catch (err) {
        console.error("Failed to save favorites", err);
      }
      return next;
    }
    );
  };

  // Pronounce audio
  const speakName = (item: AllahName, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSpeakingId(item.id);
    playIslamicAudio(
      item.ar,
      "ar",
      () => setSpeakingId(item.id),
      () => setSpeakingId(null)
    );
  };

  // Filter names
  const filteredNames = useMemo(() => {
    return ASMAUL_HUSNA_99.filter((item) => {
      const matchesFav = showFavoritesOnly ? favorites.includes(item.id) : true;
      if (!matchesFav) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      return (
        item.ar.includes(q) ||
        item.bn.toLowerCase().includes(q) ||
        item.en.toLowerCase().includes(q) ||
        item.transliteration.toLowerCase().includes(q) ||
        item.meanBn.toLowerCase().includes(q) ||
        item.meanEn.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, showFavoritesOnly, favorites]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-gold-lux/30 rounded-2xl p-5 sm:p-7 text-center relative overflow-hidden shadow-lg">
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-gold-lux/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-lux/15 border border-gold-lux/30 text-gold-lux text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          {language === "bn" ? "আসমাউল হুসনা (৯৯ নাম)" : "Asmaul Husna (99 Names)"}
        </span>

        <h3 className="text-2xl sm:text-3xl font-serif-lux font-bold text-white mb-2">
          {language === "bn"
            ? "আল্লাহ তাআলার ৯৯টি গুণবাচক পবিত্র নাম"
            : "99 Beautiful Names of Almighty Allah"}
        </h3>
        <p className="text-sm text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
          {language === "bn"
            ? "রাসূলুল্লাহ (সা.) বলেছেন: 'নিশ্চয়ই আল্লাহর ৯৯টি নাম রয়েছে, যে ব্যক্তি এগুলো মুখস্থ করবে ও উপলব্ধি করবে সে জান্নাতে প্রবেশ করবে।' (সহীহ বুখারী: ২৭৩৬)"
            : "The Prophet (PBUH) said: 'Allah has ninety-nine names; whoever memorizes and understands them will enter Paradise.' (Sahih Bukhari: 2736)"}
        </p>

        {/* Search & Filter Toolbar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-950/70 border border-gold-lux/20 p-2.5 rounded-2xl">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gold-lux/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "bn"
                  ? "নাম বা অর্থ দিয়ে খুঁজুন (যেমন: রহমান, দয়ালু)..."
                  : "Search name or meaning (e.g. Rahman, Merciful)..."
              }
              className="w-full pl-10 pr-4 py-2 bg-emerald-900/60 border border-gold-lux/20 rounded-xl text-white text-xs placeholder-gray-400 focus:outline-none focus:border-gold-lux"
            />
          </div>

          {/* Buttons Group */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                showFavoritesOnly
                  ? "bg-red-900/60 border-red-400 text-red-200"
                  : "bg-emerald-900/40 border-gold-lux/20 text-gray-300 hover:border-gold-lux/50"
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  showFavoritesOnly ? "fill-red-400 text-red-400" : "text-gray-400"
                }`}
              />
              {language === "bn"
                ? `পছন্দের তালিকা (${favorites.length})`
                : `Favorites (${favorites.length})`}
            </button>

            <div className="flex items-center bg-emerald-900/50 border border-gold-lux/20 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-gold-lux text-emerald-950 font-bold" : "text-gray-400 hover:text-white"
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "list" ? "bg-gold-lux text-emerald-950 font-bold" : "text-gray-400 hover:text-white"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Info */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-1">
        <span>
          {language === "bn"
            ? `মোট প্রদর্শিত নাম: ${filteredNames.length} টি / ৯৯ টি`
            : `Showing: ${filteredNames.length} of 99 Names`}
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-gold-lux hover:underline"
          >
            {language === "bn" ? "ফিল্টার মুছুন" : "Clear Filter"}
          </button>
        )}
      </div>

      {/* Names Grid / List */}
      {filteredNames.length === 0 ? (
        <div className="text-center py-12 bg-emerald-950/40 border border-gold-lux/20 rounded-2xl">
          <Info className="w-8 h-8 text-gold-lux/60 mx-auto mb-2" />
          <p className="text-sm font-bold text-white">
            {language === "bn"
              ? "কোনো নাম পাওয়া যায়নি।"
              : "No names found matching your search."}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredNames.map((item) => {
            const isFav = favorites.includes(item.id);
            const isSpeaking = speakingId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedName(item)}
                className="group relative bg-emerald-950/80 hover:bg-emerald-900/80 border border-gold-lux/20 hover:border-gold-lux/50 rounded-2xl p-4 text-center transition-all cursor-pointer shadow-sm hover:shadow-gold-lux/10 flex flex-col justify-between"
              >
                {/* Number badge & Favorite */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="w-6 h-6 rounded-full bg-gold-lux/10 border border-gold-lux/30 flex items-center justify-center text-[11px] font-bold text-gold-lux">
                    {item.id}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => speakName(item, e)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        isSpeaking
                          ? "bg-gold-lux text-emerald-950"
                          : "text-gray-400 hover:text-gold-lux hover:bg-gold-lux/10"
                      }`}
                      title={language === "bn" ? "উচ্চারণ শুনুন" : "Listen pronunciation"}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        isFav
                          ? "text-red-400 bg-red-900/30"
                          : "text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                      }`}
                      title={language === "bn" ? "পছন্দে রাখুন" : "Favorite"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-red-400" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Arabic Calligraphy */}
                <div className="my-2 py-2">
                  <span className="text-2xl sm:text-3xl font-serif-lux font-bold text-gold-lux block group-hover:scale-105 transition-transform">
                    {item.ar}
                  </span>
                </div>

                {/* Bengali & English Name */}
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {language === "bn" ? item.bn : item.en}
                  </h4>
                  <p className="text-[11px] text-gray-300 line-clamp-2">
                    {language === "bn" ? item.meanBn : item.meanEn}
                  </p>
                </div>

                {/* Click hint */}
                <div className="mt-3 pt-2 border-t border-gold-lux/10 text-[10px] text-gold-lux/80 group-hover:text-gold-lux flex items-center justify-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{language === "bn" ? "ফজিলত ও বিবরণ দেখুন" : "View virtues"}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-2">
          {filteredNames.map((item) => {
            const isFav = favorites.includes(item.id);
            const isSpeaking = speakingId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedName(item)}
                className="bg-emerald-950/80 hover:bg-emerald-900/80 border border-gold-lux/20 hover:border-gold-lux/50 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-4 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="w-7 h-7 rounded-full bg-gold-lux/10 border border-gold-lux/30 flex items-center justify-center text-xs font-bold text-gold-lux shrink-0">
                    {item.id}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">
                        {language === "bn" ? item.bn : item.en}
                      </h4>
                      <span className="text-xs text-gray-400">({item.transliteration})</span>
                    </div>
                    <p className="text-xs text-gray-300">
                      {language === "bn" ? item.meanBn : item.meanEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <span className="text-2xl sm:text-3xl font-serif-lux font-bold text-gold-lux">
                    {item.ar}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => speakName(item, e)}
                      className={`p-2 rounded-full transition-colors cursor-pointer ${
                        isSpeaking
                          ? "bg-gold-lux text-emerald-950"
                          : "text-gray-400 hover:text-gold-lux hover:bg-gold-lux/10"
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className={`p-2 rounded-full transition-colors cursor-pointer ${
                        isFav
                          ? "text-red-400 bg-red-900/30"
                          : "text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "fill-red-400" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Detail View */}
      {selectedName && (
        <div
          onClick={() => setSelectedName(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-emerald-950 to-emerald-900 border border-gold-lux/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-center space-y-5"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-gold-lux/20 pb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-lux/15 border border-gold-lux/30 text-gold-lux text-xs font-bold">
                {language === "bn" ? `পবিত্র নাম নম্বর: ${selectedName.id}` : `Name Number: ${selectedName.id}`}
              </span>
              <button
                onClick={() => setSelectedName(null)}
                className="w-8 h-8 rounded-full bg-emerald-900 border border-gold-lux/30 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Arabic Big Display */}
            <div className="py-4 bg-emerald-950/60 border border-gold-lux/20 rounded-2xl relative">
              <span className="text-4xl sm:text-5xl font-serif-lux font-bold text-gold-lux block mb-2">
                {selectedName.ar}
              </span>
              <h3 className="text-xl font-bold text-white">
                {language === "bn" ? selectedName.bn : selectedName.en}
              </h3>
              <p className="text-xs text-gray-400">{selectedName.transliteration}</p>

              <button
                onClick={(e) => speakName(selectedName, e)}
                className="absolute right-4 bottom-4 px-3 py-1.5 rounded-full bg-gold-lux text-emerald-950 font-bold text-xs flex items-center gap-1.5 hover:bg-yellow-400 transition-colors cursor-pointer shadow-md"
              >
                <Volume2 className="w-3.5 h-3.5" />
                {language === "bn" ? "উচ্চারণ শুনুন" : "Pronounce"}
              </button>
            </div>

            {/* Meaning Card */}
            <div className="bg-emerald-900/50 border border-gold-lux/20 rounded-2xl p-4 text-left space-y-1.5">
              <span className="text-xs font-bold text-gold-lux uppercase block">
                {language === "bn" ? "নামের অর্থ (Meaning)" : "Meaning"}
              </span>
              <p className="text-sm sm:text-base font-bold text-white">
                {language === "bn" ? selectedName.meanBn : selectedName.meanEn}
              </p>
            </div>

            {/* Virtue / Fazilat Card */}
            <div className="bg-emerald-900/40 border border-gold-lux/20 rounded-2xl p-4 text-left space-y-2">
              <span className="text-xs font-bold text-gold-lux uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-lux" />
                {language === "bn" ? "আমলের ফজিলত ও উপকারিতা" : "Virtues & Benefits of Recitation"}
              </span>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {language === "bn" ? selectedName.virtueBn : selectedName.virtueEn}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={(e) => toggleFavorite(selectedName.id, e)}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  favorites.includes(selectedName.id)
                    ? "bg-red-900/60 border-red-400 text-red-200"
                    : "bg-emerald-900/60 border-gold-lux/30 text-gray-300 hover:border-gold-lux"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(selectedName.id) ? "fill-red-400" : ""
                  }`}
                />
                {favorites.includes(selectedName.id)
                  ? (language === "bn" ? "পছন্দে আছে" : "In Favorites")
                  : (language === "bn" ? "পছন্দে রাখুন" : "Add to Favorites")}
              </button>

              <button
                onClick={() => setSelectedName(null)}
                className="px-6 py-2.5 rounded-xl bg-gold-lux text-emerald-950 font-bold text-xs hover:bg-yellow-400 transition-colors cursor-pointer shadow-md"
              >
                {language === "bn" ? "বন্ধ করুন" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
