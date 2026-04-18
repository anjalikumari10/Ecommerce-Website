import { createContext } from "react";

export const CartContext = createContext();

export function initializeCart() {
  const data = localStorage.getItem("cart");
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Failed to parse cart:", error);
      return [];
    }
  }
  return [];
}
