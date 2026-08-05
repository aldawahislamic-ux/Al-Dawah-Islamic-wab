export interface SurahMetadata {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  textAr: string;
  textEn: string;
  textBn: string;
  textLang?: string;
  langName?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  youtubeUrl: string;
  speaker: string;
  category: string;
}

export interface ContactInfo {
  platform: "facebook" | "youtube" | "whatsapp" | "email";
  url: string;
  label: string;
  username: string;
}

export interface Hadith {
  id: number;
  category: string;
  textAr: string;
  textBn: string;
  textEn: string;
  source: string;
  grade: string;
}

