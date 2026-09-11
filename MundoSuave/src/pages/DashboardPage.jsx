import { useState } from 'react';
import useAutoFetch from '../hooks/useAutoFetch';
import StatusIndicator from '../components/StatusIndicator';
import DataCard from '../components/DataCard';

function DashboardPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const { automationStatus, products } = useAutoFetch(
    'https://dummyjson.com/products?limit=8&skip=10&select=title,price,thumbnail'
  );

  const addToCart = (product) => {
    setCartItems((currentItems) => [...currentItems, product]);
    setCartOpen(true);
  };

  const clearCart = () => setCartItems([]);
  const cartTotal = cartItems.reduce((total, item) => total + Number(item.price), 0);
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="storefront">
      <header className="store-header">
        <div className="brand-mark" aria-hidden="true">✿</div>
        <div className="brand-copy">
          <p className="eyebrow">un abrazo para cada día</p>
          <h1>MundoSuave</h1>
        </div>
        <button
          type="button"
          className="cart-summary"
          onClick={() => setCartOpen((isOpen) => !isOpen)}
          aria-expanded={cartOpen}
          aria-label={`${cartItems.length} productos en el carrito`}
        >
          <span className="cart-icon" aria-hidden="true">♡</span>
          <span>{cartItems.length} {cartItems.length === 1 ? 'mimo' : 'mimos'}</span>
        </button>
        {cartOpen && (
          <aside className="cart-panel" aria-label="Carrito de compras">
            <div className="cart-panel-heading">
              <h2>Tu bolsita de mimos</h2>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">×</button>
            </div>
            {cartItems.length === 0 ? (
              <p className="cart-empty">Todavía no has elegido un peluche.</p>
            ) : (
              <>
                <ul className="cart-list">
                  {cartItems.map((item, index) => (
                    <li key={`${item.id}-${index}`}>
                      <span>{item.emoji || '🧸'} {item.title}</span>
                      <strong>${Number(item.price).toFixed(2)}</strong>
                    </li>
                  ))}
                </ul>
                <div className="cart-total"><span>Total</span><strong>${cartTotal.toFixed(2)}</strong></div>
                <button type="button" className="clear-cart" onClick={clearCart}>Vaciar carrito</button>
              </>
            )}
          </aside>
        )}
      </header>

      <main className="store-main">
        <section className="welcome-panel">
          <div>
            <p className="section-kicker">colección de hoy</p>
            <h2>Peluches con mucho corazón</h2>
            <p className="welcome-text">Pequeños compañeros suaves, listos para alegrarte el día.</p>
          </div>
          <div className="welcome-art" aria-hidden="true">🧸</div>
        </section>

        <div className="catalog-heading">
          <div>
            <h2>Encuentra tu nuevo favorito</h2>
            <p>Elegidos con cariño para regalar o consentirte.</p>
          </div>
          <StatusIndicator status={automationStatus} />
        </div>
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar un peluche..."
            aria-label="Buscar un peluche"
          />
        </label>

        {automationStatus === 'cargando' && products.length === 0 ? (
          <div className="empty-state">
            <span className="loading-bear" aria-hidden="true">🧸</span>
            <p>Estamos acomodando los peluches...</p>
          </div>
        ) : automationStatus === 'error' && products.length === 0 ? (
          <div className="empty-state error-state">
            <span aria-hidden="true">☁</span>
            <p>No pudimos traer la colección. Intenta recargar la página.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
              <DataCard
                key={product.id}
                product={product}
                onAdd={() => addToCart(product)}
                onView={() => setSelectedProduct(product)}
              />
            )) : <div className="empty-state search-empty"><span aria-hidden="true">🔎</span><p>No encontramos ese peluche.</p></div>}
          </div>
        )}
      </main>

      <footer className="store-footer">
        Hecho para regalar suavidad <span aria-hidden="true">♡</span>
      </footer>

      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onClick={closeDetails}>
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={closeDetails} aria-label="Cerrar detalles">
              ×
            </button>
            <div className="modal-image-wrap">
              {selectedProduct.thumbnail ? (
                <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="modal-image" />
              ) : (
                <div className="modal-placeholder" role="img" aria-label={selectedProduct.title}>
                  {selectedProduct.emoji}
                </div>
              )}
            </div>
            <div className="modal-content">
              <p className="section-kicker">detalle del mimo</p>
              <h2 id="product-modal-title">{selectedProduct.title}</h2>
              <p className="modal-description">
                {selectedProduct.description || 'Un compañero suave y adorable, preparado para llenar tus días de abrazos.'}
              </p>
              <div className="modal-facts">
                <span>suavecito y abrazable</span>
                <span>ideal para regalar</span>
              </div>
              <div className="modal-action-row">
                <strong>${Number(selectedProduct.price).toFixed(2)}</strong>
                <button type="button" className="modal-add-button" onClick={() => addToCart(selectedProduct)}>
                  <span aria-hidden="true">♡</span> agregar al carrito
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;