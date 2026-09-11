function DataCard({ product, onAdd, onView }) {
  return (
    <article
      className="product-card"
      role="button"
      tabIndex="0"
      onClick={onView}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onView();
      }}
      aria-label={`Ver detalles de ${product.title}`}
    >
      <div className="product-image-wrap">
        {product.thumbnail ? (
          <img src={product.thumbnail} alt={product.title} className="product-image" />
        ) : (
          <div className="product-placeholder" role="img" aria-label={product.title}>
            {product.emoji}
          </div>
        )}
        <span className="product-badge" aria-hidden="true">♡</span>
      </div>

      <div className="product-details">
        <h3>{product.title}</h3>
        <div className="product-bottom-row">
          <p className="product-price">${product.price.toFixed(2)}</p>
          <button
            type="button"
            className="add-button"
            onClick={(event) => {
              event.stopPropagation();
              onAdd();
            }}
            aria-label={`Agregar ${product.title} al carrito`}
          >
            <span aria-hidden="true">+</span> agregar
          </button>
        </div>
      </div>
    </article>
  );
}

export default DataCard;