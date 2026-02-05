import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

// Burimi kryesor: skedar audio lokal (preload + luaj menjëherë). Vendosni file në public/audio/background.mp3
const AUDIO_SRC = "/audio/background.mp3";
const START_TIME_SECONDS = 2 * 60 + 25; // 2:25

const VIDEO_ID = "BKMtuRY2plQ";

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          height?: string;
          width?: string;
          videoId?: string;
          playerVars?: Record<string, number | string>;
          events?: { onReady?: (event: { target: YTPlayer }) => void };
        }
      ) => YTPlayer;
      PlayerState?: { PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  unMute: () => void;
  mute: () => void;
}

type PlaybackSource = "audio" | "youtube" | null;

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const sourceRef = useRef<PlaybackSource>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const ytInitDoneRef = useRef(false);

  // HTML5 Audio: krijohet menjëherë dhe preload që muzika të jetë gati me klikimin e parë
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.loop = true;

    const onCanPlay = () => setAudioReady(true);
    const onError = () => setAudioReady(false);

    audio.addEventListener("canplaythrough", onCanPlay, { once: true });
    audio.addEventListener("error", onError, { once: true });
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));

    audio.src = AUDIO_SRC;
    audio.load();

    audioRef.current = audio;
    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // YouTube fallback – vetëm nëse audio nuk është i disponueshëm
  useEffect(() => {
    const initYT = () => {
      if (ytInitDoneRef.current || !window.YT?.Player) return;
      ytInitDoneRef.current = true;
      try {
        new window.YT!.Player("wedding-yt-player", {
          height: "0",
          width: "0",
          videoId: VIDEO_ID,
          playerVars: {
            autoplay: 0,
            mute: 0,
            loop: 1,
            playlist: VIDEO_ID,
            controls: 0,
            modestbranding: 1,
            start: START_TIME_SECONDS,
          },
          events: {
            onReady(event: { target: YTPlayer }) {
              playerRef.current = event.target;
            },
          },
        });
      } catch {
        ytInitDoneRef.current = false;
      }
    };
    if (window.YT?.Player) initYT();
    else window.onYouTubeIframeAPIReady = initYT;
  }, []);

  const startWithAudio = () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      audio.currentTime = START_TIME_SECONDS;
      const p = audio.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          sourceRef.current = "audio";
        }).catch(() => {});
        return true;
      }
      sourceRef.current = "audio";
      return true;
    } catch {
      return false;
    }
  };

  const startWithYouTube = () => {
    const player = playerRef.current;
    if (!player) return false;
    try {
      player.seekTo(START_TIME_SECONDS, true);
      player.playVideo();
      sourceRef.current = "youtube";
      setIsPlaying(true);
      return true;
    } catch {
      return false;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (sourceRef.current === "audio") {
        audioRef.current?.pause();
      } else if (sourceRef.current === "youtube") {
        playerRef.current?.pauseVideo();
      }
      setIsPlaying(false);
      return;
    }

    // Luaj: prefero audio nëse është gati (menjëherë), përndryshe YouTube
    if (audioReady && audioRef.current && audioRef.current.readyState >= 2) {
      if (startWithAudio()) return;
    }
    startWithYouTube();
  };

  return (
    <>
      <div
        id="wedding-yt-player"
        className="fixed -left-[9999px] w-0 h-0 overflow-hidden"
        aria-hidden
      />

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="fixed bottom-20 right-6 z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-gold-soft/95 to-gold/95 text-primary-foreground text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-white/20 whitespace-nowrap">
              Klikoni për muzikë 🎵
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-soft shadow-lg flex items-center justify-center group hover:shadow-xl transition-shadow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Ndalo muzikën" : "Luaj muzikën"}
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

        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gold/40"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>

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
