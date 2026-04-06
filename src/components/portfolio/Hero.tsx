import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";

const Hero = () => {
  const { data } = useSiteData();
  const { name, welcomeText, tagline, ctaWork, ctaContact } = data.hero;
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(name.slice(0, i + 1));
      i++;
      if (i >= name.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [name]);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full"
        animate={{ y: [-20, 20, -20], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-20 h-20 border border-primary/15"
        animate={{ y: [15, -15, 15], rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary/30 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-6 h-6 bg-primary/20 rounded-full"
        animate={{ scale: [1, 2, 1], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(var(--neon-glow-rgb),0.08)_0%,_transparent_70%)]" />

      <div className="relative z-10 text-center max-w-4xl">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-4">
          {welcomeText}
        </motion.p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          <span className="text-primary neon-text">{displayText}</span>
          <span className="animate-blink border-r-2 border-primary ml-1">&nbsp;</span>
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-lg md:text-2xl text-muted-foreground mb-10 tracking-wide">
          {tagline}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => scrollTo("#portfolio")} className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold tracking-wide hover:scale-105 transition-transform neon-glow">
            {ctaWork}
          </button>
          <button onClick={() => scrollTo("#contact")} className="px-8 py-3 rounded-lg border border-primary text-primary font-semibold tracking-wide hover:bg-primary/10 transition-all neon-border">
            {ctaContact}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
