import { useState, useEffect } from 'react';

const plushCatalog = [
  { id: 'plush-1', title: 'Osito Miel', price: 24.99, emoji: '🧸', description: 'Un osito color miel, calientito y listo para acompañarte en cada aventura.' },
  { id: 'plush-2', title: 'Conejita Nube', price: 21.5, emoji: '🐰', description: 'Una conejita de orejitas largas para regalar ternura y abrazos infinitos.' },
  { id: 'plush-3', title: 'Perrito Algodón', price: 28.0, emoji: '🐶', description: 'El perrito más fiel de la colección, con una carita que siempre alegra.' },
  { id: 'plush-4', title: 'Gatito Melocotón', price: 26.75, emoji: '🐱', description: 'Suave, curioso y de color melocotón: el compañero perfecto para dormir.' },
  { id: 'plush-5', title: 'Panda Susurro', price: 30.0, emoji: '🐼', description: 'Un panda abrazable con energía tranquila para tus tardes de descanso.' },
  { id: 'plush-6', title: 'Patito Sol', price: 18.99, emoji: '🐥', description: 'Un patito amarillo que lleva un poquito de sol a cualquier habitación.' },
  { id: 'plush-7', title: 'Cerdito Rosado', price: 22.25, emoji: '🐷', description: 'Un cerdito rosado y simpático para llenar tu espacio de dulzura.' },
  { id: 'plush-8', title: 'Osita Vainilla', price: 25.5, emoji: '🧸', description: 'Una osita delicada con aroma imaginario a vainilla y muchos mimos.' },
];

function useAutoFetch(url) {
  const [automationStatus, setAutomationStatus] = useState('inactivo');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setAutomationStatus('cargando');

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        const productList = Array.isArray(data) ? data : data.products;
        const apiPlushies = Array.isArray(productList)
          ? productList.filter((product) => /plush|teddy|peluche|bear|doll/i.test(`${product.title} ${product.category}`))
          : [];

        setProducts(apiPlushies.length > 0 ? apiPlushies : plushCatalog);
        setAutomationStatus('exito');
      } catch {
        setAutomationStatus('error');
      }
    };

    fetchProducts();

    const intervalId = setInterval(fetchProducts, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [url]);

  return { automationStatus, products };
}

export default useAutoFetch;