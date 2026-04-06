import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/portfolioData";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: Props) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 glass neon-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10"
          >
            ✕
          </button>

          {/* Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.classList.add("bg-gradient-to-br", "from-primary/20", "to-accent/20");
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30 uppercase tracking-wider">
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{project.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{project.detailedDescription}</p>

            <div className="mb-6">
              <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">Tools Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1 text-xs rounded-full bg-muted text-foreground border border-border">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">Concept</h4>
              <p className="text-muted-foreground leading-relaxed">{project.concept}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
