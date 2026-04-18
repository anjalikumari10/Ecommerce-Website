import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const total = cart.reduce((acc, item) => acc + item.qty, 0);

  // Hide navbar on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <nav
      className={`sticky top-0 shadow-md z-50 px-6 py-4 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-dark-card border-b border-dark-border"
          : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo/Home */}
        <Link
          to={user ? "/products" : "/login"}
          className={`font-bold text-xl transition flex items-center gap-2 ${
            theme === "dark"
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          <i className="fas fa-shopping-bag"></i> E-Commerce
        </Link>

        {/* Navigation Items */}
        <div className="flex gap-6 items-center">
          {user ? (
            <>
              {/* When logged in */}
              <Link
                to="/products"
                className={`font-medium transition ${
                  theme === "dark"
                    ? "text-dark-text-secondary hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/cart"
                className={`font-medium transition flex items-center gap-2 ${
                  theme === "dark"
                    ? "text-dark-text-secondary hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <i className="fas fa-shopping-cart"></i> Cart
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {total}
                </span>
              </Link>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  theme === "dark"
                    ? "bg-dark-bg text-yellow-400 hover:bg-dark-border"
                    : "bg-gray-100 text-yellow-600 hover:bg-gray-200"
                }`}
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                <i
                  className={`fas fa-${theme === "light" ? "moon" : "sun"}`}
                ></i>
              </button>

              <div
                className={`flex items-center gap-4 pl-4 border-l ${
                  theme === "dark"
                    ? "border-dark-border text-dark-text-secondary"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                <span className="font-medium text-sm">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* When not logged in */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  theme === "dark"
                    ? "bg-dark-bg text-yellow-400 hover:bg-dark-border"
                    : "bg-gray-100 text-yellow-600 hover:bg-gray-200"
                }`}
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                <i
                  className={`fas fa-${theme === "light" ? "moon" : "sun"}`}
                ></i>
              </button>

              <Link
                to="/login"
                className={`font-medium transition ${
                  theme === "dark"
                    ? "text-dark-text-secondary hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
