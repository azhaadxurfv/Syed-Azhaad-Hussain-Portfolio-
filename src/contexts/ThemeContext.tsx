import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "aqua" | "red";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "aqua", toggleTheme: () => {} });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("aqua");

  useEffect(() => {
    document.documentElement.classList.toggle("theme-red", theme === "red");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "aqua" ? "red" : "aqua"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
