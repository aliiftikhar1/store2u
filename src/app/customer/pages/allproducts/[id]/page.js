'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products?search=${query}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Search Results for "{query}"</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4 relative">
              <Link href={`/customer/pages/products/${product.id}`} className="cursor-pointer">
                {product.images && product.images.length > 0 ? (
                  <motion.img
                    src={`https://data.tascpa.ca/uploads/${product.images[0].url}`}
                    alt={product.name}
                    className="h-40 w-full object-cover mb-4 rounded"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <div className="h-40 w-full bg-gray-200 mb-4 rounded flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{product.name}</h3>
                <p className="text-lg font-medium text-gray-700 mb-1">Rs.{product.price}</p>
              </Link>
              <button
                className="absolute bottom-4 right-4 border border-gray-300 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300 rounded-full p-2 bg-white shadow-lg"
                onClick={() => handleAddToCart(product)}
              >
                <FiPlus className="h-5 w-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full py-8 text-gray-500">No products found for "{query}".</div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
