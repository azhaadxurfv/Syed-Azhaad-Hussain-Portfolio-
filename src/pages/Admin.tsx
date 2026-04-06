import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/data/portfolioData";
import {
  Search, Settings, Home, User, BarChart3, FolderOpen, Briefcase, Phone, LogOut, Menu, X,
  Palette, PenTool, Layout, Figma, Bot, Code, FileCode, Braces, Box, Globe,
  Diamond, Smartphone, Send, Camera, Users, Play, Trash2, Plus, Edit, Save, Upload, Eye, Database
} from "lucide-react";

// Icon map for dynamic rendering
const iconMap: Record<string, React.FC<any>> = {
  Palette, PenTool, Layout, Figma, Bot, Code, FileCode, Braces, Box, Globe,
  Diamond, Smartphone, Send, Camera, Users, Play, Search, Settings, Home, User,
  BarChart3, FolderOpen, Briefcase, Phone,
};

const getIcon = (name: string) => iconMap[name] || Globe;

const AdminLogin = ({ onLogin }: { onLogin: (u: string, p: string) => boolean }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(username, password)) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="glass neon-border rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary neon-text text-center mb-2">Admin Panel</h1>
        <p className="text-muted-foreground text-center text-sm mb-8">Sign in to manage your portfolio</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button type="submit" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold neon-glow hover:scale-[1.02] transition-transform">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

type Tab = "seo" | "hero" | "about" | "skills" | "portfolio" | "services" | "contact" | "firebase";

const sidebarItems: { key: Tab; label: string; icon: React.FC<any> }[] = [
  { key: "seo", label: "SEO & Meta", icon: Search },
  { key: "hero", label: "Hero", icon: Home },
  { key: "about", label: "About", icon: User },
  { key: "skills", label: "Skills", icon: BarChart3 },
  { key: "portfolio", label: "Portfolio", icon: FolderOpen },
  { key: "services", label: "Services", icon: Briefcase },
  { key: "contact", label: "Contact", icon: Phone },
  { key: "firebase", label: "Firebase", icon: Database }, // Assuming Database icon exists, or use another
];

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [tab, setTab] = useState<Tab>("seo");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, updateSeo, updateHero, updateAbout, updateSkills, updateProjects, updateServices, updateContact } = useSiteData();
  const { toast } = useToast();

  const saved = () => toast({ title: "Saved!", description: "Changes saved successfully." });

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 glass border-r border-border transform transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary neon-text">Admin</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-foreground"><X className="w-5 h-5" /></button>
        </div>
        <nav className="px-3 flex flex-col gap-1">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => { setTab(item.key); setSidebarOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab === item.key ? "bg-primary/10 text-primary neon-border" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-6 left-3 right-3">
          <a href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all mb-2">
            <Eye className="w-4 h-4" strokeWidth={1.5} /> View Site
          </a>
          <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-all w-full">
            <LogOut className="w-4 h-4" strokeWidth={1.5} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-h-screen">
        <header className="h-14 border-b border-border flex items-center px-4 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-foreground"><Menu className="w-5 h-5" /></button>
          <h1 className="text-lg font-semibold text-foreground capitalize">{tab === "seo" ? "SEO & Meta Tags" : tab === "firebase" ? "Firebase Database" : tab} Manager</h1>
        </header>
        <main className="p-4 md:p-8 max-w-5xl">
          {tab === "seo" && <SeoEditor data={data.seo} onSave={d => { updateSeo(d); saved(); }} />}
          {tab === "hero" && <HeroEditor data={data.hero} onSave={d => { updateHero(d); saved(); }} />}
          {tab === "about" && <AboutEditor data={data.about} onSave={d => { updateAbout(d); saved(); }} />}
          {tab === "skills" && <SkillsEditor data={data.skills} onSave={d => { updateSkills(d); saved(); }} />}
          {tab === "portfolio" && <PortfolioEditor data={data.projects} onSave={d => { updateProjects(d); saved(); }} />}
          {tab === "services" && <ServicesEditor data={data.services} onSave={d => { updateServices(d); saved(); }} />}
          {tab === "contact" && <ContactEditor data={data.contact} onSave={d => { updateContact(d); saved(); }} />}
          {tab === "firebase" && <FirebaseDemo />}
        </main>
      </div>
    </div>
  );
};

// ---- Section Editors ----

const SectionCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`glass neon-border rounded-2xl p-6 ${className}`}>{children}</div>
);

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="text-sm font-medium text-foreground block mb-1">{children}</label>
);

const FieldInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all text-sm" />
);

const FieldTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea {...props} className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all text-sm resize-none" />
);

const SaveBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm neon-glow hover:scale-[1.02] transition-transform mt-4">
    <Save className="w-4 h-4" /> Save Changes
  </button>
);

// SEO
import type { SeoData } from "@/contexts/SiteDataContext";
const SeoEditor = ({ data, onSave }: { data: SeoData; onSave: (d: SeoData) => void }) => {
  const [form, setForm] = useState(data);
  const set = (k: keyof SeoData, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <SectionCard>
      <h3 className="text-lg font-bold text-foreground mb-6">SEO & Meta Tags</h3>
      <div className="flex flex-col gap-4">
        <div><FieldLabel>Page Title</FieldLabel><FieldInput value={form.title} onChange={e => set("title", e.target.value)} /></div>
        <div><FieldLabel>Meta Description</FieldLabel><FieldTextarea rows={3} value={form.description} onChange={e => set("description", e.target.value)} /></div>
        <div><FieldLabel>Keywords</FieldLabel><FieldInput value={form.keywords} onChange={e => set("keywords", e.target.value)} /></div>
        <div><FieldLabel>OG Image URL</FieldLabel><FieldInput value={form.ogImage} onChange={e => set("ogImage", e.target.value)} /></div>
      </div>
      <SaveBtn onClick={() => onSave(form)} />
      <div className="mt-6 p-4 rounded-xl bg-muted border border-border">
        <p className="text-xs text-muted-foreground mb-1">Search Preview</p>
        <p className="text-primary text-sm font-medium truncate">{form.title}</p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{form.description}</p>
      </div>
    </SectionCard>
  );
};

// Hero
import type { HeroData } from "@/contexts/SiteDataContext";
const HeroEditor = ({ data, onSave }: { data: HeroData; onSave: (d: HeroData) => void }) => {
  const [form, setForm] = useState(data);
  const set = (k: keyof HeroData, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <SectionCard>
      <h3 className="text-lg font-bold text-foreground mb-6">Hero Section</h3>
      <div className="flex flex-col gap-4">
        <div><FieldLabel>Name</FieldLabel><FieldInput value={form.name} onChange={e => set("name", e.target.value)} /></div>
        <div><FieldLabel>Welcome Text</FieldLabel><FieldInput value={form.welcomeText} onChange={e => set("welcomeText", e.target.value)} /></div>
        <div><FieldLabel>Tagline</FieldLabel><FieldInput value={form.tagline} onChange={e => set("tagline", e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><FieldLabel>CTA Button 1</FieldLabel><FieldInput value={form.ctaWork} onChange={e => set("ctaWork", e.target.value)} /></div>
          <div><FieldLabel>CTA Button 2</FieldLabel><FieldInput value={form.ctaContact} onChange={e => set("ctaContact", e.target.value)} /></div>
        </div>
      </div>
      <SaveBtn onClick={() => onSave(form)} />
    </SectionCard>
  );
};

// About
import type { AboutData } from "@/contexts/SiteDataContext";
const AboutEditor = ({ data, onSave }: { data: AboutData; onSave: (d: AboutData) => void }) => {
  const [form, setForm] = useState(data);
  const iconOptions = Object.keys(iconMap);

  const addTool = () => setForm(f => ({ ...f, tools: [...f.tools, { name: "", icon: "Globe" }] }));
  const removeTool = (i: number) => setForm(f => ({ ...f, tools: f.tools.filter((_, idx) => idx !== i) }));
  const updateTool = (i: number, k: "name" | "icon", v: string) => setForm(f => ({
    ...f, tools: f.tools.map((t, idx) => idx === i ? { ...t, [k]: v } : t)
  }));

  return (
    <SectionCard>
      <h3 className="text-lg font-bold text-foreground mb-6">About Section</h3>
      <div className="flex flex-col gap-4">
        <div><FieldLabel>Bio Paragraph 1</FieldLabel><FieldTextarea rows={4} value={form.bio1} onChange={e => setForm(f => ({ ...f, bio1: e.target.value }))} /></div>
        <div><FieldLabel>Bio Paragraph 2</FieldLabel><FieldTextarea rows={4} value={form.bio2} onChange={e => setForm(f => ({ ...f, bio2: e.target.value }))} /></div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <FieldLabel>Tools & Technologies</FieldLabel>
            <button onClick={addTool} className="flex items-center gap-1 text-xs text-primary hover:underline"><Plus className="w-3 h-3" /> Add Tool</button>
          </div>
          <div className="flex flex-col gap-2">
            {form.tools.map((tool, i) => (
              <div key={i} className="flex items-center gap-2">
                <select value={tool.icon} onChange={e => updateTool(i, "icon", e.target.value)} className="px-2 py-2 rounded-lg bg-muted border border-border text-foreground text-sm w-32">
                  {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
                <FieldInput value={tool.name} onChange={e => updateTool(i, "name", e.target.value)} placeholder="Tool name" />
                <button onClick={() => removeTool(i)} className="text-destructive hover:bg-destructive/10 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SaveBtn onClick={() => onSave(form)} />
    </SectionCard>
  );
};

// Skills
import type { Skill } from "@/contexts/SiteDataContext";
const SkillsEditor = ({ data, onSave }: { data: Skill[]; onSave: (d: Skill[]) => void }) => {
  const [skills, setSkills] = useState(data);
  const add = () => setSkills(s => [...s, { id: `s${Date.now()}`, name: "", level: 50 }]);
  const remove = (id: string) => setSkills(s => s.filter(sk => sk.id !== id));
  const update = (id: string, k: keyof Skill, v: any) => setSkills(s => s.map(sk => sk.id === id ? { ...sk, [k]: v } : sk));

  return (
    <SectionCard>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Skills</h3>
        <button onClick={add} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {skills.map(skill => (
          <div key={skill.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border">
            <FieldInput value={skill.name} onChange={e => update(skill.id, "name", e.target.value)} placeholder="Skill name" />
            <input type="range" min={0} max={100} value={skill.level} onChange={e => update(skill.id, "level", +e.target.value)} className="flex-1 accent-primary" style={{ accentColor: "hsl(var(--primary))" }} />
            <span className="text-sm text-primary font-bold w-12 text-right">{skill.level}%</span>
            <button onClick={() => remove(skill.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
      <SaveBtn onClick={() => onSave(skills)} />
    </SectionCard>
  );
};

// Portfolio
const PortfolioEditor = ({ data, onSave }: { data: Project[]; onSave: (d: Project[]) => void }) => {
  const [projects, setProjects] = useState(data);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);

  const add = () => {
    const newP: Project = { id: `p${Date.now()}`, title: "", category: "logo", description: "", detailedDescription: "", tools: [], concept: "", image: "" };
    setProjects(p => [...p, newP]);
    setEditingId(newP.id);
  };

  const remove = (id: string) => {
    setProjects(p => p.filter(pr => pr.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const update = (id: string, updates: Partial<Project>) => {
    setProjects(p => p.map(pr => pr.id === id ? { ...pr, ...updates } : pr));
  };

  const handleImageUpload = (id: string, file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      alert("Max file size is 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update(id, { image: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionCard>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h3 className="text-lg font-bold text-foreground">Portfolio ({projects.length} projects)</h3>
          <div className="flex gap-2">
            <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-muted border border-border text-foreground text-sm">
              <option value="all">All</option>
              <option value="logo">Logo</option>
              <option value="social">Social</option>
              <option value="website">Website</option>
            </select>
            <button onClick={add} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {filtered.map(project => (
            <div key={project.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border">
              {project.image ? (
                <img src={project.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FolderOpen className="w-5 h-5 text-primary" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{project.title || "Untitled"}</p>
                <p className="text-xs text-muted-foreground capitalize">{project.category}</p>
              </div>
              <button onClick={() => setEditingId(editingId === project.id ? null : project.id)} className="text-foreground hover:text-primary p-2 rounded-lg hover:bg-primary/10 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => remove(project.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Edit form */}
      {editingId && (() => {
        const p = projects.find(pr => pr.id === editingId);
        if (!p) return null;
        return (
          <SectionCard>
            <h3 className="text-lg font-bold text-foreground mb-4">Edit: {p.title || "Untitled"}</h3>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div><FieldLabel>Title</FieldLabel><FieldInput value={p.title} onChange={e => update(p.id, { title: e.target.value })} /></div>
                <div>
                  <FieldLabel>Category</FieldLabel>
                  <select value={p.category} onChange={e => update(p.id, { category: e.target.value as Project["category"] })} className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm">
                    <option value="logo">Logo Design</option>
                    <option value="social">Social Media</option>
                    <option value="website">Website Design</option>
                  </select>
                </div>
              </div>
              <div><FieldLabel>Short Description</FieldLabel><FieldInput value={p.description} onChange={e => update(p.id, { description: e.target.value })} /></div>
              <div><FieldLabel>Detailed Description</FieldLabel><FieldTextarea rows={4} value={p.detailedDescription} onChange={e => update(p.id, { detailedDescription: e.target.value })} /></div>
              <div><FieldLabel>Tools (comma-separated)</FieldLabel><FieldInput value={p.tools.join(", ")} onChange={e => update(p.id, { tools: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} /></div>
              <div><FieldLabel>Concept</FieldLabel><FieldTextarea rows={3} value={p.concept} onChange={e => update(p.id, { concept: e.target.value })} /></div>
              <div>
                <FieldLabel>Image</FieldLabel>
                <div className="flex items-center gap-4">
                  {p.image && <img src={p.image} alt="" className="w-24 h-16 rounded-lg object-cover" />}
                  <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted border border-dashed border-primary/40 text-primary text-sm cursor-pointer hover:bg-primary/5 transition-colors">
                    <Upload className="w-4 h-4" /> Upload Image
                    <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleImageUpload(p.id, e.target.files[0])} />
                  </label>
                  <span className="text-xs text-muted-foreground">or</span>
                  <FieldInput placeholder="Image URL" value={p.image.startsWith("data:") ? "" : p.image} onChange={e => update(p.id, { image: e.target.value })} />
                </div>
              </div>
            </div>
            <SaveBtn onClick={() => { onSave(projects); setEditingId(null); }} />
          </SectionCard>
        );
      })()}

      {!editingId && <SaveBtn onClick={() => onSave(projects)} />}
    </div>
  );
};

// Services
import type { ServiceItem } from "@/contexts/SiteDataContext";
const ServicesEditor = ({ data, onSave }: { data: ServiceItem[]; onSave: (d: ServiceItem[]) => void }) => {
  const [services, setServices] = useState(data);
  const iconOptions = Object.keys(iconMap);

  const add = () => setServices(s => [...s, { id: `sv${Date.now()}`, icon: "Globe", title: "", description: "" }]);
  const remove = (id: string) => setServices(s => s.filter(sv => sv.id !== id));
  const update = (id: string, k: keyof ServiceItem, v: string) => setServices(s => s.map(sv => sv.id === id ? { ...sv, [k]: v } : sv));

  return (
    <SectionCard>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Services</h3>
        <button onClick={add} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {services.map(service => (
          <div key={service.id} className="p-4 rounded-xl bg-muted border border-border flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <select value={service.icon} onChange={e => update(service.id, "icon", e.target.value)} className="px-2 py-2 rounded-lg bg-background border border-border text-foreground text-sm w-32">
                {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
              </select>
              <FieldInput value={service.title} onChange={e => update(service.id, "title", e.target.value)} placeholder="Service title" />
              <button onClick={() => remove(service.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
            <FieldTextarea rows={2} value={service.description} onChange={e => update(service.id, "description", e.target.value)} placeholder="Description" />
          </div>
        ))}
      </div>
      <SaveBtn onClick={() => onSave(services)} />
    </SectionCard>
  );
};

// Contact
import type { ContactData, SocialLink } from "@/contexts/SiteDataContext";
const ContactEditor = ({ data, onSave }: { data: ContactData; onSave: (d: ContactData) => void }) => {
  const [form, setForm] = useState(data);
  const iconOptions = Object.keys(iconMap);

  const addLink = () => setForm(f => ({ ...f, socialLinks: [...f.socialLinks, { id: `sl${Date.now()}`, name: "", icon: "Globe", url: "" }] }));
  const removeLink = (id: string) => setForm(f => ({ ...f, socialLinks: f.socialLinks.filter(l => l.id !== id) }));
  const updateLink = (id: string, k: keyof SocialLink, v: string) => setForm(f => ({
    ...f, socialLinks: f.socialLinks.map(l => l.id === id ? { ...l, [k]: v } : l)
  }));

  return (
    <SectionCard>
      <h3 className="text-lg font-bold text-foreground mb-6">Contact & Social Links</h3>
      <div className="flex flex-col gap-4">
        <div><FieldLabel>Phone Number</FieldLabel><FieldInput value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <FieldLabel>Social Links</FieldLabel>
            <button onClick={addLink} className="flex items-center gap-1 text-xs text-primary hover:underline"><Plus className="w-3 h-3" /> Add Link</button>
          </div>
          <div className="flex flex-col gap-2">
            {form.socialLinks.map(link => (
              <div key={link.id} className="flex items-center gap-2">
                <select value={link.icon} onChange={e => updateLink(link.id, "icon", e.target.value)} className="px-2 py-2 rounded-lg bg-muted border border-border text-foreground text-sm w-28">
                  {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
                <FieldInput value={link.name} onChange={e => updateLink(link.id, "name", e.target.value)} placeholder="Name" />
                <FieldInput value={link.url} onChange={e => updateLink(link.id, "url", e.target.value)} placeholder="URL" />
                <button onClick={() => removeLink(link.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SaveBtn onClick={() => onSave(form)} />
    </SectionCard>
  );
};

// Firebase Demo Component
import { addData, getAllData, updateData, deleteData, subscribeToData, UserData } from "@/lib/firestore";

const FirebaseDemo = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Real-time listener
    const unsubscribe = subscribeToData((newData) => {
      setData(newData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateData(editingId, form);
        toast({ title: "Updated successfully!" });
        setEditingId(null);
      } else {
        await addData(form);
        toast({ title: "Added successfully!" });
      }
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save data", variant: "destructive" });
    }
  };

  const handleEdit = (item: UserData) => {
    setForm({ name: item.name, email: item.email, message: item.message || "" });
    setEditingId(item.id!);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteData(id);
      toast({ title: "Deleted successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <SectionCard>
      <h3 className="text-lg font-bold text-foreground mb-6">Firebase Firestore Demo</h3>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div><FieldLabel>Name</FieldLabel><FieldInput value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required /></div>
          <div><FieldLabel>Email</FieldLabel><FieldInput type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required /></div>
        </div>
        <div><FieldLabel>Message</FieldLabel><FieldTextarea rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} /></div>
        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm neon-glow hover:scale-[1.02] transition-transform">
          {editingId ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {editingId ? "Update" : "Add"} Data
        </button>
      </form>

      {/* Data List */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-foreground">Saved Data ({data.length})</h4>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-muted-foreground">No data yet. Add some!</p>
        ) : (
          data.map(item => (
            <div key={item.id} className="p-4 rounded-xl bg-muted border border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.email}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="text-primary hover:bg-primary/10 p-2 rounded-lg"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id!)} className="text-destructive hover:bg-destructive/10 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              {item.message && <p className="text-sm text-muted-foreground">{item.message}</p>}
              <p className="text-xs text-muted-foreground mt-2">Created: {item.createdAt?.toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
};

// Main Admin Page
const Admin = () => {
  const { isAuthenticated, login, logout } = useAdminAuth();

  if (!isAuthenticated) return <AdminLogin onLogin={login} />;
  return <AdminDashboard onLogout={logout} />;
};

export default Admin;
