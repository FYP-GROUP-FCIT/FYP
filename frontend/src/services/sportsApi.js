import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseURL = 'http://localhost:3300/api/sports';

export const getSports = async () => {
  try {
    const result = await axios.get(`${baseURL}`);
    console.log(result);
    // toast.success('Registered Successfully!');
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const getSingleSport = async (payload) => {
  try {
    const result = await axios.get(`${baseURL}/${payload.id}`);
    console.log(result);
    // toast.success('Registered Successfully!');
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const addSport = async (payload) => {
  try {
    const result = await axios.post(`${baseURL}`, payload);
    console.log(result);
    if (result.data) {
      toast.success('Sports Added Successfully!', {
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

export const updateSport = async (payload) => {
  try {
    const result = await axios.put(`${baseURL}/${payload.id}`, payload);
    console.log(result);
    if (result.data) {
      toast.success('Sports Updated Successfully!', {
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
