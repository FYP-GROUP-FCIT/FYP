import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseURL = 'http://localhost:3300/api/auth';

export const updateAccess = async (payload) => {
  try {
    const result = await axios.put(`${baseURL}/update-access`, payload);
    console.log(result);
    if (result.data) {
      toast.success('Access/Role updated Successfully!', {
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

export const updateStatus = async (payload) => {
  try {
    const result = await axios.put(`${baseURL}/update-status`, payload);
    console.log(result);
    if (result.data) {
      toast.success('Status updated Successfully!', {
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

export const getUsers = async () => {
  try {
    const result = await axios.get(`http://localhost:3300/api/user`);
    console.log(result);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
