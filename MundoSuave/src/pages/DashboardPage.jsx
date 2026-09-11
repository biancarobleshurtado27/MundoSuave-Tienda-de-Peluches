import useAutoFetch from '../hooks/useAutoFetch';
import StatusIndicator from '../components/StatusIndicator';
import DataCard from '../components/DataCard.jsx';

function DashboardPage() {
  const { automationStatus, products } = useAutoFetch(
    'https://dummyjson.com/products?limit=8&skip=10&select=title,price,thumbnail'
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      <header className="mx-auto max-w-6xl px-6 pt-10 pb-6 text-center">
        <h1 className="text-4xl font-bold text-pink-500">MundoSuave 🧸</h1>
        <div className="mt-3 flex justify-center">
          <StatusIndicator status={automationStatus} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {products.map((product) => (
            <DataCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;