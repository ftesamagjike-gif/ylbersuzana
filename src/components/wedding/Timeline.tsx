import { motion } from "framer-motion";
import { Clock, Heart, Music, Cake, Sparkles, UsersRound } from "lucide-react";

const timelineEvents = [
  {
    time: "19:00",
    title: "Mirëseardhje dhe pritja",
    description: "Mbërritja e mysafirëve dhe pritja e ngrohtë",
    icon: UsersRound,
  },
  {
    time: "20:00",
    title: "Fillimi i festës",
    description: "Nis festimi i kësaj dite të veçantë",
    icon: Heart,
  },
  {
    time: "21:30",
    title: "Daraka & Muzikë Live",
    description: "Shijojmë darkën dhe kënaqemi me muzikë të gjallë",
    icon: Music,
  },
  {
    time: "23:00",
    title: "Prerja e tortës",
    description: "Momenti i ëmbël i mbrëmjes",
    icon: Cake,
  },
  {
    time: "23:30",
    title: "Vallëzim dhe festë pa fund",
    description: "Festojmë dhe vallëzojmë deri në mëngjes",
    icon: Sparkles,
  },
];

const Timeline = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-champagne/10 via-ivory to-champagne/10">
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
            Orari i Dasmës
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-soft" />
            <span className="text-gold">⏰</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-soft" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-soft via-gold to-gold-soft md:-translate-x-1/2" />

            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center gap-8 mb-16 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Time badge - mobile on left, alternating on desktop */}
                <div className="hidden md:block md:flex-1 text-right">
                  {index % 2 === 0 && (
                    <div className="inline-block">
                      <span className="font-serif text-3xl text-gold font-medium">
                        {event.time}
                      </span>
                    </div>
                  )}
                  {index % 2 !== 0 && (
                    <div className="bg-card p-6 rounded-2xl shadow-lg border border-gold-soft/30 text-left">
                      <h3 className="font-serif text-xl text-foreground mb-2">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {event.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Icon circle */}
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-soft to-gold flex items-center justify-center shadow-lg">
                    <event.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </motion.div>

                {/* Content card */}
                <div className="md:flex-1">
                  {/* Mobile time */}
                  <div className="md:hidden mb-2">
                    <span className="font-serif text-2xl text-gold font-medium">
                      {event.time}
                    </span>
                  </div>

                  {/* Desktop: show card on right for even, time on right for odd */}
                  <div className="md:hidden bg-card p-6 rounded-2xl shadow-lg border border-gold-soft/30">
                    <h3 className="font-serif text-xl text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {event.description}
                    </p>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:block">
                    {index % 2 === 0 && (
                      <div className="bg-card p-6 rounded-2xl shadow-lg border border-gold-soft/30">
                        <h3 className="font-serif text-xl text-foreground mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {event.description}
                        </p>
                      </div>
                    )}
                    {index % 2 !== 0 && (
                      <div className="text-left">
                        <span className="font-serif text-3xl text-gold font-medium">
                          {event.time}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
