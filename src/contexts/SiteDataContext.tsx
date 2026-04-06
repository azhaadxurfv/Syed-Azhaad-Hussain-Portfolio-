import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { projects as defaultProjects, categories as defaultCategories, Project } from "@/data/portfolioData";

// Types
export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface HeroData {
  name: string;
  welcomeText: string;
  tagline: string;
  ctaWork: string;
  ctaContact: string;
}

export interface AboutData {
  bio1: string;
  bio2: string;
  tools: { name: string; icon: string }[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  id: string;
  name: string;
  icon: string;
  url: string;
}

export interface ContactData {
  phone: string;
  socialLinks: SocialLink[];
}

export interface SiteData {
  seo: SeoData;
  hero: HeroData;
  about: AboutData;
  skills: Skill[];
  projects: Project[];
  services: ServiceItem[];
  contact: ContactData;
}

interface SiteDataContextType {
  data: SiteData;
  updateSeo: (seo: SeoData) => void;
  updateHero: (hero: HeroData) => void;
  updateAbout: (about: AboutData) => void;
  updateSkills: (skills: Skill[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateServices: (services: ServiceItem[]) => void;
  updateContact: (contact: ContactData) => void;
}

const defaultSiteData: SiteData = {
  seo: {
    title: "Syed Azhaad Hussain | Creative Graphic & Web Designer",
    description: "Portfolio of Syed Azhaad Hussain — Creative Graphic & Web Designer specializing in logos, branding, social media, and modern web design.",
    keywords: "graphic designer, web designer, logo design, branding, social media design, portfolio",
    ogImage: "/portfolio/web-1.jpg",
  },
  hero: {
    name: "Syed Azhaad Hussain",
    welcomeText: "Welcome to my creative world",
    tagline: "Creative Graphic & Web Designer",
    ctaWork: "View Work",
    ctaContact: "Contact Me",
  },
  about: {
    bio1: "I'm Syed Azhaad Hussain, a passionate Graphic & Web Designer dedicated to transforming ideas into visually compelling digital experiences. With expertise spanning brand identity, social media design, and modern web interfaces, I bring creativity and precision to every project.",
    bio2: "My approach combines cutting-edge design tools with a deep understanding of visual storytelling. Whether crafting a logo that captures a brand's essence or designing an immersive website experience, I focus on creating work that resonates and inspires.",
    tools: [
      { name: "Photoshop", icon: "Palette" },
      { name: "Illustrator", icon: "PenTool" },
      { name: "Canva Pro", icon: "Layout" },
      { name: "Figma", icon: "Figma" },
      { name: "AI Tools", icon: "Bot" },
      { name: "HTML/CSS", icon: "FileCode" },
      { name: "React", icon: "Code" },
      { name: "JavaScript", icon: "Braces" },
      { name: "Three.js", icon: "Box" },
      { name: "Web Dev", icon: "Globe" },
    ],
  },
  skills: [
    { id: "s1", name: "Logo Design", level: 95 },
    { id: "s2", name: "Brand Identity", level: 90 },
    { id: "s3", name: "Social Media Design", level: 92 },
    { id: "s4", name: "Web Design", level: 88 },
    { id: "s5", name: "UI/UX Design", level: 85 },
    { id: "s6", name: "Photo Editing", level: 90 },
    { id: "s7", name: "Typography", level: 88 },
    { id: "s8", name: "Motion Graphics", level: 75 },
    { id: "s9", name: "HTML & CSS", level: 90 },
    { id: "s10", name: "JavaScript", level: 85 },
    { id: "s11", name: "React", level: 82 },
    { id: "s12", name: "Three.js", level: 70 },
    { id: "s13", name: "Figma", level: 92 },
    { id: "s14", name: "Adobe Photoshop", level: 95 },
    { id: "s15", name: "Adobe Illustrator", level: 90 },
    { id: "s16", name: "Canva Pro", level: 94 },
  ],
  projects: defaultProjects,
  services: [
    { id: "sv1", icon: "Palette", title: "Graphic Design", description: "Eye-catching visuals, posters, flyers, and print materials that make your brand stand out from the competition." },
    { id: "sv2", icon: "Diamond", title: "Branding", description: "Complete brand identity packages including logos, color palettes, typography systems, and brand guidelines." },
    { id: "sv3", icon: "Smartphone", title: "Social Media Design", description: "Scroll-stopping social media content for Instagram, Facebook, YouTube, and more — designed for engagement." },
    { id: "sv4", icon: "Globe", title: "Website Design", description: "Modern, responsive website designs with intuitive UX, stunning visuals, and conversion-focused layouts." },
  ],
  contact: {
    phone: "0313-2493316",
    socialLinks: [
      { id: "sl1", name: "Telegram", icon: "Send", url: "https://telegram.com" },
      { id: "sl2", name: "Instagram", icon: "Camera", url: "https://instagram.com" },
      { id: "sl3", name: "Facebook", icon: "Users", url: "https://facebook.com" },
      { id: "sl4", name: "YouTube", icon: "Play", url: "https://youtube.com" },
    ],
  },
};

const STORAGE_KEY = "sah-portfolio-site-data";

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return defaultSiteData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  const updateSeo = useCallback((seo: SeoData) => setData(d => ({ ...d, seo })), []);
  const updateHero = useCallback((hero: HeroData) => setData(d => ({ ...d, hero })), []);
  const updateAbout = useCallback((about: AboutData) => setData(d => ({ ...d, about })), []);
  const updateSkills = useCallback((skills: Skill[]) => setData(d => ({ ...d, skills })), []);
  const updateProjects = useCallback((projects: Project[]) => setData(d => ({ ...d, projects })), []);
  const updateServices = useCallback((services: ServiceItem[]) => setData(d => ({ ...d, services })), []);
  const updateContact = useCallback((contact: ContactData) => setData(d => ({ ...d, contact })), []);

  return (
    <SiteDataContext.Provider value={{ data, updateSeo, updateHero, updateAbout, updateSkills, updateProjects, updateServices, updateContact }}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
};
