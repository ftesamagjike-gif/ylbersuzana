import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const Location = () => {
  const googleMapsUrl = "https://maps.app.goo.gl/9uXXPskfHC9ffu2W6";
  
  // Extract coordinates for embed (approximate for Hill Premium Gjakovë)
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2951.8!2d20.42!3d42.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHill%20Premium!5e0!3m2!1sen!2s!4v1706400000000!5m2!1sen!2s";

  return (
    <section className="relative py-24 bg-gradient-to-b from-champagne/10 to-ivory">
      <div className="container mx-auto px-6">
        {/* Section title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Na gjeni këtu 👇
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-soft" />
            <MapPin className="w-5 h-5 text-gold" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-soft" />
          </div>
        </motion.div>

        {/* Venue name */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h3 className="font-serif text-2xl md:text-3xl text-foreground">
            Hill Premium
          </h3>
          <p className="text-muted-foreground mt-2">Gjakovë, Kosovë</p>
        </motion.div>

        {/* Map */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gold-soft/30"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <iframe
            src={embedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hill Premium - Lokacioni i Dasmës"
            className="w-full"
          />
        </motion.div>

        {/* Navigation button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-sm text-muted-foreground mb-4">
            Kliko për navigim direkt
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-gold-soft to-gold hover:from-gold hover:to-gold-soft text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3"
            >
              <Navigation className="w-5 h-5" />
              Hap në Google Maps
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
