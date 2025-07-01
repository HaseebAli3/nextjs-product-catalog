'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-yellow-50 via-white to-yellow-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-2xl text-center border border-yellow-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Discover Amazing Products</h1>
        <p className="text-gray-600 mb-6">
          Welcome to our Product Catalog App! Browse latest products fetched live from an external API using Next.js.
        </p>

        <Link href="/products">
          <button className="px-8 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-full hover:bg-yellow-500 transition duration-300">
            Browse Products →
          </button>
        </Link>
      </div>
    </main>
  );
}
