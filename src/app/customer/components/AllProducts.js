'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ThreeDots } from 'react-loader-spinner';
import { FiPlus } from 'react-icons/fi';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(14); // Show 2 rows (7 products each) initially
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    router.push(`/customer/pages/products/${id}`);
  };

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to the cart.`);
  };

  const showMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 14); // Load 2 more rows (7 products each)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#3498db"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Top Rated</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {products.slice(0, visibleProducts).map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer border border-gray-300 relative"
          >
            {product.images && product.images.length > 0 ? (
              <motion.img
                src={`https://data.tascpa.ca/uploads/${product.images[0].url}`}
                alt={product.name}
                className="h-40 w-full object-cover mb-4 rounded"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleProductClick(product.id)}
              />
            ) : (
              <div
                className="h-40 w-full bg-gray-200 mb-4 rounded flex items-center justify-center text-gray-500"
                onClick={() => handleProductClick(product.id)}
              >
                No Image
              </div>
            )}
            <h3 className="text-sm font-medium text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">{product.name}</h3>
            <p className="text-lg font-medium text-gray-700">Rs.{product.price}</p>
            <button
                className="absolute bottom-4 right-4 border border-gray-300 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300 rounded-full p-2 bg-white shadow-lg"
                onClick={() => handleAddToCart(product)}
              >
                <FiPlus className="h-5 w-5" />
              </button>
          </div>
        ))}
      </div>
      {visibleProducts < products.length && (
        <div className="text-center mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            onClick={showMoreProducts}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
