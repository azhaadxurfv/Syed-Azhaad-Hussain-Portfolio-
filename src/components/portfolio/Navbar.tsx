import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";

const navLinks = [
  { label: "Home", href: "#hero"},
  { label: "about", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass neon-border" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <button onClick={() => handleClick("#hero")} className="text-xl font-bold tracking-wider text-primary neon-text">
          SYED AZHAAD HUSSAIN | PORTFOLIO
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              className="text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs text-muted-foreground">{theme === "aqua" ? "Aqua" : "Red"}</span>
            <Switch checked={theme === "red"} onCheckedChange={toggleTheme} />
          </div>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex flex-col gap-1.5">
          <span className={`w-6 h-0.5 bg-primary transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-primary transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-primary transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass neon-border mx-4 mt-2 rounded-lg p-4 flex flex-col gap-3"
        >
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
            >
              {l.label}
            </button>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">{theme === "aqua" ? "Aqua" : "Red"}</span>
            <Switch checked={theme === "red"} onCheckedChange={toggleTheme} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;