import { useEffect, useState, useContext } from "react";
import { getProducts, getCategories } from "../services/productService";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Skeleton from "../components/Skeleton";
import Error from "../components/Error";
import useDebounce from "../hooks/useDebounce";
import { ThemeContext } from "../context/ThemeContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { theme } = useContext(ThemeContext);
  const debounced = useDebounce(search, 300);

  const [page, setPage] = useState(1);
  const perPage = 8;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts();
      const cats = await getCategories();

      setProducts(data);
      setCategories(cats);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts();
        const cats = await getCategories();

        if (isMounted) {
          setProducts(data);
          setCategories(cats);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load products");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) return <Error message={error} retry={fetchData} />;

  let filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(debounced.toLowerCase()) &&
      (category ? p.category === category : true),
  );

  // Sort products
  if (sortBy === "price-low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div
      className={`min-h-screen px-4 py-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-dark-bg"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section and Search */}
        <div
          className={`rounded-lg shadow-md p-6 mb-8 transition-colors duration-300 ${
            theme === "dark" ? "bg-dark-card" : "bg-white"
          }`}
        >
          <div className="flex gap-3 items-end">
            {/* Search Input */}
            <div className="flex-1">
              <label
                className={`block text-sm font-semibold mb-2 ${
                  theme === "dark"
                    ? "text-dark-text-secondary"
                    : "text-gray-700"
                }`}
              >
                <i className="fas fa-search mr-2"></i>Search Products
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by product name..."
                  className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    theme === "dark"
                      ? "bg-dark-bg border-dark-border text-dark-text"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                />
                {search && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setPage(1);
                    }}
                    className={`px-4 py-3 rounded-lg font-medium transition duration-200 ${
                      theme === "dark"
                        ? "bg-dark-bg hover:bg-dark-border text-dark-text"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Advanced Search Toggle */}
            <button
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className={`px-6 py-3 rounded-lg font-semibold transition duration-300 whitespace-nowrap ${
                showAdvancedSearch
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : theme === "dark"
                    ? "bg-dark-bg hover:bg-dark-border text-dark-text"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {showAdvancedSearch ? (
                <>
                  <i className="fas fa-times mr-2"></i>Close
                </>
              ) : (
                <>
                  <i className="fas fa-sliders-h mr-2"></i>Advanced
                </>
              )}
            </button>
          </div>

          {/* Advanced Search Panel */}
          {showAdvancedSearch && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-down">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-folder mr-2"></i>Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-sort mr-2"></i>Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-blue-600">
                    {filtered.length}
                  </span>{" "}
                  products found
                </p>
              </div>
            </div>
          )}
        </div>

        {/* No Results Message */}
        {filtered.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("");
                setPage(1);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {loading
                ? Array(8)
                    .fill()
                    .map((_, i) => <Skeleton key={i} />)
                : paginated.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onQuickView={(product) => {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                    />
                  ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mb-8">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ← Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    // Show first 3 pages, last 3 pages, and current page with nearby pages
                    if (
                      pageNum <= 3 ||
                      pageNum > totalPages - 3 ||
                      (pageNum >= page - 1 && pageNum <= page + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-4 py-2 rounded-lg font-medium transition ${
                            page === pageNum
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-white border border-gray-300 hover:bg-blue-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      (pageNum === 4 && page > 4) ||
                      (pageNum === totalPages - 3 && page < totalPages - 3)
                    ) {
                      return (
                        <span key={pageNum} className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
