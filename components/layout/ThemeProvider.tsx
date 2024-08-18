"use client";

import { useEffect, useState } from "react";

export const ThemeProvider = () => {
  // Initial state is undefined to avoid SSR mismatches
  const [theme, setTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Function to get and apply the theme
    const applyTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setTheme(prefersDark ? "dark" : "light");
      }
    };

    applyTheme();

    // Listen to changes in the preferred color scheme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return null;
};
