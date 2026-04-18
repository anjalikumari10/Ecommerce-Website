import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getProductById } from "../services/productService";
import { CartContext } from "../context/CartContext";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, loadingIds } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        if (isMounted) {
          setProduct(data);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load product");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductById(id);
      setProduct(data);
    } catch {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} retry={fetchProduct} />;

  const isLoading = loadingIds.includes(product.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="p-6 max-w-4xl mx-auto">
      <img src={product.image} className="h-60 mx-auto" />
      <h2 className="text-xl font-bold mt-4">{product.title}</h2>
      <p className="mt-2">{product.description}</p>
      <p className="font-bold mt-2">${product.price}</p>

      <button
        onClick={() => addToCart(product)}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 mt-4 disabled:opacity-50"
      >
        {isLoading ? "Adding..." : "Add to Cart"}
      </button>
      </div>
    </div>
  );
}
