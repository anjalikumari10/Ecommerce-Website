import { Link } from "react-router-dom";
import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, loadingIds } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const isLoading = loadingIds.includes(product.id);

  // Generate consistent rating and reviews based on product ID
  const { rating, reviews } = useMemo(() => {
    const seed = product.id % 100;
    const r = ((seed % 15) + 35) / 10; // 3.5 to 5.0
    const rev = ((seed * 7) % 500) + 10; // 10 to 510
    return { rating: r.toFixed(1), reviews: rev };
  }, [product.id]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl md:hover:scale-105 border border-gray-100 dark:border-dark-border flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 bg-gray-100 dark:bg-dark-bg overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300 p-2 sm:p-4"
        />

        {/* Badge */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-blue-600 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
          <i className="fas fa-star mr-1"></i>New
        </div>

        {/* Quick View Button - Desktop */}
        {isHovered && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute inset-0 bg-black/40 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="bg-white text-blue-600 font-bold px-4 sm:px-6 py-1 sm:py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 text-sm sm:text-base">
              <i className="fas fa-eye mr-1 sm:mr-2"></i>Quick View
            </div>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        {/* Title */}
        <button
          onClick={() => onQuickView(product)}
          className="text-left w-full"
        >
          <h3 className="font-semibold text-gray-800 dark:text-dark-text text-xs sm:text-sm mb-1 sm:mb-2 hover:text-blue-600 transition line-clamp-2">
            {product.title}
          </h3>
        </button>

        {/* Category */}
        <p className="text-xs text-gray-500 dark:text-dark-text-secondary mb-2 capitalize">
          <i className="fas fa-folder mr-1"></i>
          {product.category}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 text-xs sm:text-sm">
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
                  <i className="fas fa-star text-xs sm:text-sm"></i>
                </span>
              ))}
          </div>
          <span className="font-semibold text-gray-700 dark:text-dark-text">
            {rating}
          </span>
          <span className="text-gray-500 dark:text-dark-text-secondary hidden xs:inline">
            ({reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
          <p className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded font-semibold flex items-center gap-1">
            <i className="fas fa-check-circle"></i> In Stock
          </p>
        </div>

        {/* Mobile Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="md:hidden w-full mb-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-xs sm:text-sm transition"
        >
          <i className="fas fa-eye mr-1"></i>Quick View
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          disabled={isLoading}
          className={`w-full py-2 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
            isLoading
              ? "bg-gray-400 text-white cursor-not-allowed dark:bg-gray-600"
              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 dark:hover:bg-blue-500"
          }`}
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
  );
}
