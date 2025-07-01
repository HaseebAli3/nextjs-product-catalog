'use client';

import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center border border-yellow-200">
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{product.title}</h2>
      <p className="text-yellow-600 font-bold mb-1">${product.price}</p>
      <p className="text-gray-500 text-sm text-center">{product.category}</p>
    </div>
  );
}
