import React, { useState } from 'react';
import { RegisterHiring } from './services/hiringApi';
import Navbar from './Navbar.js';
// Example dropdown options

const HiringFormComponent = () => {
  const user = localStorage.getItem('user');
  let parsedUser;
  if (user) {
    parsedUser = JSON.parse(user);
  }
  const [formData, setFormData] = useState({
    userName: parsedUser.userName,
    phoneNumber: '',
    position: '',
    email: parsedUser.email,
    image: '',
    rollNumber: parsedUser.rollNumber,
  });

  const [errors, setErrors] = useState({});

  const positions = [
    'President',
    'Vice President',
    'Cricket Coordinator',
    'Football Coordinator',
    'General Secretory',
    'Table Tennis Coordinator',
    'Badminton Coordinator',
    'Dart Coordinator',
    'Rifle Shooting Coordinator',
    'Treasurer',
  ];
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    console.log(e.target);
    setFormData({ ...formData, [name]: name === 'image' ? files[0] : value });
    setErrors({ ...errors, [name]: '' }); // Clearing the error message for the input field
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'Name is required';
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    }

    if (!formData.position) {
      newErrors.position = 'Position is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = 'Photo is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with form submission logic here
      const payload = {
        userName: formData.userName,
        phoneNumber: formData.phoneNumber,
        position: formData.position,
        email: formData.email,
        image: formData.image,
        rollNumber: formData.rollNumber,
      };

      RegisterHiring(payload);
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <div className="mb-8"></div> {/* Section break */}
      <h2 className="text-3xl font-bold text-center mb-6">Hiring</h2>
      {/* <p className="text-gray-800 text-lg mb-4">
        Please provide the following information for the hiring process:
      </p> */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            disabled
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.userName ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.userName && (
            <p className="text-red-500 text-xs italic">{errors.userName}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.phoneNumber ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="position"
          >
            Position
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.position ? 'border-red-500' : ''
            }`}
            required
          >
            <option value="" disabled>
              Select a position
            </option>
            {positions.map((position, index) => (
              <option key={index} value={position}>
                {position}
              </option>
            ))}
          </select>
          {errors.position && (
            <p className="text-red-500 text-xs italic">{errors.position}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="photo"
          >
            Photo
          </label>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.image ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.image && (
            <p className="text-red-500 text-xs italic">{errors.image}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rollNumber"
          >
            Roll Number
          </label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            disabled
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HiringFormComponent;
