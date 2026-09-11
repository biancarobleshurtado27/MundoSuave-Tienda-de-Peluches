import { useState, useEffect } from 'react';

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

        setProducts(data);
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