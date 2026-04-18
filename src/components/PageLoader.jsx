import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function PageLoader() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        theme === "dark"
          ? "bg-dark-bg"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          {/* Outer rotating circle */}
          <div
            className={`absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin ${
              theme === "dark" ? "border-t-blue-400" : ""
            }`}
          ></div>
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-2 h-2 rounded-full ${
                theme === "dark" ? "bg-blue-400" : "bg-blue-600"
              } animate-pulse`}
            ></div>
          </div>
        </div>
        <p
          className={`text-sm font-medium ${
            theme === "dark" ? "text-dark-text-secondary" : "text-gray-600"
          }`}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
