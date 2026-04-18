const BASE = "https://fakestoreapi.com";

export const getProducts = async () => {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
};