import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.qty, 0);

  // Hide navbar on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 shadow-md z-50 px-3 sm:px-6 py-3 sm:py-4 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-dark-card border-b border-dark-border"
          : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo/Home */}
        <Link
          to={user ? "/products" : "/login"}
          className={`font-bold text-base sm:text-xl transition flex items-center gap-1 sm:gap-2 ${
            theme === "dark"
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          }`}
          onClick={handleNavClick}
        >
          <i className="fas fa-shopping-bag"></i>
          <span className="hidden xs:inline">E-Commerce</span>
        </Link>

        {/* Desktop Navigation Items */}
        <div className="hidden md:flex gap-4 lg:gap-6 items-center">
          {user ? (
            <>
              <Link
                to="/products"
                className={`font-medium text-sm lg:text-base transition ${
                  theme === "dark"
                    ? "text-dark-text-secondary hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/cart"
                className={`font-medium text-sm lg:text-base transition flex items-center gap-2 ${
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
                className={`flex items-center gap-2 lg:gap-4 pl-4 border-l ${
                  theme === "dark"
                    ? "border-dark-border text-dark-text-secondary"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                <span className="font-medium text-xs lg:text-sm hidden lg:inline">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
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
                className={`font-medium text-sm lg:text-base transition ${
                  theme === "dark"
                    ? "text-dark-text-secondary hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
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

        {/* Mobile Menu Button and Icons */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              theme === "dark"
                ? "bg-dark-bg text-yellow-400 hover:bg-dark-border"
                : "bg-gray-100 text-yellow-600 hover:bg-gray-200"
            }`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <i className={`fas fa-${theme === "light" ? "moon" : "sun"}`}></i>
          </button>

          {user && (
            <Link
              to="/cart"
              className={`p-2 rounded-lg transition relative flex items-center ${
                theme === "dark"
                  ? "text-dark-text-secondary hover:bg-dark-border"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={handleNavClick}
            >
              <i className="fas fa-shopping-cart text-lg"></i>
              {total > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {total}
                </span>
              )}
            </Link>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg transition ${
              theme === "dark"
                ? "text-dark-text hover:bg-dark-border"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <i
              className={`fas fa-${isMobileMenuOpen ? "times" : "bars"} text-lg`}
            ></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden mt-4 pb-4 border-t transition-all duration-300 ${
            theme === "dark" ? "border-dark-border" : "border-gray-200"
          }`}
        >
          {user ? (
            <>
              <Link
                to="/products"
                className={`block py-2 px-4 font-medium text-sm rounded-lg transition ${
                  theme === "dark"
                    ? "text-dark-text-secondary hover:bg-dark-bg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={handleNavClick}
              >
                <i className="fas fa-home mr-2"></i>Home
              </Link>
              <Link
                to="/cart"
                className={`block py-2 px-4 font-medium text-sm rounded-lg transition ${
                  theme === "dark"
                    ? "text-dark-text-secondary hover:bg-dark-bg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={handleNavClick}
              >
                <i className="fas fa-shopping-cart mr-2"></i>Cart ({total})
              </Link>
              <div
                className={`py-2 px-4 border-t ${
                  theme === "dark"
                    ? "border-dark-border text-dark-text-secondary"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                <p className="text-xs font-medium mb-3">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium text-sm transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`block py-2 px-4 font-medium text-sm rounded-lg transition ${
                  theme === "dark"
                    ? "text-dark-text-secondary hover:bg-dark-bg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={handleNavClick}
              >
                <i className="fas fa-sign-in-alt mr-2"></i>Sign In
              </Link>
              <Link
                to="/signup"
                className={`block py-2 px-4 font-medium text-sm rounded-lg transition bg-blue-600 hover:bg-blue-700 text-white mt-2 ${
                  theme === "dark" ? "" : ""
                }`}
                onClick={handleNavClick}
              >
                <i className="fas fa-user-plus mr-2"></i>Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
