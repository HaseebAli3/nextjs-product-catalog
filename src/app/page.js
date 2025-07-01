'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/products');
    }, 600); // Small delay for effect
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      
      {/* Full Page Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')"
        }}
      >
        {/* Semi Transparent Overlay */}
        <div className="absolute inset-0 bg-yellow-100 opacity-70"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-center px-6 sm:px-10 max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 leading-tight drop-shadow-lg">
          Welcome to ShopEase 🛍️
        </h1>

        <p className="text-lg sm:text-xl text-gray-800 mb-6 font-medium drop-shadow-sm">
          Discover the latest in fashion, electronics, accessories, and more — with fresh arrivals updated live from our trusted product source!
        </p>

        <button
          onClick={handleNavigate}
          disabled={loading}
          className={`px-10 py-3 rounded-full text-lg font-bold shadow-lg transition duration-300 ${
            loading
              ? 'bg-yellow-300 text-gray-700 cursor-wait scale-95'
              : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 hover:scale-105'
          }`}
        >
          {loading ? 'Loading Products...' : 'Start Shopping →'}
        </button>
      </div>
    </main>
  );
}
