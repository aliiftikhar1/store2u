'use client';

import React, { useState, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiMoreVertical, FiLogOut } from 'react-icons/fi';
import { MdExpandMore } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '@/app/store/cartSlice';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    const token = sessionStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setAuthToken(token);
      setUserRole(decodedToken.role);
    }

    fetchCategories();
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(setCart(storedCart));
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchPageUrl = `/customer/pages/allproducts?search=${encodeURIComponent(searchQuery.trim())}`;
    
    // Redirect to the search results page or update the query parameters
    router.push(searchPageUrl);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('authToken');
    setAuthToken(null);
    setUserRole(null);
    router.push('/customer/pages/login');
  };

  const visibleCategories = categories.slice(0, 5);
  const hiddenCategories = categories.slice(5);

  return (
    <header className="bg-white py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <img src="/store2ulogo.png" alt="Logo" className="h-10 w-full mr-6 ml-2 cursor-pointer" />
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            className="text-gray-700 hover:text-blue-500 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <nav className={`fixed inset-0 bg-white lg:relative lg:bg-transparent w-full lg:flex lg:w-auto lg:items-center ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="container mx-auto lg:flex lg:items-center lg:justify-between">
            <div className="flex flex-col lg:flex-row text-[15px] lg:mx-auto lg:w-[800px] text-center lg:pl-8 lg:space-x-8">
              {visibleCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/customer/pages/category/${category.id}`}
                  className="relative group text-gray-700 transition-colors duration-300 text-center my-2 lg:my-0"
                >
                  {category.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              {hiddenCategories.length > 0 && (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-300 text-center my-2 lg:my-0"
                  >
                    More <MdExpandMore />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute mt-2 w-48 bg-white border border-gray-200 shadow-lg z-10">
                      <div className="py-2">
                        {hiddenCategories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/customer/pages/category/${category.id}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {isMobileMenuOpen && (
              <button
                className="absolute top-4 right-4 text-gray-700 hover:text-blue-500 focus:outline-none lg:hidden"
                onClick={toggleMobileMenu}
              >
                <FiX size={24} />
              </button>
            )}
          </div>
        </nav>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <div className="lg:hidden">
            <button
              className="text-gray-700 hover:text-blue-500 focus:outline-none"
              onClick={toggleDropdown}
            >
              <FiMoreVertical size={24} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-10">
                <div className="py-2">
                  <form className="relative w-full px-4" onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search"
                      className="border rounded-full py-1 pl-4 pr-10 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="absolute right-3 top-1 text-gray-700 hover:text-blue-500">
                      <FaSearch />
                    </button>
                  </form>
                  <Link href="/customer/pages/cart" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiShoppingCart className="mr-2" />
                    Cart
                    {cartItems.length > 0 && (
                      <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">{cartItems.length}</span>
                    )}
                  </Link>
                  {authToken ? (
                    <>
                      <Link href="/customer/pages/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Orders</Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FiLogOut className="mr-2" />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <Link href="/customer/pages/login" className="block px-4 text-lg py-2 text-gray-700 hover:bg-gray-100">Sign in</Link>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="hidden lg:flex items-center">
            <form className="relative w-full flex justify-center items-center" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="What are you looking for"
                className="border rounded-full py-1 pl-4 pr-10 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="absolute right-3 text-gray-700 hover:text-blue-500">
                <FaSearch />
              </button>
            </form>
            <div className='relative flex'>
              <Link href="/customer/pages/cart">
                <FiShoppingCart className="ml-4 text-gray-700 cursor-pointer hover:text-blue-500 transition-colors duration-300" />
                {cartItems.length > 0 && (
                  <span className=" absolute top-[-10px] right-[-10px] ml-2 bg-red-500 text-white rounded-full px-1 text-xs font-bold">{cartItems.length}</span>
                )}
              </Link>
            </div>
          </div>
          {authToken ? (
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/customer/pages/orders" className="text-gray-700 hover:text-blue-500 transition-colors duration-300">My Orders</Link>
              <button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-blue-500 transition-colors duration-300 flex items-center"
              >
                <FiLogOut className="mr-2" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center">
              <Link href="/customer/pages/login" className="text-gray-700 text-sm mr-2 hover:text-blue-500 transition-colors duration-300">Sign in</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
