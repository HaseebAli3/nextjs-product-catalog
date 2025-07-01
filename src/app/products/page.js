'use client';

import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  // Fetch Products and Categories on First Load
  useEffect(() => {
    async function fetchData() {
      const productsRes = await fetch('https://fakestoreapi.com/products');
      const productsData = await productsRes.json();
      setAllProducts(productsData);
      setFilteredProducts(productsData);

      const catRes = await fetch('https://fakestoreapi.com/products/categories');
      const catData = await catRes.json();
      setCategories(catData);
    }
    fetchData();
  }, []);

  // Filter Products on Search or Category change
  useEffect(() => {
    let temp = allProducts;

    if (category) {
      temp = temp.filter((p) => p.category === category);
    }

    if (search) {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(temp);
    setPage(1);
  }, [search, category, allProducts]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <main className="min-h-screen bg-gradient-to-r from-yellow-50 via-white to-yellow-100 p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          🛍️ Explore Our Product Collection
        </h1>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-yellow-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-1/3 text-gray-900 font-medium placeholder-gray-500"
          />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-yellow-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-1/4 text-gray-900 font-medium"
          >
            <option value="" className="text-gray-700 font-medium">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="text-gray-800 font-medium">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center border border-yellow-200"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-3"
              />

              <h2 className="text-lg font-bold text-gray-900 mb-2 text-center">
                {product.title}
              </h2>

              <p className="text-yellow-700 text-base font-semibold mb-1">
                ${product.price}
              </p>

              <p className="text-gray-700 text-sm capitalize text-center">
                {product.category}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex gap-4 justify-center items-center">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className={`px-5 py-2 rounded-full font-semibold transition duration-300 ${
                page <= 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
              }`}
            >
              ← Previous
            </button>

            <span className="font-semibold text-gray-800">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-5 py-2 rounded-full font-semibold transition duration-300 ${
                page >= totalPages
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
