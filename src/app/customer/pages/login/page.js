'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode properly
import { ThreeDots } from 'react-loader-spinner';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for spinner

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("User name is: " + decodedToken.name);
      console.log("User role is: " + decodedToken.role);
      if (decodedToken.role === 'CUSTOMER') {
        router.push('/customer/pages/checkout');
      } else if (decodedToken.role === 'ADMIN') {
        router.push('/admin/pages/Products');
      }
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner
    setStatus('Logging in...');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    setLoading(false); // Stop loading spinner

    if (res.ok) {
      setStatus('Login successful');
      sessionStorage.setItem('authToken', data.token); // Store token in sessionStorage
      const token = data.token;
      const decodedToken = jwtDecode(token);
      console.log("User name is: " + decodedToken.name);
      console.log("User role is: " + decodedToken.role);
      if (decodedToken.role === 'CUSTOMER') {
        window.location.href = '/customer/pages/checkout';
      } else if (decodedToken.role === 'ADMIN') {
        router.push('/admin/pages/Products');
      }
    } else {
      setStatus(data.message || 'Error logging in');
    }
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ThreeDots
            height="80"
            width="80"
            color="#3498db"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      )}
      <div className={`bg-white p-8 rounded-lg w-full max-w-xl ${loading ? 'opacity-50' : ''}`}>
        <div className="flex justify-center flex-col items-center mb-6">
          <img className="w-40" src="/store2ulogo.png" alt="Logo" />
          <h2 className="text-3xl font-bold mt-4">User Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 text-right">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} // Disable button while loading
          >
            Login
          </button>
          {status && <p className="mt-4 text-center text-red-500">{status}</p>}
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Don't have an account?</p>
          <button
            onClick={() => router.push('/customer/pages/register')}
            className="mt-2 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading} // Disable button while loading
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
