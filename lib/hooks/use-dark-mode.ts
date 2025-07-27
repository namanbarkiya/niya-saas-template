import { useCallback, useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  // Set initial state and listen for changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    // Check localStorage
    const userPref = localStorage.getItem("theme");
    let dark = false;
    if (userPref === "dark") dark = true;
    else if (userPref === "light") dark = false;
    else dark = true; // Default to dark if no user preference
    // Apply class if needed
    if (dark && !root.classList.contains("dark")) {
      root.classList.add("dark");
    } else if (!dark && root.classList.contains("dark")) {
      root.classList.remove("dark");
    }
    setIsDark(root.classList.contains("dark"));

    // Listen for class changes
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Toggle function
  const toggleDark = useCallback(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const isCurrentlyDark = root.classList.contains("dark");
    if (isCurrentlyDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  }, []);

  return [isDark, toggleDark] as const;
}
