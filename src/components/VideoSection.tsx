import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X, User, Clock, Film } from "lucide-react";
import { islamicVideos } from "../data/islamicVideos";
import { VideoItem } from "../types";
import { useLanguage } from "../context/LanguageContext";

export default function VideoSection() {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <section id="videos" className={`relative py-24 px-6 bg-transparent transition-all duration-300 ${selectedVideo ? "z-50" : "z-10"}`}>
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-emerald-lux/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-serif-lux text-gold-lux text-xs tracking-[0.4em] uppercase block mb-3">
            Inspirational Media
          </span>
          <h2 className="font-serif-lux text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 tracking-wider">
            {t("video_heading")}
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold-lux to-transparent mx-auto mb-6" />
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {islamicVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group rounded-2xl overflow-hidden glass-panel border border-gold-lux/10 hover:border-gold-lux/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden bg-emerald-deep">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-emerald-deep/90 border border-gold-lux/20 px-2.5 py-1 rounded text-[10px] tracking-wider text-gold-lux font-mono flex items-center gap-1.5 backdrop-blur-md">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>

                {/* Hover Play Button */}
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Play video"
                >
                  <div className="w-14 h-14 rounded-full border border-gold-lux bg-emerald-deep/80 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-gold-lux/15 transition-all duration-300">
                    <Play className="w-5 h-5 text-gold-lux fill-gold-lux ml-1" />
                  </div>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  {/* Category Badge */}
                  <span className="text-[10px] tracking-widest text-gold-lux uppercase font-sans font-semibold block mb-2">
                    {video.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-serif-lux text-base sm:text-lg font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-gold-light transition-colors">
                    {video.title}
                  </h3>
                </div>

                {/* Footer metadata */}
                <div className="pt-4 border-t border-gold-lux/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <User className="w-3.5 h-3.5 text-gold-lux" />
                    <span className="truncate max-w-[150px]">{video.speaker}</span>
                  </div>
                  
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="text-xs font-serif-lux font-semibold tracking-widest text-gold-lux hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    WATCH NOW
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-deep/95 backdrop-blur-md"
            id="video-player-modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-emerald-deep border border-gold-lux/30 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-emerald-deep/80 border border-gold-lux/20 text-gold-lux hover:text-white hover:border-gold-lux transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Title Banner */}
              <div className="p-5 border-b border-gold-lux/15 pr-14 text-left">
                <span className="text-[10px] tracking-widest text-gold-lux uppercase block font-sans mb-1">
                  Now playing • {selectedVideo.speaker}
                </span>
                <h4 className="font-serif-lux text-base sm:text-lg font-bold text-white truncate">
                  {selectedVideo.title}
                </h4>
              </div>

              {/* Iframe aspect container */}
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`${selectedVideo.youtubeUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
