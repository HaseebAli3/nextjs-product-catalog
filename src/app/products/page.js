'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://fakestoreapi.com/products');
      const products = await res.json();
      setAllProducts(products);
      setFilteredProducts(products);

      const catRes = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await catRes.json();
      setCategories(categories);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setPage(1);
  }, [search, category, allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Explore Our Product Collection
        </h1>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 w-full sm:w-1/3 rounded-full border-2 border-yellow-300 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 font-medium"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 w-full sm:w-1/4 rounded-full border-2 border-yellow-300 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 font-medium"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {paginatedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center border border-yellow-200 h-[420px] overflow-hidden cursor-pointer hover:scale-[1.02]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain mb-3"
                />

                <h2 className="text-lg font-bold text-gray-900 mb-2 text-center line-clamp-2">
                  {product.title}
                </h2>

                <p className="text-yellow-700 text-base font-semibold mb-1">
                  ${product.price}
                </p>

                <p className="text-gray-700 text-sm capitalize text-center">
                  {product.category}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
                page <= 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
              }`}
            >
              ← Previous
            </button>

            <span className="font-medium text-gray-800">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
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
