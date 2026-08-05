import { ASMAUL_HUSNA_99, AllahName } from "../components/AsmaulHusnaView";
import { ISLAMIC_BABY_NAMES, IslamicBabyName } from "../components/IslamicBabyNamesView";
import { MASNOON_DUAS, MasnoonDua } from "../components/MasnoonDuasView";
import { surahsMetadata } from "../data/surahsMetadata";
import { hadithsData } from "../data/hadithsData";
import { ISLAMIC_FEATURES } from "../components/IslamicFeaturesSuite";

export type SearchResultType = "allah_name" | "baby_name" | "surah" | "hadith" | "dua" | "feature";

export interface GlobalSearchResult {
  id: string;
  type: SearchResultType;
  titleBn: string;
  titleEn: string;
  arabic?: string;
  subtitleBn: string;
  subtitleEn: string;
  categoryBn: string;
  categoryEn: string;
  badgeText?: string;
  targetTab: string; // e.g. "quran", "hadith", "islamic-features"
  subFeatureId?: string; // e.g. "asmaul-husna", "baby-names", "duas", etc.
  rawItem?: any;
}

// Normalize text for fuzzy multi-language matching
function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[-_'"’`.,()]/g, "")
    .replace(/\s+/g, " ");
}

export function searchGlobalIslamicData(query: string): GlobalSearchResult[] {
  const q = normalizeText(query);
  if (!q || q.length < 1) return [];

  const results: GlobalSearchResult[] = [];

  // 1. Search Allah's 99 Names
  ASMAUL_HUSNA_99.forEach((item) => {
    const matchStr = normalizeText(
      `${item.ar} ${item.bn} ${item.en} ${item.transliteration} ${item.meanBn} ${item.meanEn} ${item.virtueBn} ${item.virtueEn}`
    );
    if (matchStr.includes(q)) {
      results.push({
        id: `allah-${item.id}`,
        type: "allah_name",
        titleBn: `${item.id}. ${item.bn} (${item.ar})`,
        titleEn: `${item.id}. ${item.en} (${item.ar})`,
        arabic: item.ar,
        subtitleBn: `অর্থ: ${item.meanBn}`,
        subtitleEn: `Meaning: ${item.meanEn}`,
        categoryBn: "আল্লাহর ৯৯টি পবিত্র নাম",
        categoryEn: "99 Names of Allah",
        badgeText: "আসমাউল হুসনা",
        targetTab: "islamic-features",
        subFeatureId: "allah-names",
        rawItem: item,
      });
    }
  });

  // 2. Search Islamic Baby Names
  ISLAMIC_BABY_NAMES.forEach((item) => {
    const genderLabelBn = item.gender === "boy" ? "ছেলেদের নাম" : "মেয়েদের নাম";
    const genderLabelEn = item.gender === "boy" ? "Boy Name" : "Girl Name";
    const matchStr = normalizeText(
      `${item.nameAr} ${item.nameBn} ${item.nameEn} ${item.meanBn} ${item.meanEn} ${item.originBn} ${item.originEn} ${genderLabelBn} ${genderLabelEn}`
    );
    if (matchStr.includes(q)) {
      results.push({
        id: `baby-${item.id}`,
        type: "baby_name",
        titleBn: `${item.nameBn} (${item.nameAr}) - ${genderLabelBn}`,
        titleEn: `${item.nameEn} (${item.nameAr}) - ${genderLabelEn}`,
        arabic: item.nameAr,
        subtitleBn: `অর্থ: ${item.meanBn}`,
        subtitleEn: `Meaning: ${item.meanEn}`,
        categoryBn: "ইসলামিক সুন্দর নাম",
        categoryEn: "Islamic Baby Names",
        badgeText: genderLabelBn,
        targetTab: "islamic-features",
        subFeatureId: "names",
        rawItem: item,
      });
    }
  });

  // 3. Search Surahs of Holy Quran
  surahsMetadata.forEach((surah) => {
    const matchStr = normalizeText(
      `${surah.number} ${surah.name} ${surah.englishName} ${surah.englishNameTranslation} Surah ${surah.revelationType}`
    );
    // Add common bangla transliterated surah names
    const surahBnMap: Record<number, string> = {
      1: "আল-ফাতেহা সূরা ফাতেহা fatiha",
      2: "আল-বাকারা সূরা বাকারা baqarah",
      3: "আলে ইমরান imran",
      4: "আন-নিসা nisa",
      5: "আল-মায়েদা maidah",
      18: "আল-কাহফ সূরা কাহফ kahf",
      36: "ইয়াসীন সূরা ইয়াসীন yaseen yasin",
      55: "আর-রহমান সূরা রহমান rahman",
      56: "আল-ওয়াকিয়াহ waqiah",
      67: "আল-মুলক সূরা মুলক mulk",
      112: "আল-ইখলাস ikhlas",
      113: "আল-ফালাক falaq",
      114: "আন-নাস nas",
    };
    const extraBn = surahBnMap[surah.number] || "";
    if (matchStr.includes(q) || normalizeText(extraBn).includes(q)) {
      results.push({
        id: `surah-${surah.number}`,
        type: "surah",
        titleBn: `সূরা ${surah.englishName} (${surah.name}) - সূরা নং ${surah.number}`,
        titleEn: `Surah ${surah.englishName} (${surah.name}) - No. ${surah.number}`,
        arabic: surah.name,
        subtitleBn: `অর্থ: ${surah.englishNameTranslation} | আয়াত: ${surah.numberOfAyahs}`,
        subtitleEn: `Translation: ${surah.englishNameTranslation} | Verses: ${surah.numberOfAyahs}`,
        categoryBn: "পবিত্র কুরআনুল কারীম",
        categoryEn: "Holy Quran Surahs",
        badgeText: `সূরা ${surah.number}`,
        targetTab: "quran",
        rawItem: surah,
      });
    }
  });

  // 4. Search Sahih Hadiths
  hadithsData.forEach((hadith) => {
    const matchStr = normalizeText(
      `${hadith.id} ${hadith.category} ${hadith.source} ${hadith.textAr} ${hadith.textBn} ${hadith.textEn}`
    );
    if (matchStr.includes(q)) {
      results.push({
        id: `hadith-${hadith.id}`,
        type: "hadith",
        titleBn: `সহিহ হাদিস #${hadith.id} - ${hadith.category}`,
        titleEn: `Sahih Hadith #${hadith.id} - ${hadith.category}`,
        arabic: hadith.textAr.substring(0, 40) + "...",
        subtitleBn: `${hadith.textBn.substring(0, 75)}... (${hadith.source})`,
        subtitleEn: `${hadith.textEn.substring(0, 75)}... (${hadith.source})`,
        categoryBn: "সহিহ হাদিস শরীফ",
        categoryEn: "Sahih Hadith Collection",
        badgeText: hadith.source.split(",")[0],
        targetTab: "hadith",
        rawItem: hadith,
      });
    }
  });

  // 5. Search Masnoon Duas & Dhikr
  MASNOON_DUAS.forEach((dua) => {
    const matchStr = normalizeText(
      `${dua.titleBn} ${dua.titleEn} ${dua.arabic} ${dua.pronunciationBn} ${dua.pronunciationEn} ${dua.meaningBn} ${dua.meaningEn} ${dua.referenceBn}`
    );
    if (matchStr.includes(q)) {
      results.push({
        id: `dua-${dua.id}`,
        type: "dua",
        titleBn: dua.titleBn,
        titleEn: dua.titleEn,
        arabic: dua.arabic.substring(0, 40) + "...",
        subtitleBn: `অর্থ: ${dua.meaningBn.substring(0, 75)}...`,
        subtitleEn: `Meaning: ${dua.meaningEn.substring(0, 75)}...`,
        categoryBn: "মাসনুন দোয়া ও জিকির",
        categoryEn: "Masnoon Duas & Dhikr",
        badgeText: "দোয়া",
        targetTab: "islamic-features",
        subFeatureId: "duas",
        rawItem: dua,
      });
    }
  });

  // 6. Search Features (Qibla, Prayer Times, Zakat, Hajj, Hijri, etc.)
  ISLAMIC_FEATURES.forEach((feat) => {
    const matchStr = normalizeText(
      `${feat.titleBn} ${feat.titleEn} ${feat.subtitleBn} ${feat.subtitleEn} ${feat.id}`
    );
    if (matchStr.includes(q)) {
      results.push({
        id: `feature-${feat.id}`,
        type: "feature",
        titleBn: `${feat.emoji} ${feat.titleBn}`,
        titleEn: `${feat.emoji} ${feat.titleEn}`,
        subtitleBn: feat.subtitleBn,
        subtitleEn: feat.subtitleEn,
        categoryBn: "ইসলামিক ডিজিটাল ফিচারের তালিকা",
        categoryEn: "Islamic Suite Features",
        badgeText: "ফিচার",
        targetTab: feat.id === "quran" ? "quran" : feat.id === "hadith" ? "hadith" : "islamic-features",
        subFeatureId: feat.id,
        rawItem: feat,
      });
    }
  });

  // Limit to top 20 results for maximum performance and readability
  return results.slice(0, 25);
}
