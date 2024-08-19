'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ThreeDots } from 'react-loader-spinner';
import { EyeIcon } from '@heroicons/react/24/outline';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
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

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow rounded-lg p-4">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => {
                  const subtotal = order.orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
                  const subtotalLessDiscount = subtotal - (order.discount ?? 0);
                  const totalTax = subtotalLessDiscount * taxRate;
                  const total = subtotalLessDiscount + totalTax + deliveryCharge + (order.otherCharges ?? 0);
                  const productNames = (
                    <ul className="list-disc list-inside">
                      {order.orderItems.map(item => (
                        <li key={item.id} className="text-gray-700">{item.product.name}</li>
                      ))}
                    </ul>
                  );
                  
                  return (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{productNames}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs.{total}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1"
                        >
                          <EyeIcon className="h-5 w-5" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl h-[90vh] w-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order Details - #{selectedOrder.id}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <p className="mb-2"><strong>Status:</strong> {selectedOrder.status}</p>
              <p className="mb-2"><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
              <h3 className="font-semibold mt-4">Items:</h3>
              <ul className="list-inside">
                {selectedOrder.orderItems.map((item) => (
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
                {(() => {
                  const subtotal = selectedOrder.orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
                  const subtotalLessDiscount = subtotal - (selectedOrder.discount ?? 0);
                  const totalTax = subtotalLessDiscount * taxRate;
                  const total = subtotalLessDiscount + totalTax + deliveryCharge + (selectedOrder.otherCharges ?? 0);

                  return (
                    <>
                      <div className="flex justify-between">
                        <p className="text-md font-medium text-gray-700">Subtotal:</p>
                        <p className="text-xl text-gray-700">Rs.{subtotalLessDiscount}</p>
                      </div>
                      {/* <div className="flex justify-between">
                        <p className="text-md font-medium text-gray-700">Tax ({(taxRate * 100)}%):</p>
                        <p className="text-md text-gray-700">Rs.{totalTax}</p>
                      </div> */}
                      <div className="flex justify-between">
                        <p className="text-md font-medium text-gray-700">Delivery Charges:</p>
                        <p className="text-md text-gray-700">Rs.{deliveryCharge}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-md font-medium text-gray-700">Other:</p>
                        <p className="text-md text-gray-700">Rs.{(selectedOrder.otherCharges ?? 0)}</p>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between mt-4">
                        <p className="text-xl font-bold text-gray-700">Total:</p>
                        <p className="text-xl text-gray-700">Rs.{total}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
