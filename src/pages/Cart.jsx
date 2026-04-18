import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleIncrement = (id, currentQty) => {
    updateQty(id, currentQty + 1);
  };

  const handleDecrement = (id, currentQty) => {
    if (currentQty > 1) {
      updateQty(id, currentQty - 1);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success("Item removed from cart");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4 text-gray-400">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Add some products to get started!
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-3 sm:px-4 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details and Actions Container */}
                    <div className="flex-grow flex flex-col">
                      {/* Product Info */}
                      <div className="flex-grow">
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Bottom Section: Price, Quantity, Remove */}
                      <div className="flex items-center justify-between gap-2">
                        {/* Price */}
                        <div>
                          <p className="text-sm sm:text-base md:text-lg font-bold text-blue-600">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-lg p-1 sm:p-2">
                          <button
                            onClick={() => handleDecrement(item.id, item.qty)}
                            disabled={item.qty === 1}
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white rounded-md transition duration-200 font-bold text-xs sm:text-sm"
                          >
                            −
                          </button>
                          <span className="w-5 sm:w-8 text-center font-semibold text-gray-800 text-xs sm:text-base">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => handleIncrement(item.id, item.qty)}
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-200 font-bold text-xs sm:text-sm"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-xs sm:text-sm text-gray-600">
                            <span className="font-bold text-gray-800">
                              ${(item.price * item.qty).toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="mt-2 text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm transition duration-200 text-left"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>
                    Subtotal ({cart.length} item{cart.length !== 1 ? "s" : ""})
                  </span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold">
                    ${(total * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                <span className="text-sm sm:text-lg font-bold text-gray-800">
                  Total:
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                  ${(total * 1.1).toFixed(2)}
                </span>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition duration-200 mb-2 sm:mb-3 text-sm sm:text-base">
                Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-blue-600 hover:text-blue-700 font-semibold py-2 transition duration-200 text-sm sm:text-base"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
