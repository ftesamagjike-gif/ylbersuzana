import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Spotify doesn't allow direct audio autoplay, so we use an iframe approach
  // The iframe will be hidden and controlled via the button

  useEffect(() => {
    // Try to autoplay when user first interacts with the page
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true);
      }
    };

    // Listen for any click on the document
    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });
    document.addEventListener("scroll", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  return (
    <>
      {/* Hidden Spotify iframe - only rendered when playing */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed -bottom-[200px] -left-[200px] opacity-0 pointer-events-none">
            <iframe
              src="https://open.spotify.com/embed/track/7xrGMKBoMqMghcRsqcZZZ2?utm_source=generator&theme=0"
              width="300"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Background Music"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Floating music button */}
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-soft shadow-lg flex items-center justify-center group hover:shadow-xl transition-shadow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Volume2 className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <VolumeX className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gold/40"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Music notes animation when playing */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed bottom-20 right-6 z-40 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-lg text-gold"
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-20 - i * 15, -60 - i * 20],
                  x: [0, (i - 1) * 15],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                ♪
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
