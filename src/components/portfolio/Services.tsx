import { motion } from "framer-motion";
import { Palette, Diamond, Smartphone, Globe, PenTool, Layout, Figma, Bot, Code, FileCode, Braces, Box, Send, Camera, Users, Play, Search, Settings, Home, User, BarChart3, FolderOpen, Briefcase, Phone } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";

const iconMap: Record<string, React.FC<any>> = { Palette, Diamond, Smartphone, Globe, PenTool, Layout, Figma, Bot, Code, FileCode, Braces, Box, Send, Camera, Users, Play, Search, Settings, Home, User, BarChart3, FolderOpen, Briefcase, Phone };

const Services = () => {
  const { data } = useSiteData();

  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">My <span className="text-primary neon-text">Services</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8, scale: 1.02 }} className="glass neon-border rounded-2xl p-6 text-center group">
                <motion.div className="mb-4 flex justify-center" whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Icon className="w-12 h-12 text-foreground" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
