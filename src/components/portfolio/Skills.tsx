import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";

const Skills = () => {
  const { data } = useSiteData();

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">My <span className="text-primary neon-text">Skills</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
          {data.skills.map((skill, i) => (
            <motion.div key={skill.id} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <span className="text-sm text-primary font-bold">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.05, ease: "easeOut" }} style={{ boxShadow: `0 0 10px rgba(var(--neon-glow-rgb), 0.5)` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
