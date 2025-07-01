import Link from 'next/link';
import Image from 'next/image';

export default async function ProductDetail({ params }) {
  const productId = params.id;
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const product = await res.json();

  return (
    <main className="min-h-screen bg-gradient-to-r from-yellow-50 via-white to-yellow-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full border border-yellow-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain rounded"
          />

          <div>
            <p className="text-lg text-green-700 font-bold mb-2">${product.price}</p>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>
        </div>

        <Link href="/products">
          <button className="mt-6 px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded hover:bg-yellow-500 transition">
            ← Back to Products
          </button>
        </Link>
      </div>
    </main>
  );
}
