'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ThreeDots } from 'react-loader-spinner';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
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
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer w-48 h-72 flex-shrink-0 border border-gray-300"
            onClick={() => handleProductClick(product.id)}
          >
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
            <h3 className="text-sm font-medium text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">{product.name}</h3>
            <p className="text-lg font-medium text-gray-700">Rs.{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
