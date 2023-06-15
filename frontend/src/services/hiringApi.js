import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseURL = 'http://localhost:3300/api/hiring';

export const RegisterHiring = async (payload) => {
  try {
    const formData = new FormData();
    formData.append('userName', payload.userName);
    formData.append('phoneNumber', payload.phoneNumber);
    formData.append('email', payload.email);
    formData.append('image', payload.image);
    formData.append('position', payload.position);
    formData.append('rollNumber', payload.rollNumber);
    const result = await axios.post(`${baseURL}/register`, formData);
    console.log(result.data);
    if (result.data) {
      toast.success('Registered Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const changeStatus = async (payload) => {
  try {
    const result = await axios.put(`${baseURL}/change-status`, payload);
    console.log(result.data);
    if (result.data) {
      toast.success('Status Changed Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const showHideHiring = async (payload) => {
  try {
    const result = await axios.put(`${baseURL}/show-hide-hiring`, payload);
    console.log(result.data);
    if (result.data) {
      toast.success('Show hiring enabled Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const showHiring = async () => {
  try {
    const result = await axios.get(`${baseURL}/show-hiring`);
    console.log(result.data);
    // toast.success('Registered Successfully!');
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const getSociety = async () => {
  try {
    const result = await axios.get(`${baseURL}/get-society`);
    console.log(result.data);
    // toast.success('Registered Successfully!');
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const getSubmissions = async () => {
  try {
    const result = await axios.get(`${baseURL}/get-submissions`);
    console.log(result.data);
    // toast.success('Registered Successfully!');
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const getStatus = async (payload) => {
  try {
    const result = await axios.get(`${baseURL}/get-status${payload.email}`);
    console.log(result.data);
    // toast.success('Registered Successfully!');
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
