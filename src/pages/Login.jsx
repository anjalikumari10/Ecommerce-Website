import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      login(email, password);
      toast.success("Logged in successfully!");
      navigate("/products");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen px-4 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-dark-bg"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div
        className={`rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-md animate-scale-up ${
          theme === "dark" ? "bg-dark-card" : "bg-white"
        }`}
      >
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              theme === "dark"
                ? "bg-dark-bg text-yellow-400 hover:bg-dark-border"
                : "bg-gray-100 text-yellow-600 hover:bg-gray-200"
            }`}
          >
            <i className={`fas fa-${theme === "light" ? "moon" : "sun"}`}></i>
          </button>
        </div>

        <div className="text-center mb-6 sm:mb-8 animate-slide-up">
          <h1
            className={`text-2xl sm:text-3xl font-bold mb-2 ${
              theme === "dark" ? "text-dark-text" : "text-gray-800"
            }`}
          >
            Welcome Back
          </h1>
          <p
            className={`text-xs sm:text-sm ${
              theme === "dark" ? "text-dark-text-secondary" : "text-gray-600"
            }`}
          >
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <label
              className={`block text-xs sm:text-sm font-medium mb-1 ${
                theme === "dark" ? "text-dark-text-secondary" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === "dark"
                  ? "bg-dark-bg border-dark-border text-dark-text"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <label
              className={`block text-xs sm:text-sm font-medium mb-1 ${
                theme === "dark" ? "text-dark-text-secondary" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === "dark"
                  ? "bg-dark-bg border-dark-border text-dark-text"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2 sm:py-3 text-sm rounded-lg transition duration-200 mt-4 sm:mt-6 hover:scale-105 active:scale-95 ${
              loading
                ? theme === "dark"
                  ? "bg-gray-600 text-dark-text cursor-not-allowed"
                  : "bg-gray-400 text-white cursor-not-allowed"
                : theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div
          className={`mt-4 sm:mt-6 text-center text-xs sm:text-sm ${
            theme === "dark" ? "text-dark-text-secondary" : "text-gray-600"
          }`}
        >
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className={`font-semibold transition ${
                theme === "dark"
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div
          className={`mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
            theme === "dark"
              ? "bg-dark-bg border border-dark-border text-dark-text-secondary"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <p
            className={`font-semibold mb-1 ${theme === "dark" ? "text-dark-text" : ""}`}
          >
            Demo Credentials:
          </p>
          <p>Email: demo@example.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
}
