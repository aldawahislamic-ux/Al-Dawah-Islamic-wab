import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Compass, MapPin, Info, Navigation, CheckCircle2, LocateFixed, Smartphone, RotateCcw } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface CityQibla {
  id: string;
  nameBn: string;
  nameEn: string;
  angle: number; // Qibla angle from True North in degrees
  distanceKm: number; // Distance to Makkah in km
  lat: number;
  lng: number;
}

const CITIES: CityQibla[] = [
  { id: "dhaka", nameBn: "ঢাকা, বাংলাদেশ", nameEn: "Dhaka, Bangladesh", angle: 262.5, distanceKm: 5130, lat: 23.8103, lng: 90.4125 },
  { id: "chittagong", nameBn: "চট্টগ্রাম, বাংলাদেশ", nameEn: "Chittagong, Bangladesh", angle: 264.2, distanceKm: 5320, lat: 22.3569, lng: 91.7832 },
  { id: "sylhet", nameBn: "সিলেট, বাংলাদেশ", nameEn: "Sylhet, Bangladesh", angle: 263.8, distanceKm: 5250, lat: 24.8949, lng: 91.8687 },
  { id: "khulna", nameBn: "খুলনা, বাংলাদেশ", nameEn: "Khulna, Bangladesh", angle: 261.9, distanceKm: 5040, lat: 22.8456, lng: 89.5403 },
  { id: "rajshahi", nameBn: "রাজশাহী, বাংলাদেশ", nameEn: "Rajshahi, Bangladesh", angle: 260.8, distanceKm: 4980, lat: 24.3745, lng: 88.6042 },
  { id: "london", nameBn: "লন্ডন, যুক্তরাজ্য", nameEn: "London, UK", angle: 118.9, distanceKm: 4780, lat: 51.5074, lng: -0.1278 },
  { id: "newyork", nameBn: "নিউইয়র্ক, যুক্তরাষ্ট্র", nameEn: "New York, USA", angle: 58.5, distanceKm: 10290, lat: 40.7128, lng: -74.0060 },
  { id: "kualalumpur", nameBn: "কুয়ালালামপুর, মালয়েশিয়া", nameEn: "Kuala Lumpur, Malaysia", angle: 292.3, distanceKm: 7060, lat: 3.1390, lng: 101.6869 },
  { id: "cairo", nameBn: "কায়রো, মিশর", nameEn: "Cairo, Egypt", angle: 136.2, distanceKm: 1290, lat: 30.0444, lng: 31.2357 },
  { id: "istanbul", nameBn: "ইস্তাম্বুল, তুরস্ক", nameEn: "Istanbul, Turkey", angle: 151.7, distanceKm: 2400, lat: 41.0082, lng: 28.9784 },
];

// Calculate Qibla bearing from coordinates to Makkah (21.4225° N, 39.8262° E)
function calculateQiblaAngle(lat: number, lng: number): number {
  const makkahLat = 21.4225 * (Math.PI / 180);
  const makkahLng = 39.8262 * (Math.PI / 180);
  const userLat = lat * (Math.PI / 180);
  const userLng = lng * (Math.PI / 180);

  const deltaLng = makkahLng - userLng;
  const y = Math.sin(deltaLng);
  const x = Math.cos(userLat) * Math.tan(makkahLat) - Math.sin(userLat) * Math.cos(deltaLng);
  const qiblaAngle = Math.atan2(y, x) * (180 / Math.PI);
  return Math.round((qiblaAngle + 360) % 360 * 10) / 10;
}

// Calculate spherical distance to Kaaba in km
function calculateDistanceToKaaba(lat: number, lng: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (21.4225 - lat) * (Math.PI / 180);
  const dLng = (39.8262 - lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat * (Math.PI / 180)) * Math.cos(21.4225 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export default function QiblaCompassView() {
  const { language } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<CityQibla>(CITIES[0]);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [isSensorActive, setIsSensorActive] = useState<boolean>(false);
  const [isGpsLoading, setIsGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string>("");
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [permissionNeeded, setPermissionNeeded] = useState<boolean>(false);
  const [isFixedMode, setIsFixedMode] = useState<boolean>(true);
  const [isInverted, setIsInverted] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("qibla_compass_inverted") === "true";
    }
    return false;
  });
  const [manualOffset, setManualOffset] = useState<number>(0);

  // Check if iOS permission button is required
  useEffect(() => {
    if (typeof window !== "undefined" && typeof (DeviceOrientationEvent as any)?.requestPermission === "function") {
      setPermissionNeeded(true);
    }
  }, []);

  // Listen to Device Orientation events automatically
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;
      // iOS webkitCompassHeading gives true magnetic compass heading
      if ("webkitCompassHeading" in e && typeof (e as any).webkitCompassHeading === "number") {
        heading = (e as any).webkitCompassHeading;
      } else if (e.alpha !== null && e.alpha !== undefined && !isNaN(e.alpha)) {
        // Direct e.alpha for standard modern Android browsers (convert counterclockwise to clockwise)
        heading = (360 - e.alpha) % 360;
      }
      if (heading !== null && !isNaN(heading)) {
        setDeviceHeading(Math.round(heading));
        setIsSensorActive(true);
      }
    };

    window.addEventListener("deviceorientationabsolute", handleOrientation, true);
    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation, true);
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  // Request iOS Device Orientation permission
  const handleRequestPermission = async () => {
    try {
      if (typeof (DeviceOrientationEvent as any)?.requestPermission === "function") {
        const result = await (DeviceOrientationEvent as any).requestPermission();
        if (result === "granted") {
          setPermissionNeeded(false);
          setIsSensorActive(true);
        }
      }
    } catch (err) {
      console.error("Sensor permission request error:", err);
    }
  };

  // Auto-detect location via GPS with standard accuracy fallback
  const handleAutoLocate = () => {
    if (!navigator.geolocation) {
      setGpsError(language === "bn" ? "আপনার ডিভাইসে জিপিএস সমর্থিত নয়" : "GPS not supported on this device");
      return;
    }
    setIsGpsLoading(true);
    setGpsError("");

    const applyPosition = (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      const angle = calculateQiblaAngle(latitude, longitude);
      const distanceKm = calculateDistanceToKaaba(latitude, longitude);

      setSelectedCity({
        id: "custom-gps",
        nameBn: "আপনার বর্তমান অবস্থান (GPS)",
        nameEn: "Your Current Location (GPS)",
        angle,
        distanceKm,
        lat: latitude,
        lng: longitude,
      });
      setIsGpsLoading(false);
      setGpsError("");
    };

    const handleGpsFailure = (err: GeolocationPositionError) => {
      let errorMsgBn = "লোকেশন পাওয়া যায়নি। অনুগ্রহ করে শহরের নাম নির্বাচন করুন।";
      let errorMsgEn = "Could not detect location. Please select a city manually.";

      if (err?.code === 1) {
        errorMsgBn = "লোকেশন পারমিশন বন্ধ আছে। ব্রাউজার সেটিংসে লোকেশন অন করুন অথবা তালিকা থেকে শহর নির্বাচন করুন।";
        errorMsgEn = "Location access denied. Please enable location in browser settings or select a city.";
      } else {
        errorMsgBn = "জিপিএস লোকেশন পাওয়া যাচ্ছে না। অনুগ্রহ করে নিচের তালিকা থেকে আপনার শহর নির্বাচন করুন।";
        errorMsgEn = "Could not retrieve GPS coordinates. Please select your city from the list.";
      }

      setGpsError(language === "bn" ? errorMsgBn : errorMsgEn);
      setIsGpsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(
      applyPosition,
      () => {
        navigator.geolocation.getCurrentPosition(
          applyPosition,
          (fallbackErr) => handleGpsFailure(fallbackErr),
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
        );
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Calculate effective heading supporting device sensor inversion & manual calibration
  const rawHeading = isInverted ? (360 - deviceHeading) % 360 : deviceHeading;
  const effectiveHeading = isFixedMode ? 0 : (rawHeading + manualOffset + 360) % 360;

  // Calculate relative angle of Qibla needle relative to device orientation
  const needleAngle = (selectedCity.angle - effectiveHeading + 360) % 360;
  const isAligned = Math.abs(needleAngle - 273) < 8 || Math.abs(needleAngle - 262) < 8 || Math.abs(needleAngle) < 6 || Math.abs(needleAngle - 360) < 6;

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* Top Location Bar with Auto GPS button */}
      <div className="bg-emerald-950/80 border border-gold-lux/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-lux/15 border border-gold-lux/40 flex items-center justify-center text-gold-lux">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-gray-400 block uppercase tracking-wider font-semibold">
              {language === "bn" ? "আপনার অবস্থান" : "Your Location"}
            </span>
            <span className="text-sm font-bold text-white">
              {language === "bn" ? selectedCity.nameBn : selectedCity.nameEn}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap justify-center">
          <button
            onClick={handleAutoLocate}
            disabled={isGpsLoading}
            className="px-3.5 py-2 rounded-xl gold-gradient text-emerald-950 font-bold text-xs shadow hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LocateFixed className={`w-3.5 h-3.5 ${isGpsLoading ? "animate-spin" : ""}`} />
            <span>
              {isGpsLoading
                ? (language === "bn" ? "লোকেশন খোঁজা হচ্ছে..." : "Locating...")
                : (language === "bn" ? "অটো জিপিএস সনাক্ত করুন" : "Auto GPS Locate")}
            </span>
          </button>

          <select
            value={selectedCity.id}
            onChange={(e) => {
              const found = CITIES.find((c) => c.id === e.target.value);
              if (found) setSelectedCity(found);
            }}
            className="bg-emerald-900 border border-gold-lux/40 rounded-xl px-3 py-2 text-xs text-gold-lux font-semibold outline-none focus:border-gold-lux cursor-pointer"
          >
            {CITIES.map((city) => (
              <option key={city.id} value={city.id} className="bg-emerald-950 text-white">
                {language === "bn" ? city.nameBn : city.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {gpsError && (
        <div className="p-3 rounded-xl bg-red-900/40 border border-red-400/50 text-red-200 text-xs text-center">
          {gpsError}
        </div>
      )}

      {/* Main Compass Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* LEFT: Automatically Rotating Golden Qibla Compass Dial */}
        <div className="flex flex-col items-center justify-center py-4">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-emerald-950/90 border border-gold-lux/30 mb-5 w-full max-w-xs">
            <button
              onClick={() => setIsFixedMode(true)}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isFixedMode
                  ? "bg-gold-gradient text-emerald-950 shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-emerald-900/60"
              }`}
            >
              <span>📌</span>
              <span>
                {language === "bn" ? "স্থির মোড (উত্তর উপরে)" : "Fixed Mode (North Up)"}
              </span>
            </button>
            <button
              onClick={() => setIsFixedMode(false)}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                !isFixedMode
                  ? "bg-gold-gradient text-emerald-950 shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-emerald-900/60"
              }`}
            >
              <span>🧭</span>
              <span>
                {language === "bn" ? "লাইভ সেন্সর মোড" : "Live Sensor Mode"}
              </span>
            </button>
          </div>

          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            
            {/* Outer Luxury Gold Halo Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gold-lux/40 shadow-[0_0_40px_rgba(212,175,55,0.2)] bg-emerald-950/90" />
            
            {/* Rotating Compass Disc (True North Reference based on mobile sensor) */}
            <motion.div
              animate={{ rotate: -effectiveHeading }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="absolute inset-4 rounded-full border border-gold-lux/20 flex items-center justify-center"
            >
              {/* North / South / East / West Markers */}
              <span className="absolute top-2 text-xs font-bold text-gold-lux tracking-widest">N (উঃ)</span>
              <span className="absolute bottom-2 text-xs font-bold text-gray-400">S (দঃ)</span>
              <span className="absolute left-3 text-xs font-bold text-gray-400">W (পঃ)</span>
              <span className="absolute right-3 text-xs font-bold text-gray-400">E (পূঃ)</span>

              {/* Degree Ring Ticks */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-full h-full flex justify-center py-1"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  <div className="w-0.5 h-2 bg-gold-lux/30" />
                </div>
              ))}
            </motion.div>

            {/* QIBLA DIRECTION NEEDLE & KAABA ICON (Always points towards Kaaba as phone rotates) */}
            <motion.div
              animate={{ rotate: selectedCity.angle - effectiveHeading }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="absolute w-full h-full flex flex-col items-center justify-start py-6 pointer-events-none"
            >
              {/* Kaaba Emblem at Top of Needle */}
              <div className="w-10 h-10 rounded-lg bg-emerald-900 border-2 border-gold-lux flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.8)] -mt-1">
                <span className="text-xl">🕋</span>
              </div>
              {/* Golden Direction Needle */}
              <div className="w-1 h-20 bg-gradient-to-b from-gold-lux via-amber-400 to-transparent rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            </motion.div>

            {/* Center Golden Pivot */}
            <div className="w-8 h-8 rounded-full bg-gold-gradient border-2 border-white/80 shadow-lg z-10 flex items-center justify-center">
              <Compass className="w-4 h-4 text-emerald-950 animate-spin" style={{ animationDuration: "20s" }} />
            </div>

            {/* Alignment Success Halo */}
            {isAligned && (
              <div className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-pulse shadow-[0_0_35px_rgba(16,185,129,0.7)] pointer-events-none" />
            )}
          </div>

          {/* Sensor Status & Mobile Orientation Indicator */}
          <div className="mt-6 flex flex-col items-center gap-2 text-center w-full max-w-sm">
            {isFixedMode ? (
              <div className="p-3.5 rounded-xl bg-emerald-900/90 border border-gold-lux/40 text-xs text-gold-lux leading-relaxed text-left shadow-lg">
                <p className="font-bold mb-1 flex items-center gap-1.5">
                  <span>📌</span>
                  <span>
                    {language === "bn"
                      ? "স্থির মোড সক্রিয় (উত্তর উপরে • পশ্চিম বামে):"
                      : "Fixed Mode Active (North Up • West Left):"}
                  </span>
                </p>
                <p className="text-gray-300 text-[11px] leading-normal">
                  {language === "bn"
                    ? `মানচিত্র অনুযায়ী বাংলাদেশ থেকে কাবা শরীফ পশ্চিম দিকে (${selectedCity.angle}°) অবস্থিত। তাই কম্পাসের কাঁটাটি ঠিক পশ্চিম (বাম দিকে) নির্দেশ করছে। মোবাইল ঘুরিয়ে দিক নির্ণয় করতে 'লাইভ সেন্সর মোড' নির্বাচন করুন।`
                    : `Kaaba is located West (${selectedCity.angle}°) from Bangladesh. The needle points directly Left (West). Select 'Live Sensor Mode' to rotate with your phone sensor.`}
                </p>
              </div>
            ) : (
              <>
                {permissionNeeded && (
                  <button
                    onClick={handleRequestPermission}
                    className="px-4 py-2 rounded-xl gold-gradient text-emerald-950 font-bold text-xs shadow-md animate-bounce cursor-pointer flex items-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>{language === "bn" ? "কম্পাস সেন্সর অনুমতি দিন (iOS)" : "Allow Compass Sensor (iOS)"}</span>
                  </button>
                )}

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-gold-lux/30 text-xs">
                  <span className={`w-2 h-2 rounded-full ${isSensorActive ? "bg-emerald-400 animate-ping" : "bg-gold-lux"}`} />
                  <span className="text-gray-300 font-medium">
                    {isSensorActive
                      ? (language === "bn"
                        ? "মোবাইল সেন্সর সক্রিয় — ফোনটি ঘুরিয়ে দেখুন"
                        : "Mobile sensor active — Rotate your phone")
                      : (language === "bn"
                        ? "মোবাইল হাতের তালুতে অনুভূমিক রাখুন"
                        : "Hold mobile flat horizontally")}
                  </span>
                </div>

                {/* Reverse / Invert Compass Mode & Manual Adjustment Controls */}
                <div className="flex flex-col items-center gap-2.5 mt-2 w-full max-w-xs">
                  <button
                    onClick={() => {
                      const next = !isInverted;
                      setIsInverted(next);
                      localStorage.setItem("qibla_compass_inverted", String(next));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isInverted
                        ? "bg-amber-500 text-emerald-950 border-amber-400 font-bold"
                        : "bg-emerald-900/90 text-gold-lux border-gold-lux/40 hover:bg-emerald-800"
                    }`}
                  >
                    <RotateCcw className={`w-4 h-4 ${isInverted ? "animate-spin" : ""}`} />
                    <span>
                      {language === "bn"
                        ? `কম্পাস উল্টো ঘুরলে ঠিক করুন (${isInverted ? "বিপরীত মোড সক্রিয়" : "সাধারণ মোড"})`
                        : `Invert Compass Direction (${isInverted ? "Reversed" : "Standard"})`}
                    </span>
                  </button>

                  {/* Manual Fine-tuning buttons (useful for older devices or testing) */}
                  <div className="flex items-center justify-between gap-2 w-full">
                    <button
                      onClick={() => setManualOffset((prev) => (prev - 15 + 360) % 360)}
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 border border-gold-lux/20 text-[11px] text-gray-300 hover:text-white hover:border-gold-lux/40 transition-all cursor-pointer"
                    >
                      {language === "bn" ? "⟲ ১৫° বাঁয়ে" : "⟲ -15° Left"}
                    </button>
                    <button
                      onClick={() => setManualOffset(0)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-gold-lux/20 text-[11px] text-gold-lux hover:bg-emerald-900 transition-all cursor-pointer font-semibold"
                    >
                      {language === "bn" ? "রিসেট" : "Reset"}
                    </button>
                    <button
                      onClick={() => setManualOffset((prev) => (prev + 15) % 360)}
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 border border-gold-lux/20 text-[11px] text-gray-300 hover:text-white hover:border-gold-lux/40 transition-all cursor-pointer"
                    >
                      {language === "bn" ? "১৫° ডানে ⟳" : "+15° Right ⟳"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT: Detailed Qibla Angles & Distance Stats */}
        <div className="space-y-4">
          <div className="bg-emerald-950/90 border border-gold-lux/30 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gold-lux/20 pb-3">
              <div>
                <span className="text-[11px] text-gray-400 uppercase tracking-widest block font-semibold">
                  {language === "bn" ? "কিবলার দিক (কোণ)" : "Qibla Direction (Angle)"}
                </span>
                <span className="text-2xl font-bold font-serif-lux text-gold-lux">
                  {selectedCity.angle}° {language === "bn" ? "উত্তর দিক থেকে" : "from True North"}
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-900/70 border border-gold-lux/30 flex items-center justify-center text-2xl">
                🧭
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-gold-lux/20 pb-3">
              <div>
                <span className="text-[11px] text-gray-400 uppercase tracking-widest block font-semibold">
                  {language === "bn" ? "পবিত্র কাবা শরীফের দূরত্ব" : "Distance to Al-Masjid al-Haram"}
                </span>
                <span className="text-xl font-bold font-mono text-emerald-200">
                  {selectedCity.distanceKm.toLocaleString()} {language === "bn" ? "কিলোমিটার" : "km"}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gold-lux/10 border border-gold-lux/30 flex items-center justify-center text-xl">
                🕋
              </div>
            </div>

            {/* Alignment Indicator Badge */}
            <div className="pt-1">
              {isAligned ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600/30 border border-emerald-400 text-emerald-300 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    {language === "bn"
                      ? "আলহামদুলিল্লাহ! আপনার ফোনটি ঠিক কিবলামুখী রয়েছে।"
                      : "Alhamdulillah! Perfectly aligned toward Qibla."}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gold-lux/10 border border-gold-lux/30 text-gold-lux text-xs">
                  <Navigation className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {language === "bn"
                      ? "কাবার আইকনটি (🕋) সোজা উপরে না আসা পর্যন্ত মোবাইলটি ঘোরান।"
                      : "Rotate your mobile until the Kaaba icon (🕋) points straight up."}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Guide Toggle */}
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-900/60 border border-gold-lux/20 hover:border-gold-lux/50 text-xs text-gray-300 hover:text-white transition-all flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2 font-medium">
              <Info className="w-4 h-4 text-gold-lux" />
              {language === "bn" ? "কিবলা নির্ধারণের সঠিক নিয়মাবলী দেখুন" : "View Accurate Qibla Finding Rules"}
            </span>
            <span className="text-gold-lux">{showInstructions ? "▲" : "▼"}</span>
          </button>

          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-emerald-950/80 border border-gold-lux/20 rounded-xl p-4 text-xs text-gray-300 space-y-2 leading-relaxed"
            >
              <p className="font-semibold text-gold-lux">
                {language === "bn" ? "দিকনির্ণয়ের গুরুত্বপূর্ণ টিপস:" : "Important Guidance:"}
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  {language === "bn"
                    ? "ফোনটি সমতল ও অনুভূমিক (flat) স্থানে বা হাতের তালুতে রাখুন।"
                    : "Hold your device flat horizontally in your palm."}
                </li>
                <li>
                  {language === "bn"
                    ? "চৌম্বকীয় ক্ষেত্র বা ইলেকট্রনিক যন্ত্রপাতি (টিভি, ফ্রিজ, ল্যাপটপ) থেকে দূরে রাখুন।"
                    : "Keep away from magnetic fields or electronic devices."}
                </li>
                <li>
                  {language === "bn"
                    ? "মোবাইল যেদিকেই ঘোরানো হোক, কাবার আইকনটি স্বয়ংক্রিয়ভাবে মক্কার দিক নির্দেশ করবে।"
                    : "No matter how you rotate the mobile, the Kaaba icon will point towards Makkah."}
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

