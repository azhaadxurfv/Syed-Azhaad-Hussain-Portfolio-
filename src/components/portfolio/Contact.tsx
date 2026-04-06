import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Camera, Users, Play, Phone, Globe, PenTool, Layout, Figma, Bot, Code, FileCode, Braces, Box, Diamond, Smartphone, Palette, Search, Settings, Home, User, BarChart3, FolderOpen, Briefcase } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";

const iconMap: Record<string, React.FC<any>> = { Send, Camera, Users, Play, Phone, Globe, PenTool, Layout, Figma, Bot, Code, FileCode, Braces, Box, Diamond, Smartphone, Palette, Search, Settings, Home, User, BarChart3, FolderOpen, Briefcase };

const Contact = () => {
  const { data } = useSiteData();
  const { phone, socialLinks } = data.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">Get In <span className="text-primary neon-text">Touch</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-4">
            {(["name", "email"] as const).map((field) => (
              <input key={field} type={field === "email" ? "email" : "text"} placeholder={field === "name" ? "Your Name" : "Your Email"} required value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:neon-border transition-all" />
            ))}
            <textarea placeholder="Your Message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none" />
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold tracking-wide neon-glow">
              {submitted ? "Message Sent!" : "Send Message"}
            </motion.button>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <div className="glass neon-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-foreground">Phone</h3>
              </div>
              <p className="text-primary font-mono text-lg">{phone}</p>
            </div>

            <div className="glass neon-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-foreground">Social Links</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon] || Globe;
                  return (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 border border-border hover:border-primary/40 transition-all text-sm text-foreground">
                      <Icon className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-24 text-center border-t border-border pt-8">
        <p className="text-sm text-muted-foreground">© 2026 <span className="text-primary">{data.hero.name}</span>. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Contact;
