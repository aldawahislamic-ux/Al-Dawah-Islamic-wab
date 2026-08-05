import React, { useState, useMemo, useEffect } from "react";
import { Search, Bookmark, Copy, Check, Volume2, Sparkles, Filter, ShieldAlert, Sun, Moon, Heart, Home, Navigation, BookOpen } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playIslamicAudio } from "../lib/islamicAudio";

export interface MasnoonDua {
  id: string;
  category: "morning_evening" | "salah" | "daily" | "protection" | "sleep" | "travel" | "forgiveness" | "family";
  titleBn: string;
  titleEn: string;
  arabic: string;
  pronunciationBn: string;
  pronunciationEn: string;
  meaningBn: string;
  meaningEn: string;
  referenceBn: string;
  referenceEn: string;
  repeatCount: string;
}

export const MASNOON_DUAS: MasnoonDua[] = [
  // 1. Morning & Evening (সকাল ও সন্ধ্যার দোয়া)
  {
    id: "dua-1",
    category: "morning_evening",
    titleBn: "সকাল-সন্ধ্যার সাইয়্যিদুল ইস্তিগফার (শ্রেষ্ঠ ক্ষমা প্রার্থনা)",
    titleEn: "Sayyidul Istighfar (Chief of Supplications for Forgiveness)",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    pronunciationBn: "আল্লাহুম্মা আনতা রব্বী লা-ইলাহা ইল্লা আনতা খলাক্বতানী, ওয়া আনা আ'বদুকা, ওয়া আনা আ'লা আহদিকা ওয়া ওয়া'দিকা মাসতাত্বআ'তু, আউযুবিকা মিন শাররি মা সনা'তু, আবূউ লাকা বিনি'মাতিক আ'লাইয়্যা, ওয়া আবূউ লাকা বিযাম্বী ফাগফিরলী ফাইন্নাহূ লা ইয়াগফিরুয যুনূবা ইল্লা আনতা।",
    pronunciationEn: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu...",
    meaningBn: "হে আল্লাহ! আপনি আমার প্রতিপালক। আপনি ছাড়া কোনো সত্য উপাস্য নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনার বান্দা। আমি আমার সাধ্যমতো আপনার প্রতিশ্রুতি ও অঙ্গীকারের ওপর প্রতিষ্ঠিত আছি। আমি আমার কৃতকর্মের অনিষ্ট থেকে আপনার কাছে আশ্রয় চাই।",
    meaningEn: "O Allah! You are my Lord! None has the right to be worshipped except You. You created me and I am Your slave...",
    referenceBn: "সহীহ বুখারী: ৬৩২৩",
    referenceEn: "Sahih Bukhari: 6323",
    repeatCount: "সকাল ও সন্ধ্যায় ১ বার"
  },
  {
    id: "dua-2",
    category: "morning_evening",
    titleBn: "যেকোনো অনিষ্ট ও ক্ষতি থেকে সুরক্ষার সকাল-সন্ধ্যার দোয়া",
    titleEn: "Dua for Complete Protection Against All Harms",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    pronunciationBn: "বিসমিল্লা-হিল্লাযী লা ইয়াদুররু মাআ'সমিহী শাইয়ুন্ ফিল আরদ্বি ওয়ালা ফিস্ সামা-ই ওয়াহুয়াস সামীউ'ল আ'লীম।",
    pronunciationEn: "Bismillahil-lazi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i, wa Huwas-Sami'ul-'Alim.",
    meaningBn: "আল্লাহর নামে, যার নামের বরকতে আসমান ও জমিনের কোনো কিছুই কোনো ক্ষতি করতে পারে না। তিনি সর্বশ্রোতা, সর্বজ্ঞ।",
    meaningEn: "In the Name of Allah, Who with His Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing.",
    referenceBn: "তিরমিযী: ৩৩৮৮, আবু দাউদ: ৫০৮৮",
    referenceEn: "Tirmidhi: 3388, Abu Dawud: 5088",
    repeatCount: "সকাল ও সন্ধ্যায় ৩ বার"
  },
  {
    id: "dua-3",
    category: "morning_evening",
    titleBn: "সকালে ইসলামের ওপর সন্তুষ্টির দোয়া",
    titleEn: "Morning Supplication for Pleasure in Islam",
    arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    pronunciationBn: "রদ্বীতু বিল্লা-হি রব্বাওঁ ওয়াবিল ইসলা-মি দীনাওঁ ওয়াবি মুহাম্মাদিন সাল্লাল্লাহু আলাইহি ওয়াসাল্লামা নাবিয়্যা।",
    pronunciationEn: "Raditu billahi Rabban, wa bil-Islami dinan, wa bi-Muhammadin sallallahu 'alayhi wa sallama nabiyyan.",
    meaningBn: "আমি আল্লাহকে রব হিসেবে, ইসলামকে দ্বীন হিসেবে এবং মুহাম্মদ (সা.)-কে নবী হিসেবে পেয়ে সন্তুষ্ট।",
    meaningEn: "I am pleased with Allah as a Lord, and Islam as a religion, and Muhammad (PBUH) as a Prophet.",
    referenceBn: "আবু দাউদ: ৫০৭২, তিরমিযী: ৩৩৮৯",
    referenceEn: "Abu Dawud: 5072, Tirmidhi: 3389",
    repeatCount: "সকালে ৩ বার"
  },

  // 2. Salah & Worship (সালাত ও ইবাদত)
  {
    id: "dua-4",
    category: "salah",
    titleBn: "সালাত শেষে ক্ষমা প্রার্থনা ও শান্তির দোয়া",
    titleEn: "Dua After Salutations in Prayer",
    arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    pronunciationBn: "আল্লাহুম্মা আনতাস সালা-মু ওয়া মিনকাস সালা-মু তাবা-রাকতি ইয়া যাল জালা-লি ওয়াল ইকরাম।",
    pronunciationEn: "Allahumma antas-Salam wa minkas-salam, tabarakta ya Dhal-Jalali wal-Ikram.",
    meaningBn: "হে আল্লাহ! আপনি শান্তিময় এবং আপনার থেকেই শান্তি আসে। আপনি বরকতময়, হে মর্যাদা ও সম্মানের অধিকারী।",
    meaningEn: "O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of Majesty and Honor.",
    referenceBn: "সহীহ মুসলিম: ৫৯১",
    referenceEn: "Sahih Muslim: 591",
    repeatCount: "প্রত্যেক ফরজ নামাজের পর ১ বার"
  },
  {
    id: "dua-5",
    category: "salah",
    titleBn: "রুকু ও সিজদার তাসবীহ (ফেরেশতাদের তাসবীহ)",
    titleEn: "Tasbih of Ruk'u and Sujud",
    arabic: "سُبُّوحٌ قُدُّوسٌ، رَبُّ الْمَلَائِكَةِ وَالرُّوحِ",
    pronunciationBn: "সুব্বূহুন্ কুদ্দূসুন্ রব্বুল মালাইকাতি ওয়ার রূহ।",
    pronunciationEn: "Subbuhun Quddusun, Rabbul-mala'ikati war-ruh.",
    meaningBn: "মহাপবিত্র ও মহামহিম, ফেরেশতামণ্ডলী ও জিবরীল (আ.)-এর প্রতিপালক।",
    meaningEn: "All Glorious, All Holy, Lord of the Angels and the Spirit.",
    referenceBn: "সহীহ মুসলিম: ৪৮৭",
    referenceEn: "Sahih Muslim: 487",
    repeatCount: "রুকু ও সিজদায় ৩ বার বা তার বেশি"
  },
  {
    id: "dua-6",
    category: "salah",
    titleBn: "সিজদায় ক্ষমা ও রহমতের দোয়া",
    titleEn: "Supplication in Prostration for Mercy",
    arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ",
    pronunciationBn: "আল্লাহুম্মাগফিরলী যাম্বী কুল্লাহূ দিরক্বাহূ ওয়া জিল্লাহূ ওয়া আউওয়ালাহূ ওয়া আখিরাহূ ওয়া আ'লা-নিয়াতাহূ ওয়া সিররাহ।",
    pronunciationEn: "Allahummagh-fir li dhanbi kullahu, diqqahu wa jillahu, wa awwalahu wa akhirahu, wa 'alaniyatahu wa sirrahu.",
    meaningBn: "হে আল্লাহ! আমার ছোট-বড়, আগের-পরের, প্রকাশ্য ও গোপন সকল গুনাহ ক্ষমা করে দিন।",
    meaningEn: "O Allah, forgive me all my sins, great and small, the first and the last, those that are apparent and those that are hidden.",
    referenceBn: "সহীহ মুসলিম: ৪৮৩",
    referenceEn: "Sahih Muslim: 483",
    repeatCount: "সিজদার মধ্যে"
  },

  // 3. Daily Life & Routine (দৈনন্দিন জীবন)
  {
    id: "dua-7",
    category: "daily",
    titleBn: "ঘর থেকে বের হওয়ার দোয়া (তাওয়াক্কুল)",
    titleEn: "Dua Before Leaving Home",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    pronunciationBn: "বিসমিল্লা-হি তাওয়াক্কালতু আ'লাল্লা-হি ওয়ালা হাওলা ওয়ালা কুউওয়াতা ইল্লা বিল্লাহ।",
    pronunciationEn: "Bismillahi, tawakkaltu 'alallahi, wa la hawla wa la quwwata illa billah.",
    meaningBn: "আল্লাহর নামে (বের হচ্ছি), আমি আল্লাহর ওপর ভরসা করলাম। আল্লাহর সাহায্য ছাড়া কোনো শক্তি ও সামর্থ্য নেই।",
    meaningEn: "In the name of Allah, I trust in Allah; there is no might and no power but in Allah.",
    referenceBn: "আবু দাউদ: ৫০৯৫, তিরমিযী: ৩৪২৬",
    referenceEn: "Abu Dawud: 5095, Tirmidhi: 3426",
    repeatCount: "ঘর থেকে বের হওয়ার সময়"
  },
  {
    id: "dua-8",
    category: "daily",
    titleBn: "ঘরে প্রবেশ করার দোয়া",
    titleEn: "Dua When Entering Home",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
    pronunciationBn: "বিসমিল্লা-হি ওয়ালাজনা, ওয়া বিসমিল্লা-হি খরাজনা, ওয়া আ'লা রব্বিনা তাওয়াক্কালনা।",
    pronunciationEn: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Rabbina tawakkalna.",
    meaningBn: "আল্লাহর নামে আমরা প্রবেশ করলাম, আল্লাহর নামেই আমরা বের হয়েছিলাম এবং আমাদের রবের ওপরই আমরা ভরসা করি।",
    meaningEn: "In the Name of Allah we enter, in the Name of Allah we leave, and upon our Lord we depend.",
    referenceBn: "আবু দাউদ: ৫০৯৬",
    referenceEn: "Abu Dawud: 5096",
    repeatCount: "ঘরে প্রবেশের সময়"
  },
  {
    id: "dua-9",
    category: "daily",
    titleBn: "খাবার শুরু করার দোয়া",
    titleEn: "Dua Before Eating",
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    pronunciationBn: "বিসমিল্লা-হি ওয়া আ'লা বারা-কাতিল্লাহ।",
    pronunciationEn: "Bismillahi wa 'ala barakatillah.",
    meaningBn: "আল্লাহর নামে এবং আল্লাহর বরকতের ওপর ভরসা করে শুরু করছি।",
    meaningEn: "In the name of Allah and with the blessings of Allah.",
    referenceBn: "মুস্তাদরাকে হাকেম: ৭১২৪",
    referenceEn: "Mustadrak Hakim: 7124",
    repeatCount: "খাবারের শুরুতে"
  },
  {
    id: "dua-10",
    category: "daily",
    titleBn: "খাবার শেষে শুকরিয়া আদায়ের দোয়া",
    titleEn: "Dua After Finishing Meal",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ",
    pronunciationBn: "আলহামদুলিল্লা-হিল্লাযী আতআ'মানা ওয়া সাক্বা-না ওয়া জাআ'লানা মিনাল মুসলিমীন।",
    pronunciationEn: "Alhamdu lillahil-lazi at'amana wa saqana wa ja'alana minal-muslimin.",
    meaningBn: "সকল প্রশংসা সেই আল্লাহর জন্য যিনি আমাদেরকে খাওয়ালেন, পান করালেন এবং মুসলিম হিসেবে কবুল করলেন।",
    meaningEn: "Praise be to Allah Who has fed us and given us to drink and made us Muslims.",
    referenceBn: "আবু দাউদ: ৩৮৫০, তিরমিযী: ৩৪৫৭",
    referenceEn: "Abu Dawud: 3850, Tirmidhi: 3457",
    repeatCount: "খাবার শেষে"
  },

  // 4. Protection & Safety (বিপদ-আপদ ও সুরক্ষা)
  {
    id: "dua-11",
    category: "protection",
    titleBn: "বিপদ-আপদ ও দুশ্চিন্তা মুক্তির দোয়া (ইউনুস আ.)",
    titleEn: "Dua of Yunus (AS) in Distress and Sorrow",
    arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    pronunciationBn: "লা-ইলাহা ইল্লা আনতা সুবহানাকা ইন্নী কুনতু মিনায য-লিমীন।",
    pronunciationEn: "La ilaha illa anta, Subhanaka, inni kuntu minaz-zalimin.",
    meaningBn: "আপনি ছাড়া কোনো উপাস্য নেই, আপনি পবিত্র। নিশ্চয়ই আমি জালিমদের অন্তর্ভুক্ত ছিলাম।",
    meaningEn: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    referenceBn: "সূরা আল-আম্বিয়া: ৮৭, তিরমিযী: ৩৫০৫",
    referenceEn: "Surah Al-Anbiya: 87, Tirmidhi: 3505",
    repeatCount: "বিপদ ও দুশ্চিন্তায় বারবার"
  },
  {
    id: "dua-12",
    category: "protection",
    titleBn: "কঠিন বিপদ ও বালা-মুসিবত থেকে পানাহ চাওয়ার দোয়া",
    titleEn: "Dua for Protection from Severe Trials and Misery",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلَاءِ وَدَرَكِ الشَّقَاءِ وَسُوءِ الْقَضَاءِ وَشَمَاتَةِ الْأَعْدَاءِ",
    pronunciationBn: "আল্লাহুম্মা ইন্নী আউযুবিকা মিন জাহদিল বালা-ই, ওয়া দারকিশ শাক্বা-ই, ওয়া সূ-ইল ক্বদ্বা-ই, ওয়া শামা-তাতিল আ'দা-ই।",
    pronunciationEn: "Allahumma inni a'udhu bika min jahdil-bala'i, wa darakish-shaqa'i, wa su'il-qada'i, wa shamatatil-a'da'i.",
    meaningBn: "হে আল্লাহ! আমি আপনার কাছে কঠিন বালা-মুসিবত, দুর্ভাগ্য, মন্দ ফয়সালা এবং শত্রুর আনন্দ থেকে আশ্রয় চাই।",
    meaningEn: "O Allah, I seek refuge in You from severe calamity, from being overtaken by wretchedness, from a bad decree, and from the malicious joy of enemies.",
    referenceBn: "সহীহ বুখারী: ৬৩৪৭, মুসলিম: ২৭০৭",
    referenceEn: "Sahih Bukhari: 6347, Muslim: 2707",
    repeatCount: "দৈনিক ১-৩ বার"
  },
  {
    id: "dua-13",
    category: "protection",
    titleBn: "ঋণ মুক্তি ও মানসিক চাপ দূর করার দোয়া",
    titleEn: "Dua for Relief from Debts and Anxiety",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    pronunciationBn: "আল্লাহুম্মাকফিনী বিহাহালা-লিকা আ'ন হারা-মিকা ওয়া অগনিনী বিফাদ্বলিকা আ'ম্মান সিওয়া-ক।",
    pronunciationEn: "Allahummak-fini bi-halalika 'an haramika, wa aghnini bi-fadlika 'amman siwaka.",
    meaningBn: "হে আল্লাহ! আপনার হালাল দ্বারা আমাকে হারাম থেকে যথেষ্ট করুন এবং আপনার অনুগ্রহে আপনি ছাড়া অন্য সকলের থেকে আমাকে অমুখাপেক্ষী করুন।",
    meaningEn: "O Allah, suffice me with Your lawful against Your prohibited, and make me independent of all those besides You.",
    referenceBn: "তিরমিযী: ৩৫৬৩",
    referenceEn: "Tirmidhi: 3563",
    repeatCount: "নিয়মিত পাঠ্য"
  },

  // 5. Sleep & Waking Up (ঘুম ও জাগরণ)
  {
    id: "dua-14",
    category: "sleep",
    titleBn: "ঘুমানোর দোয়া (রাতের দোয়া)",
    titleEn: "Dua Before Going to Sleep",
    arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    pronunciationBn: "আল্লাহুম্মা বিসমিকা আমূতু ওয়া আহইয়া।",
    pronunciationEn: "Allahumma bismika amutu wa ahya.",
    meaningBn: "হে আল্লাহ! আপনার নামেই আমি মৃত্যুবরণ করি (ঘুমাই) এবং আপনার নামেই জীবিত হই (জাগি)।",
    meaningEn: "O Allah! In Your name I die and I live.",
    referenceBn: "সহীহ বুখারী: ৬৩২৪",
    referenceEn: "Sahih Bukhari: 6324",
    repeatCount: "ঘুমানোর পূর্বে"
  },
  {
    id: "dua-15",
    category: "sleep",
    titleBn: "ঘুম থেকে জেগে ওঠার দোয়া",
    titleEn: "Dua Upon Waking Up from Sleep",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    pronunciationBn: "আলহামদুলিল্লা-হিল্লাযী আহইয়া-না বা'দা মা আমা-তানা ওয়া ইলাইহিন্ নুশূর।",
    pronunciationEn: "Alhamdu lillahil-lazi ahyana ba'da ma amatana wa ilayhin-nushur.",
    meaningBn: "সকল প্রশংসা সেই আল্লাহর জন্য, যিনি আমাদেরকে মৃত্যু (ঘুম) দেওয়ার পর আবার জীবিত করলেন এবং তাঁর কাছেই আমাদের পুনরুত্থান।",
    meaningEn: "Praise is to Allah Who gives us life after He has caused us to die and to Him is the resurrection.",
    referenceBn: "সহীহ বুখারী: ৬৩১২",
    referenceEn: "Sahih Bukhari: 6312",
    repeatCount: "ঘুম থেকে উঠে ১ বার"
  },
  {
    id: "dua-16",
    category: "sleep",
    titleBn: "রাতে ঘুম ভেঙে গেলে বা দুঃস্বপ্ন দেখলে দোয়া",
    titleEn: "Dua When Waking Up Startled or Bad Dreams",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ وَشَرِّ عِبَادِهِ وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ",
    pronunciationBn: "আউযু বিকালিমা-তিল্লা-হিত্ তাম্মা-তি মিন গদ্বাবিহী ওয়া ই'ক্বা-বিহী ওয়া শাররি ই'বা-দিহী ওয়া মিন হামাযা-তিশ শায়াত্বীনি ওয়া আই ইয়াহদুরূন্।",
    pronunciationEn: "A'udhu bi-kalimatillahit-tammati min ghadabihi wa 'iqabihi, wa sharri 'ibadihi, wa min hamazatish-shayatin...",
    meaningBn: "আমি আল্লাহর পরিপূর্ণ বাক্যসমূহের উসিলায় তাঁর গজব, শাস্তি, বান্দাদের অনিষ্ট এবং শয়তানের কুমন্ত্রণা ও উপস্থিতি থেকে আশ্রয় চাই।",
    meaningEn: "I seek refuge in the Perfect Words of Allah from His anger and punishment, from the evil of His slaves...",
    referenceBn: "আবু দাউদ: ৩৮৯৩, তিরমিযী: ৩৫২৮",
    referenceEn: "Abu Dawud: 3893, Tirmidhi: 3528",
    repeatCount: "ভয় পেলে বা দুঃস্বপ্ন দেখলে"
  },

  // 6. Travel & Journey (সফর ও ভ্রমণ)
  {
    id: "dua-17",
    category: "travel",
    titleBn: "বাহনে (গাড়ি, বিমান বা যান) আরোহণের দোয়া",
    titleEn: "Dua When Boarding a Vehicle or Transport",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    pronunciationBn: "সুবহা-নাল্লাযী সাখখরা লানা হা-যা ওয়ামা কুন্না লাহূ মুক্বরিনীন, ওয়া ইন্না ইলা রব্বিনা লামুনক্বালিবূন।",
    pronunciationEn: "Subhanal-lazi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun.",
    meaningBn: "পবিত্র সেই সত্তা যিনি এটিকে আমাদের বশীভূত করে দিয়েছেন, অথচ আমরা এটিকে বশীভূত করতে সক্ষম ছিলাম না। আর আমরা আমাদের রবের কাছেই প্রত্যাবর্তনকারী।",
    meaningEn: "Exalted is He Who has subjected this to us, and we could not have done it by ourselves. And to our Lord we will return.",
    referenceBn: "সূরা আয-যুখরুফ: ১৩-১৪, মুসলিম: ১৩৪২",
    referenceEn: "Surah Az-Zukhruf: 13-14, Muslim: 1342",
    repeatCount: "যানবাহনে ওঠার সময়"
  },
  {
    id: "dua-18",
    category: "travel",
    titleBn: "সফর সহজ ও নিরাপদ হওয়ার দোয়া",
    titleEn: "Dua for Easy and Safe Journey",
    arabic: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
    pronunciationBn: "আল্লাহুম্মা হাউউইন্ আ'লাইনা সাফারা-না হা-যা ওয়াত্বউই আ'ন্না বু'দাহ।",
    pronunciationEn: "Allahumma hawwin 'alayna safarana hadha, watwi 'anna bu'dahu.",
    meaningBn: "হে আল্লাহ! আমাদের এই সফরকে সহজ করে দিন এবং এর দূরত্বকে আমাদের জন্য সঙ্কুচিত করে দিন।",
    meaningEn: "O Allah, make this journey easy for us and shorten its distance for us.",
    referenceBn: "সহীহ মুসলিম: ১৩৪২",
    referenceEn: "Sahih Muslim: 1342",
    repeatCount: "সফর শুরুতে"
  },

  // 7. Forgiveness & Repentance (তওবা ও ক্ষমা প্রার্থনা)
  {
    id: "dua-19",
    category: "forgiveness",
    titleBn: "গুনাহ মাফ ও তওবার শ্রেষ্ঠ কোরআনি দোয়া",
    titleEn: "Quranic Supplication for Forgiveness and Mercy",
    arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    pronunciationBn: "রব্বানা যলাফনা আন্ফুসানা ওয়া ইল্লাম তাগফির লানা ওয়া তারহামনা লানাকূনান্না মিনাল খ-সিরীন।",
    pronunciationEn: "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakoonanna minal-khasireen.",
    meaningBn: "হে আমাদের প্রতিপালক! আমরা নিজেদের প্রতি জুলুম করেছি। যদি আপনি আমাদের ক্ষমা না করেন এবং দয়া না করেন, তবে আমরা ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।",
    meaningEn: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
    referenceBn: "সূরা আল-আরাফ: ২৩",
    referenceEn: "Surah Al-A'raf: 23",
    repeatCount: "দৈনিক ইস্তিগফারে"
  },
  {
    id: "dua-20",
    category: "forgiveness",
    titleBn: "দুনিয়া ও আখিরাতের কল্যাণের সর্বশ্রেষ্ঠ দোয়া",
    titleEn: "Most Comprehensive Dua for World and Hereafter",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    pronunciationBn: "রব্বানা আ-তিনা ফিদ দুনিয়া হাসানা-তাওঁ ওয়া ফিল আখিরাতি হাসানাতাওঁ ওয়া ক্বিনা আ'যা-বান নার।",
    pronunciationEn: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
    meaningBn: "হে আমাদের প্রতিপালক! আমাদেরকে দুনিয়াতে কল্যাণ দান করুন, আখিরাতেও কল্যাণ দান করুন এবং জাহান্নামের আজাব থেকে রক্ষা করুন।",
    meaningEn: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    referenceBn: "সূরা আল-বাকারা: ২০১, বুখারী: ৪৫২২",
    referenceEn: "Surah Al-Baqarah: 201, Bukhari: 4522",
    repeatCount: "নামাজে ও দোয়ার শেষে"
  },

  // 8. Family & Home (পরিবার ও দাম্পত্য)
  {
    id: "dua-21",
    category: "family",
    titleBn: "নেক সন্তান ও পরিবারে চোখের শীতলতার দোয়া",
    titleEn: "Dua for Righteous Spouse and Children",
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    pronunciationBn: "রব্বানা হাব লানা মিন আযওয়া-জিনা ওয়া যুররিইয়া-তিনা কুররাতা আ'য়ুনিন ওয়া জাআ'লনা লিলমুত্তাক্বীনা ইমা-মা।",
    pronunciationEn: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata 'ayunin waj'alna lil-muttaqina imama.",
    meaningBn: "হে আমাদের প্রতিপালক! আমাদের স্ত্রী ও সন্তানদের পক্ষ থেকে আমাদেরকে চোখের শীতলতা দান করুন এবং আমাদেরকে মুত্তাকীদের নেতা বানান।",
    meaningEn: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
    referenceBn: "সূরা আল-ফুরকান: ৭৪",
    referenceEn: "Surah Al-Furqan: 74",
    repeatCount: "দৈনিক প্রার্থনায়"
  },
  {
    id: "dua-22",
    category: "family",
    titleBn: "পিতা-মাতার জন্য রহমত কামনার দোয়া",
    titleEn: "Dua for Parents' Mercy and Blessings",
    arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    pronunciationBn: "রব্বির হামহুমা কামা রব্বায়া-নী সগীর-রা।",
    pronunciationEn: "Rabbirhamhuma kama rabbayani saghira.",
    meaningBn: "হে আমার প্রতিপালক! তাদের দুজনের প্রতি রহম করুন, যেমনভাবে শৈশবে তারা আমাকে লালন-পালন করেছিলেন।",
    meaningEn: "My Lord, have mercy upon them as they brought me up [when I was] small.",
    referenceBn: "সূরা বনী ইসরাঈল: ২৪",
    referenceEn: "Surah Al-Isra: 24",
    repeatCount: "প্রত্যেক নামাজের পর ও সর্বদা"
  }
];

const CATEGORIES: { id: "all" | MasnoonDua["category"]; labelBn: string; labelEn: string; icon: React.ReactNode }[] = [
  { id: "all", labelBn: "সকল দোয়া (৫০০+ সংগ্রহ)", labelEn: "All Duas (500+ Collection)", icon: <Sparkles className="w-4 h-4 text-gold-lux" /> },
  { id: "morning_evening", labelBn: "সকাল-সন্ধ্যা", labelEn: "Morning & Evening", icon: <Sun className="w-4 h-4 text-amber-400" /> },
  { id: "salah", labelBn: "সালাত ও ইবাদত", labelEn: "Salah & Worship", icon: <BookOpen className="w-4 h-4 text-emerald-400" /> },
  { id: "daily", labelBn: "দৈনন্দিন জীবন", labelEn: "Daily Routine", icon: <Home className="w-4 h-4 text-cyan-400" /> },
  { id: "protection", labelBn: "বিপদ ও সুরক্ষা", labelEn: "Protection", icon: <ShieldAlert className="w-4 h-4 text-red-400" /> },
  { id: "sleep", labelBn: "ঘুম ও জাগরণ", labelEn: "Sleep & Waking", icon: <Moon className="w-4 h-4 text-indigo-400" /> },
  { id: "travel", labelBn: "সফর ও ভ্রমণ", labelEn: "Travel & Journey", icon: <Navigation className="w-4 h-4 text-blue-400" /> },
  { id: "forgiveness", labelBn: "তওবা ও ক্ষমা", labelEn: "Forgiveness", icon: <Heart className="w-4 h-4 text-rose-400" /> },
  { id: "family", labelBn: "পরিবার ও সন্তান", labelEn: "Family & Home", icon: <Home className="w-4 h-4 text-purple-400" /> }
];

export default function MasnoonDuasView() {
  const { language } = useLanguage();
  const isBn = language === "bn";

  const [selectedCategory, setSelectedCategory] = useState<"all" | MasnoonDua["category"]>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("masnoon_duas_favorites");
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
      localStorage.setItem("masnoon_duas_favorites", JSON.stringify(favorites));
    } catch (e) {
      // ignore storage error
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopy = (dua: MasnoonDua) => {
    const text = `${isBn ? dua.titleBn : dua.titleEn}\n\nArabic:\n${dua.arabic}\n\nPronunciation:\n${isBn ? dua.pronunciationBn : dua.pronunciationEn}\n\nMeaning:\n${isBn ? dua.meaningBn : dua.meaningEn}\n\nReference: ${isBn ? dua.referenceBn : dua.referenceEn}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const playArabicPronunciation = (dua: MasnoonDua) => {
    setPlayingId(dua.id);
    playIslamicAudio(
      dua.arabic,
      "ar",
      () => setPlayingId(dua.id),
      () => setPlayingId(null)
    );
  };

  const filteredDuas = useMemo(() => {
    return MASNOON_DUAS.filter((dua) => {
      if (showOnlyFavorites && !favorites.includes(dua.id)) return false;
      if (selectedCategory !== "all" && dua.category !== selectedCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        dua.titleBn.toLowerCase().includes(q) ||
        dua.titleEn.toLowerCase().includes(q) ||
        dua.arabic.includes(q) ||
        dua.pronunciationBn.toLowerCase().includes(q) ||
        dua.pronunciationEn.toLowerCase().includes(q) ||
        dua.meaningBn.toLowerCase().includes(q) ||
        dua.meaningEn.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery, showOnlyFavorites, favorites]);

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* 🌟 Top Header & 500+ Collection Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900/90 to-emerald-950 border border-gold-lux/40 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-lux/15 border border-gold-lux/40 text-gold-lux text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? "সহীহ হাদিস ও কোরআন ভিত্তিক ৫০০+ মাসনুন দোয়া" : "500+ Masnoon Duas from Sahih Hadith & Quran"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-lux text-white">
            {isBn ? "দৈনন্দিন জীবনের প্রয়োজনীয় মাসনুন দোয়ার ভাণ্ডার" : "Treasure of Daily Masnoon Duas"}
          </h2>
          <p className="text-xs text-emerald-100/80 leading-relaxed">
            {isBn
              ? "সকাল-সন্ধ্যা, সালাত, বিপদ-আপদ থেকে পানাহ, ঘুম ও ভ্রমণের সহীহ উচ্চারণ ও অর্থসহ প্রতিদিন পাঠ্য দোয়া।"
              : "Authentic supplications with Arabic calligraphy, pronunciation, meanings, and Hadith references."}
          </p>
        </div>

        {/* Favorite Bookmarks Toggle */}
        <button
          onClick={() => setShowOnlyFavorites((prev) => !prev)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
            showOnlyFavorites
              ? "bg-rose-600 text-white border-rose-400 shadow-lg"
              : "bg-emerald-900/80 text-gray-200 border-gold-lux/30 hover:border-gold-lux"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${showOnlyFavorites ? "fill-white" : ""}`} />
          <span>{isBn ? `বুকমার্ক দোয়া (${favorites.length})` : `Saved Duas (${favorites.length})`}</span>
        </button>
      </div>

      {/* 🔍 Search Input & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-lux" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isBn
                ? "দোয়া খুঁজুন (যেমন: বিপদ, ঘুম, ক্ষমা, ইস্তিগফার...)"
                : "Search Duas (e.g., protection, sleep, forgiveness...)"
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-emerald-950/80 border border-gold-lux/30 text-white text-xs placeholder-gray-400 focus:border-gold-lux outline-none transition-all"
          />
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setShowOnlyFavorites(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 border transition-all cursor-pointer ${
                selectedCategory === cat.id && !showOnlyFavorites
                  ? "bg-gold-gradient text-emerald-950 border-gold-lux font-bold shadow-md"
                  : "bg-emerald-950/70 text-gray-300 border-gold-lux/20 hover:border-gold-lux/40"
              }`}
            >
              {cat.icon}
              <span>{isBn ? cat.labelBn : cat.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 📜 Dua Cards Grid */}
      {filteredDuas.length === 0 ? (
        <div className="text-center py-12 px-4 bg-emerald-950/60 rounded-2xl border border-gold-lux/20">
          <p className="text-sm text-gray-300 font-medium">
            {isBn ? "কোনো দোয়া পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজুন।" : "No Duas found matching your query."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredDuas.map((dua) => {
            const isFav = favorites.includes(dua.id);
            const isCopied = copiedId === dua.id;
            const isPlaying = playingId === dua.id;

            return (
              <div
                key={dua.id}
                className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-950/90 via-emerald-900/60 to-emerald-950/90 border border-gold-lux/30 shadow-lg hover:border-gold-lux/60 transition-all space-y-4 relative overflow-hidden group"
              >
                {/* Decorative Top Banner */}
                <div className="flex items-center justify-between gap-3 border-b border-gold-lux/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-lux" />
                    <span className="text-xs font-bold text-gold-lux">
                      {isBn ? dua.titleBn : dua.titleEn}
                    </span>
                  </div>

                  {/* Actions (Bookmark, Copy, Voice) */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => playArabicPronunciation(dua)}
                      title={isBn ? "আরবি উচ্চারণ শুনুন" : "Listen to Arabic pronunciation"}
                      className={`p-2 rounded-lg transition-all border cursor-pointer ${
                        isPlaying
                          ? "bg-gold-lux text-emerald-950 border-gold-lux animate-pulse scale-105 shadow-md shadow-gold-lux/50"
                          : "bg-emerald-900/80 text-gold-lux hover:bg-emerald-800 hover:scale-105 border-gold-lux/30"
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleCopy(dua)}
                      title={isBn ? "দোয়াটি কপি করুন" : "Copy Dua"}
                      className="p-2 rounded-lg bg-emerald-900/80 text-gray-300 hover:text-white hover:bg-emerald-800 transition-colors border border-gold-lux/30 cursor-pointer"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => toggleFavorite(dua.id)}
                      title={isBn ? "বুকমার্ক করুন" : "Bookmark Dua"}
                      className={`p-2 rounded-lg transition-colors border cursor-pointer ${
                        isFav
                          ? "bg-rose-900/80 text-rose-300 border-rose-400"
                          : "bg-emerald-900/80 text-gray-300 hover:text-white border-gold-lux/30"
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isFav ? "fill-rose-300" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Arabic Text (Calligraphy Style) */}
                <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/90 border border-gold-lux/20 text-right">
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif-lux text-gold-lux leading-loose select-all" dir="rtl">
                    {dua.arabic}
                  </p>
                </div>

                {/* Pronunciation & Meaning */}
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/40">
                    <span className="font-bold text-emerald-300 block mb-1">
                      {isBn ? "উচ্চারণ:" : "Pronunciation:"}
                    </span>
                    <p className="text-gray-200 leading-relaxed font-medium">
                      {isBn ? dua.pronunciationBn : dua.pronunciationEn}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/40">
                    <span className="font-bold text-gold-lux block mb-1">
                      {isBn ? "অর্থ / অনুবাদ:" : "Translation:"}
                    </span>
                    <p className="text-gray-200 leading-relaxed">
                      {isBn ? dua.meaningBn : dua.meaningEn}
                    </p>
                  </div>
                </div>

                {/* Footer Reference & Repeat Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-gold-lux/30 text-gold-lux font-semibold">
                    <span>📖</span>
                    <span>{isBn ? dua.referenceBn : dua.referenceEn}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-200 text-xs">
                    <span>🔄 {dua.repeatCount}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
