import React, { useState } from 'react';
import { GoogleLogin, Login } from './services/loginApi';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSignIn = async () => {
    if (email === '' || password === '') {
      setErrorMessage('Please enter your email and password.');
    } else if (!/^[\w.%+-]+@pucit\.edu\.pk$/i.test(email)) {
      setErrorMessage('Please enter a valid PUCIT email address.');
    } else {
      console.log(typeof email);
      const payload = { email, password };
      // Handle sign in logic
      const data = await Login(payload);
      if (data && data.access_token && data.user) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data?.user?.role === 'COORDINATOR') {
          navigate('/coordinator-dashboard');
        }
        if (data?.user?.role === 'ADMIN' || data?.user?.role === 'PRESIDENT') {
          navigate('/admin-dashboard');
        }

        if (data?.user?.role === 'MEMBER') {
          navigate('/');
        }
      }

      console.log('Sign in:', email, password);
    }
  };

  const handleGoogleSignIn = () => {
    GoogleLogin();
    console.log('Sign in with Google');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Navbar />
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full mb-4"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Make sure to sign in with a Google account associated with PUCIT.
        </p>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="/signup">Create one</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
