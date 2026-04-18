import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductModal({ product, isOpen, onClose }) {
  const { addToCart, loadingIds } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const isLoading = loadingIds.includes(product?.id);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item${quantity > 1 ? "s" : ""} to cart`);
    onClose();
  };

  // Generate consistent rating and reviews based on product ID
  const seed = product.id % 100;
  const rating = (((seed % 15) + 35) / 10).toFixed(1);
  const reviews = ((seed * 7) % 500) + 10;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
        <div
          className="bg-white rounded-lg shadow-2xl overflow-hidden animate-slide-in max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
              <img
                src={product.image}
                alt={product.title}
                className="h-64 object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>

              {/* Title and Category */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 capitalize">
                  <i className="fas fa-folder mr-2"></i>
                  {product.category}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        <i className="fas fa-star"></i>
                      </span>
                    ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-4xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Description</p>
                <p className="text-gray-700 line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-semibold">
                  <i className="fas fa-check-circle mr-2"></i>
                  In Stock
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Quantity</p>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded transition"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded transition"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Adding...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition"
                >
                  <i className="fas fa-times mr-2"></i>Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
