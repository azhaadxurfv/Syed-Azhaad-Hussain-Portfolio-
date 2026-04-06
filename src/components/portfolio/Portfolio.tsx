import { useState } from "react";
import { motion } from "framer-motion";
import { categories, Project } from "@/data/portfolioData";
import { useSiteData } from "@/contexts/SiteDataContext";
import ProjectModal from "./ProjectModal";

const Portfolio = () => {
  const { data } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === "all" ? data.projects : data.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">My <span className="text-primary neon-text">Portfolio</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)} className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all ${activeCategory === cat.key ? "bg-primary text-primary-foreground neon-glow" : "glass text-muted-foreground hover:text-primary neon-border"}`}>
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div key={project.id} layout initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -8, rotateX: 2, rotateY: -2 }} onClick={() => setSelectedProject(project)} className="glass neon-border rounded-2xl overflow-hidden group cursor-none" style={{ perspective: 1000 }}>
              <div className="relative h-52 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.classList.add("bg-gradient-to-br", "from-primary/20", "to-accent/30", "flex", "items-center", "justify-center"); const label = document.createElement("span"); label.textContent = project.title; label.className = "text-primary font-bold text-lg"; (e.target as HTMLImageElement).parentElement!.appendChild(label); }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <span className="text-xs text-primary uppercase tracking-wider font-medium">{project.category}</span>
                <h3 className="text-lg font-bold text-foreground mt-1 mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};

export default Portfolio;
