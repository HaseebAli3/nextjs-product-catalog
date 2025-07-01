export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-400 mx-auto mb-4"></div>
        <p className="text-yellow-600 font-semibold">Loading Product Details...</p>
      </div>
    </main>
  );
}
