'use client'
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const phoneNumber = '923310356111'; // Replace with your phone number
  const message = 'Hello, I would like to chat with you!';

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="fixed bottom-4 right-4 shadow-lg cursor-pointer flex items-center justify-center bg-green-500 p-3 rounded-full z-50"
      onClick={handleClick}>
      <FaWhatsapp className="text-white w-8 h-8 md:w-12 md:h-12" />
    </div>
  );
}
