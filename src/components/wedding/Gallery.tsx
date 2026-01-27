import { motion } from "framer-motion";
import { useState } from "react";

import wedding1 from "@/assets/wedding-1.jpg";
import wedding2 from "@/assets/wedding-2.jpg";
import wedding3 from "@/assets/wedding-3.jpg";
import wedding4 from "@/assets/wedding-4.jpg";
import wedding5 from "@/assets/wedding-5.jpg";

const images = [
  { src: wedding1, alt: "Ylber & Suzana - Foto 1" },
  { src: wedding2, alt: "Ylber & Suzana - Foto 2" },
  { src: wedding3, alt: "Ylber & Suzana - Foto 3" },
  { src: wedding4, alt: "Ylber & Suzana - Foto 4" },
  { src: wedding5, alt: "Ylber & Suzana - Foto 5" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-gradient-to-b from-ivory via-champagne/10 to-ivory">
      <div className="container mx-auto px-6">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Galeria Jonë
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-soft" />
            <span className="text-gold text-xl">📸</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-soft" />
          </div>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group ${
                index === 0 ? "col-span-2 md:col-span-1 md:row-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="aspect-square overflow-hidden">
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            src={selectedImage}
            alt="Selected photo"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <button
            className="absolute top-6 right-6 text-primary-foreground text-4xl hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
