'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiPlusCircle } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import ImageModal from '@/app/customer/components/ImageModal';

const ProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        const { product, relatedProducts } = response.data.data;
        setProduct(product);
        setRelatedProducts(relatedProducts);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
  
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const addToCart = (product) => {
    let updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // toast.success(`${product.name} added to cart!`);
  };

  const getImageUrl = (url) => {
    return `https://data.tascpa.ca/uploads/${url}`;
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  const handleRelatedProductClick = (id) => {
    router.push(`/customer/pages/products/${id}`);
  };

  const handleImageClick = () => {
    setIsModalOpen(true); // Open the modal when the image is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (!product) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap pt-4">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <div className="relative">
            {product.images && product.images.length > 0 ? (
              <>
                <motion.img
                  key={currentImageIndex}
                  src={getImageUrl(product.images[currentImageIndex].url)}
                  alt={product.name}
                  className="w-full h-[400px] object-cover mb-4 cursor-pointer"
                  transition={{ duration: 0.3 }}
                  onClick={handleImageClick} // Add click handler
                />
                <div className="absolute top-1/2 transform -translate-y-1/2 left-0">
                  <button className="bg-gray-800 text-white p-2 rounded-full" onClick={handlePreviousImage}>
                    <FiChevronLeft className="h-6 w-6" />
                  </button>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
                  <button className="bg-gray-800 text-white p-2 rounded-full" onClick={handleNextImage}>
                    <FiChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </>
            ) : (
              <div className="h-48 w-full bg-gray-200 mb-4 rounded flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-20">
          <h2 className="text-xl font-bold mb-4">{product.name}</h2>
          <div className="flex items-center mb-4">
            {product.originalPrice && (
              <span className="text-red-500 font-bold line-through mr-4">Rs.{product.originalPrice}</span>
            )}
            <span className="text-green-500 text-2xl">Rs.{product.price}</span>
          </div>
          <p className="text-lg font-medium text-gray-700 mb-1">Available Quantity : {product.stock}</p>
          <div className="text-gray-500 mb-4" dangerouslySetInnerHTML={{ __html: product.description }}></div>
          <button className="bg-teal-500 text-white py-2 px-4 rounded-md" onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-6">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="bg-white shadow-md rounded-lg relative cursor-pointer p-4"
              onClick={() => handleRelatedProductClick(relatedProduct.id)}
            >
              {relatedProduct.images && relatedProduct.images.length > 0 ? (
                <motion.img
                  src={getImageUrl(relatedProduct.images[0].url)}
                  alt={relatedProduct.name}
                  className="h-40 w-full object-cover mb-4 rounded"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => { e.target.onerror = null; e.target.src = '/default-image.png'; }} // Fallback image
                />
              ) : (
                <div className="h-40 w-full bg-gray-200 mb-4 rounded flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <div className="absolute top-2 right-2">
                <FiPlusCircle className="h-6 w-6 text-teal-500 cursor-pointer" onClick={(e) => {
                  e.stopPropagation();
                  addToCart(relatedProduct);
                }} />
              </div>
              <div className=' gri grid-cols-2'>
                <div>
              <h3 className="text-xl mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{relatedProduct.name}</h3>
              <p className="text-lg font-medium text-gray-700 mb-1">Rs.{relatedProduct.price}</p>
              </div>
              <div>
              <p className="text-lg font-medium text-gray-700 mb-1">Quantity:{relatedProduct.stock}</p>
              </div>
              </div>
              <p className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap"dangerouslySetInnerHTML= {{__html:relatedProduct.description}}></p>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
      {isModalOpen && (
        <ImageModal
          imageUrl={getImageUrl(product.images[currentImageIndex].url)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductPage;
