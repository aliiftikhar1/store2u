'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import ImageModal from '@/app/customer/components/ImageModal';
import { useDispatch } from 'react-redux';
import { addToCart, setCart } from '@/app/store/cartSlice';
import { ThreeDots } from 'react-loader-spinner';

const ProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCartState] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [notification, setNotification] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [showRelatedPopup, setShowRelatedPopup] = useState(false);

  const handleRelatedProductClick = (relatedProductId) => {
    router.push(`/customer/pages/products/${relatedProductId}`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        const { product, relatedProducts } = response.data.data;

        // Parse sizes and colors from JSON strings
        const parsedSizes = JSON.parse(product.sizes || '[]');
        const parsedColors = JSON.parse(product.colors || '[]');

        setProduct(product);
        setRelatedProducts(relatedProducts);

        // Directly set the sizes and colors from the parsed data
        setSizes(parsedSizes);
        setColors(parsedColors);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartState(storedCart);
    dispatch(setCart(storedCart));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color.');
      return;
    }

    const newCartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      quantity,
      price: product.discount
        ? calculateOriginalPrice(product.price, product.discount)
        : product.price,
      selectedColor,
      selectedSize,
      images: product.images,
      name: product.name,
      discount: product.discount,
    };

    let updatedCart = [...cart];

    const existingItemIndex = updatedCart.findIndex(
      (item) =>
        item.productId === newCartItem.productId &&
        item.selectedSize === newCartItem.selectedSize &&
        item.selectedColor === newCartItem.selectedColor
    );

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push(newCartItem);
    }

    setCartState(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch(setCart(updatedCart));

    setShowRelatedPopup(true);
  };

  const calculateOriginalPrice = (price, discount) => {
    if (typeof price === 'number' && typeof discount === 'number') {
      return price - (price * (discount / 100));
    }
    return price;
  };

  const getImageUrl = (url) => {
    return `https://data.tascpa.ca/uploads/${url}`;
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const RelatedProductsPopup = ({ relatedProducts, onClose }) => {
    const handleCardClick = (productId) => {
      router.push(`/customer/pages/products/${productId}`);
    };

    const handleClose = () => {
      onClose();
      router.push('/');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-5xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-green-600">✔ Added to cart successfully!</h2>
            <button onClick={handleClose} className="text-gray-500">✕</button>
          </div>
          <h3 className="text-xl font-semibold mb-4">Products You May Be Interested In</h3>
          <div className="flex overflow-x-auto space-x-4">
            {relatedProducts.map((product) => {
              const originalPrice = product.discount 
                ? (product.price / (1 - product.discount / 100))
                : product.price;

              return (
                <div
                  key={product.id}
                  className="min-w-[220px] max-w-[240px] cursor-pointer"
                  onClick={() => handleCardClick(product.id)}
                >
                  <img
                    src={getImageUrl(product.images[0].url)}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                  <div className="text-center mt-2">
                    <p className="text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
                      {product.name}
                    </p>
                    <div className="flex flex-col items-center">
                      {product.discount && (
                        <p className="text-xs text-gray-500 line-through">
                          Rs.{originalPrice}
                        </p>
                      )}
                      <p className="text-red-500 font-semibold">
                        Rs.{product.price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
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
    <div className="container mx-auto px-4">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg z-50">
          {notification}
        </div>
      )}
      <div className="flex flex-wrap pt-4">
        <div className="w-full lg:w-1/2 justify-between items-center mb-8 lg:mb-0 flex">
          <div className="flex w-20 flex-col justify-center items-center mr-4">
            {product.images && product.images.map((image, index) => (
              <img
                key={index}
                src={getImageUrl(image.url)}
                alt={product.name}
                className={`w-20 h-20 object-cover mb-2 cursor-pointer ${index === currentImageIndex ? 'opacity-100' : 'opacity-50'}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
          <div className="relative w-full pl-4 right-0">
            {product.images && product.images.length > 0 ? (
              <>
                <motion.img
                  key={currentImageIndex}
                  src={getImageUrl(product.images[currentImageIndex].url)}
                  alt={product.name}
                  className="w-full h-[400px] object-contain mb-4 cursor-pointer"
                  transition={{ duration: 0.3 }}
                  onClick={handleImageClick}
                />
              </>
            ) : (
              <div className="h-48 w-full bg-gray-200 mb-4 rounded flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 ">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <div className="flex items-center mb-4">
            {product.discount ? (
              <>
                <span className="text-green-500 text-xl line-through mr-4">Rs.{product.price}</span>
                <span className="text-red-500 font-bold text-xl">Rs.{calculateOriginalPrice(product.price, product.discount)}</span>
              </>
            ) : (
              <span className="text-red-500 text-2xl">Rs.{product.price}</span>
            )}
          </div>

          {product.stock === 0 && (
            <p className="text-lg font-bold text-red-700 mb-1">Out of Stock</p>
          )}
          {product.stock > 0 && (
            <p className="text-lg font-bold text-green-700 mb-1">In Stock</p>
          )}
          
          <div className="text-gray-500 mb-4" dangerouslySetInnerHTML={{ __html: product.description }}></div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Select Size</h3>
            <div className="flex flex-wrap">
              {sizes.length > 0 && sizes.map((size, index) => (
                <label 
                  key={index} 
                  className={`mr-4 mb-2 text-gray-700 flex rounded items-center border-[1px] border-black px-2 ${selectedSize === size.label ? 'bg-gray-600 text-white' : 'hover:bg-gray-600 hover:text-white'}`}
                  onClick={() => setSelectedSize(size.label)}
                >
                  <input
                    type="radio"
                    name="size"
                    className="mr-2"
                    value={size.label}
                    checked={selectedSize === size.label}
                    onChange={() => setSelectedSize(size.label)}
                  />
                  {size.label}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Select Color</h3>
            <div className="flex flex-wrap">
              {colors.length > 0 && colors.map((color, index) => (
                <label 
                  key={index} 
                  className={`mr-4 mb-2 text-gray-700 flex items-center rounded border-[1px] border-black px-2 ${selectedColor === color.label ? 'bg-gray-600 text-white' : 'hover:bg-gray-600 hover:text-white'}`}
                  onClick={() => setSelectedColor(color.label)}
                >
                  <input
                    type="radio"
                    name="color"
                    className="mr-2"
                    value={color.label}
                    checked={selectedColor === color.label}
                    onChange={() => setSelectedColor(color.label)}
                  />
                  {color.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center mb-4">
            <button
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l"
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
            >
              -
            </button>
            <input
              type="text"
              readOnly
              value={quantity} 
              className="w-12 text-center text-black border-gray-300 border-y"
            />
            <button
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r"
              onClick={() => setQuantity(prev => prev + 1)} 
            >
              +
            </button>
          </div>

          <button className="bg-teal-500 text-white py-2 px-4 rounded-md" onClick={() => handleAddToCart(product)}>
            Add to cart
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-12">
        <div className="flex mb-6">
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'description' ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'shipping' ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping & Delivery
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-b-lg shadow-md">
          {activeTab === 'description' && (
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          )}
          {activeTab === 'shipping' && (
            <div>
              <h3 className="font-bold text-lg mb-4">Shipping & Delivery</h3>
              <p>
                At PakStyle.pk, we prioritize delivering your purchases swiftly and securely.
                Once your order is confirmed, our dedicated team works diligently to process and
                package your items with care. We partner with reliable logistics companies to
                ensure timely delivery at your doorstep.
              </p>
              <h4 className="font-semibold text-md mt-4">Shipping Charges</h4>
              <ul className="list-disc pl-5">
                <li>Rs.100/- shipping & handling charges usually applied per item.</li>
                <li>If you order multiple items, 50% off will be applied on shipping charges.</li>
              </ul>
              <h4 className="font-semibold text-md mt-4">Delivery Time</h4>
              <ul className="list-disc pl-5">
                <li>2 to 3 business days in major cities like Karachi, Lahore, Islamabad, etc.</li>
                <li>3 to 5 business days in small towns and cities.</li>
                <li>5 to 8 business days in Chak & Villages.</li>
              </ul>
              <h4 className="font-semibold text-md mt-4">Logistics Partners</h4>
              <ul className="list-disc pl-5">
                <li>Leopards Courier, PostEx, Pakistan Post and Local Riders for Karachi Only.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ImageModal
          imageUrl={getImageUrl(product.images[currentImageIndex].url)}
          onClose={handleCloseModal}
        />
      )}

      {/* Related Products Popup */}
      {showRelatedPopup && (
        <RelatedProductsPopup
          relatedProducts={relatedProducts}
          onClose={() => setShowRelatedPopup(false)}
        />
      )}

      {/* Related Products Section on Page */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-6">Related Products</h3>
        <div className="flex space-x-4 overflow-x-auto pl-8 pr-8">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => {
              const originalPrice = calculateOriginalPrice(relatedProduct.price, relatedProduct.discount);
              return (
                <div
                  key={relatedProduct.id}
                  className="bg-white shadow-md rounded-lg cursor-pointer border border-gray-300 relative h-[430px] w-[250px] flex-shrink-0"
                  onClick={() => handleRelatedProductClick(relatedProduct.id)}
                >
                  {relatedProduct.discount && (
                    <div className="absolute z-40 top-2 right-2 bg-black text-white rounded-full h-10 w-10 flex items-center justify-center">
                      -{relatedProduct.discount}%
                    </div>
                  )}
                  {relatedProduct.images && relatedProduct.images.length > 0 ? (
                    <motion.img
                      src={getImageUrl(relatedProduct.images[0].url)}
                      alt={relatedProduct.name}
                      className="h-80 w-full object-cover mb-4 rounded bg-white"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="h-80 w-full bg-gray-200 mb-4 rounded flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <div className="px-2">
                    <h3 className="text-md font-normal text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">{relatedProduct.name}</h3>
                    <div className='grid grid-cols-2'>
                      <div className="flex items-center">
                        {relatedProduct.discount ? (
                          <div className='flex flex-col'>
                            <p className="text-md font-normal text-gray-700 line-through mr-2">
                              Rs.{relatedProduct.price}
                            </p>
                            <p className="text-md font-bold text-red-700">
                              Rs.{originalPrice}
                            </p>
                          </div>
                        ) : (
                          <p className="text-md font-bold text-gray-700">
                            Rs.{relatedProduct.price}
                          </p>
                        )}
                      </div>
                      <div className='flex absolute bottom-3 right-3 justify-end items-end'>
                        <button
                          className="h-8 w-24 border justify-end text-sm border-gray-300 text-white font-semibold hover:scale-110 rounded-full pb-1 bg-blue-500 shadow-lg"
                          onClick={() => handleRelatedProductClick(relatedProduct.id)}
                        >
                          Shop now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center col-span-full py-8 text-gray-500">No related products available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
