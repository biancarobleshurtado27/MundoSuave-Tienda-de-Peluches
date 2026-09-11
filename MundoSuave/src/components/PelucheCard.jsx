function PelucheCard({ product }) {
  return (
    <div className="group w-full max-w-xs overflow-hidden rounded-3xl border-2 border-pink-100 bg-white shadow-sm shadow-pink-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-200">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs">
          🧸
        </span>
      </div>

      <div className="space-y-1 p-4">
        <h3 className="truncate text-base font-semibold text-slate-700">
          {product.title}
        </h3>
        <p className="text-lg font-bold text-pink-500">
          ${product.price}
        </p>
      </div>

      <div className="px-4 pb-4">
        <button className="w-full rounded-full bg-pink-400 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-500">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default PelucheCard;