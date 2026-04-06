import { motion } from "framer-motion";
import { Palette, PenTool, Layout, Figma, Bot, Code, FileCode, Braces, Box, Globe } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";

const iconMap: Record<string, React.FC<any>> = { Palette, PenTool, Layout, Figma, Bot, Code, FileCode, Braces, Box, Globe };

const About = () => {
  const { data } = useSiteData();
  const { bio1, bio2, tools } = data.about;

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">About <span className="text-primary neon-text">Me</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">{bio1}</p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{bio2}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-xl font-semibold mb-6 text-foreground">Tools & Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tools.map((tool, i) => {
                const Icon = iconMap[tool.icon] || Globe;
                return (
                  <motion.div key={tool.name + i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.08, y: -4 }} className="glass neon-border rounded-xl p-4 text-center">
                    <Icon className="w-8 h-8 text-foreground mx-auto mb-2" strokeWidth={1.5} />
                    <span className="text-sm text-foreground font-medium">{tool.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
