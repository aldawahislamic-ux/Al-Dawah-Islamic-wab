import React, { useState } from "react";
import {
  BookOpen,
  Volume2,
  Share2,
  Heart,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Award,
  RefreshCw,
  Bookmark
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playIslamicAudio } from "../lib/islamicAudio";

/* 1. PROPHETS & SAHABAH BIOGRAPHY VIEW */
interface Biography {
  id: string;
  nameBn: string;
  nameEn: string;
  titleBn: string;
  titleEn: string;
  eraBn: string;
  eraEn: string;
  storyBn: string;
  storyEn: string;
  lessonBn: string;
  lessonEn: string;
}

const BIOGRAPHIES: Biography[] = [
  {
    id: "muhammad",
    nameBn: "হযরত মুহাম্মদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)",
    nameEn: "Prophet Muhammad (PBUH)",
    titleBn: "সর্বশেষ ও সর্বশ্রেষ্ঠ নবী, রহমাতুল্লিল আলামীন",
    titleEn: "The Final Messenger & Mercy to the Worlds",
    eraBn: "৫৭০ - ৬৩২ খ্রিস্টাব্দ (মক্কা ও মদিনা)",
    eraEn: "570 - 632 CE (Makkah & Madinah)",
    storyBn: "হযরত মুহাম্মদ (সা.) সমগ্র মানবজাতির হিদায়াতের জন্য প্রেরিত হয়েছেন। তিনি ৪০ বছর বয়সে হেরা গুহায় ওহী লাভ করেন এবং দীর্ঘ ২৩ বছর ধৈর্য ও ক্ষমার মাধ্যমে ইসলাম প্রচার করেন। তাঁর আখলাক ছিল জীবন্ত কুরআন।",
    storyEn: "Prophet Muhammad (PBUH) was sent as a guidance for all humanity. He received revelation at age 40 in Cave Hira and spent 23 years spreading Islam with unparalleled patience, character, and compassion.",
    lessonBn: "শিক্ষা: উত্তম চরিত্র, ক্ষমা, সততা এবং মানুষের প্রতি অকৃত্রিম ভালোবাসা।",
    lessonEn: "Lesson: Supreme character, forgiveness, honesty, and love for humanity."
  },
  {
    id: "ibrahim",
    nameBn: "হযরত ইব্রাহিম (আলাইহিস সালাম)",
    nameEn: "Prophet Ibrahim (AS)",
    titleBn: "খালিলুল্লাহ (আল্লাহর বন্ধু) ও জাতির পিতা",
    titleEn: "Khalilullah (Friend of Allah) & Father of Prophets",
    eraBn: "প্রাচীন মেসোপটেমিয়া ও মক্কা",
    eraEn: "Ancient Mesopotamia & Makkah",
    storyBn: "আল্লাহর একত্ববাদের জন্য তিনি মূর্তি পূজার বিরুদ্ধে রুখে দাঁড়ান এবং নমরুদের অগ্নিকুণ্ডে নিক্ষিপ্ত হয়েও আল্লাহর ওপর অটল ছিলেন। তাঁর ও তাঁর পুত্র ইসমাইল (আ.)-এর ত্যাগের স্মৃতি বহন করছে কাবা নির্মাণ ও কুরবানি।",
    storyEn: "He stood firmly for monotheism against King Nimrod and was thrown into fire which Allah made cool and safe. His sacrifice and building of the Kaabah remain pillars of faith.",
    lessonBn: "শিক্ষা: আল্লাহর ওপর পরিপূর্ণ তাওয়াক্কুল ও যেকোনো ত্যাগে প্রস্তুত থাকা।",
    lessonEn: "Lesson: Absolute trust in Allah and willingness to sacrifice everything for Him."
  },
  {
    id: "abubakr",
    nameBn: "হযরত আবু বকর সিদ্দিক (রাদিয়াল্লাহু আনহু)",
    nameEn: "Abu Bakr As-Siddiq (RA)",
    titleBn: "ইসলামের প্রথম খলিফা ও সত্যবাদী সাহাবী",
    titleEn: "1st Caliph of Islam & The Truthful",
    eraBn: "৫৭৩ - ৬৩৪ খ্রিস্টাব্দ",
    eraEn: "573 - 634 CE",
    storyBn: "পুরুষদের মধ্যে সর্বপ্রথম ইসলাম গ্রহণকারী সাহাবী। মিরাজের ঘটনা শুনে কোনো সন্দেহ ছাড়াই নবীজিকে বিশ্বাস করায় তিনি 'সিদ্দিক' উপাধি পান। হিজরতের কঠিন সফরে তিনি নবীজির একান্ত সঙ্গী ছিলেন।",
    storyEn: "The first adult male to accept Islam and the Prophet's closest companion during the Hijrah. Named As-Siddiq for instantly believing in Miraj without hesitation.",
    lessonBn: "শিক্ষা: নিঃশর্ত ঈমান, সত্যবাদিতা এবং ইসলামের জন্য সম্পদ ও জীবন উৎসর্গ।",
    lessonEn: "Lesson: Unwavering faith, loyalty, and generosity in Allah's cause."
  },
  {
    id: "umar",
    nameBn: "হযরত উমর ইবনুল খাত্তাব (রাদিয়াল্লাহু আনহু)",
    nameEn: "Umar ibn Al-Khattab (RA)",
    titleBn: "ইসলামের দ্বিতীয় খলিফা ও আল-ফারুক",
    titleEn: "2nd Caliph of Islam & Al-Farooq",
    eraBn: "৫৮৪ - ৬৪৪ খ্রিস্টাব্দ",
    eraEn: "584 - 644 CE",
    storyBn: "তাঁর ইসলাম গ্রহণে মুসলমানরা প্রকাশ্যে ইবাদত করার শক্তি পায়। খলিফা হওয়ার পর তিনি রাতের অন্ধকারে সাধারণ মানুষের কষ্ট নিজ চোখে দেখার জন্য মদিনার অলিগলিতে টহল দিতেন। ন্যায়বিচারের জন্য তিনি ইতিহাসে অমর।",
    storyEn: "His conversion gave Muslims strength to worship openly. As Caliph, he patrolled streets at night to check on the needy and established justice across vast lands.",
    lessonBn: "শিক্ষা: ন্যায়বিচার, দায়িত্ববোধ ও ক্ষমতার অহংকার থেকে মুক্ত থাকা।",
    lessonEn: "Lesson: Complete justice, humility, and dedication to public welfare."
  }
];

export function ProphetsSahabahView() {
  const { language } = useLanguage();
  const isBn = language === "bn";
  const [selectedBio, setSelectedBio] = useState<Biography>(BIOGRAPHIES[0]);

  return (
    <div className="w-full bg-emerald-deep/95 rounded-3xl border border-gold-lux/30 p-4 sm:p-6 text-white">
      <h3 className="text-xl sm:text-2xl font-serif-lux text-gold-lux text-center mb-4">
        {isBn ? "নবী ও সাহাবিদের অনুপ্রেরণাদায়ক জীবনী" : "Lives of Prophets & Sahabah"}
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {BIOGRAPHIES.map((bio) => (
          <button
            key={bio.id}
            onClick={() => setSelectedBio(bio)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              selectedBio.id === bio.id
                ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-md"
                : "bg-emerald-950/70 text-gray-300 border-gold-lux/20 hover:border-gold-lux/50"
            }`}
          >
            {isBn ? bio.nameBn : bio.nameEn}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-emerald-950/80 border border-gold-lux/30 space-y-3">
        <div>
          <h4 className="text-lg sm:text-xl font-bold text-white font-sans">
            {isBn ? selectedBio.nameBn : selectedBio.nameEn}
          </h4>
          <span className="text-xs text-gold-lux font-semibold block mt-1">
            {isBn ? selectedBio.titleBn : selectedBio.titleEn}
          </span>
          <span className="text-[11px] text-gray-400 block">
            {isBn ? selectedBio.eraBn : selectedBio.eraEn}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans border-t border-gold-lux/15 pt-3">
          {isBn ? selectedBio.storyBn : selectedBio.storyEn}
        </p>
        <div className="p-3 rounded-xl bg-gold-lux/10 border border-gold-lux/30 text-gold-lux text-xs font-semibold">
          {isBn ? selectedBio.lessonBn : selectedBio.lessonEn}
        </div>
      </div>
    </div>
  );
}

/* 2. DAILY VERSE & HADITH VIEW */
export function DailyVerseHadithView() {
  const { language } = useLanguage();
  const isBn = language === "bn";
  const [isPlaying, setIsPlaying] = useState(false);

  const verseArabic = "إِنَّ مَعَ الْعُسْرِ يُسْرًا";
  const verseBn = "নিশ্চয়ই কষ্টের সাথেই রয়েছে সহজতা বা সুখ। (সূরা আশ-শরহ: ৬)";
  const verseEn = "Indeed, with hardship comes ease. (Surah Ash-Sharh: 6)";

  const hadithBn = "রাসূলুল্লাহ (সা.) বলেছেন: 'তোমাদের মধ্যে সর্বোত্তম ঐ ব্যক্তি, যে নিজে কুরআন শেখে এবং অন্যকে শেখায়।' (সহিহ বুখারী: ৫০২৭)";
  const hadithEn = "The Prophet (PBUH) said: 'The best among you are those who learn the Quran and teach it.' (Sahih Bukhari: 5027)";

  const handlePlayAudio = () => {
    setIsPlaying(true);
    playIslamicAudio(verseArabic, "ar", () => setIsPlaying(false), () => setIsPlaying(false));
  };

  return (
    <div className="w-full bg-emerald-deep/95 rounded-3xl border border-gold-lux/30 p-4 sm:p-6 text-white space-y-6">
      <h3 className="text-xl sm:text-2xl font-serif-lux text-gold-lux text-center">
        {isBn ? "আজকের নির্বাচিত আয়াত ও হাদিস" : "Daily Verse & Hadith"}
      </h3>

      {/* Verse Card */}
      <div className="p-5 rounded-2xl bg-emerald-950 border border-gold-lux/40 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gold-lux uppercase tracking-widest">
            {isBn ? "কুরআনের বাণী" : "Verse of the Day"}
          </span>
          <button
            onClick={handlePlayAudio}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
              isPlaying
                ? "bg-gold-lux text-emerald-950 border-gold-lux animate-pulse"
                : "bg-emerald-900/80 text-gold-lux border-gold-lux/30 hover:bg-emerald-800"
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isBn ? "আরবি শুনুন" : "Listen Arabic"}</span>
          </button>
        </div>
        <p className="text-2xl font-serif-lux text-gold-lux text-center leading-loose py-2" dir="rtl">
          {verseArabic}
        </p>
        <p className="text-xs sm:text-sm text-emerald-100 text-center font-sans">
          "{isBn ? verseBn : verseEn}"
        </p>
      </div>

      {/* Hadith Card */}
      <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 space-y-2">
        <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest block">
          {isBn ? "সহিহ হাদিসের বাণী" : "Hadith of the Day"}
        </span>
        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans">
          "{isBn ? hadithBn : hadithEn}"
        </p>
      </div>
    </div>
  );
}

/* 3. EASY TAFSEER VIEW */
export function EasyTafseerView() {
  const { language } = useLanguage();
  const isBn = language === "bn";

  return (
    <div className="w-full bg-emerald-deep/95 rounded-3xl border border-gold-lux/30 p-4 sm:p-6 text-white space-y-4">
      <h3 className="text-xl sm:text-2xl font-serif-lux text-gold-lux text-center mb-2">
        {isBn ? "সূরা আল-ইখলাস • সহজ তাফসির" : "Surah Al-Ikhlas • Easy Tafseer"}
      </h3>
      <div className="p-4 rounded-2xl bg-emerald-950 border border-gold-lux/30 text-center">
        <p className="text-2xl font-serif-lux text-gold-lux mb-2 leading-loose" dir="rtl">
          قُلْ هُوَ اللَّهُ أَحَدٌ • اللَّهُ الصَّمَدُ • لَمْ يَلِدْ وَلَمْ يُولَدْ • وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ
        </p>
        <p className="text-xs sm:text-sm text-gray-200 font-sans leading-relaxed">
          {isBn
            ? "বলুন, তিনি আল্লাহ, এক ও অদ্বিতীয়। আল্লাহ কারো মুখাপেক্ষী নন, সকলেই তাঁর মুখাপেক্ষী। তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি। আর তাঁর সমতুল্য কেউই নেই।"
            : "Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.'"}
        </p>
      </div>
      <div className="p-4 rounded-2xl bg-emerald-950/70 border border-gold-lux/20 space-y-2">
        <h4 className="text-sm font-bold text-gold-lux">
          {isBn ? "তাফসির ও ফযিলত:" : "Tafseer & Virtues:"}
        </h4>
        <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
          {isBn
            ? "সূরা ইখলাসকে কুরআনের এক-তৃতীয়াংশ (১/৩ অংশ) বলা হয়েছে। এই সূরায় আল্লাহর একত্ববাদ (তাওহীদ)-এর সবচেয়ে খাঁটি ও স্পষ্ট ঘোষণা দেওয়া হয়েছে। যে ব্যক্তি প্রতিদিন ভালোবাসা সহকারে এই সূরা তেলাওয়াত করবে, আল্লাহ তার জন্য জান্নাত অবধারিত করবেন।"
            : "Surah Al-Ikhlas is equivalent to one-third of the Quran. It summarizes pure monotheism (Tawheed). Loving and reciting this Surah regularly earns Allah's love and leads to Paradise."}
        </p>
      </div>
    </div>
  );
}

/* 4. ISLAMIC STORIES & LESSONS VIEW */
export function IslamicStoriesView() {
  const { language } = useLanguage();
  const isBn = language === "bn";

  return (
    <div className="w-full bg-emerald-deep/95 rounded-3xl border border-gold-lux/30 p-4 sm:p-6 text-white space-y-4">
      <h3 className="text-xl sm:text-2xl font-serif-lux text-gold-lux text-center mb-2">
        {isBn ? "ইসলামিক শিক্ষণীয় গল্প: তৃষ্ণার্ত কুকুর ও ক্ষমা" : "Islamic Story: The Thirsty Dog & Forgiveness"}
      </h3>
      <div className="p-5 rounded-2xl bg-emerald-950/80 border border-gold-lux/30 space-y-3">
        <p className="text-xs sm:text-sm text-gray-200 font-sans leading-relaxed">
          {isBn
            ? "রাসূলুল্লাহ (সা.) এক ব্যক্তির ঘটনা বর্ণনা করেন, যে প্রচণ্ড গরমের দিনে পথ চলচিল। সে একটি কূপে নেমে পানি পান করে ওপরে উঠে দেখতে পেল, একটি কুকুর প্রচণ্ড তৃষ্ণায় কাদামাটি চাটছে। ব্যক্তিটি ভাবল, 'কুকুরটিরও আমার মতোই তৃষ্ণা পেয়েছে।' সে পুনরায় কূপে নেমে নিজের চামড়ার মোজায় পানি ভরে মুখ দিয়ে কামড়ে ধরে ওপরে উঠে এসে কুকুরটিকে পানি পান করাল।"
            : "The Prophet (PBUH) told of a man walking on a hot day who drank from a well. Upon coming up, he saw a dog panting from severe thirst. He climbed down again, filled his shoe with water, and held it in his mouth to climb up and give the dog a drink."}
        </p>
        <div className="p-3.5 rounded-xl bg-gold-lux/15 border border-gold-lux/40 text-gold-lux text-xs font-bold">
          {isBn
            ? "আল্লাহ তাআলা তার এই দয়ার কাজের জন্য তার সমস্ত গুনাহ ক্ষমা করে দিলেন! (সহিহ বুখারী: ২৪৬৬)"
            : "Allah appreciated this act of mercy and forgave all his sins! (Sahih Bukhari: 2466)"}
        </div>
      </div>
    </div>
  );
}
