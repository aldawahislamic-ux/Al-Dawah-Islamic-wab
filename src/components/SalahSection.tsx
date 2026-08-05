import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { BookOpen, CheckCircle, Info, ArrowLeft, ArrowRight, Eye, RefreshCw, Layers, Heart, X } from "lucide-react";

type Language = "bn" | "en";

export default function SalahSection() {
  const { language, setLanguage, t } = useLanguage();
  const lang: Language = language === "bn" ? "bn" : "en";
  const [activeTab, setActiveTab] = useState<"steps" | "prereqs" | "rakahs">("steps");
  const [currentStep, setCurrentStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  // Namaz prerequisites
  const prereqs = {
    bn: [
      { title: "শরীর পবিত্র করা", desc: "শরীরকে সব ধরণের অপবিত্রতা থেকে ওযু, গোসল বা তায়াম্মুমের মাধ্যমে পবিত্র করা।" },
      { title: "পোশাক পবিত্র করা", desc: "পরিহিত পোশাক পরিচ্ছন্ন ও পবিত্র হওয়া আবশ্যক।" },
      { title: "নামাজের স্থান পবিত্র হওয়া", desc: "যে স্থানে সালাত আদায় করা হবে তা পরিষ্কার-পরিচ্ছন্ন হওয়া।" },
      { title: "সতর ঢাকা", desc: "পুরুষদের জন্য নাভি থেকে হাঁটু পর্যন্ত এবং নারীদের জন্য মুখমন্ডল, কব্জি ও পায়ের পাতা বাদে পুরো শরীর ঢাকা।" },
      { title: "কিবলামুখী হওয়া", desc: "কাবা শরীফের (পশ্চিম দিকে) মুখ করে দাঁড়ানো।" },
      { title: "ওয়াক্ত হওয়া", desc: "নির্দিষ্ট নামাজের জন্য নির্ধারিত ওয়াক্ত বা সময় হওয়া।" },
      { title: "নিয়ত করা", desc: "মনে মনে নির্দিষ্ট নামাজের নিয়ত বা সংকল্প করা।" }
    ],
    en: [
      { title: "Purification of Body", desc: "Ensuring the body is clean from all impurities through Wudu (ablution), Ghusl (bath), or Tayammum." },
      { title: "Cleanliness of Clothes", desc: "The clothes worn during prayer must be clean and free from impurities." },
      { title: "Cleanliness of Place", desc: "The ground or mat where the prayer is performed must be clean." },
      { title: "Covering of Satr (Awrah)", desc: "For men, from navel to knees; for women, the entire body except face, hands up to wrists, and feet." },
      { title: "Facing Qiblah", desc: "Facing the direction of the Holy Kaaba in Makkah." },
      { title: "Proper Timing", desc: "Performing the specific prayer within its prescribed time slot." },
      { title: "Intention (Niyyah)", desc: "Making a sincere mental intention in the heart for the specific prayer." }
    ]
  };

  // Namaz steps
  const steps = [
    {
      id: 1,
      title: { bn: "১. তাকবীরে তাহরিমা (নিয়ত ও আরম্ভ)", en: "1. Takbeer-e-Tahrima (Beginning)" },
      action: {
        bn: "দুই হাত কান পর্যন্ত (মহিলাদের জন্য কাঁধ পর্যন্ত) উঠিয়ে 'আল্লাহু আকবার' বলে হাত বাঁধা। দৃষ্টি সেজদার জায়গায় রাখা।",
        en: "Raise both hands to the ears (shoulders for women) and recite 'Allahu Akbar' (Allah is the Greatest), then fold your hands. Keep your gaze focused on the place of prostration."
      },
      arabic: "اللَّهُ أَكْبَرُ",
      pronunciation: {
        bn: "আল্লাহু আকবার",
        en: "Allahu Akbar"
      },
      translation: {
        bn: "আল্লাহ তাআলা মহানতম / সবচেয়ে বড়।",
        en: "Allah is the Greatest."
      }
    },
    {
      id: 2,
      title: { bn: "২. সানা ও ক্বিরাআত (দাঁড়ানো অবস্থা)", en: "2. Qiyam, Sana & Recitation" },
      action: {
        bn: "হাত বাঁধার পর সানা পাঠ করা, তারপর আউযুবিল্লাহ, বিসমিল্লাহ সহ সূরা আল-ফাতিহা পড়া এবং সাথে অন্য একটি সূরা মিলানো।",
        en: "After folding hands, recite the opening praise (Sana), then seek refuge in Allah, say Bismillah, recite Surah Al-Fatihah, and follow it with another Surah or verses from the Quran."
      },
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ",
      pronunciation: {
        bn: "সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা, ওয়া তাবারাকাসমুকা, ওয়া তাআলা জাদ্দুকা, ওয়া লা ইলাহা গাইরুকা।",
        en: "Subhanaka Allahumma wa bi-hamdika, wa tabaraka-smuka, wa ta'ala jadduka, wa la ilaha ghayruka."
      },
      translation: {
        bn: "হে আল্লাহ! আমি আপনার সপ্রশংস পবিত্রতা ঘোষণা করছি। আপনার নাম কল্যাণময়, আপনার মহিমা সর্বোচ্চ এবং আপনি ছাড়া অন্য কোনো উপাস্য নেই।",
        en: "Glory be to You, O Allah, and all praise is Yours. Blessed is Your name, exalted is Your majesty, and there is no deity worthy of worship besides You."
      }
    },
    {
      id: 3,
      title: { bn: "৩. রুকু (নত হওয়া)", en: "3. Ruku (Bowing)" },
      action: {
        bn: "'আল্লাহু আকবার' বলে রুকুতে যাওয়া। হাত দিয়ে হাঁটু শক্ত করে ধরা, পিঠ সোজা রাখা এবং ৩ বার রুকুর তাসবীহ পড়া।",
        en: "Say 'Allahu Akbar' and bow down. Clasp your knees firmly with your hands, keeping your back straight and level. Recite the praise of Ruku 3 times."
      },
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      pronunciation: {
        bn: "সুবহানা রাব্বিয়াল আজীম (৩ বার)",
        en: "Subhana Rabbiyal Azeem (3 times)"
      },
      translation: {
        bn: "আমার মহান প্রতিপালকের পবিত্রতা ঘোষণা করছি।",
        en: "Glory be to my Lord, the Supreme."
      }
    },
    {
      id: 4,
      title: { bn: "৪. কওমা (রুকু থেকে সোজা হয়ে দাঁড়ানো)", en: "4. Qawmah (Standing Straight)" },
      action: {
        bn: "রুকু থেকে সোজা হয়ে দাঁড়িয়ে রুকুর তাসবীহ শেষে দোয়া পড়া। হাত ছেড়ে সোজা হয়ে স্থির থাকা অত্যন্ত জরুরি।",
        en: "Rise from bowing while saying the praising words, then stand perfectly straight with hands on your sides before proceeding to prostration."
      },
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا لَكَ الْحَمْدُ",
      pronunciation: {
        bn: "সামিআল্লাহু লিমান হামিদাহ • রাব্বানা লাকাল হামদ",
        en: "Sami'Allahu liman hamidah • Rabbana lakal hamd"
      },
      translation: {
        bn: "আল্লাহ ওই ব্যক্তির কথা শোনেন যে তাঁর প্রশংসা করে। • হে আমাদের প্রতিপালক! সমস্ত প্রশংসা কেবল আপনারই।",
        en: "Allah listens to the one who praises Him. • Our Lord, all praise belongs to You."
      }
    },
    {
      id: 5,
      title: { bn: "৫. সাজদাহ (সিজদা বা সেজদা)", en: "5. Sajdah (Prostration)" },
      action: {
        bn: "'আল্লাহু আকবার' বলে মাটিতে কপাল, নাক, দুই হাতের তালু, দুই হাঁটু ও পায়ের পাতা রেখে সেজদাহ করা এবং ৩ বার তাসবীহ পড়া।",
        en: "Say 'Allahu Akbar' and prostrate on the ground, placing your knees, palms, nose, forehead, and toes touching the floor. Recite the Sajdah praise 3 times."
      },
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      pronunciation: {
        bn: "সুবহানা রাব্বিয়াল আলা (৩ বার)",
        en: "Subhana Rabbiyal A'la (3 times)"
      },
      translation: {
        bn: "আমার সর্বোচ্চ প্রতিপালকের পবিত্রতা ঘোষণা করছি।",
        en: "Glory be to my Lord, the Most High."
      }
    },
    {
      id: 6,
      title: { bn: "৬. জলসা (দুই সেজদার মাঝে বসা)", en: "6. Jalsah (Sitting)" },
      action: {
        bn: "প্রথম সেজদাহ থেকে 'আল্লাহু আকবার' বলে উঠে সোজা হয়ে বসা এবং স্থির হওয়া। এ সময় ক্ষমা প্রার্থনার দোয়া পড়া উত্তম।",
        en: "Rise from the first prostration saying 'Allahu Akbar' and sit upright. Pause and rest briefly while reciting this beautiful seeking of forgiveness."
      },
      arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي",
      pronunciation: {
        bn: "রাব্বিগফির লী ওয়ারহামনী",
        en: "Rabbighfir lee war-hamnee"
      },
      translation: {
        bn: "হে আমার রব! আমাকে ক্ষমা করুন এবং আমার প্রতি দয়া করুন।",
        en: "O my Lord, forgive me and have mercy upon me."
      }
    },
    {
      id: 7,
      title: { bn: "৭. দ্বিতীয় সাজদাহ", en: "7. Second Sajdah" },
      action: {
        bn: "আবারও 'আল্লাহু আকবার' বলে আগের মতই দ্বিতীয় সেজদা করা এবং ৩ বার তাসবীহ পাঠ করা। এটি সম্পন্ন হলে এক রাকাআত পূর্ণ হয়।",
        en: "Say 'Allahu Akbar' again and perform the second prostration exactly like the first one, repeating the praise 3 times."
      },
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      pronunciation: {
        bn: "সুবহানা রাব্বিয়াল আলা (৩ বার)",
        en: "Subhana Rabbiyal A'la (3 times)"
      },
      translation: {
        bn: "আমার সর্বোচ্চ প্রতিপালকের পবিত্রতা ঘোষণা করছি।",
        en: "Glory be to my Lord, the Most High."
      }
    },
    {
      id: 8,
      title: { bn: "৮. তাশাহহুদ বা আত্তাহিয়্যাতু (শেষ বৈঠক)", en: "8. Tashahhud (Final Sitting)" },
      action: {
        bn: "প্রতি দ্বিতীয় এবং শেষ রাকাআতে সেজদার পর বসে আত্তাহিয়্যাতু পাঠ করা। 'আশহাদু আল্লা ইলাহা' বলার সময় ডান হাতের তর্জনী দিয়ে ইশারা করা।",
        en: "In every second and final Rak'ah, sit down calmly and recite Tashahhud. Raise your right index finger as you bear witness to the Oneness of Allah."
      },
      arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ. أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      pronunciation: {
        bn: "আত্তাহিয়্যাতু লিল্লাহি ওয়াস-সালাওয়াতু ওয়াত-ত্বায়্যিবাতু, আসসালামু আলাইকা আইয়্যুহান-নাবিয়্যু ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু, আসসালামু আলাইনা ওয়া আলা ইবাদিল্লাহিস-সালিহীন, আশহাদু আল্লা ইলাহা ইল্লাল্লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসুলুহু।",
        en: "At-tahiyyatu lillahi was-salawatu wat-tayyibatu, as-salamu 'alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuhu, as-salamu 'alayna wa 'ala 'ibadillahis-salihin. Ash-hadu alla ilaha illallahu wa ash-hadu anna Muhammadan 'abduhu wa rasuluhu."
      },
      translation: {
        bn: "সমস্ত মৌখিক, শারীরিক ও আর্থিক ইবাদত আল্লাহর জন্য। হে নবী! আপনার প্রতি শান্তি, আল্লাহর রহমত ও বরকত বর্ষিত হোক। আমাদের উপর এবং আল্লাহর নেক বান্দাদের উপর শান্তি বর্ষিত হোক। আমি সাক্ষ্য দিচ্ছি যে আল্লাহ ছাড়া কোনো উপাস্য নেই এবং আমি আরও সাক্ষ্য দিচ্ছি যে মুহাম্মদ (সা.) আল্লাহর বান্দা ও রাসুল।",
        en: "All compliments, prayers, and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity worthy of worship except Allah, and I bear witness that Muhammad is His servant and messenger."
      }
    },
    {
      id: 9,
      title: { bn: "৯. দুরুদ ইব্রাহিম (শেষ বৈঠক)", en: "9. Durood Ibrahim (Final Sitting)" },
      action: {
        bn: "শেষ বৈঠকে তাশাহহুদের পর দুরুদ শরীফ পাঠ করা অত্যন্ত জরুরি। এটি আমাদের প্রিয় নবী হযরত মুহাম্মদ (সা.) এর ওপর রহমত কামনার দোয়া।",
        en: "After Tashahhud in the final sitting, recite the Durood Ibrahim to send prayers and peace upon our beloved Prophet Muhammad (peace be upon him)."
      },
      arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ • اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّদٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      pronunciation: {
        bn: "আল্লাহুম্মা সাল্লি আলা মুহাম্মাদিওঁ ওয়া আলা আলি মুহাম্মাদিন, কামা সাল্লাইতা আলা ইব্রাহিমা ওয়া আলা আলি ইব্রাহিমা ইন্নাকা হামিদুম মাজিদ। আল্লাহুম্মা বারিক আলা মুহাম্মাদিওঁ ওয়া আলা আলি মুহাম্মাদিন, কামা বারাকতা আলা ইব্রাহিমা ওয়া আলা আলি ইব্রাহিমা ইন্নাকা হামিদুম মাজিদ।",
        en: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin, kama sallayta 'ala Ibrahima wa 'ala ali Ibrahima, innaka Hamidum Majid. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammadin, kama barakta 'ala Ibrahima wa 'ala ali Ibrahima, innaka Hamidum Majid."
      },
      translation: {
        bn: "হে আল্লাহ! মুহাম্মদ (সা.) ও তাঁর বংশধরদের ওপর শান্তি বর্ষণ করুন, যেমন বর্ষণ করেছিলেন ইব্রাহিম (আ.) ও তাঁর বংশধরদের ওপর। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত। হে আল্লাহ! মুহাম্মদ (সা.) ও তাঁর বংশধরদের ওপর বরকত নাজিল করুন, যেমন নাজিল করেছিলেন ইব্রাহিম (আ.) ও তাঁর বংশধরদের ওপর। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত।",
        en: "O Allah, bestow Your favor upon Muhammad and upon the family of Muhammad, as You bestowed favor upon Ibrahim and upon the family of Ibrahim. Verily, You are Full of Praise, Full of Glory. O Allah, bless Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim. Verily, You are Full of Praise, Full of Glory."
      }
    },
    {
      id: 10,
      title: { bn: "১০. দোয়া মাসূরা ও সালাম (সমাপ্তি)", en: "10. Dua Masurah & Salaam (Ending)" },
      action: {
        bn: "দুরুদ পাঠ শেষে ক্ষমা প্রার্থনার যেকোনো দোয়া মাসূরা পড়ে প্রথমে ডান দিকে এবং পরে বাম দিকে মুখ ঘুরিয়ে 'আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ' বলে নামাজ শেষ করা।",
        en: "Recite Dua Masurah (or any supplicatory prayer from Quran/Sunnah), then turn your face to the right saying 'As-salamu alaykum wa rahmatullah', then to the left to complete your prayer."
      },
      arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ • السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
      pronunciation: {
        bn: "আল্লাহুম্মা ইন্নী জলামতু নাফসী জুলমান কাসীরাঁও ওয়া লা ইয়াগফিরুজ-জুনূবা ইল্লা আনতা, ফাগফির লী মাগফিরাতাম-মিন ইন্দিকা ওয়ারহামনী ইন্নাকা আনতাল গাফুরুর রাহীম। • আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ (প্রথমে ডানে, পরে বামে)",
        en: "Allahumma innee zalamtu nafsee zulman katheeran wa la yaghfiruz-zunooba illa anta, faghfir lee maghfiratan min 'indika war-hamnee innaka antal Ghafoorur-Raheem. • As-salamu 'alaykum wa rahmatullah (Right, then Left)"
      },
      translation: {
        bn: "হে আল্লাহ! আমি নিজের প্রতি চরম জুলুম করেছি, আর আপনি ছাড়া গুনাহ ক্ষমা করার আর কেউ নেই। অতএব আপনার পক্ষ থেকে আমাকে ক্ষমা করুন এবং আমার প্রতি দয়া করুন। নিশ্চয়ই আপনি ক্ষমাশীল ও পরম দয়ালু। • আপনাদের ওপর শান্তি ও আল্লাহর রহমত বর্ষিত হোক।",
        en: "O Allah, I have greatly wronged myself, and no one forgives sins except You. So grant me forgiveness from You and have mercy upon me. Verily, You are the Oft-Forgiving, the Most Merciful. • Peace and mercy of Allah be upon you."
      }
    }
  ];

  // Rak'ah distributions
  const rakahs = {
    bn: [
      { name: "ফজর (Fajr)", time: "ভোর থেকে সূর্যোদয়ের পূর্ব পর্যন্ত", fard: "২ রাকাআত", sunnah: "২ রাকাআত (মুয়াক্কাদাহ)", witr: "-", total: "৪ রাকাআত" },
      { name: "যোহর (Dhuhr)", time: "দুপুরের পর থেকে আসরের পূর্ব পর্যন্ত", fard: "৪ রাকাআত", sunnah: "৪ + ২ রাকাআত (মুয়াক্কাদাহ)", witr: "-", total: "১০ বা ১২ রাকাআত" },
      { name: "আসর (Asr)", time: "সূর্য হলদেটে হওয়ার পূর্ব পর্যন্ত", fard: "৪ রাকাআত", sunnah: "৪ রাকাআত (গাইর-মুয়াক্কাদাহ)", witr: "-", total: "৪ বা ৮ রাকাআত" },
      { name: "মাগরিব (Maghrib)", time: "সূর্যাস্তের পর থেকে গোধূলি শেষ হওয়া পর্যন্ত", fard: "৩ রাকাআত", sunnah: "২ রাকাআত (মুয়াক্কাদাহ)", witr: "-", total: "৫ বা ৭ রাকাআত" },
      { name: "এশা (Isha)", time: "রাত থেকে সুবহে সাদিকের পূর্ব পর্যন্ত", fard: "৪ রাকাআত", sunnah: "৪ + ২ রাকাআত", witr: "৩ রাকাআত (ওয়াজিব)", total: "৯ বা ১৭ রাকাআত" }
    ],
    en: [
      { name: "Fajr", time: "Dawn to sunrise", fard: "2 Rak'ahs", sunnah: "2 Rak'ahs (Mu'akkadah)", witr: "-", total: "4 Rak'ahs" },
      { name: "Dhuhr", time: "Past noon until mid-afternoon", fard: "4 Rak'ahs", sunnah: "4 + 2 Rak'ahs (Mu'akkadah)", witr: "-", total: "10 or 12 Rak'ahs" },
      { name: "Asr", time: "Mid-afternoon to sunset", fard: "4 Rak'ahs", sunnah: "4 Rak'ahs (Non-Mu'akkadah)", witr: "-", total: "4 or 8 Rak'ahs" },
      { name: "Maghrib", time: "Just after sunset to twilight end", fard: "3 Rak'ahs", sunnah: "2 Rak'ahs (Mu'akkadah)", witr: "-", total: "5 or 7 Rak'ahs" },
      { name: "Isha", time: "Nightfall until pre-dawn", fard: "4 Rak'ahs", sunnah: "4 + 2 Rak'ahs", witr: "3 Rak'ahs (Wajib)", total: "9 or 17 Rak'ahs" }
    ]
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section id="salah-guide" className={`relative py-24 px-6 overflow-hidden bg-transparent transition-all duration-300 ${isExpanded ? "z-50" : "z-10"}`}>
      {/* Background Decorative Frame */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gold-lux/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-lux/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-10">
          <span className="font-serif-lux text-gold-lux text-xs tracking-[0.4em] uppercase block mb-3">
            The Pillars of Islam
          </span>
          <h2 className="font-serif-lux text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 tracking-wider">
            {lang === "bn" ? "নামাজের সঠিক নিয়ম" : "Correct Rules of Salah / Prayer"}
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold-lux to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-bengali">
            {lang === "bn" 
              ? "শুদ্ধভাবে সালাত আদায়ের সচিত্র চমৎকার গাইডলাইন। বাংলা ও ইংরেজি অনুবাদের সাথে তাজবীদভিত্তিক উচ্চারণ সহ নামাজ শিখুন।"
              : "Comprehensive visual & textual step-by-step guide to perform Salah correctly. Includes Arabic text, phonetics, and translation."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="collapsed-salah-cta"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsExpanded(true)}
              className="max-w-xl mx-auto glass-panel border border-gold-lux/15 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden bg-emerald-deep/40 backdrop-blur-md shadow-2xl hover:border-gold-lux/40 transition-all duration-300 cursor-pointer group"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-gold-lux/5 rounded-full blur-2xl pointer-events-none group-hover:bg-gold-lux/10 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-lux/5 rounded-full blur-2xl pointer-events-none" />

              {/* Decorative Pulsing Icon Holder */}
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 bg-gold-lux/10 rounded-full animate-ping opacity-75" />
                <div className="relative w-16 h-16 rounded-full bg-[#032317] border border-gold-lux/30 flex items-center justify-center text-gold-lux shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:border-gold-lux transition-colors duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-gold-lux group-hover:scale-110 transition-transform duration-300"
                  >
                    {/* Mihrab Archway */}
                    <path d="M4 22V12c0-4.4 3.6-8 8-8s8 3.6 8 8v10" strokeWidth="1.5" fill="currentColor" fillOpacity="0.03" />
                    {/* Dome Top peak */}
                    <path d="M12 4V1" strokeWidth="1.5" />
                    <path d="M10 2.5h4" strokeWidth="1.2" />
                    {/* Hanging Mosque Lamp (representing guidance/Noor in Salah) */}
                    <path d="M12 4v4" strokeWidth="1" opacity="0.6" />
                    <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
                    {/* Prayer Mat (Janamaz) at bottom */}
                    <path d="M7 21h10v-3.5c0-.8-.7-1.5-1.5-1.5h-7c-.8 0-1.5.7-1.5 1.5V21z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.1" />
                    {/* Inner carpet design */}
                    <path d="M12 17.5v2" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              <h3 className="font-serif-lux text-xl sm:text-2xl font-bold text-white mb-3 tracking-wide group-hover:text-gold-lux transition-colors duration-300">
                {lang === "bn" ? "পূর্ণাঙ্গ সালাত নির্দেশিকা" : "Complete Salah Directory"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-bengali mb-6">
                {lang === "bn"
                  ? "নামাজের ওয়াজিব, আরকান-আহকাম, ১০টি ধাপে সচিত্র বিবরণ, পূর্বপ্রস্তুতি এবং ৫ ওয়াক্ত নামাজের সঠিক রাকাআত সম্বলিত সম্পূর্ণ নির্দেশিকা।"
                  : "Includes steps, prerequisites, essential conditions, translations, and complete Rak'ah charts for all daily prayers."}
              </p>

              {/* Majestic Dual Language Toggle Inside Teaser */}
              <div className="flex justify-center gap-2 mb-8">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLanguage("bn");
                  }}
                  className={`px-3 py-1 rounded-full border text-[10px] font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    lang === "bn"
                      ? "bg-gold-lux border-gold-lux text-emerald-deep font-bold"
                      : "border-gold-lux/20 text-gold-lux hover:bg-gold-lux/5"
                  }`}
                >
                  বাংলা (BN)
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLanguage("en");
                  }}
                  className={`px-3 py-1 rounded-full border text-[10px] font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    lang === "en"
                      ? "bg-gold-lux border-gold-lux text-emerald-deep font-bold"
                      : "border-gold-lux/20 text-gold-lux hover:bg-gold-lux/5"
                  }`}
                >
                  English (EN)
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-lux to-gold-light text-emerald-deep font-bold text-xs sm:text-sm tracking-wider rounded-2xl shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:scale-[1.03] transition-all duration-300 cursor-pointer uppercase flex items-center justify-center gap-2.5 mx-auto"
              >
                <BookOpen className="w-4 h-4" />
                <span>{lang === "bn" ? "নিয়মগুলো দেখতে এখানে চাপুন" : "Click to View Rules"}</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="expanded-salah-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 bg-[#02140d]/98 backdrop-blur-xl text-gray-100 flex flex-col overflow-hidden font-sans"
            >
              {/* FIXED TOP BAR */}
              <div className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:p-6 border-b border-gold-lux/10 bg-[#032317]/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gold-lux/30 bg-gold-lux/5 flex items-center justify-center text-gold-lux shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-gold-lux animate-pulse"
                    >
                      {/* Mihrab Archway */}
                      <path d="M4 22V12c0-4.4 3.6-8 8-8s8 3.6 8 8v10" strokeWidth="1.5" fill="currentColor" fillOpacity="0.03" />
                      {/* Dome Top peak */}
                      <path d="M12 4V1" strokeWidth="1.5" />
                      {/* Hanging Mosque Lamp */}
                      <path d="M12 4v4" strokeWidth="1" opacity="0.6" />
                      <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
                      {/* Prayer Mat (Janamaz) at bottom */}
                      <path d="M7 21h10v-3.5c0-.8-.7-1.5-1.5-1.5h-7c-.8 0-1.5.7-1.5 1.5V21z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.1" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h2 className="font-serif-lux text-base sm:text-lg font-bold text-white tracking-wide">
                      {lang === "bn" ? "পূর্ণাঙ্গ সালাত গাইড" : "Complete Salah Guide"}
                    </h2>
                    <p className="text-[10px] text-gray-400 font-bengali">
                      {lang === "bn" ? "সালাত আদায়ের সচিত্র চমৎকার গাইডলাইন ও নিয়মাবলী" : "Detailed step-by-step rules and guidance for daily prayers"}
                    </p>
                  </div>
                </div>

                {/* Controls: Back & Lang toggle */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* LANGUAGE TOGGLE */}
                  <div className="flex gap-1 bg-emerald-deep/60 p-1 rounded-full border border-gold-lux/10">
                    <button
                      onClick={() => setLanguage("bn")}
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                        lang === "bn"
                          ? "bg-gold-lux text-emerald-deep font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      বাংলা
                    </button>
                    <button
                      onClick={() => setLanguage("en")}
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                        lang === "en"
                          ? "bg-gold-lux text-emerald-deep font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      English
                    </button>
                  </div>

                  <button
                    onClick={() => setIsExpanded(false)}
                    className="flex items-center gap-2 px-4 py-2 border border-gold-lux/30 hover:border-gold-lux rounded-full bg-emerald-deep/50 text-gold-lux hover:text-white text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer font-bengali shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:bg-gold-lux/10"
                  >
                    <X className="w-4 h-4" />
                    <span>{lang === "bn" ? "বন্ধ করুন" : "Close"}</span>
                  </button>
                </div>
              </div>

              {/* SCROLLABLE MAIN CONTENT */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full relative z-10">
                {/* Decorative Glowing Elements */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-gold-lux/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-emerald-lux/10 rounded-full blur-3xl pointer-events-none" />

                {/* CONTROLS & MAIN TAB SECTIONS */}
                <div className="flex justify-center border-b border-gold-lux/15 mb-8 max-w-md mx-auto w-full relative z-10">
                  <button
                    onClick={() => setActiveTab("steps")}
                    className={`flex-1 pb-4 text-xs sm:text-sm tracking-wider font-semibold transition-all duration-300 cursor-pointer text-center relative ${
                      activeTab === "steps" ? "text-gold-lux" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {lang === "bn" ? "ধাপসমূহ" : "Step-by-Step"}
                    {activeTab === "steps" && (
                      <motion.div layoutId="activeSalahTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-lux" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("prereqs")}
                    className={`flex-1 pb-4 text-xs sm:text-sm tracking-wider font-semibold transition-all duration-300 cursor-pointer text-center relative ${
                      activeTab === "prereqs" ? "text-gold-lux" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {lang === "bn" ? "পূর্বপ্রস্তুতি" : "Prerequisites"}
                    {activeTab === "prereqs" && (
                      <motion.div layoutId="activeSalahTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-lux" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("rakahs")}
                    className={`flex-1 pb-4 text-xs sm:text-sm tracking-wider font-semibold transition-all duration-300 cursor-pointer text-center relative ${
                      activeTab === "rakahs" ? "text-gold-lux" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {lang === "bn" ? "নামাজের রাকাআত" : "Rak'ah Chart"}
                    {activeTab === "rakahs" && (
                      <motion.div layoutId="activeSalahTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-lux" />
                    )}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {/* TAB 1: STEPS ENGINE */}
                  {activeTab === "steps" && (
                    <motion.div
                      key="steps-panel"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
                    >
                      {/* Left Panel: Steps Carousel list */}
                      <div className="lg:col-span-4 flex flex-col gap-2.5 max-h-[500px] overflow-y-auto p-2 glass-panel border border-gold-lux/15 rounded-2xl bg-[#021810]/65 backdrop-blur-md">
                        <span className="text-[10px] uppercase text-gold-lux tracking-[0.2em] px-3 pt-2 font-bold block">
                          {lang === "bn" ? "১০টি গুরুত্বপূর্ণ ধাপ" : "10 Key Steps"}
                        </span>
                        {steps.map((step, idx) => (
                          <button
                            key={step.id}
                            onClick={() => setCurrentStep(idx)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center gap-3.5 cursor-pointer ${
                              currentStep === idx
                                ? "bg-gold-lux border-gold-lux text-emerald-deep font-bold shadow-[0_4px_15px_rgba(212,175,55,0.15)]"
                                : "bg-[#032317]/40 border-gold-lux/10 text-gray-300 hover:bg-gold-lux/5 hover:border-gold-lux/30"
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              currentStep === idx ? "bg-emerald-deep text-gold-lux" : "bg-gold-lux/10 text-gold-lux"
                            }`}>
                              {step.id}
                            </div>
                            <span className="text-xs sm:text-sm font-semibold truncate leading-tight">
                              {lang === "bn" ? step.title.bn.replace(/^\d+\.\s*/, "") : step.title.en.replace(/^\d+\.\s*/, "")}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Right Panel: Active Step Visual Card */}
                      <div className="lg:col-span-8 flex flex-col gap-6 border border-gold-lux/20 rounded-3xl glass-panel bg-[#041d14]/60 backdrop-blur-md relative shadow-2xl p-6 sm:p-8">
                        {/* Decorative glowing dome background */}
                        <div className="absolute top-0 right-0 w-44 h-44 bg-gold-lux/5 rounded-full blur-3xl pointer-events-none" />

                        {/* Step Header */}
                        <div className="border-b border-gold-lux/15 pb-5 flex justify-between items-center relative z-10">
                          <div className="text-left">
                            <span className="text-[10px] text-gold-lux font-serif-lux uppercase tracking-widest block mb-1">
                              {lang === "bn" ? `ধাপ ${currentStep + 1} / ১০` : `STEP ${currentStep + 1} OF 10`}
                            </span>
                            <h3 className="font-serif-lux text-xl sm:text-2xl font-bold text-white tracking-wide">
                              {lang === "bn" ? steps[currentStep].title.bn : steps[currentStep].title.en}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 bg-gold-lux/10 border border-gold-lux/25 rounded-full px-3 py-1 text-gold-lux text-[10px] uppercase font-bold tracking-wider">
                            <CheckCircle className="w-3 h-3" />
                            <span>{lang === "bn" ? "ফরয/ওয়াজিব" : "Essential"}</span>
                          </div>
                        </div>

                        {/* Main Content Pane */}
                        <div className="flex flex-col gap-6 justify-center relative z-10 text-left">
                          {/* Action Instruction */}
                          <div className="bg-[#032317]/80 border-l-4 border-gold-lux p-4 rounded-r-xl">
                            <h4 className="text-[10px] uppercase tracking-wider text-gold-lux font-bold mb-1 flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5" />
                              {lang === "bn" ? "করণীয় কাজ:" : "Physical Action:"}
                            </h4>
                            <p className="font-bengali text-xs sm:text-sm text-gray-200 leading-relaxed">
                              {lang === "bn" ? steps[currentStep].action.bn : steps[currentStep].action.en}
                            </p>
                          </div>

                          {/* Sacred Arabic Text */}
                          <div className="text-center py-6 px-4 bg-emerald-deep/30 rounded-2xl border border-gold-lux/10 my-2">
                            <span className="text-[10px] text-gold-lux uppercase tracking-widest block mb-3 font-semibold">
                              {lang === "bn" ? "পবিত্র উচ্চারণ (আরবি)" : "Sacred Recitation (Arabic)"}
                            </span>
                            <p className="text-2xl sm:text-3xl font-serif-lux text-gold-lux tracking-wide leading-loose select-all font-medium py-2">
                              {steps[currentStep].arabic}
                            </p>
                          </div>

                          {/* Pronunciation & Translation details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Pronunciation */}
                            <div className="bg-emerald-deep/20 p-4 rounded-xl border border-gold-lux/5">
                              <span className="text-[10px] text-gold-lux font-bold uppercase tracking-wider block mb-1.5">
                                {lang === "bn" ? "বাংলা উচ্চারণ:" : "Transliteration / Pronunciation:"}
                              </span>
                              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                                {lang === "bn" ? steps[currentStep].pronunciation.bn : steps[currentStep].pronunciation.en}
                              </p>
                            </div>

                            {/* Translation */}
                            <div className="bg-emerald-deep/20 p-4 rounded-xl border border-gold-lux/5">
                              <span className="text-[10px] text-gold-lux font-bold uppercase tracking-wider block mb-1.5">
                                {lang === "bn" ? "অনুবাদ ও অর্থ:" : "Meaning / Translation:"}
                              </span>
                              <p className="font-bengali text-xs sm:text-sm text-gray-300 leading-relaxed">
                                {lang === "bn" ? steps[currentStep].translation.bn : steps[currentStep].translation.en}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Footer Carousel controls */}
                        <div className="border-t border-gold-lux/15 pt-6 flex justify-between items-center relative z-10 gap-2">
                          <button
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-gold-lux/20 text-gold-lux disabled:opacity-30 disabled:pointer-events-none hover:bg-gold-lux/10 hover:border-gold-lux transition-all cursor-pointer whitespace-nowrap"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{lang === "bn" ? "পূর্ববর্তী" : "Previous"}</span>
                          </button>

                          <div className="flex gap-1.5 overflow-x-auto py-1">
                            {steps.map((_, i) => (
                              <div
                                key={i}
                                onClick={() => setCurrentStep(i)}
                                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 flex-shrink-0 ${
                                  currentStep === i ? "bg-gold-lux w-5" : "bg-gold-lux/20 hover:bg-gold-lux/45"
                                }`}
                              />
                            ))}
                          </div>

                          <button
                            onClick={handleNext}
                            disabled={currentStep === steps.length - 1}
                            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gold-lux text-emerald-deep hover:bg-gold-light font-bold transition-all cursor-pointer whitespace-nowrap"
                          >
                            <span>{lang === "bn" ? "পরবর্তী" : "Next"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: PREREQUISITES */}
                  {activeTab === "prereqs" && (
                    <motion.div
                      key="prereqs-panel"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
                    >
                      {prereqs[lang].map((item, i) => (
                        <div
                          key={i}
                          className="glass-panel p-6 rounded-2xl border border-gold-lux/15 hover:border-gold-lux/40 transition-all duration-500 bg-emerald-deep/40 hover:-translate-y-1 relative group text-left"
                        >
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-lux/5 rounded-bl-full pointer-events-none group-hover:bg-gold-lux/10 transition-all duration-500" />
                          <div className="w-9 h-9 rounded-xl bg-gold-lux/5 border border-gold-lux/25 flex items-center justify-center text-gold-lux text-sm font-bold mb-4 shadow-[0_0_10px_rgba(212,175,55,0.05)]">
                            {i + 1}
                          </div>
                          <h4 className="font-serif-lux text-base sm:text-lg font-bold text-white mb-2 tracking-wide group-hover:text-gold-lux transition-colors duration-300">
                            {item.title}
                          </h4>
                          <p className="font-bengali text-xs sm:text-sm text-gray-400 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* TAB 3: RAKAH distributions */}
                  {activeTab === "rakahs" && (
                    <motion.div
                      key="rakahs-panel"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-x-auto glass-panel rounded-3xl border border-gold-lux/15 p-1 bg-[#021810]/65 backdrop-blur-md relative z-10"
                    >
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="border-b border-gold-lux/15 text-gold-lux text-xs uppercase tracking-wider font-semibold">
                            <th className="px-6 py-4">{lang === "bn" ? "নামাজ" : "Salah Prayer"}</th>
                            <th className="px-6 py-4">{lang === "bn" ? "সময়সূচী / ওয়াক্ত" : "Time Window"}</th>
                            <th className="px-6 py-4">{lang === "bn" ? "ফরয রাকাআত" : "Fard Rakahs"}</th>
                            <th className="px-6 py-4">{lang === "bn" ? "সুন্নাত রাকাআত" : "Sunnah Rakahs"}</th>
                            <th className="px-6 py-4">{lang === "bn" ? "বিতর (ওয়াজিব)" : "Witr (Wajib)"}</th>
                            <th className="px-6 py-4">{lang === "bn" ? "মোট রাকাআত" : "Total Rakahs"}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gold-lux/5 text-xs sm:text-sm text-gray-300">
                          {rakahs[lang].map((row, i) => (
                            <tr
                              key={i}
                              className="hover:bg-gold-lux/5 transition-colors duration-200"
                            >
                              <td className="px-6 py-4 font-bold text-white">{row.name}</td>
                              <td className="px-6 py-4 text-gray-400 italic font-bengali text-left">{row.time}</td>
                              <td className="px-6 py-4 text-emerald-lux font-semibold">{row.fard}</td>
                              <td className="px-6 py-4 text-gold-lux">{row.sunnah}</td>
                              <td className="px-6 py-4 text-orange-200">{row.witr}</td>
                              <td className="px-6 py-4 font-semibold text-white">{row.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom return button to collapse */}
                <div className="flex justify-center mt-12 mb-8 relative z-10">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="flex items-center gap-2 px-6 py-3 border border-gold-lux/30 hover:border-gold-lux rounded-full bg-[#032317]/80 text-gold-lux hover:text-white text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer font-bengali shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:scale-105"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{lang === "bn" ? "পড়া শেষ (ফিরে যান)" : "Done Reading (Go Back)"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Tips Callout */}
        <div className="mt-12 glass-panel p-5 rounded-2xl border border-gold-lux/10 bg-emerald-deep/20 flex flex-col sm:flex-row gap-4 items-center max-w-2xl mx-auto text-left">
          <div className="w-10 h-10 rounded-full border border-gold-lux/35 flex items-center justify-center text-gold-lux bg-gold-lux/5 flex-shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-serif-lux text-xs sm:text-sm font-bold text-white mb-0.5 tracking-wide">
              {lang === "bn" ? "গুরুত্বপূর্ণ টিপস:" : "Important Etiquette:"}
            </h5>
            <p className="text-gray-400 text-xs leading-relaxed font-bengali">
              {lang === "bn" 
                ? "সালাত আদায়ের সময় খুশু-খুযু (বিনয় ও গভীর মনোযোগ) বজায় রাখুন। দ্রুত নামাজ না পড়ে ধীরে-সুস্থে ও শান্তভাবে রুকু-সেজদা আদায় করা নামাজের অন্যতম ওয়াজিব কাজ।"
                : "Ensure you pray with Khushu (humility and deep concentration). Pausing and executing each bow, standing, and prostration calmly is essential for the validity of prayer."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
