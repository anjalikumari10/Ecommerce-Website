import { createContext } from "react";

export const AuthContext = createContext();

export function initializeUser() {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem("user");
    }
  }
  return null;
}
