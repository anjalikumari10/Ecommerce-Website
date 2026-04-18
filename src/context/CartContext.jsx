import { useState, useEffect } from "react";
import { CartContext, initializeCart } from "./cart";
import toast from "react-hot-toast";

// Re-export for backward compatibility
export { CartContext };

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initializeCart);
  const [loadingIds, setLoadingIds] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (loadingIds.includes(product.id)) return;

    setLoadingIds((prev) => [...prev, product.id]);

    setTimeout(() => {
      setCart((prev) => {
        const exists = prev.find((item) => item.id === product.id);
        if (exists) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });

      toast.success("Added to cart");

      setLoadingIds((prev) => prev.filter((id) => id !== product.id));
    }, 400);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast("Item removed");
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart(cart.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, loadingIds }}
    >
      {children}
    </CartContext.Provider>
  );
};
