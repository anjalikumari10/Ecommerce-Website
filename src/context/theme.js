import { createContext } from "react";

export const ThemeContext = createContext();

// Initialize theme from localStorage or system preference
export const initializeTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    return saved;
  }
  // Check system preference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};
