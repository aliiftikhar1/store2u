'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ThreeDots } from 'react-loader-spinner';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const router = useRouter();

  useEffect(() => {
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

    const fetchOrders = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        alert('You need to log in to view your orders');
        router.push('/customer/pages/login');
        return;
      }

      try {
        const response = await axios.get('/api/orders/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
    fetchOrders();
  }, [router]);

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

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        orders.map((order) => {
          const subtotal = order.orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
          const subtotalLessDiscount = subtotal - (order.discount ?? 0);
          const totalTax = subtotalLessDiscount * taxRate;
          const total = subtotalLessDiscount + totalTax + deliveryCharge + (order.otherCharges ?? 0);

          return (
            <div key={order.id} className="border p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Order #{order.id}</h2>
              <p className="mb-2"><strong>Status:</strong> {order.status}</p>
              <p className="mb-2"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <h3 className="font-semibold mt-4">Items:</h3>
              <ul className="list-disc list-inside">
                {order.orderItems.map((item) => (
                  <li key={item.id} className="mb-4">
                    <p><strong>{item.product.name}</strong></p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: Rs.{item.price}</p>
                    <p>Size: {item.selectedSize || 'N/A'}</p>
                    <p>Color: {item.selectedColor || 'N/A'}</p>
                    {item.product.images && item.product.images.length > 0 && (
                      <img
                        src={`https://data.tascpa.ca/uploads/${item.product.images[0].url}`}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md mt-2"
                      />
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Subtotal:</p>
                  <p className="text-xl text-gray-700">Rs.{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Discount:</p>
                  <p className="text-md text-gray-700">Rs.{(order.discount ?? 0).toFixed(2)}</p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Subtotal after Discount:</p>
                  <p className="text-md text-gray-700">Rs.{subtotalLessDiscount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Tax ({(taxRate * 100).toFixed(2)}%):</p>
                  <p className="text-md text-gray-700">Rs.{totalTax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Delivery Charges:</p>
                  <p className="text-md text-gray-700">Rs.{deliveryCharge.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Other:</p>
                  <p className="text-md text-gray-700">Rs.{(order.otherCharges ?? 0).toFixed(2)}</p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mt-4">
                  <p className="text-xl font-bold text-gray-700">Total:</p>
                  <p className="text-xl text-gray-700">Rs.{total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UserOrders;
