'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';

const fetchSubcategoriesByCategoryId = async (categoryId) => {
  try {
    const response = await axios.get(`/api/subcategories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return [];
  }
};

const fetchProductsBySubcategoryIds = async (subcategoryIds) => {
  try {
    const response = await axios.get(`/api/products?subcategoryIds=${subcategoryIds.join(',')}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const CategoryPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [highestPrice, setHighestPrice] = useState(0);
  const productRefs = useRef([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoryResponse = await axios.get(`/api/categories/${id}`);
        setCategory(categoryResponse.data);

        const subcategoriesData = await fetchSubcategoriesByCategoryId(id);
        setSubcategories(subcategoriesData);

        if (subcategoriesData.length > 0) {
          const subcategoryIds = subcategoriesData.map(subcategory => subcategory.id);
          const productsData = await fetchProductsBySubcategoryIds(subcategoryIds);
          setProducts(productsData);
          setFilteredProducts(productsData);

          const highestProductPrice = Math.max(...productsData.map(product => product.price));
          setHighestPrice(highestProductPrice);
          setPriceRange({ min: 0, max: highestProductPrice });

          console.log(`These are the subcategories of category ID ${id}:`, subcategoriesData);
          
          // Log product IDs
          console.log(`Product IDs for category ID ${id}:`, productsData.map(product => product.id));
        } else {
          console.log(`Category ID ${id} has no subcategories.`);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    if (id) {
      fetchCategoryData();
    }
  }, [id]);

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    filterProducts(subcategoryId, priceRange);
  };

  const handleShowAllProducts = () => {
    setSelectedSubcategory(null);
    const subcategoryIds = subcategories.map(subcategory => subcategory.id);
    const allSubcategoryProducts = products.filter(product => subcategoryIds.includes(product.subcategoryId));
    setFilteredProducts(allSubcategoryProducts);
  };

  const handlePriceFilterChange = (min, max) => {
    setPriceRange({ min, max });
    filterProducts(selectedSubcategory, { min, max });
  };

  const filterProducts = (subcategoryId, { min, max }) => {
    let filtered = products;
    if (subcategoryId) {
      filtered = filtered.filter(product => product.subcategoryId === subcategoryId);
    }
    filtered = filtered.filter(product => product.price >= min && product.price <= max);
    setFilteredProducts(filtered);
  };

  const getImageUrl = (url) => {
    return `https://data.tascpa.ca/uploads/${url}`;
  };

  const handleProductClick = (productId) => {
    router.push(`/customer/pages/products/${productId}`);
  };

  const scrollLeft = (index) => {
    if (productRefs.current[index]) {
      productRefs.current[index].scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = (index) => {
    if (productRefs.current[index]) {
      productRefs.current[index].scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  if (!category) {
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
    <div className="container mx-auto bg-white px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">{category.name}</h2>
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        <button
          className={`cursor-pointer p-2 rounded ${!selectedSubcategory ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          onClick={handleShowAllProducts}
        >
          All
        </button>
        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            className={`cursor-pointer p-2 rounded ${selectedSubcategory === subcategory.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => handleSubcategoryClick(subcategory.id)}
          >
            {subcategory.name}
          </button>
        ))}
      </div>
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <span className="font-semibold">Filter:</span>
          <div>
            <span>Price</span>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceFilterChange(Number(e.target.value), priceRange.max)}
                className="border border-gray-300 p-2 rounded"
                placeholder="From"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceFilterChange(priceRange.min, Number(e.target.value))}
                className="border border-gray-300 p-2 rounded"
                placeholder="To"
              />
            </div>
            <span className="block text-sm text-gray-500 mt-1">The highest price is Rs.{highestPrice}</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <FiChevronLeft
          className="h-6 w-6 text-gray-500 cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={() => scrollLeft(0)}
        />
        <div ref={el => (productRefs.current[0] = el)} className="flex space-x-4 overflow-x-hidden pl-8 pr-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 relative cursor-pointer w-60 h-72 flex-shrink-0 border border-gray-300"
                onClick={() => handleProductClick(product.id)}
              >
                {product.images && product.images.length > 0 ? (
                  <motion.img
                    src={getImageUrl(product.images[0].url)}
                    alt={product.name}
                    className="h-40 w-full object-cover mb-4 rounded"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/default-image.png'; }} // Fallback image
                  />
                ) : (
                  <div className="h-32 w-full bg-gray-200 mb-4 rounded flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="grid grid-cols-2">
                  <div>
                    <h3 className="text-sm mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{product.name}</h3>
                    <p className="text-lg font-medium text-gray-700 mb-1">Rs.{product.price}</p>
                  </div>
                  <div>
                    <p className="text-md font-medium text-right text-gray-500 mb-1">QTY: {product.stock}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full py-8 text-gray-500">No products available in this category.</div>
          )}
        </div>
        <FiChevronRight
          className="h-6 w-6 text-gray-500 cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={() => scrollRight(0)}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
