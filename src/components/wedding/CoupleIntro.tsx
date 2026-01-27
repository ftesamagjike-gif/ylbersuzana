import { motion } from "framer-motion";

const CoupleIntro = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-ivory to-champagne/20 py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Decorative element */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-2xl">💍</span>
            <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          {/* Names */}
          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Ylber
          </motion.h1>

          <motion.p
            className="font-serif text-3xl md:text-4xl text-gold italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            &
          </motion.p>

          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Suzana
          </motion.h1>

          {/* Date */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-2xl md:text-3xl tracking-[0.5em] text-muted-foreground font-light">
              21 • 07 • 2026
            </p>
          </motion.div>

          {/* Invitation message */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p className="font-serif text-lg md:text-xl text-muted-foreground italic max-w-md mx-auto">
              Ju ftojmë me gëzim të madh të jeni pjesë e ditës sonë të veçantë
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleIntro;
