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
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center px-3 sm:px-4 py-4 md:py-8">
        <div
          className="bg-white dark:bg-dark-card rounded-t-xl md:rounded-lg shadow-2xl overflow-hidden animate-slide-in max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-100 dark:bg-dark-bg rounded-lg p-3 sm:p-4 order-2 md:order-1">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 sm:h-56 md:h-64 object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between order-1 md:order-2 pb-4 md:pb-0">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text text-lg sm:text-2xl transition"
              >
                <i className="fas fa-times"></i>
              </button>

              {/* Title and Category */}
              <div className="pr-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-dark-text mb-1 sm:mb-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 dark:text-dark-text-secondary text-xs sm:text-sm mb-3 sm:mb-4 capitalize">
                  <i className="fas fa-folder mr-1 sm:mr-2"></i>
                  {product.category}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 text-xs sm:text-sm">
                <div className="flex gap-0.5">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(rating)
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }
                      >
                        <i className="fas fa-star"></i>
                      </span>
                    ))}
                </div>
                <span className="font-semibold text-gray-700 dark:text-dark-text">
                  {rating}
                </span>
                <span className="text-gray-500 dark:text-dark-text-secondary hidden xs:inline">
                  ({reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary mb-1">
                  Price
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary mb-1">
                  Description
                </p>
                <p className="text-gray-700 dark:text-dark-text text-xs sm:text-sm line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-4 sm:mb-6 p-2 sm:p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-xs sm:text-sm text-green-800 dark:text-green-200 font-semibold">
                  <i className="fas fa-check-circle mr-1 sm:mr-2"></i>
                  In Stock
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary mb-2">
                  Quantity
                </p>
                <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-dark-bg rounded-lg p-1 sm:p-2 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded transition text-xs sm:text-sm"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="w-6 sm:w-8 text-center font-semibold text-xs sm:text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded transition text-xs sm:text-sm"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3 flex-col-reverse sm:flex-row">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 dark:bg-dark-bg hover:bg-gray-300 dark:hover:bg-dark-border text-gray-700 dark:text-dark-text font-semibold py-2 sm:py-3 rounded-lg transition text-xs sm:text-sm"
                >
                  <i className="fas fa-times mr-1"></i>Close
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-semibold py-2 sm:py-3 rounded-lg transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm dark:hover:bg-blue-500"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
