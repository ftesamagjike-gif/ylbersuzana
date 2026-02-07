import { motion } from "framer-motion";
import weddingBg from "@/assets/wedding-1.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={weddingBg}
          alt="Wedding background"
          className="w-full h-full object-cover object-[45%_50%] sm:object-[45%_50%] md:object-[45%_50%] lg:object-[45%_50%] xl:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Animated light effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gold/20 blur-3xl"
          animate={{
            x: ["-20%", "80%"],
            y: ["10%", "50%", "20%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-champagne/30 blur-3xl"
          animate={{
            x: ["100%", "0%"],
            y: ["60%", "20%", "70%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Wedding invitation badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block"
          >
            <span className="px-6 py-2 bg-gold/20 backdrop-blur-sm border border-gold/40 rounded-full text-ivory text-sm tracking-[0.2em] uppercase">
              Jeni të ftuar
            </span>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-ivory/90 tracking-[0.3em] uppercase font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Një ditë
          </motion.p>
          
          <motion.p
            className="text-lg md:text-xl text-ivory/90 tracking-[0.3em] uppercase font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Një histori
          </motion.p>
          
          <motion.p
            className="text-lg md:text-xl text-ivory/90 tracking-[0.3em] uppercase font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            Një dashuri
          </motion.p>

          {/* Decorative hearts */}
          <motion.div
            className="flex items-center justify-center gap-6 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <motion.span 
              className="text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💍
            </motion.span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>

          {/* Names preview */}
          <motion.p
            className="font-serif text-2xl md:text-3xl text-ivory pt-4 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            Ylber & Suzana
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
