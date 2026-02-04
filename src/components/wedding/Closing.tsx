import { motion } from "framer-motion";
import { Instagram, Music2 } from "lucide-react";

const Closing = () => {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-ivory via-champagne/20 to-ivory py-24">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blush/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gold-soft/20 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Heart decoration */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            >
              <span className="text-4xl">🤍</span>
            </motion.div>

            {/* Message */}
            <motion.p
              className="font-serif text-2xl md:text-3xl text-muted-foreground italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Me dashuri,
            </motion.p>

            <motion.h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Ylber & Suzana
            </motion.h2>

            {/* Decorative line */}
            <motion.div
              className="flex items-center justify-center gap-4 pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-soft" />
              <span className="text-gold text-lg">💍</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-soft" />
            </motion.div>

            {/* Date reminder */}
            <motion.p
              className="text-muted-foreground tracking-[0.3em] text-sm pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              21 • 07 • 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-ivory to-champagne/30 py-8 border-t border-gold-soft/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Made with love text */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>Bërë me dashuri nga</span>
              <a
                href="https://www.instagram.com/ftesamagjike"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-gold transition-colors"
              >
                ftesamagjike
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/ftesamagjike"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-soft/20 to-gold/20 hover:from-gold-soft/40 hover:to-gold/40 transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                <span className="text-sm text-foreground">Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@ftesamagjike"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-soft/20 to-gold/20 hover:from-gold-soft/40 hover:to-gold/40 transition-all duration-300 group"
              >
                <Music2 className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                <span className="text-sm text-foreground">TikTok</span>
              </a>
            </div>

            {/* Decorative element */}
            <div className="flex items-center gap-3 mt-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-soft/50" />
              <span className="text-gold/60">✨</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-soft/50" />
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Closing;
