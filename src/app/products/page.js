import { fetchProducts } from '@/lib/fetchProducts';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen bg-gradient-to-r from-yellow-50 via-white to-yellow-100 p-10">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center underline decoration-yellow-400">
        Our Product Catalog
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
