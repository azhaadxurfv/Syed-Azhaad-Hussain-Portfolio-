import { useState, useCallback, useEffect } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useSiteData } from "@/contexts/SiteDataContext";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import CustomCursor from "@/components/portfolio/CustomCursor";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Portfolio from "@/components/portfolio/Portfolio";
import Services from "@/components/portfolio/Services";
import Contact from "@/components/portfolio/Contact";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const onLoadComplete = useCallback(() => setLoading(false), []);
  const { data } = useSiteData();

  // Dynamic SEO meta tags
  useEffect(() => {
    document.title = data.seo.title;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", data.seo.description);
    setMeta("keywords", data.seo.keywords);
    setMeta("og:title", data.seo.title);
    setMeta("og:description", data.seo.description);
    setMeta("og:image", data.seo.ogImage);
  }, [data.seo]);

  return (
    <ThemeProvider>
      <CustomCursor />
      {loading ? (
        <LoadingScreen onComplete={onLoadComplete} />
      ) : (
        <>
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Portfolio />
            <Services />
            <Contact />
          </main>
        </>
      )}
    </ThemeProvider>
  );
};

export default Index;
