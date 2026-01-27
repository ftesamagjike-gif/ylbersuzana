import { motion } from "framer-motion";

const Closing = () => {
  return (
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
  );
};

export default Closing;
