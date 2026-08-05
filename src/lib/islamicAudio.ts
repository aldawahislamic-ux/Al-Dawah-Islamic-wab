// src/lib/islamicAudio.ts
// Rock-solid multi-source audio player for Arabic, Bangla, and English Islamic texts
// Ensures single-playback (no duplicate/triple speech) and strictly Male Voice (ছেলের কন্ঠ)

let currentAudio: HTMLAudioElement | null = null;
let activePlayId = 0;

export function playIslamicAudio(
  text: string,
  lang: "ar" | "bn" | "en" = "ar",
  onStart?: () => void,
  onEnd?: () => void
) {
  if (!text) return;

  // Increment activePlayId so any pending callbacks from prior attempts are cancelled
  activePlayId++;
  const thisPlayId = activePlayId;

  // Stop any currently playing HTML audio
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // ignore pause error
    }
    currentAudio = null;
  }

  // Stop any currently speaking speech synthesis
  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore cancel error
    }
  }

  onStart?.();

  const cleanText = text.trim();
  const encodedText = encodeURIComponent(cleanText);
  let audioUrls: string[] = [];

  if (lang === "ar") {
    // Primary: Amazon Polly Arabic Male Voices (Maged, Tarif, Hamed)
    audioUrls = [
      `https://api.streamelements.com/kappa/v2/speech?voice=Maged&text=${encodedText}`,
      `https://api.streamelements.com/kappa/v2/speech?voice=Tarif&text=${encodedText}`,
      `https://api.streamelements.com/kappa/v2/speech?voice=Hamed&text=${encodedText}`
    ];
  } else if (lang === "bn") {
    // For Bangla, skip female Google TTS and use SpeechSynthesis with deep male pitch
    audioUrls = [];
  } else {
    // Primary: English Male Voices (Brian & Matthew)
    audioUrls = [
      `https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${encodedText}`,
      `https://api.streamelements.com/kappa/v2/speech?voice=Matthew&text=${encodedText}`
    ];
  }

  let urlIndex = 0;

  const tryNextSource = () => {
    // If a new playback was started, abort this one immediately
    if (activePlayId !== thisPlayId) return;

    if (urlIndex < audioUrls.length) {
      let hasFailed = false;
      const audio = new Audio(audioUrls[urlIndex]);
      currentAudio = audio;

      audio.onended = () => {
        if (activePlayId !== thisPlayId) return;
        currentAudio = null;
        onEnd?.();
      };

      const handleFailure = () => {
        // Guard against HTML5 audio triggering BOTH onerror and play().catch()
        if (hasFailed || activePlayId !== thisPlayId) return;
        hasFailed = true;
        urlIndex++;
        tryNextSource();
      };

      audio.onerror = handleFailure;

      audio.play().catch(() => {
        handleFailure();
      });
    } else {
      // Fallback to Web Speech API (SpeechSynthesis with Male Voice & pitch adjustment)
      playSpeechSynthesisFallback(cleanText, lang, thisPlayId, onEnd);
    }
  };

  tryNextSource();
}

function findMaleVoice(
  voices: SpeechSynthesisVoice[],
  langPrefix: string
): SpeechSynthesisVoice | undefined {
  const langVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith(langPrefix.toLowerCase())
  );

  const maleKeywords = [
    "male",
    "maged",
    "tarif",
    "hamed",
    "shakir",
    "omar",
    "david",
    "mark",
    "george",
    "brian",
    "matthew",
    "joey",
    "guy",
    "wavenet-b",
    "wavenet-d",
    "standard-b",
    "standard-d",
    "purush"
  ];
  const femaleKeywords = [
    "female",
    "zeina",
    "laila",
    "amira",
    "zira",
    "samantha",
    "victoria",
    "karen",
    "susan",
    "aditi",
    "raveena",
    "wavenet-a",
    "wavenet-c",
    "standard-a",
    "standard-c"
  ];

  // 1. Explicit male keywords and not female keywords
  const explicitMale = langVoices.find((v) => {
    const name = v.name.toLowerCase();
    const isFemale = femaleKeywords.some((fk) => name.includes(fk));
    const isMale = maleKeywords.some((mk) => name.includes(mk));
    return isMale && !isFemale;
  });
  if (explicitMale) return explicitMale;

  // 2. Any voice that does not contain female keywords
  const nonFemale = langVoices.find((v) => {
    const name = v.name.toLowerCase();
    return !femaleKeywords.some((fk) => name.includes(fk));
  });
  if (nonFemale) return nonFemale;

  // 3. First available for that language
  return langVoices[0];
}

function playSpeechSynthesisFallback(
  text: string,
  lang: "ar" | "bn" | "en",
  thisPlayId: number,
  onEnd?: () => void
) {
  if (!("speechSynthesis" in window) || activePlayId !== thisPlayId) {
    onEnd?.();
    return;
  }

  const speakWithVoices = () => {
    if (activePlayId !== thisPlayId) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      const voices = window.speechSynthesis.getVoices();
      if (lang === "ar") {
        utterance.lang = "ar-SA";
        const arVoice = findMaleVoice(voices, "ar");
        if (arVoice) utterance.voice = arVoice;
        // Lower pitch (0.55) to ensure a deep male voice even with generic synth voices
        utterance.pitch = 0.55;
      } else if (lang === "bn") {
        utterance.lang = "bn-BD";
        const bnVoice = findMaleVoice(voices, "bn");
        if (bnVoice) utterance.voice = bnVoice;
        utterance.pitch = 0.55;
      } else {
        utterance.lang = "en-US";
        const enVoice = findMaleVoice(voices, "en");
        if (enVoice) utterance.voice = enVoice;
        utterance.pitch = 0.6;
      }

      utterance.rate = 0.85;
      utterance.onend = () => {
        if (activePlayId === thisPlayId) onEnd?.();
      };
      utterance.onerror = () => {
        if (activePlayId === thisPlayId) onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      if (activePlayId === thisPlayId) onEnd?.();
    }
  };

  const currentVoices = window.speechSynthesis.getVoices();
  if (currentVoices.length > 0) {
    speakWithVoices();
  } else {
    // In many browsers, getVoices() is empty on first call until onvoiceschanged fires
    let called = false;
    const timer = setTimeout(() => {
      if (!called) {
        called = true;
        speakWithVoices();
      }
    }, 400);

    window.speechSynthesis.onvoiceschanged = () => {
      if (!called) {
        called = true;
        clearTimeout(timer);
        speakWithVoices();
      }
    };
  }
}

