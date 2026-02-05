import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarHeart, Sparkles } from "lucide-react";

// Data e dasmës: 21 Korrik 2026 (vit, muaj-1, ditë, orë, minutë)
const WEDDING_DATE = new Date(2026, 6, 21, 19, 0, 0); // 21 Korrik 2026, 19:00

const formatTwoDigits = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, "0");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const getTimeLeft = (target: Date): TimeLeft => {
  const now = new Date();
  const total = Math.max(0, target.getTime() - now.getTime());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, total };
};

const CountdownUnit = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="relative rounded-2xl bg-gradient-to-br from-card to-champagne/20 border border-gold-soft/40 shadow-lg overflow-hidden backdrop-blur-sm">
      {/* Shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="relative px-6 py-8 md:px-8 md:py-10 text-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tabular-nums block min-h-[1.2em]"
          >
            {value}
          </motion.span>
        </AnimatePresence>
        <span className="block mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
          {label}
        </span>
      </div>
    </div>
  </motion.div>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(WEDDING_DATE));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTimeLeft(getTimeLeft(WEDDING_DATE)), 1000);
    return () => clearInterval(t);
  }, []);

  const isOver = timeLeft.total <= 0;

  if (!mounted) {
    return (
      <section className="relative py-24 bg-gradient-to-b from-ivory via-champagne/10 to-ivory overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Numëroni me ne
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              {["00", "00", "00", "00"].map((v, i) => (
                <div
                  key={i}
                  className="w-24 h-28 rounded-2xl bg-card border border-gold-soft/30 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-gradient-to-b from-ivory via-champagne/10 to-ivory overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-champagne/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-soft/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <CalendarHeart className="w-6 h-6 text-gold" />
            <span className="text-gold text-sm uppercase tracking-[0.25em] font-medium">
              Dita e madhe
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Numëroni me ne
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-soft" />
            <Sparkles className="w-5 h-5 text-gold" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-soft" />
          </div>
        </motion.div>

        {isOver ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="inline-block rounded-2xl bg-gradient-to-r from-gold-soft/30 to-gold/30 border border-gold/50 px-10 py-8 backdrop-blur-sm">
              <p className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                Dita e madhe erdhi
              </p>
              <p className="text-muted-foreground text-lg">Falënderojmë që jeni me ne 💒</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            <CountdownUnit
              value={String(timeLeft.days)}
              label="Ditë"
              delay={0.1}
            />
            <CountdownUnit
              value={formatTwoDigits(timeLeft.hours)}
              label="Orë"
              delay={0.2}
            />
            <CountdownUnit
              value={formatTwoDigits(timeLeft.minutes)}
              label="Minuta"
              delay={0.3}
            />
            <CountdownUnit
              value={formatTwoDigits(timeLeft.seconds)}
              label="Sekonda"
              delay={0.4}
            />
          </div>
        )}

        {!isOver && (
          <motion.p
            className="text-center text-muted-foreground mt-10 text-sm md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Deri në ditën kur do të festojmë së bashku
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Countdown;
