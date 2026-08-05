import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageCircle, Facebook, ArrowUpRight, Star, Play, ChevronDown, ChevronUp, Video } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  const videoPlatforms = [
    {
      id: "facebook",
      platform: "Facebook",
      username: "@aldawahislamicofficial",
      description: "প্রতিদিনের আয়াত, হাদিস এবং লাইভ প্রোগ্রামগুলোর আপডেট পেতে আমাদের পেজে যুক্ত হোন।",
      icon: Facebook,
      url: "https://www.facebook.com/share/1Q2kqh1tPs/",
      actionText: "পেজে যুক্ত হোন",
      color: "hover:border-[#1877F2]/40 hover:shadow-[#1877F2]/5"
    }
  ];

  const contactChannels = [
    {
      id: "whatsapp",
      platform: "WhatsApp",
      username: "+880 1321-513054",
      description: "যেকোনো পরামর্শ, প্রশ্ন বা সরাসরি ইসলামিক সহযোগিতার জন্য আমাদের হোয়াটসঅ্যাপে মেসেজ দিন।",
      icon: MessageCircle,
      url: "https://wa.me/8801321513054",
      actionText: "হোয়াটসঅ্যাপ মেসেজ",
      color: "hover:border-[#25D366]/40 hover:shadow-[#25D366]/10"
    },
    {
      id: "email",
      platform: "Email Support",
      username: "aldawahislamic@gmail.com",
      description: "অফিসিয়াল যোগাযোগ বা যেকোনো দীর্ঘস্থায়ী পরামর্শের জন্য ইমেইল করুন।",
      icon: Mail,
      url: "mailto:aldawahislamic@gmail.com",
      actionText: "ইমেইল পাঠান",
      color: "hover:border-gold-lux/40 hover:shadow-gold-lux/10"
    }
  ];

  return (
    <section id="contact" className="relative py-24 px-6 bg-transparent overflow-hidden">
      {/* Decorative luxury elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-lux/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-serif-lux text-gold-lux text-xs tracking-[0.4em] uppercase block mb-3">
            Digital Platforms
          </span>
          <h2 className="font-serif-lux text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 tracking-wider">
            {t("contact_heading")}
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold-lux to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            ইসলামের সঠিক বাণী ছড়িয়ে দিতে এবং আমাদের সাথে যুক্ত থাকতে অফিসিয়াল মাধ্যমগুলো ব্যবহার করুন।
          </p>
        </div>

        {/* Dynamic Video Section - Main Interactive Button */}
        <div className="mb-12 text-center" id="video-section-container">
          <button
            onClick={() => setIsVideoExpanded(!isVideoExpanded)}
            className="w-full max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-gold-lux/25 hover:border-gold-lux/60 text-center relative overflow-hidden group shadow-[0_0_40px_rgba(212,175,55,0.03)] bg-emerald-deep/40 hover:bg-emerald-deep/60 transition-all duration-500 cursor-pointer block"
            id="watch-video-btn"
          >
            {/* Soft Glowing Background Ring */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gold-lux/10 rounded-full blur-2xl pointer-events-none group-hover:bg-gold-lux/20 transition-all duration-500" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-lux/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-lux/20 transition-all duration-500" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5 text-left">
                {/* Breathing Play Icon */}
                <div className="w-14 h-14 rounded-2xl border border-gold-lux/40 bg-gold-lux/5 flex items-center justify-center text-gold-lux shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:border-gold-lux group-hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-500 flex-shrink-0">
                  <Video className="w-7 h-7 text-gold-lux group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="font-bengali text-lg sm:text-xl font-medium text-white mb-1.5 group-hover:text-gold-light transition-colors">
                    ইসলামিক ভিডিও দেখুন সরাসরি আমাদের প্ল্যাটফর্ম থেকে
                  </h3>
                  <p className="font-bengali text-xs text-gray-400">
                    আমাদের অফিসিয়াল টিকটক, ইউটিউব ও ফেসবুকের চমৎকার কন্টেন্ট উপভোগ করুন
                  </p>
                </div>
              </div>

              {/* Expansion Indicator */}
              <div className="flex-shrink-0 text-gold-lux group-hover:text-gold-light transition-colors">
                {isVideoExpanded ? (
                  <ChevronUp className="w-6 h-6 animate-bounce" style={{ animationDuration: "2s" }} />
                ) : (
                  <ChevronDown className="w-6 h-6 animate-bounce" style={{ animationDuration: "2s" }} />
                )}
              </div>
            </div>
          </button>

          {/* Expanded Video Platforms Grid */}
          <AnimatePresence>
            {isVideoExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden mt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto pt-2 text-left">
                  {videoPlatforms.map((plat, i) => {
                    const Icon = plat.icon;
                    return (
                      <motion.a
                        key={plat.id}
                        href={plat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className={`group/item glass-panel p-5 rounded-2xl border border-gold-lux/10 hover:border-gold-lux/30 bg-emerald-deep/30 hover:bg-emerald-deep/50 transition-all duration-500 flex flex-col justify-between cursor-pointer ${plat.color}`}
                        id={`video-plat-${plat.id}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            {/* Icon Frame */}
                            <div className="w-10 h-10 rounded-xl bg-gold-lux/5 border border-gold-lux/20 flex items-center justify-center text-gold-lux group-hover/item:border-gold-lux group-hover/item:bg-gold-lux/10 transition-all duration-300">
                              <Icon className="w-4 h-4" />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover/item:text-gold-lux group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all duration-300" />
                          </div>

                          <h4 className="font-serif-lux text-base font-bold text-white mb-0.5 tracking-wide">
                            {plat.platform}
                          </h4>
                          <span className="text-[10px] text-gold-lux font-mono block mb-3">
                            {plat.username}
                          </span>
                          <p className="font-bengali text-xs text-gray-400 leading-relaxed mb-5">
                            {plat.description}
                          </p>
                        </div>

                        <span className="w-full py-2 rounded-xl border border-gold-lux/10 group-hover/item:border-gold-lux group-hover/item:bg-gold-lux group-hover/item:text-emerald-deep bg-emerald-deep/40 text-gold-light text-center font-bengali text-xs font-semibold tracking-wider transition-all duration-300">
                          {plat.actionText}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative Divider */}
        <div className="relative my-10 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gold-lux/10"></div>
          </div>
          <div className="relative bg-emerald-deep px-4 text-xs font-serif-lux text-gold-lux/50 tracking-[0.2em] uppercase">
            Direct Assistance
          </div>
        </div>

        {/* Direct Contact/Support Section */}
        <div className="text-center">
          <h3 className="font-bengali text-lg text-gold-light mb-6 font-light tracking-wide">
            যোগাযোগ ও পরামর্শের জন্য আমাদের সরাসরি বাটনসমূহ
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto text-left">
            {contactChannels.map((channel, i) => {
              const Icon = channel.icon;
              return (
                <motion.a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`group glass-panel p-6 rounded-2xl border border-gold-lux/15 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between text-left cursor-pointer hover:shadow-lg ${channel.color}`}
                  id={`contact-plat-${channel.id}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-xl bg-gold-lux/5 border border-gold-lux/25 flex items-center justify-center text-gold-lux group-hover:bg-gold-lux/10 group-hover:scale-105 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-gold-lux transition-colors" />
                    </div>

                    <h4 className="font-serif-lux text-base font-bold text-white mb-0.5 tracking-wider">
                      {channel.platform}
                    </h4>
                    <span className="text-xs text-gold-lux font-mono block mb-3">
                      {channel.username}
                    </span>
                    <p className="font-bengali text-xs sm:text-sm text-gray-400 leading-relaxed mb-5">
                      {channel.description}
                    </p>
                  </div>

                  <span className="w-full py-2.5 rounded-xl border border-gold-lux/25 hover:border-gold-lux bg-emerald-lux/10 group-hover:bg-gold-lux group-hover:text-emerald-deep text-gold-lux text-center font-bengali text-xs tracking-wider font-semibold transition-all duration-300">
                    {channel.actionText}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Premium Assurance Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 glass-panel p-6 sm:p-8 rounded-3xl border border-gold-lux/20 max-w-2xl mx-auto flex flex-col sm:flex-row gap-5 items-center text-left"
        >
          <div className="w-12 h-12 rounded-full bg-gold-lux/5 border border-gold-lux/30 flex items-center justify-center text-gold-lux flex-shrink-0">
            <Star className="w-5 h-5 fill-gold-lux/20" />
          </div>
          <div>
            <h4 className="font-serif-lux text-sm sm:text-base font-bold text-white mb-1 tracking-wide">
              Verified Official Channels Only
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed font-bengali">
              উপরের মাধ্যমগুলোই আল দাওয়াহ ইসলামিক অফিশিয়ালের একমাত্র ভেরিফাইড ডিজিটাল প্ল্যাটফর্ম। কোনো নকল পেজ বা ফেক একাউন্ট থেকে সতর্ক থাকুন।
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
