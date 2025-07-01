'use client';

import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center border border-yellow-200">
      
      {/* Product Image */}
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="object-contain mb-4"
      />

      {/* Product Title */}
      <h2 className="text-lg font-bold text-gray-900 mb-2 text-center">
        {product.title}
      </h2>

      {/* Product Price */}
      <p className="text-yellow-700 text-base font-semibold mb-1">
        ${product.price}
      </p>

      {/* Product Category */}
      <p className="text-gray-700 text-sm capitalize text-center">
        {product.category}
      </p>
    </div>
  );
}
