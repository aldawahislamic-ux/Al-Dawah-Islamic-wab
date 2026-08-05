import React, { useState } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  BookOpen,
  Video,
  HelpCircle,
  Users,
  CheckCircle2,
  Clock,
  Award,
  Calendar,
  Sparkles,
  ChevronRight,
  Search,
  MessageCircle
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface Course {
  id: string;
  titleBn: string;
  titleEn: string;
  instructorBn: string;
  instructorEn: string;
  durationBn: string;
  durationEn: string;
  lecturesCount: number;
  level: "beginner" | "intermediate" | "advanced";
  levelBn: string;
  enrolled: boolean;
  category: "tafsir" | "aqeedah" | "fiqh" | "arabic";
}

const SAMPLE_COURSES: Course[] = [
  {
    id: "tafsir-101",
    titleBn: "তাফসিরুল কুরআন ডিপ্লোমা কোর্স",
    titleEn: "Tafseer-ul-Quran Diploma Course",
    instructorBn: "শাইখ আহমাদুল্লাহ ও শাইখ ড. খন্দকার আব্দুল্লাহ জাহাঙ্গীর (রহ.) আর্কাইভ",
    instructorEn: "Shaykh Ahmadullah & Shaykh Dr. K. A. Jahangir Archive",
    durationBn: "৩ মাস (২৪টি লাইভ ক্লাস)",
    durationEn: "3 Months (24 Live Classes)",
    lecturesCount: 24,
    level: "beginner",
    levelBn: "প্রাথমিক স্তর",
    enrolled: false,
    category: "tafsir"
  },
  {
    id: "aqeedah-201",
    titleBn: "সহীহ আকিদা ও ইমান সুরক্ষা কোর্স",
    titleEn: "Authentic Aqeedah & Faith Protection",
    instructorBn: "শাইখ ড. আবু বকর মুহাম্মাদ যাকারিয়া",
    instructorEn: "Shaykh Dr. Abu Bakr Muhammad Zakaria",
    durationBn: "২ মাস (১৬টি ক্লাস)",
    durationEn: "2 Months (16 Classes)",
    lecturesCount: 16,
    level: "beginner",
    levelBn: "প্রাথমিক স্তর",
    enrolled: false,
    category: "aqeedah"
  },
  {
    id: "fiqh-daily",
    titleBn: "দৈনন্দিন জীবনে ফিকহ ও মাসআলা",
    titleEn: "Fiqh & Masalah in Daily Life",
    instructorBn: "মুফতি কাজী ইব্রাহীম ও শাইখ আব্দুল হাই মুহাম্মদ সাইফুল্লাহ",
    instructorEn: "Mufti Kazi Ibrahim & Shaykh Abdul Hai Saifullah",
    durationBn: "৪ মাস (৩২টি ক্লাস)",
    durationEn: "4 Months (32 Classes)",
    lecturesCount: 32,
    level: "intermediate",
    levelBn: "মধ্যম স্তর",
    enrolled: false,
    category: "fiqh"
  },
  {
    id: "arabic-301",
    titleBn: "কুরআনিক আরবি ভাষা শিক্ষা কোর্স",
    titleEn: "Qur'anic Arabic Language Masterclass",
    instructorBn: "শাইখ মোতিউর রহমান মাদানী",
    instructorEn: "Shaykh Motiur Rahman Madani",
    durationBn: "৬ মাস (৪৮টি ক্লাস)",
    durationEn: "6 Months (48 Classes)",
    lecturesCount: 48,
    level: "advanced",
    levelBn: "উচ্চতর স্তর",
    enrolled: false,
    category: "arabic"
  }
];

export default function IslamicCampusView() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"courses" | "live" | "fatwa" | "study">("courses");
  const [courses, setCourses] = useState<Course[]>(SAMPLE_COURSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [fatwaQuestion, setFatwaQuestion] = useState("");
  const [fatwaSubmitted, setFatwaSubmitted] = useState(false);

  const handleEnroll = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolled: !c.enrolled } : c))
    );
  };

  const handleFatwaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fatwaQuestion.trim()) return;
    setFatwaSubmitted(true);
    setTimeout(() => {
      setFatwaQuestion("");
    }, 2000);
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* CAMPUS TAB NAVIGATION */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gold-lux/20 pb-3">
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === "courses"
              ? "gold-gradient text-emerald-950 shadow-lg font-bold"
              : "bg-emerald-900/60 text-gray-300 hover:text-white hover:bg-emerald-800"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          {language === "bn" ? "ইসলামিক কোর্সসমূহ" : "Islamic Courses"}
        </button>

        <button
          onClick={() => setActiveTab("live")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === "live"
              ? "gold-gradient text-emerald-950 shadow-lg font-bold"
              : "bg-emerald-900/60 text-gray-300 hover:text-white hover:bg-emerald-800"
          }`}
        >
          <Video className="w-4 h-4" />
          {language === "bn" ? "লাইভ দারস ও লেকচার" : "Live Dars & Lectures"}
        </button>

        <button
          onClick={() => setActiveTab("fatwa")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === "fatwa"
              ? "gold-gradient text-emerald-950 shadow-lg font-bold"
              : "bg-emerald-900/60 text-gray-300 hover:text-white hover:bg-emerald-800"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          {language === "bn" ? "প্রশ্নোত্তর ও ফতোয়া কর্নার" : "Fatwa & Q&A"}
        </button>

        <button
          onClick={() => setActiveTab("study")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === "study"
              ? "gold-gradient text-emerald-950 shadow-lg font-bold"
              : "bg-emerald-900/60 text-gray-300 hover:text-white hover:bg-emerald-800"
          }`}
        >
          <Users className="w-4 h-4" />
          {language === "bn" ? "স্টাডি সার্কেল" : "Study Circles"}
        </button>
      </div>

      {/* TAB 1: COURSES LIST */}
      {activeTab === "courses" && (
        <div className="space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-lux" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "bn"
                  ? "কোর্স বা শিক্ষকের নাম দিয়ে খুঁজুন..."
                  : "Search courses or teachers..."
              }
              className="w-full bg-emerald-950/90 border border-gold-lux/30 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-gray-400 outline-none focus:border-gold-lux"
            />
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-emerald-950/80 border border-gold-lux/20 hover:border-gold-lux/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold-lux/15 text-gold-lux border border-gold-lux/30 text-[10px] font-semibold">
                      {language === "bn" ? course.levelBn : course.level}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-lux" />
                      {language === "bn" ? course.durationBn : course.durationEn}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-serif-lux text-white mb-1">
                    {language === "bn" ? course.titleBn : course.titleEn}
                  </h4>
                  <p className="text-xs text-emerald-200/80 mb-3 leading-relaxed">
                    {language === "bn" ? "শিক্ষক:" : "Instructor:"}{" "}
                    <span className="text-gold-lux font-medium">
                      {language === "bn" ? course.instructorBn : course.instructorEn}
                    </span>
                  </p>
                </div>

                <div className="pt-3 border-t border-gold-lux/15 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {course.lecturesCount} {language === "bn" ? "টি লাইভ লেকচার" : "Lectures"}
                  </span>

                  <button
                    onClick={() => handleEnroll(course.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      course.enrolled
                        ? "bg-emerald-600/30 border border-emerald-400 text-emerald-300"
                        : "gold-gradient text-emerald-950 hover:brightness-110 shadow-md"
                    }`}
                  >
                    {course.enrolled ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        {language === "bn" ? "নিবন্ধিত (এনরোলড)" : "Enrolled"}
                      </>
                    ) : (
                      <>
                        <span>{language === "bn" ? "কোর্সে অংশ নিন" : "Enroll Now"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE DARS & LECTURES SCHEDULE */}
      {activeTab === "live" && (
        <div className="space-y-4">
          <div className="bg-emerald-950/90 border border-gold-lux/40 rounded-2xl p-5 text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {language === "bn" ? "আসন্ন লাইভ লেকচার সিডিউল" : "UPCOMING LIVE BROADCAST"}
            </div>
            <h3 className="text-lg sm:text-xl font-serif-lux font-bold text-gold-lux">
              {language === "bn"
                ? "সূরা আল-কাহফ তাফসির ও যুবসমাজের করণীয়"
                : "Tafseer Surah Al-Kahf & Lessons for Modern Youth"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
              {language === "bn"
                ? "বক্তা: শাইখ আহমাদুল্লাহ • প্রতি শুক্রবার রাত ৯:০০ টা (বাংলাদেশ সময়)"
                : "Speaker: Shaykh Ahmadullah • Every Friday 9:00 PM (Bangladesh Time)"}
            </p>
            <div className="pt-2">
              <button className="px-6 py-2.5 rounded-xl gold-gradient text-emerald-950 font-bold text-xs sm:text-sm shadow-lg hover:brightness-110 transition-all">
                {language === "bn" ? "রিমাইন্ডার সেট করুন 🔔" : "Set Reminder 🔔"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 bg-emerald-950/70 border border-gold-lux/20 rounded-xl">
              <span className="text-[10px] text-gold-lux uppercase block font-semibold">
                {language === "bn" ? "শনিবার • মাগরিবের পর" : "Saturday • After Maghrib"}
              </span>
              <h4 className="text-sm font-bold text-white mt-1">
                {language === "bn" ? "সহীহ বুখারী ধারাবাহিক পাঠ ও ব্যাখ্যা" : "Sahih Bukhari Dars Series"}
              </h4>
              <span className="text-xs text-gray-400 block mt-1">
                {language === "bn" ? "শাইখ আব্দুল হাই মুহাম্মদ সাইফুল্লাহ" : "Shaykh Abdul Hai Saifullah"}
              </span>
            </div>

            <div className="p-4 bg-emerald-950/70 border border-gold-lux/20 rounded-xl">
              <span className="text-[10px] text-gold-lux uppercase block font-semibold">
                {language === "bn" ? "মঙ্গলবার • রাত ৮:৩০ টা" : "Tuesday • 8:30 PM"}
              </span>
              <h4 className="text-sm font-bold text-white mt-1">
                {language === "bn" ? "পারিবারিক জীবনে সুন্নাহর চর্চা" : "Sunnah in Family Life"}
              </h4>
              <span className="text-xs text-gray-400 block mt-1">
                {language === "bn" ? "শাইখ ড. আবু বকর মুহাম্মাদ যাকারিয়া" : "Shaykh Dr. Abu Bakr M. Zakaria"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FATWA & Q&A CORNER */}
      {activeTab === "fatwa" && (
        <div className="space-y-6">
          
          {/* Submit Question Box */}
          <form onSubmit={handleFatwaSubmit} className="bg-emerald-950/90 border border-gold-lux/30 rounded-2xl p-5 space-y-3">
            <h4 className="text-base font-bold text-gold-lux flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {language === "bn"
                ? "আপনার ইসলামিক জিজ্ঞাসা বা প্রশ্ন লিখে পাঠান"
                : "Submit Your Islamic Question"}
            </h4>
            <textarea
              rows={3}
              value={fatwaQuestion}
              onChange={(e) => setFatwaQuestion(e.target.value)}
              placeholder={
                language === "bn"
                  ? "আপনার প্রশ্ন এখানে বিস্তারিত লিখুন... আমাদের স্কলার প্যানেল কুরআন ও সহীহ সুন্নাহর আলোকে উত্তর প্রদান করবেন।"
                  : "Write your question here... Our scholar panel will answer based on Qur'an & Sahih Sunnah."
              }
              className="w-full bg-emerald-900/60 border border-gold-lux/30 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-gray-400 outline-none focus:border-gold-lux resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                {language === "bn"
                  ? "উত্তরটি আপনার ইমেইল ও প্রশ্নোত্তর বিভাগে প্রকাশিত হবে"
                  : "Answer will be published here and notified via email"}
              </span>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl gold-gradient text-emerald-950 font-bold text-xs shadow-md hover:brightness-110 transition-all"
              >
                {language === "bn" ? "প্রশ্ন জমা দিন" : "Submit Question"}
              </button>
            </div>

            {fatwaSubmitted && (
              <div className="p-3 rounded-xl bg-emerald-600/30 border border-emerald-400 text-emerald-200 text-xs text-center font-medium">
                {language === "bn"
                  ? "আলহামদুলিল্লাহ! আপনার প্রশ্নটি সফলভাবে জমা নেওয়া হয়েছে।"
                  : "Alhamdulillah! Your question has been submitted successfully."}
              </div>
            )}
          </form>

          {/* Sample Q&A Accordion */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-gold-lux/80 font-semibold">
              {language === "bn" ? "সম্প্রতি উত্তরকৃত প্রশ্নসমূহ" : "Recently Answered Questions"}
            </h5>

            <div className="p-4 bg-emerald-950/70 border border-gold-lux/20 rounded-xl space-y-2">
              <p className="text-sm font-bold text-white">
                {language === "bn"
                  ? "প্রশ্ন: ডিজিটাল স্ক্রিনে (মোবাইল/কম্পিউটার) কুরআন পড়ার জন্য কি ওজু করা বাধ্যতামূলক?"
                  : "Q: Is Wudu required to read Qur'an on digital screens (mobile/computer)?"}
              </p>
              <p className="text-xs text-emerald-100/90 leading-relaxed pt-1 border-t border-white/10">
                <span className="text-gold-lux font-semibold">{language === "bn" ? "উত্তর: " : "Answer: "}</span>
                {language === "bn"
                  ? "অধিকাংশ স্কলারদের মতে, মোবাইল বা ট্যাবের স্ক্রিন সরাসরি কাগজের মুসহাফের অন্তর্ভুক্ত নয়। তাই ওজু ছাড়াও স্ক্রিনে কুরআন তিলাওয়াত করা জায়েজ, তবে ওজু অবস্থায় তিলাওয়াত করা উত্তম ও অধিক সওয়াবের কাজ।"
                  : "According to the majority of scholars, a mobile/tablet screen is not a physical Mushaf. Thus, it is permissible to recite without Wudu, although having Wudu is preferred and more rewarding."}
              </p>
            </div>

            <div className="p-4 bg-emerald-950/70 border border-gold-lux/20 rounded-xl space-y-2">
              <p className="text-sm font-bold text-white">
                {language === "bn"
                  ? "প্রশ্ন: চলন্ত গাড়িতে বা বাসে কি ফরজ নামাজ আদায় করা যাবে?"
                  : "Q: Can obligatory (Fard) prayers be offered while traveling in a moving vehicle?"}
              </p>
              <p className="text-xs text-emerald-100/90 leading-relaxed pt-1 border-t border-white/10">
                <span className="text-gold-lux font-semibold">{language === "bn" ? "উত্তর: " : "Answer: "}</span>
                {language === "bn"
                  ? "ফরজ নামাজের ক্ষেত্রে কেবলামুখী হওয়া এবং দাঁড়িয়ে নামাজ পড়া শর্ত। তাই সম্ভব হলে গাড়ি থামিয়ে নামাজ আদায় করতে হবে। তবে যদি গাড়ি থামানো অসম্ভব হয় এবং নামাজের সময় চলে যাওয়ার আশঙ্কা থাকে, তবে গাড়িতে বসেই যেদিকে সম্ভব নামাজ পড়ে নেওয়া যাবে।"
                  : "For Fard prayers, facing Qibla and standing are obligatory conditions. Therefore, one should stop the vehicle if possible. If stopping is impossible and the prayer time will expire, one may pray seated facing whichever direction possible."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: YOUTH STUDY CIRCLES */}
      {activeTab === "study" && (
        <div className="bg-emerald-950/90 border border-gold-lux/40 rounded-2xl p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-gold-lux/15 border border-gold-lux/40 flex items-center justify-center mx-auto text-gold-lux">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-serif-lux text-white">
            {language === "bn" ? "আল দাওয়াহ যুব স্টাডি সার্কেল" : "Al Dawah Youth Study Circles"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
            {language === "bn"
              ? "সপ্তাহে একদিন অনলাইন বা অফলাইন হালাকায় যুক্ত হয়ে সহীহ আকিদা, কুরআনের তাফসির ও নববী আখলাক নিয়ে আলোচনা করুন।"
              : "Join our weekly online/offline Halaqahs to study authentic Aqeedah, Tafseer, and prophetic morals together."}
          </p>
          <div className="pt-2">
            <button className="px-8 py-3 rounded-xl gold-gradient text-emerald-950 font-bold text-sm shadow-xl hover:brightness-110 transition-all">
              {language === "bn" ? "স্টাডি সার্কেলে যোগ দিন" : "Join Study Circle"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
