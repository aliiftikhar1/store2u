'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, setCart } from '@/app/store/cartSlice';

const CartPage = () => {
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(setCart(storedCart));

    fetchSettings().then(() => {
      calculateTotal(storedCart);
    });
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    calculateTotal(cart);
  }, [cart]);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings/getSettings');
      const { deliveryCharge, taxPercentage } = response.data;
      setDeliveryCharge(deliveryCharge);
      setTaxRate(taxPercentage / 100);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const calculateTotal = (cartItems) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const calculatedTax = subtotal * taxRate;
    setTax(calculatedTax);
    setTotal(subtotal + deliveryCharge);
  };

  const handleCheckout = () => {
    // Save the cart with color and size in session storage
    sessionStorage.setItem('cart', JSON.stringify(cart));

    const token = sessionStorage.getItem('authToken'); // Retrieve token from session storage
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.exp > Date.now() / 1000) {
          router.push(`/customer/pages/checkout?total=${total}`);
        } else {
          sessionStorage.removeItem('authToken'); // Remove invalid token
          router.push('/customer/pages/login');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        router.push('/customer/pages/login');
      }
    } else {
      router.push('/customer/pages/login');
    }
  };

  const updateItemQuantity = (itemId, quantity) => {
    dispatch(updateQuantity({ id: itemId, quantity }));
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
    toast.info(`Product removed from cart!`);
  };

  if (cart.length === 0) {
    return <div className="text-center font-bold text-4xl py-8">Your cart is empty</div>;
  }

  return (
    <div className="container text-black bg-white mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/5 border border-gray-400 p-4">
          <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
          <div className="flex flex-col gap-4">
            {cart.map((item, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={`https://data.tascpa.ca/uploads/${item.images[0].url}`}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded mr-4"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 mr-4">
                    No Image
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  <p className="text-md font-medium text-gray-700">Rs.{item.price}</p>
                  <p className="text-md font-medium text-gray-700">Size: {item.selectedSize}</p>
                  <p className="text-md font-medium text-gray-700">Color: {item.selectedColor}</p>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-300 text-gray-700 px-2 rounded-md"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="bg-gray-300 text-gray-700 px-2 rounded-md"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-md"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-2/5 border border-gray-400 p-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-xl font-bold text-gray-700">Subtotal:</p>
              <p className="text-md text-gray-700">Rs.{total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-md font-medium text-gray-700">Delivery Charge:</p>
              <p className="text-md text-gray-700">Rs.{deliveryCharge.toFixed(2)}</p>
            </div>
            <hr className="h-2"></hr>
            <div className="flex justify-between">
              <p className="text-xl font-bold text-gray-700">Total:</p>
              <p className="text-md text-gray-700">Rs.{(total + deliveryCharge).toFixed(2)}</p>
            </div>
            <button
              className="bg-teal-500 text-white py-2 px-4 rounded-md mt-4 w-full"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartPage;
