// components/TopBar.js
'use client';

import React from 'react';
import { FiChevronRight, FiPhone, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { motion } from 'framer-motion';

const TopBar = () => {
  return (
    <div className="hidden md:flex bg-white py-2 border-b border-gray-300 text-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex flex-col md:flex-row md:space-x-4 text-sm w-full md:w-auto">
          <div className="flex space-x-4 mb-2 md:mb-0">
            <a href="/customer/pages/contactus" className="hover:underline">Contact Us </a>
            <span>/</span>
            <a href="/customer/pages/aboutus" className="hover:underline">About US</a>
          </div>
          <div className="hidden md:block w-[60vw] overflow-x-hidden">
            <motion.div
              className="flex items-center space-x-2 text-gray-600 whitespace-nowrap"
              initial={{ x: '100%' }}
              animate={{ x: '-100%' }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            >
              <FiChevronRight />
              <span>Get great devices up to 50% off</span>
              <a href="#" className="text-blue-500 hover:underline">View details</a>
            </motion.div>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-500">
              <FiFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-500">
              <FiTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-500">
              <FiInstagram />
            </a>
            <a href="tel:+923128807795" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-500">
            <FiPhone />
            </a>
          </div>
          <span className="flex items-center text-lg"> Call Us: <a href="tel:+923128807795" className="text-blue-500 hover:underline ml-1">+92 312 8807795</a></span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
