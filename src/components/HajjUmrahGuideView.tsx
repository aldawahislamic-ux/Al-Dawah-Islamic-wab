import React, { useState } from "react";
import {
  Compass,
  CheckCircle2,
  Circle,
  Volume2,
  BookOpen,
  MapPin,
  ChevronRight,
  ChevronDown,
  Info,
  ShieldCheck,
  Heart,
  Share2
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playIslamicAudio } from "../lib/islamicAudio";

interface GuideStep {
  id: number;
  titleBn: string;
  titleEn: string;
  locationBn: string;
  locationEn: string;
  summaryBn: string;
  summaryEn: string;
  detailsBn: string[];
  detailsEn: string[];
  arabicDua?: string;
  duaTitleBn?: string;
  duaTitleEn?: string;
  duaMeaningBn?: string;
  duaMeaningEn?: string;
}

const UMRAH_STEPS: GuideStep[] = [
  {
    id: 1,
    titleBn: "১. ইহরাম ও নিয়ত (মিকাত)",
    titleEn: "1. Ihram & Niyyah (Miqat)",
    locationBn: "মিকাত (নির্ধারিত সীমা)",
    locationEn: "Miqat (Designated Boundary)",
    summaryBn: "গোসল বা অজু করে ইহরামের পোশাক পরিধান ও উমরাহর নিয়ত করা।",
    summaryEn: "Purify oneself, wear Ihram garments, and make the intention for Umrah.",
    detailsBn: [
      "পুরুষদের জন্য সেলাইবিহীন দুটি সাদা চাদর পরিধান করা এবং মহিলাদের জন্য স্বাভাবিক শালীন পোশাক পরিধান করা।",
      "মিকাত অতিক্রম করার পূর্বেই উমরাহর নিয়ত করা এবং তালবিয়া পাঠ শুরু করা।",
      "ইহরাম অবস্থায় সুগন্ধি ব্যবহার, চুল-নখ কাটা, ঝগড়া-বিবাদ এবং শিকার করা সম্পূর্ণ নিষিদ্ধ।"
    ],
    detailsEn: [
      "Men wear two unstitched white garments; women wear standard modest attire.",
      "Make the intention for Umrah before crossing Miqat and begin reciting Talbiyah.",
      "While in Ihram, perfume, clipping nails/hair, hunting, and arguments are forbidden."
    ],
    arabicDua: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ",
    duaTitleBn: "তালবিয়া (ইহরামের বিশেষ দোয়া)",
    duaTitleEn: "The Talbiyah (Prayer of Ihram)",
    duaMeaningBn: "আমি হাজির হে আল্লাহ! আমি হাজির! আপনার কোন শরীক নেই, আমি হাজির! নিশ্চয়ই সকল প্রশংসা, নেয়ামত ও রাজত্ব আপনারই; আপনার কোন শরীক নেই।",
    duaMeaningEn: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Truly all praise, favor and sovereignty belong to You. You have no partner."
  },
  {
    id: 2,
    titleBn: "২. কা'বা শরিফের তাওয়াফ (৭ চক্কর)",
    titleEn: "2. Tawaf of the Holy Kaabah (7 Rounds)",
    locationBn: "মসজিদুল হারাম (মক্কা)",
    locationEn: "Masjid al-Haram (Makkah)",
    summaryBn: "হাজরে আসওয়াদ (কালো পাথর) থেকে শুরু করে কা'বার চারদিকে ৭ বার প্রদক্ষিণ করা।",
    summaryEn: "Start from Al-Hajar Al-Aswad and circumambulate the Kaabah 7 times counter-clockwise.",
    detailsBn: [
      "হাজরে আসওয়াদ বা তার বরাবর সবুজ লাইনে দাঁড়িয়ে 'বিসমিল্লাহি আল্লাহু আকবার' বলে তাওয়াফ শুরু করা।",
      "পুরুষগণ প্রথম ৩ চক্করে রমল (বীরদর্পে দ্রুত হাঁটা) করবেন এবং ডান কাঁধ খোলা রাখবেন (ইজতিবা)।",
      "রুকনে ইয়ামানি ও হাজরে আসওয়াদের মধ্যবর্তী স্থানে বিশেষ মাসনুন দোয়া পাঠ করা।"
    ],
    detailsEn: [
      "Begin Tawaf facing the Black Stone by saying 'Bismillahi Allahu Akbar'.",
      "Men perform Raml (brisk walking) in the first 3 rounds and leave right shoulder uncovered.",
      "Between Rukn Yamani and Al-Hajar Al-Aswad, recite the traditional supplication."
    ],
    arabicDua: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    duaTitleBn: "রুকনে ইয়ামানি ও হাজরে আসওয়াদের মধ্যবর্তী দোয়া",
    duaTitleEn: "Supplication between Rukn Yamani and Black Stone",
    duaMeaningBn: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দান করুন এবং আখিরাতেও কল্যাণ দান করুন এবং আমাদেরকে জাহান্নামের আজাব থেকে রক্ষা করুন।",
    duaMeaningEn: "Our Lord, give us in this world that which is good and in the Hereafter that which is good, and protect us from the punishment of the Fire."
  },
  {
    id: 3,
    titleBn: "৩. তাওয়াফের নামাজ ও জমজমের পানি",
    titleEn: "3. Tawaf Prayer & Zamzam Water",
    locationBn: "মাকামে ইব্রাহিম ও জমজম পয়েন্ট",
    locationEn: "Maqam Ibrahim & Zamzam Area",
    summaryBn: "তাওয়াফ শেষে মাকামে ইব্রাহিমের পিছনে ২ রাকাত নামাজ আদায় এবং জমজমের পানি পান করা।",
    summaryEn: "Pray 2 Rakah behind Maqam Ibrahim and drink blessed Zamzam water.",
    detailsBn: [
      "সম্ভব হলে মাকামে ইব্রাহিমের পিছনে, নতুবা মসজিদের যেকোনো স্থানে ২ রাকাত নফল নামাজ পড়া।",
      "প্রথম রাকাতে সূরা কাফিরুন এবং দ্বিতীয় রাকাতে সূরা ইখলাস পড়া উত্তম।",
      "নামাজ শেষে পেট ভরে জমজমের পানি পান করা এবং কল্যাণকর দোয়া করা।"
    ],
    detailsEn: [
      "Pray 2 Rakah behind Maqam Ibrahim if possible, or anywhere in the mosque.",
      "Recite Surah Al-Kafirun in 1st Rakah and Surah Al-Ikhlas in 2nd Rakah.",
      "Drink Zamzam water generously and make sincere supplications."
    ],
    arabicDua: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ",
    duaTitleBn: "জমজমের পানি পানের দোয়া",
    duaTitleEn: "Dua while drinking Zamzam",
    duaMeaningBn: "হে আল্লাহ! আমি আপনার কাছে উপকারী জ্ঞান, প্রশস্ত রিজিক এবং সকল রোগ থেকে আরোগ্য প্রার্থনা করছি।",
    duaMeaningEn: "O Allah, I ask You for beneficial knowledge, abundant provision, and healing from every illness."
  },
  {
    id: 4,
    titleBn: "৪. সাঈ (সাফা ও মারওয়া পাহাড়ে ৭ বার হাঁটা)",
    titleEn: "4. Sa'i (7 Trips between Safa & Marwah)",
    locationBn: "সাফা ও মারওয়া পাহাড়",
    locationEn: "Safa & Marwah Hills",
    summaryBn: "সাফা পাহাড় থেকে শুরু করে মারওয়া পাহাড়ে গিয়ে শেষ হওয়া ৭টি চক্কর সম্পন্ন করা।",
    summaryEn: "Walk 7 lengths starting from Safa hill and ending at Marwah hill.",
    detailsBn: [
      "সাফা পাহাড়ে উঠে কা'বার দিকে মুখ করে আল্লাহু আকবার বলা এবং দোয়া করা।",
      "সাফা থেকে মারওয়া ১ চক্কর, মারওয়া থেকে সাফা ২ চক্কর—এভাবে মারওয়ায় ৭ম চক্কর শেষ হবে।",
      "সবুজ বাতি চিহ্নিত স্থানে পুরুষদের একটু দ্রুত দৌড়ে পার হওয়া সুন্নাত।"
    ],
    detailsEn: [
      "Ascend Safa hill, face the Kaabah, praise Allah and make supplication.",
      "Safa to Marwah is 1 trip, Marwah back to Safa is 2nd trip—ending 7th at Marwah.",
      "Men jog briskly between the green light markers."
    ],
    arabicDua: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ",
    duaTitleBn: "সাঈ শুরুর কুরআনি আয়াত",
    duaTitleEn: "Quranic Verse when starting Sa'i",
    duaMeaningBn: "নিশ্চয়ই সাফা ও মারওয়া আল্লাহর নিদর্শনসমূহের অন্তর্ভুক্ত।",
    duaMeaningEn: "Indeed, Safa and Marwah are among the symbols of Allah."
  },
  {
    id: 5,
    titleBn: "৫. মাথা মুণ্ডন বা চুল ছোট করা (হালাক/কসর)",
    titleEn: "5. Shaving or Shortening Hair (Halaq/Qasr)",
    locationBn: "মক্কা শরিফ",
    locationEn: "Makkah",
    summaryBn: "পুরুষদের মাথা মুণ্ডন বা চুল ছোট করা এবং মহিলাদের চুলের অগ্রভাগ ১ ইঞ্চি কাটা।",
    summaryEn: "Men shave head or shorten hair; women cut a fingertip length of hair.",
    detailsBn: [
      "পুরুষদের জন্য সম্পূর্ণ মাথার চুল মুণ্ডন করা (হালাক) উত্তম, তবে ছোট করলেও (কসর) চলবে।",
      "মহিলাদের জন্য মাথার সব চুলের প্রান্তভাগ থেকে আঙুলের এক কর পরিমাণ কাটা যথেষ্ট।",
      "চুল কাটার মাধ্যমে ইহরামের সকল বিধি-নিষেধ সমাপ্ত হয় এবং উমরাহ সম্পন্ন হয়। আলহামদুলিল্লাহ!"
    ],
    detailsEn: [
      "Shaving the head completely (Halaq) is more virtuous for men, or shortening evenly.",
      "Women cut approximately an inch from the ends of their hair.",
      "This concludes Ihram restrictions and completes Umrah. Alhamdulillah!"
    ]
  }
];

const HAJJ_STEPS: GuideStep[] = [
  {
    id: 1,
    titleBn: "১. ৮ জিলহজ: ইহরাম বেঁধে মিনায় গমন (ইয়ামুত তারবিয়া)",
    titleEn: "1. 8th Dhul-Hijjah: Ihram & Departure to Mina",
    locationBn: "মিনা (তাঁবুর শহর)",
    locationEn: "Mina (The City of Tents)",
    summaryBn: "মক্কা থেকে ইহরাম বেঁধে মিনায় উপস্থিত হওয়া এবং সেখানে ৫ ওয়াক্ত নামাজ আদায় করা।",
    summaryEn: "Enter Ihram in Makkah and travel to Mina, performing 5 daily prayers there.",
    detailsBn: [
      "৮ জিলহজ সকালে ইহরাম বেঁধে তালবিয়া পড়তে পড়তে মিনার উদ্দেশ্যে রওয়ানা হওয়া।",
      "মিনায় জোহর, আসর, মাগরিব, এশা এবং ৯ জিলহজ ফজর—মোট ৫ ওয়াক্ত নামাজ স্ব-স্ব সময়ে আদায় করা।",
      "মিনায় অবস্থানকালে তালবিয়া, জিকির ও কুরআন তেলাওয়াতে মশগুল থাকা।"
    ],
    detailsEn: [
      "On 8 Dhul-Hijjah morning, put on Ihram and head to Mina reciting Talbiyah.",
      "Pray Dhuhr, Asr, Maghrib, Isha and 9th Fajr at Mina in their respective times.",
      "Spend the day and night in worship, dhikr, and Quran recitation."
    ],
    arabicDua: "لَبَّيْكَ اللَّهُمَّ حَجًّا",
    duaTitleBn: "হজের নিয়ত ও তালবিয়া",
    duaTitleEn: "Niyyah for Hajj & Talbiyah",
    duaMeaningBn: "হে আল্লাহ! আমি হজের নিয়তে আপনার দরবারে হাজির হয়েছি।",
    duaMeaningEn: "Here I am, O Allah, for Hajj."
  },
  {
    id: 2,
    titleBn: "২. ৯ জিলহজ: আরাফাতের ময়দানে অবস্থান (হজের মূল রুকন)",
    titleEn: "2. 9th Dhul-Hijjah: The Day of Arafah (Core of Hajj)",
    locationBn: "আরাফাতের ময়দান",
    locationEn: "Plain of Arafah",
    summaryBn: "হজের সবচেয়ে গুরুত্বপূর্ণ দিন—সূর্যাস্ত পর্যন্ত আরাফাতের ময়দানে অবস্থান ও চোখের পানিতে দোয়া।",
    summaryEn: "The most vital pillar of Hajj—standing at Arafah until sunset with intense prayer.",
    detailsBn: [
      "৯ জিলহজ সকালে মিনা থেকে আরাফাতের ময়দানে গমন করা। আরাফাতে অবস্থানই হজ।",
      "জোহর ও আসরের নামাজ একত্রে আদায় করা এবং সূর্যাস্ত পর্যন্ত কিবলামুখী হয়ে অশ্রুসিক্ত নয়নে আল্লাহর কাছে ক্ষমা প্রার্থনা করা।",
      "এই দিন আল্লাহ তাআলা সর্বাধিক বান্দাকে জাহান্নাম থেকে মুক্তি দেন।"
    ],
    detailsEn: [
      "Travel from Mina to Arafah after sunrise. Standing in Arafah is the essence of Hajj.",
      "Engage in profound supplication facing Qibla until sunset without leaving the boundary.",
      "Allah forgives more souls on this day than any other day of the year."
    ],
    arabicDua: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    duaTitleBn: "আরাফাতের দিনের সর্বশ্রেষ্ঠ জিকির",
    duaTitleEn: "Best Dhikr on the Day of Arafah",
    duaMeaningBn: "আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই, তিনি একক, তাঁর কোনো শরীক নেই। রাজত্ব তাঁরই, প্রশংসা তাঁরই এবং তিনি সর্ববিষয়ে সর্বশক্তিমান।",
    duaMeaningEn: "There is no deity worthy of worship except Allah alone, without partner. To Him belongs sovereignty and praise, and He is over all things omnipotent."
  },
  {
    id: 3,
    titleBn: "৩. ৯ জিলহজ রাত: মুজদালিফায় রাত্রিযাপন ও পাথর সংগ্রহ",
    titleEn: "3. Night of 9th Dhul-Hijjah: Muzdalifah & Pebbles",
    locationBn: "মুজদালিফা (খোলা আকাশ)",
    locationEn: "Muzdalifah (Open Sky)",
    summaryBn: "আরাফাত থেকে সূর্যাস্তের পর মুজদালিফায় গিয়ে মাগরিব ও এশা একত্রে পড়া এবং কঙ্কর সংগ্রহ করা।",
    summaryEn: "After sunset, move to Muzdalifah, combine Maghrib & Isha, collect pebbles, and stay the night.",
    detailsBn: [
      "আরাফাত থেকে মাগরিব না পড়ে মুজদালিফায় পৌঁছে মাগরিব ও এশা একত্রে (কসরসহ) পড়া।",
      "খোলা আকাশের নিচে রাত কাটানো এবং শয়তানকে মারার জন্য ছোলা বা বুট সাইজের ছোট ছোট কঙ্কর (পাথর) সংগ্রহ করা (কমপক্ষে ৪৯ বা ৭০টি)।",
      "১০ জিলহজ ফজরের নামাজ পড়ে আল্লাহর জিকির করা এবং সূর্যোদয়ের পূর্বে মিনার দিকে রওয়ানা হওয়া।"
    ],
    detailsEn: [
      "Arrive at Muzdalifah and pray Maghrib and Isha combined.",
      "Sleep under the open sky and collect pea-sized pebbles (minimum 49 or 70 pebbles).",
      "After Fajr prayer on 10th Dhul-Hijjah, make dhikr and depart for Mina before sunrise."
    ]
  },
  {
    id: 4,
    titleBn: "৪. ১০ জিলহজ: বড় শয়তানকে পাথর মারা, কোরবানি ও মাথা মুণ্ডন",
    titleEn: "4. 10th Dhul-Hijjah: Jamarat, Qurbani & Shaving",
    locationBn: "মিনা ও জামারাত",
    locationEn: "Mina & Jamarat",
    summaryBn: "ঈদের দিন বড় শয়তানকে ৭টি পাথর মারা, কোরবানি করা এবং মাথা মুণ্ডন করে ইহরাম খোলা।",
    summaryEn: "Stone Jamrat al-Aqabah (7 pebbles), offer sacrifice (Qurbani), and shave head to exit Ihram.",
    detailsBn: [
      "মিনায় পৌঁছে শুধুমাত্র বড় জামারায় (জামারাতুল আকাবা) ৭টি কঙ্কর নিক্ষেপ করা। প্রতিটি পাথরে 'আল্লাহু আকবার' বলা।",
      "পাথর মারার পর কোরবানি সম্পন্ন করা (দমে শুকর)।",
      "কোরবানির পর মাথা মুণ্ডন (হালাক) বা চুল ছোট করে ইহরাম খুলে স্বাভাবিক কাপড় পরা (প্রথম হালাল)।"
    ],
    detailsEn: [
      "Stone only the largest pillar (Jamrat al-Aqabah) with 7 pebbles, saying 'Allahu Akbar' each time.",
      "After stoning, perform the animal sacrifice (Qurbani).",
      "Shave or shorten hair to exit first Ihram restrictions (Tahallul al-Asghar)."
    ],
    arabicDua: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ، رَجْمًا لِلشَّيَاطِينِ وَرِضًى لِلرَّحْمَٰنِ",
    duaTitleBn: "কঙ্কর নিক্ষেপের দোয়া",
    duaTitleEn: "Dua while Stoning Jamarat",
    duaMeaningBn: "আল্লাহর নামে, আল্লাহ সর্বশ্রেষ্ঠ। শয়তানকে লাঞ্ছিত করতে এবং দয়াময় আল্লাহর সন্তুষ্টির উদ্দেশ্যে।",
    duaMeaningEn: "In the name of Allah, Allah is the Greatest. To humiliate Satan and please the Most Gracious."
  },
  {
    id: 5,
    titleBn: "৫. ১০-১২ জিলহজ: তাওয়াফে জিয়ারত ও আইয়ামে তাশরীকের পাথর মারা",
    titleEn: "5. 10-12th Dhul-Hijjah: Tawaf al-Ifadah & Stoning",
    locationBn: "মক্কা ও মিনা",
    locationEn: "Makkah & Mina",
    summaryBn: "হজের ফরজ তাওয়াফ (তাওয়াফে জিয়ারত) সম্পন্ন করা এবং মিনায় ৩ দিন ৩ শয়তানকে পাথর মারা।",
    summaryEn: "Perform the obligatory Tawaf al-Ifadah and stone all 3 pillars across Mina days.",
    detailsBn: [
      "১০ থেকে ১২ জিলহজের মধ্যে মক্কায় গিয়ে কা'বা শরিফের ফরজ তাওয়াফ (তাওয়াফে জিয়ারত) ও সাফা-মারওয়া সাঈ করা। এর মাধ্যমে স্বামী-স্ত্রী সম্পর্কসহ সব হালাল হয়ে যায়।",
      "১১ ও ১২ জিলহজ মিনায় অবস্থান করে প্রতিদিন দুপুরে সূর্য হেলার পর ছোট, মধ্যম ও বড়—তিন শয়তানকেই ৭টি করে মোট ২১টি পাথর মারা।",
      "১২ জিলহজ সূর্যাস্তের পূর্বে মিনা ত্যাগ করা অথবা ১৩ তারিখ পর্যন্ত থেকে পাথর মেরে হজ সম্পন্ন করা।"
    ],
    detailsEn: [
      "Perform obligatory Tawaf al-Ifadah and Sa'i in Makkah between 10-12 Dhul-Hijjah.",
      "On 11th & 12th Dhul-Hijjah afternoon, stone all 3 pillars (7 pebbles each = 21 daily).",
      "Depart Mina before sunset on 12th or stay for 13th Dhul-Hijjah."
    ]
  },
  {
    id: 6,
    titleBn: "৬. বিদায়ী তাওয়াফ (তাওয়াফে বিদা)",
    titleEn: "6. Farewell Tawaf (Tawaf al-Wida)",
    locationBn: "মসজিদুল হারাম (মক্কা)",
    locationEn: "Masjid al-Haram (Makkah)",
    summaryBn: "মক্কা ত্যাগ করে নিজ দেশে ফেরার পূর্বে কা'বা শরিফের বিদায়ী তাওয়াফ সম্পন্ন করা।",
    summaryEn: "Before departing Makkah for your homeland, perform the farewell Tawaf.",
    detailsBn: [
      "মক্কা থেকে নিজের দেশে বা মদিনায় রওয়ানা হওয়ার পূর্বে কা'বার ৭ চক্কর বিদায়ী তাওয়াফ করা (ইহরাম ছাড়া স্বাভাবিক পোশাকে)।",
      "এই তাওয়াফে কোনো রমল বা সাঈ নেই। তাওয়াফ শেষে ২ রাকাত নামাজ পড়ে জমজমের পানি পান করা।",
      "কা'বার দিকে তাকিয়ে অশ্রুসিক্ত নয়নে পুনরায় বাইতুল্লাহ জিয়ারতের দোয়া করে মক্কা ত্যাগ করা।"
    ],
    detailsEn: [
      "Before leaving Makkah, perform 7 rounds of Tawaf as your final act in the Holy City.",
      "No Raml or Sa'i is required. Pray 2 Rakah and drink Zamzam water.",
      "Depart with gratitude, praying to return to Allah's Sacred House again."
    ]
  }
];

export default function HajjUmrahGuideView() {
  const { t, language } = useLanguage();
  const isBn = language === "bn";

  const [activeTab, setActiveTab] = useState<"umrah" | "hajj">("umrah");
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [playingStepId, setPlayingStepId] = useState<number | null>(null);

  const steps = activeTab === "umrah" ? UMRAH_STEPS : HAJJ_STEPS;

  const toggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePlayDua = (step: GuideStep, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!step.arabicDua) return;

    setPlayingStepId(step.id);
    playIslamicAudio(
      step.arabicDua,
      "ar",
      () => setPlayingStepId(step.id),
      () => setPlayingStepId(null)
    );
  };

  return (
    <div className="w-full bg-emerald-deep/95 rounded-3xl border border-gold-lux/30 p-4 sm:p-6 md:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-lux/10 border border-gold-lux/30 text-gold-lux text-xs font-semibold uppercase tracking-widest mb-3">
          <Compass className="w-3.5 h-3.5 text-gold-lux animate-spin-slow" />
          <span>{isBn ? "পবিত্র হজ ও উমরাহ গাইডলাইন" : "Holy Hajj & Umrah Guide"}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif-lux text-white font-light tracking-wide mb-2">
          {isBn ? "সহীহ সুন্নাহ অনুযায়ী হজ ও উমরাহ পালনের নিয়ম" : "Authentic Step-by-Step Hajj & Umrah Guide"}
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
          {isBn
            ? "কুরআন ও সহীহ হাদিসের আলোকে উমরাহ এবং হজের প্রতিটি ধাপের সহজ নিয়ম, মাসনুন দোয়া ও আরবি উচ্চারণ শুনুন।"
            : "Complete visual and audio guide for performing Umrah and Hajj according to the Quran and authentic Sunnah."}
        </p>
      </div>

      {/* Tabs: Umrah vs Hajj */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => {
            setActiveTab("umrah");
            setExpandedStep(1);
          }}
          className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer border flex items-center justify-center gap-2 ${
            activeTab === "umrah"
              ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-lg shadow-gold-lux/30"
              : "bg-emerald-900/60 text-gray-300 border-gold-lux/20 hover:border-gold-lux/50"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>{isBn ? "উমরাহ গাইড (৫ ধাপ)" : "Umrah Guide (5 Steps)"}</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("hajj");
            setExpandedStep(1);
          }}
          className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer border flex items-center justify-center gap-2 ${
            activeTab === "hajj"
              ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-lg shadow-gold-lux/30"
              : "bg-emerald-900/60 text-gray-300 border-gold-lux/20 hover:border-gold-lux/50"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isBn ? "হজ গাইড (৬ ধাপ)" : "Hajj Guide (6 Steps)"}</span>
        </button>
      </div>

      {/* Progress Counter */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-emerald-950/80 border border-gold-lux/20 mb-6 text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gold-lux" />
          <span>
            {isBn
              ? `${completedSteps.length} / ${steps.length} টি ধাপ সম্পন্ন হয়েছে`
              : `${completedSteps.length} of ${steps.length} Steps Completed`}
          </span>
        </div>
        <button
          onClick={() => setCompletedSteps([])}
          className="text-[11px] text-gold-lux hover:underline cursor-pointer"
        >
          {isBn ? "রিসেট করুন" : "Reset Progress"}
        </button>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step) => {
          const isExpanded = expandedStep === step.id;
          const isCompleted = completedSteps.includes(step.id);
          const isPlaying = playingStepId === step.id;

          return (
            <div
              key={step.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? "bg-emerald-900/70 border-gold-lux shadow-xl"
                  : "bg-emerald-950/70 border-gold-lux/20 hover:border-gold-lux/40"
              }`}
            >
              {/* Step Title Header */}
              <div
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleComplete(step.id, e)}
                    title={isBn ? "সম্পন্ন হিসেবে চিহ্নিত করুন" : "Mark completed"}
                    className="cursor-pointer text-gold-lux transition-transform hover:scale-110"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-gold-lux fill-gold-lux/20" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white font-sans">
                      {isBn ? step.titleBn : step.titleEn}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[11px] text-gold-lux mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {isBn ? step.locationBn : step.locationEn}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180 text-gold-lux" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Step Expanded Content */}
              {isExpanded && (
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-gold-lux/15 space-y-4">
                  {/* Summary */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-gold-lux/20">
                    <p className="text-xs sm:text-sm text-gold-lux font-medium leading-relaxed">
                      {isBn ? step.summaryBn : step.summaryEn}
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      {isBn ? "করণীয় ও গুরুত্বপূর্ণ নিয়মাবলী:" : "Key Rules & Actions:"}
                    </h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-gray-200 font-sans">
                      {(isBn ? step.detailsBn : step.detailsEn).map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-gold-lux mt-1">•</span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arabic Dua Box (If Present) */}
                  {step.arabicDua && (
                    <div className="p-4 rounded-2xl bg-emerald-950 border border-gold-lux/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gold-lux uppercase tracking-wider">
                          {isBn ? step.duaTitleBn : step.duaTitleEn}
                        </span>
                        <button
                          onClick={(e) => handlePlayDua(step, e)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                            isPlaying
                              ? "bg-gold-lux text-emerald-950 border-gold-lux animate-pulse"
                              : "bg-emerald-900/80 text-gold-lux border-gold-lux/30 hover:bg-emerald-800"
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isBn ? "আরবি উচ্চারণ শুনুন" : "Listen Arabic"}</span>
                        </button>
                      </div>

                      <p className="text-xl sm:text-2xl font-serif-lux text-gold-lux text-center leading-loose py-2" dir="rtl">
                        {step.arabicDua}
                      </p>

                      <p className="text-xs text-emerald-100 font-sans text-center leading-relaxed italic border-t border-gold-lux/10 pt-2">
                        "{isBn ? step.duaMeaningBn : step.duaMeaningEn}"
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
