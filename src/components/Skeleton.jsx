import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Skeleton() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`border rounded animate-pulse overflow-hidden ${
        theme === "dark"
          ? "bg-dark-card border-dark-border"
          : "bg-gray-100 border-gray-200"
      }`}
    >
      {/* Image skeleton */}
      <div
        className={`h-48 mb-4 ${
          theme === "dark" ? "bg-dark-bg" : "bg-gray-300"
        }`}
      ></div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title lines */}
        <div className="space-y-2">
          <div
            className={`h-4 rounded ${
              theme === "dark" ? "bg-dark-bg" : "bg-gray-400"
            }`}
          ></div>
          <div
            className={`h-4 w-3/4 rounded ${
              theme === "dark" ? "bg-dark-bg" : "bg-gray-400"
            }`}
          ></div>
        </div>

        {/* Category */}
        <div
          className={`h-3 w-1/2 rounded ${
            theme === "dark" ? "bg-dark-bg" : "bg-gray-300"
          }`}
        ></div>

        {/* Rating */}
        <div
          className={`h-3 w-2/3 rounded ${
            theme === "dark" ? "bg-dark-bg" : "bg-gray-300"
          }`}
        ></div>

        {/* Price and button */}
        <div className="flex gap-2 pt-2">
          <div
            className={`h-8 w-2/5 rounded ${
              theme === "dark" ? "bg-dark-bg" : "bg-gray-400"
            }`}
          ></div>
          <div
            className={`h-8 flex-1 rounded ${
              theme === "dark" ? "bg-blue-700" : "bg-blue-300"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}
