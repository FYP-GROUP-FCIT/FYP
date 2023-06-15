import React, { useState } from 'react';
import Navbar from './Navbar.js';
import { Register } from './services/regApi.js';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    if (name === '' || email === '' || password === '' || rollNumber === '') {
      setErrorMessage('Please fill in all the required fields.');
    } else if (!/^[\w.%+-]+@pucit\.edu\.pk$/i.test(email)) {
      setErrorMessage('Please enter a valid PUCIT email address.');
    } else {
      // Handle signup logic
      const payload = {
        userName: name,
        password,
        rollNumber,
        email,
      };
      Register(payload);
      console.log('Signup:', name, email, password, rollNumber);
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />

      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label
              htmlFor="rollNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your roll number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full mb-4"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already have an account? <a href="/login">Sign in</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
