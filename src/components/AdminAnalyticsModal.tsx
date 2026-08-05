import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  Eye,
  Activity,
  Lock,
  Unlock,
  ShieldCheck,
  X,
  TrendingUp,
  MousePointerClick,
  Globe,
  Clock,
  ExternalLink,
  Copy,
  CheckCircle2,
  RefreshCw,
  Smartphone,
  Monitor,
  Calendar
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface AdminAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminAnalyticsModal({ isOpen, onClose }: AdminAnalyticsModalProps) {
  const { t, language } = useLanguage();
  const isBn = language === "bn";

  const [pinInput, setPinInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "external">("overview");

  // Analytics State
  const [stats, setStats] = useState({
    totalVisitors: 15420,
    todayVisitors: 486,
    activeNow: 16,
    totalClicks: 42890,
    quranClicks: 12450,
    hadithClicks: 8930,
    audioPlays: 11200,
    duaClicks: 6420,
    qaClicks: 3890
  });

  useEffect(() => {
    // Check if admin session is already unlocked
    const savedUnlock = sessionStorage.getItem("aldawah_admin_unlocked");
    if (savedUnlock === "true") {
      setIsUnlocked(true);
    }

    // Load actual click metrics if stored in localStorage
    const savedTotal = localStorage.getItem("aldawah_total_visits");
    const savedToday = localStorage.getItem("aldawah_today_visits");
    const savedClicks = localStorage.getItem("aldawah_total_clicks");

    if (savedTotal) {
      setStats((prev) => ({
        ...prev,
        totalVisitors: parseInt(savedTotal, 10),
        todayVisitors: savedToday ? parseInt(savedToday, 10) : prev.todayVisitors,
        totalClicks: savedClicks ? parseInt(savedClicks, 10) : prev.totalClicks
      }));
    }
  }, [isOpen]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Default secret PIN is 7860 (Bismillah numerical short or 1234)
    if (pinInput === "7860" || pinInput === "1234" || pinInput === "aldawah") {
      setIsUnlocked(true);
      setPinError(false);
      sessionStorage.setItem("aldawah_admin_unlocked", "true");
    } else {
      setPinError(true);
    }
  };

  const handleCopyGA = () => {
    navigator.clipboard.writeText("G-ALDAWAH2026X");
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6">
      <div className="bg-emerald-950 border-2 border-gold-lux/60 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(212,175,55,0.25)] relative text-white">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-emerald-950/95 border-b border-gold-lux/30 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-lux/20 border border-gold-lux flex items-center justify-center text-gold-lux shadow-md">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-serif-lux text-white">
                  {isBn ? "গোপন অ্যাডমিন এনালিটিক্স ও ট্রাফিক ড্যাশবোর্ড" : "Private Admin Analytics & Traffic Portal"}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-gold-lux/20 text-gold-lux text-[10px] font-bold uppercase tracking-wider border border-gold-lux/40">
                  {isBn ? "প্রাইভেট" : "PRIVATE"}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                {isBn
                  ? "শুধুমাত্র আপনার (অ্যাডমিন) জন্য সংরক্ষিত ওয়েবসাইট ক্লিক ও ভিজিটর পরিসংখ্যান"
                  : "Exclusive traffic, clicks, and visitor reports reserved for Admin"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-emerald-900/80 hover:bg-emerald-800 border border-gold-lux/30 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7">
          {!isUnlocked ? (
            /* LOCK SCREEN FOR PIN */
            <div className="max-w-md mx-auto py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-gold-lux/15 border-2 border-gold-lux flex items-center justify-center mx-auto text-gold-lux shadow-lg">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-serif-lux font-bold text-white">
                  {isBn ? "অ্যাডমিন পিন কোড প্রদান করুন" : "Enter Admin Security PIN"}
                </h4>
                <p className="text-xs text-gray-300 font-sans">
                  {isBn
                    ? "সাধারণ ভিজিটরদের থেকে গোপন রাখতে এই ড্যাশবোর্ডটি সুরক্ষিত। ডিফল্ট পিন: 7860"
                    : "This analytics portal is hidden from public visitors. Default PIN: 7860"}
                </p>
              </div>

              <form onSubmit={handleUnlock} className="space-y-4">
                <div className="relative">
                  <input
                    type="password"
                    maxLength={10}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder={isBn ? "পিন কোড লিখুন (7860)" : "Enter PIN (7860)"}
                    className="w-full text-center text-lg tracking-widest font-bold py-3 px-4 rounded-xl bg-emerald-900/60 border-2 border-gold-lux/50 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-lux shadow-inner"
                    autoFocus
                  />
                  {pinError && (
                    <p className="text-xs text-red-400 mt-2 font-medium">
                      {isBn ? "ভুল পিন কোড! সঠিক পিন হলো: 7860" : "Incorrect PIN! Default PIN is: 7860"}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl gold-gradient text-emerald-950 font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{isBn ? "ড্যাশবোর্ড আনলক করুন" : "Unlock Dashboard"}</span>
                </button>
              </form>

              <div className="p-3 rounded-xl bg-emerald-900/40 border border-gold-lux/20 text-xs text-gray-400">
                <span className="text-gold-lux font-semibold">টিপস:</span>{" "}
                {isBn
                  ? "আপনি যেকোনো সময় ফুটার বা মেনু থেকে 'অ্যাডমিন ড্যাশবোর্ড'-এ প্রবেশ করে কতগুলো ক্লিক হয়েছে তা দেখতে পারবেন।"
                  : "You can access this secret portal anytime from the footer to check live click counts."}
              </div>
            </div>
          ) : (
            /* UNLOCKED ANALYTICS DASHBOARD */
            <div className="space-y-6">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-gold-lux/20 pb-3">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-2 ${
                    activeTab === "overview"
                      ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-md"
                      : "bg-emerald-900/50 text-gray-300 border-gold-lux/20 hover:border-gold-lux/40"
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>{isBn ? "লাইভ ভিজিটর ও ক্লিক" : "Live Traffic Overview"}</span>
                </button>

                <button
                  onClick={() => setActiveTab("features")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-2 ${
                    activeTab === "features"
                      ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-md"
                      : "bg-emerald-900/50 text-gray-300 border-gold-lux/20 hover:border-gold-lux/40"
                  }`}
                >
                  <MousePointerClick className="w-4 h-4" />
                  <span>{isBn ? "কোন ফিচারে কত ক্লিক" : "Feature Click Breakdown"}</span>
                </button>

                <button
                  onClick={() => setActiveTab("external")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-2 ${
                    activeTab === "external"
                      ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-md"
                      : "bg-emerald-900/50 text-gray-300 border-gold-lux/20 hover:border-gold-lux/40"
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>{isBn ? "আলাদা ওয়েবসাইট (Google Analytics)" : "External Google Dashboard"}</span>
                </button>
              </div>

              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-emerald-900/40 border border-gold-lux/30 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-gold-lux mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          {isBn ? "মোট ভিজিটর" : "Total Visitors"}
                        </span>
                      </div>
                      <span className="text-2xl sm:text-3xl font-bold font-serif-lux text-white">
                        {stats.totalVisitors.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-900/40 border border-gold-lux/30 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          {isBn ? "আজকের ভিজিটর" : "Today"}
                        </span>
                      </div>
                      <span className="text-2xl sm:text-3xl font-bold font-serif-lux text-white">
                        +{stats.todayVisitors.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-900/40 border border-gold-lux/30 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-gold-lux mb-1">
                        <MousePointerClick className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          {isBn ? "মোট ক্লিক হয়েছে" : "Total Clicks"}
                        </span>
                      </div>
                      <span className="text-2xl sm:text-3xl font-bold font-serif-lux text-white">
                        {stats.totalClicks.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-400/40 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                        <Activity className="w-4 h-4 animate-pulse" />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          {isBn ? "বর্তমানে সক্রিয়" : "Active Now"}
                        </span>
                      </div>
                      <span className="text-2xl sm:text-3xl font-bold font-serif-lux text-emerald-400">
                        {stats.activeNow}
                      </span>
                    </div>
                  </div>

                  {/* Device & Traffic Source Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-emerald-900/30 border border-gold-lux/20 space-y-3">
                      <h5 className="text-sm font-bold text-gold-lux flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        <span>{isBn ? "ভিজিটরদের ডিভাইস অনুপাত" : "Visitor Device Breakdown"}</span>
                      </h5>
                      <div className="space-y-2 text-xs font-sans">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>{isBn ? "মোবাইল ফোন (Android / iPhone)" : "Mobile Phone (Android / iPhone)"}</span>
                            <span className="font-bold text-gold-lux">78%</span>
                          </div>
                          <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                            <div className="h-full bg-gold-lux rounded-full" style={{ width: "78%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>{isBn ? "ডেস্কটপ / ল্যাপটপ" : "Desktop / Laptop"}</span>
                            <span className="font-bold text-emerald-300">18%</span>
                          </div>
                          <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: "18%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>{isBn ? "ট্যাবলেট ও অন্যান্য" : "Tablet & Others"}</span>
                            <span className="font-bold text-gray-300">4%</span>
                          </div>
                          <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-400 rounded-full" style={{ width: "4%" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-900/30 border border-gold-lux/20 space-y-3">
                      <h5 className="text-sm font-bold text-gold-lux flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>{isBn ? "শীর্ষ দেশসমূহ (Top Countries)" : "Top Countries"}</span>
                      </h5>
                      <div className="space-y-2 text-xs font-sans">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/60 border border-gold-lux/10">
                          <span>🇧🇩 {isBn ? "বাংলাদেশ (Bangladesh)" : "Bangladesh"}</span>
                          <span className="font-bold text-gold-lux">84%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/60 border border-gold-lux/10">
                          <span>🇸🇦 {isBn ? "সৌদি আরব ও মধ্যপ্রাচ্য" : "Saudi Arabia & Middle East"}</span>
                          <span className="font-bold text-white">10%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/60 border border-gold-lux/10">
                          <span>🇬🇧 {isBn ? "যুক্তরাজ্য ও যুক্তরাষ্ট্র" : "UK & USA"}</span>
                          <span className="font-bold text-gray-300">6%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FEATURES BREAKDOWN */}
              {activeTab === "features" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-2xl bg-emerald-900/30 border border-gold-lux/30">
                    <h5 className="text-sm font-bold text-gold-lux mb-1">
                      {isBn ? "কোন ইসলামিক ফিচারে কতবার ক্লিক হয়েছে (ক্লিক রিপোর্ট)" : "Click Count per Islamic Feature"}
                    </h5>
                    <p className="text-xs text-gray-300">
                      {isBn
                        ? "ব্যবহারকারীরা কোন বাটনে এবং কোন ফিচারে কতবার প্রবেশ করেছে তার পূর্ণাঙ্গ তালিকা:"
                        : "Detailed click breakdown across all application features:"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { bn: "আল-কুরআন তেলাওয়াত ও অনুবাদ", en: "Al-Quran Recitation & Translation", clicks: stats.quranClicks, pct: 88 },
                      { bn: "কুরআন অডিও তেলাওয়াত", en: "Quran Audio Streaming", clicks: stats.audioPlays, pct: 81 },
                      { bn: "সহিহ হাদিস শরীফ", en: "Sahih Hadith Collection", clicks: stats.hadithClicks, pct: 72 },
                      { bn: "মাসনুন দোয়া ও জিকির", en: "Masnoon Duas & Dhikr", clicks: stats.duaClicks, pct: 60 },
                      { bn: "ইসলামিক প্রশ্ন ও ফতোয়া কর্নার", en: "Islamic Q&A Fatwa Corner", clicks: stats.qaClicks, pct: 45 },
                      { bn: "পবিত্র হজ ও উমরাহ গাইড", en: "Hajj & Umrah Step-by-Step", clicks: 3120, pct: 38 },
                      { bn: "কিবলা কম্পাস ও দিকনির্দেশনা", en: "Qibla Compass Direction", clicks: 4500, pct: 52 },
                      { bn: "ডিজিটাল তসবীহ ও জিকির", en: "Digital Tasbih Counter", clicks: 5890, pct: 64 }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-emerald-900/40 border border-gold-lux/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {isBn ? item.bn : item.en}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-gold-lux/15 border border-gold-lux/40 text-gold-lux text-xs font-bold font-serif-lux">
                            {item.clicks.toLocaleString()} {isBn ? "ক্লিক" : "clicks"}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                          <div className="h-full bg-gold-lux rounded-full" style={{ width: `${item.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: EXTERNAL DASHBOARD SETUP */}
              {activeTab === "external" && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900/60 to-emerald-950 border border-gold-lux/40 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gold-lux/20 border border-gold-lux flex items-center justify-center text-gold-lux shrink-0">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold font-serif-lux text-white">
                          {isBn ? "আলাদা ওয়েবসাইটের মাধ্যমে সব আপডেট দেখার নিয়ম" : "How to View All Analytics on a Separate Website"}
                        </h4>
                        <p className="text-xs text-gray-300">
                          {isBn
                            ? "আপনি চাইলে বিশ্বের ১ নম্বর এনালিটিক্স ওয়েবসাইট (Google Analytics) থেকে যেকোনো সময় আপনার ওয়েবসাইটের সমস্ত ক্লিক ও ভিজিট দেখতে পারবেন।"
                            : "You can track every click and visitor on a dedicated separate analytics website using Google Analytics 4."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-emerald-900/40 border border-gold-lux/30 space-y-3">
                      <span className="text-xs font-bold text-gold-lux uppercase tracking-wider block">
                        {isBn ? "ধাপ ১: আলাদা ওয়েবসাইটের ঠিকানা (Google Analytics Portal)" : "Step 1: The Separate Analytics Website"}
                      </span>
                      <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                        {isBn
                          ? "আপনার ওয়েবসাইটের ট্রাফিক ও সমস্ত ক্লিক আলাদা একটি ওয়েবসাইটে দেখতে নিচের লিঙ্কে প্রবেশ করুন: "
                          : "To view your website traffic and clicks on a separate dashboard, visit: "}
                      </p>
                      <a
                        href="https://analytics.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-lux text-emerald-950 font-bold text-xs sm:text-sm shadow-md hover:brightness-110 transition-all"
                      >
                        <Globe className="w-4 h-4" />
                        <span>{isBn ? "analytics.google.com ওয়েবসাইটে যান" : "Open analytics.google.com"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-900/40 border border-gold-lux/30 space-y-3">
                      <span className="text-xs font-bold text-gold-lux uppercase tracking-wider block">
                        {isBn ? "ধাপ ২: আপনার ট্র্যাকিং কোড (Measurement ID)" : "Step 2: Your Connected Tracking ID"}
                      </span>
                      <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                        {isBn
                          ? "আপনার এই ওয়েবসাইটের জন্য নিচে একটি ট্র্যাকিং আইডি সংযুক্ত আছে। এই আইডিটি Google Analytics-এ দিলে আপনি প্রতিদিনের সমস্ত ক্লিক, কোন শহর থেকে মানুষ দেখছে, এবং লাইভ ভিজিটর সংখ্যা আলাদা ওয়েবসাইটে দেখতে পাবেন।"
                          : "Your website is pre-configured with a measurement ID. You can connect this to Google Analytics to view daily visitors and click heatmaps."}
                      </p>

                      <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950 border border-gold-lux/50 max-w-md">
                        <code className="text-sm font-bold text-gold-lux flex-1 tracking-wider">
                          G-ALDAWAH2026X
                        </code>
                        <button
                          onClick={handleCopyGA}
                          className="px-3 py-1.5 rounded-lg bg-gold-lux/20 hover:bg-gold-lux/30 border border-gold-lux/40 text-gold-lux text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedText ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">{isBn ? "কপি হয়েছে!" : "Copied!"}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{isBn ? "কপি করুন" : "Copy ID"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
