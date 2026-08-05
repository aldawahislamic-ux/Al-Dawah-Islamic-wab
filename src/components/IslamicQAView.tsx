import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageCircleQuestion,
  Tag,
  ShieldCheck,
  Send
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface QAItem {
  id: string;
  category: "prayer" | "fasting" | "zakat" | "hajj" | "family" | "halal";
  questionBn: string;
  questionEn: string;
  answerBn: string;
  answerEn: string;
  referenceBn: string;
  referenceEn: string;
}

const QA_ITEMS: QAItem[] = [
  {
    id: "q1",
    category: "prayer",
    questionBn: "নামাজে সূরা ফাতিহার পর আমিন জোরে বলা যাবে কি?",
    questionEn: "Should 'Ameen' be said aloud after Surah Al-Fatihah in congregational prayer?",
    answerBn: "হ্যাঁ, জোরে বা আস্তে উভয়ভাবে বলার দলিল হাদিসে রয়েছে। ইমাম বুখারী (রহ.) ও শাফেঈ মাযহাব মতে জোরে আমিন বলা সুন্নাত এবং হানাফী মাযহাব মতে আস্তে বলা উত্তম। উভয়টিই সুন্নাহ সম্মত, এ নিয়ে বিতর্ক বা বিভেদ সৃষ্টি করা অনুচিত।",
    answerEn: "Yes, both saying it silently and audibly are established in Hadith. According to Imam Bukhari and Shafi'i fiqh, saying it audibly is Sunnah, while in Hanafi fiqh saying it quietly is preferred. Both practices are valid.",
    referenceBn: "দলিল: সহিহ বুখারী হাদিস ৭৮০, সুনানে তিরমিযী হাদিস ২৪৮",
    referenceEn: "Reference: Sahih Bukhari Hadith 780, Jami at-Tirmidhi Hadith 248"
  },
  {
    id: "q2",
    category: "prayer",
    questionBn: "কসর নামাজ কখন ও কীভাবে পড়তে হয়?",
    questionEn: "When and how should one shorten prayers (Qasr) during travel?",
    answerBn: "৪৮ মাইল বা প্রায় ৭৮ কিলোমিটার দূরত্বের সফরে গেলে ৪ রাকাত বিশিষ্ট ফরজ নামাজ (জোহর, আসর ও এশা) ২ রাকাত পড়তে হয়। ফজর ও মাগরিবের নামাজে কোনো কসর নেই। সফরে থাকা অবস্থায় কসর করা আল্লাহর দেওয়া ছাড় ও সুন্নাত।",
    answerEn: "When traveling roughly 78 kilometers (48 miles) or more, four-rakah obligatory prayers (Dhuhr, Asr, Isha) are reduced to two rakahs. Fajr and Maghrib remain unchanged.",
    referenceBn: "দলিল: সহিহ বুখারী হাদিস ১০৯০, সূরা আন-নিসা: ১০১",
    referenceEn: "Reference: Sahih Bukhari Hadith 1090, Surah An-Nisa: 101"
  },
  {
    id: "q3",
    category: "fasting",
    questionBn: "ভুলে খাবার খেলে বা পানি পান করলে কি রোজা ভেঙে যায়?",
    questionEn: "Does eating or drinking forgetfully break the fast?",
    answerBn: "না, ভুলে খেলে বা পান করলে রোজা ভাঙে না এবং কাযা করতে হয় না। মনে পড়ার সাথে সাথেই খাওয়া বন্ধ করে মুখ ধুয়ে ফেলতে হবে। রাসূলুল্লাহ (সা.) বলেছেন, 'যে ব্যক্তি রোজাদার অবস্থায় ভুলে খায় বা পান করে, সে যেন তার রোজা পূর্ণ করে; কারণ আল্লাহই তাকে খাইয়েছেন ও পান করিয়েছেন।'",
    answerEn: "No, eating or drinking out of forgetfulness does not break the fast. One should stop immediately upon remembering. The Prophet (PBUH) said that Allah is the one who fed and gave him drink.",
    referenceBn: "দলিল: সহিহ বুখারী হাদিস ১৯৩৩, সহিহ মুসলিম হাদিস ১১৫৫",
    referenceEn: "Reference: Sahih Bukhari Hadith 1933, Sahih Muslim Hadith 1155"
  },
  {
    id: "q4",
    category: "zakat",
    questionBn: "স্বর্ণ ও রৌপ্যের নিসাব কত হলে যাকাত ফরজ হয়?",
    questionEn: "What is the Nisab threshold for gold and silver for Zakat?",
    answerBn: "স্বর্ণের নিসাব হলো সাড়ে সাত (৭.৫) ভরি বা ৮৭.৪৮ গ্রাম এবং রৌপ্যের নিসাব হলো সাড়ে বায়ান্ন (৫২.৫) ভরি বা ৬১২.৩৬ গ্রাম। কারোর কাছে এই পরিমাণ স্বর্ণ বা রৌপ্য অথবা এর সমমূল্যের নগদ টাকা পূর্ণ ১ বছর থাকলে ২.৫% যাকাত আদায় করা ফরজ।",
    answerEn: "The Nisab is 7.5 Tolas (87.48g) of gold or 52.5 Tolas (612.36g) of silver. If someone holds this amount or its cash equivalent for a full lunar year, 2.5% Zakat is obligatory.",
    referenceBn: "দলিল: সুনানে আবু দাউদ হাদিস ১৫৭৩, সুনানে তিরমিযী হাদিস ৬২০",
    referenceEn: "Reference: Sunan Abu Dawud Hadith 1573, Jami at-Tirmidhi Hadith 620"
  },
  {
    id: "q5",
    category: "halal",
    questionBn: "ব্যাংকের ইন্টারেস্ট বা সুদের টাকা কি দান করা যাবে?",
    questionEn: "Can bank interest money be given to charity?",
    answerBn: "ইসলামে সুদ (রিবা) সম্পূর্ণ হারাম। ব্যাংক থেকে প্রাপ্ত সুদের টাকা নিজের কোনো কাজে ব্যবহার করা যাবে না এবং সওয়াবের নিয়ত ছাড়াই কোনো গরীব বা জনকল্যাণমূলক কাজে দিয়ে দিতে হবে, যাতে সুদের গুনাহ থেকে মুক্ত হওয়া যায়।",
    answerEn: "Interest (Riba) is strictly forbidden in Islam. Any bank interest received must not be used for personal benefit; it should be given away to the needy without expecting spiritual reward, just to cleanse one's wealth.",
    referenceBn: "দলিল: সূরা আল-বাকারা: ২৭৫-২৭৯, সহিহ মুসলিম হাদিস ১৫৯৮",
    referenceEn: "Reference: Surah Al-Baqarah: 275-279, Sahih Muslim Hadith 1598"
  },
  {
    id: "q6",
    category: "family",
    questionBn: "পিতা-মাতার অবাধ্যতার শাস্তি ইসলামে কী?",
    questionEn: "What is the Islamic ruling regarding disobedience to parents?",
    answerBn: "আল্লাহর ইবাদতের পর পিতা-মাতার সাথে উত্তম আচরণ করা ইসলামের সবচেয়ে বড় ফরজ। পিতা-মাতার অবাধ্য হওয়া কবিরা গুনাহ। রাসূলুল্লাহ (সা.) বলেছেন, 'আল্লাহ তাআলা সব গুনাহের শাস্তি আখিরাতে দিতে পারেন, কিন্তু পিতা-মাতার অবাধ্যতার শাস্তি দুনিয়াতেই দিয়ে দেন।'",
    answerEn: "After worshipping Allah, kindness to parents is the greatest duty. Disobedience to parents is a major sin. Hadith states Allah hastens the punishment for parental disobedience in this worldly life.",
    referenceBn: "দলিল: সূরা বনি ইসরাঈল: ২৩-২৪, মুস্তাদরাকে হাকেম হাদিস ৭২৪০",
    referenceEn: "Reference: Surah Al-Isra: 23-24, Mustadrak al-Hakim Hadith 7240"
  },
  {
    id: "q7",
    category: "hajj",
    questionBn: "মহিলাদের কি উমরাহ বা হজের সময় মাথা মুণ্ডন করতে হবে?",
    questionEn: "Do women shave their head after Umrah or Hajj?",
    answerBn: "না, মহিলাদের মাথা মুণ্ডন করা নিষিদ্ধ। তারা মাথার সমস্ত চুলের প্রান্তভাগ একত্রে ধরে আঙুলের এক কর (প্রায় ১ ইঞ্চি) পরিমাণ কাটবেন। এর মাধ্যমেই তাদের উমরাহ বা হজ সম্পন্ন হবে।",
    answerEn: "No, women are forbidden from shaving their heads. They only cut a fingertip's length (about 1 inch) from the ends of their gathered hair.",
    referenceBn: "দলিল: সুনানে আবু দাউদ হাদিস ১৯৮৪",
    referenceEn: "Reference: Sunan Abu Dawud Hadith 1984"
  }
];

export default function IslamicQAView() {
  const { t, language } = useLanguage();
  const isBn = language === "bn";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("q1");

  // Ask Question Modal State
  const [showAskForm, setShowAskForm] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const categories = [
    { id: "all", bn: "সকল মাসআলা", en: "All Questions" },
    { id: "prayer", bn: "নামাজ", en: "Prayer (Salah)" },
    { id: "fasting", bn: "রোজা", en: "Fasting (Sawm)" },
    { id: "zakat", bn: "যাকাত", en: "Zakat & Wealth" },
    { id: "hajj", bn: "হজ ও উমরাহ", en: "Hajj & Umrah" },
    { id: "halal", bn: "হালাল ও হারাম", en: "Halal & Haram" },
    { id: "family", bn: "পরিবার ও সমাজ", en: "Family & Ethics" }
  ];

  const filteredItems = QA_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const qText = (isBn ? item.questionBn : item.questionEn).toLowerCase();
    const aText = (isBn ? item.answerBn : item.answerEn).toLowerCase();
    const matchesSearch =
      !searchQuery ||
      qText.includes(searchQuery.toLowerCase()) ||
      aText.includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setUserQuestion("");
      setUserEmail("");
      setShowAskForm(false);
    }, 2500);
  };

  return (
    <div className="w-full bg-emerald-deep/95 rounded-3xl border border-gold-lux/30 p-4 sm:p-6 md:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-lux/10 border border-gold-lux/30 text-gold-lux text-xs font-semibold uppercase tracking-widest mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-gold-lux" />
          <span>{isBn ? "দৈনন্দিন ইসলামিক মাসআলা ও সমাধান" : "Authentic Islamic Q&A & Rulings"}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif-lux text-white font-light tracking-wide mb-2">
          {isBn ? "কুরআন ও সহিহ হাদিস ভিত্তিক প্রশ্নোত্তর কর্নার" : "Quran & Sahih Hadith Based Fatwa Corner"}
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
          {isBn
            ? "দৈনন্দিন জীবনের গুরুত্বপূর্ণ মাসআলা ও শরিয়তের সঠিক সমাধান জানুন। যেকোনো বিষয়ে অনুসন্ধান করুন অথবা নিজের প্রশ্ন জমা দিন।"
            : "Search essential daily rulings and authentic Islamic answers with references from Sahih Hadith."}
        </p>
      </div>

      {/* Search Bar & Ask Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? "প্রশ্ন বা মাসআলা খুঁজুন (যেমন: নামাজ, রোজা, যাকাত...)" : "Search any Islamic topic..."}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-emerald-950 border border-gold-lux/30 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-gold-lux transition-colors"
          />
        </div>
        <button
          onClick={() => setShowAskForm(true)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl gold-gradient text-emerald-950 font-bold text-xs sm:text-sm shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
        >
          <MessageCircleQuestion className="w-4 h-4" />
          <span>{isBn ? "নিজের প্রশ্ন করুন" : "Ask a Question"}</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategory === cat.id
                ? "bg-gold-lux text-emerald-950 border-gold-lux shadow-sm"
                : "bg-emerald-950/60 text-gray-300 border-gold-lux/20 hover:border-gold-lux/40"
            }`}
          >
            {isBn ? cat.bn : cat.en}
          </button>
        ))}
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-10 bg-emerald-950/40 rounded-2xl border border-gold-lux/10">
            <HelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300">
              {isBn ? "কোনো প্রশ্ন বা মাসআলা পাওয়া যায়নি। নতুন প্রশ্ন জমা দিন।" : "No matching Q&A found. Try searching a different term or ask a question."}
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isExpanded
                    ? "bg-emerald-900/60 border-gold-lux shadow-lg"
                    : "bg-emerald-950/60 border-gold-lux/20 hover:border-gold-lux/40"
                }`}
              >
                {/* Question Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold-lux/15 border border-gold-lux/40 text-gold-lux flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ?
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug font-sans">
                      {isBn ? item.questionBn : item.questionEn}
                    </h4>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gold-lux shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </div>

                {/* Expanded Answer Content */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-5 pt-1 border-t border-gold-lux/15 space-y-3">
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans">
                      {isBn ? item.answerBn : item.answerEn}
                    </p>

                    <div className="p-2.5 rounded-xl bg-emerald-950/90 border border-gold-lux/30 flex items-center gap-2 text-xs text-gold-lux">
                      <BookOpen className="w-3.5 h-3.5 shrink-0 text-gold-lux" />
                      <span className="font-semibold">{isBn ? item.referenceBn : item.referenceEn}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Ask Question Modal Overlay */}
      {showAskForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-emerald-950 border border-gold-lux/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
            <h4 className="text-lg font-serif-lux text-white mb-2">
              {isBn ? "আপনার ইসলামিক প্রশ্ন জমা দিন" : "Submit Your Islamic Question"}
            </h4>
            <p className="text-xs text-gray-300 mb-4 font-sans">
              {isBn
                ? "আমাদের অভিজ্ঞ আলিম ও ফতোয়া বোর্ডের নিকট আপনার মাসআলা প্রেরণ করা হবে।"
                : "Your question will be reviewed by our scholarly Fatwa panel and answered according to Sunnah."}
            </p>

            {submittedSuccess ? (
              <div className="p-6 text-center bg-emerald-900/60 rounded-xl border border-gold-lux/40 text-gold-lux space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto text-gold-lux" />
                <h5 className="font-bold text-sm">
                  {isBn ? "প্রশ্নটি সফলভাবে জমা হয়েছে!" : "Question Submitted Successfully!"}
                </h5>
                <p className="text-xs text-gray-200">
                  {isBn ? "শীঘ্রই উত্তর প্রস্তুত করে আপনার ইমেইল ও অ্যাপে জানানো হবে। জাযাকাল্লাহু খাইরান।" : "We will review and notify you shortly. Jazakallahu Khairan."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuestion} className="space-y-4 font-sans">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">
                    {isBn ? "আপনার প্রশ্ন বা মাসআলা বিস্তারিত লিখুন *" : "Your Question *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder={isBn ? "এখানে প্রশ্নটি লিখুন..." : "Write your question in detail..."}
                    className="w-full rounded-xl bg-emerald-900/40 border border-gold-lux/30 px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-lux"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">
                    {isBn ? "আপনার ইমেইল (ঐচ্ছিক - উত্তর পাওয়ার জন্য)" : "Your Email (Optional)"}
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full rounded-xl bg-emerald-900/40 border border-gold-lux/30 px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-lux"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAskForm(false)}
                    className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-bold hover:bg-gray-700 cursor-pointer"
                  >
                    {isBn ? "বাতিল" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl gold-gradient text-emerald-950 text-xs font-bold hover:brightness-110 shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isBn ? "প্রশ্ন জমা দিন" : "Submit Question"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
