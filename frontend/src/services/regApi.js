import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseURL = 'http://localhost:3300/api/auth';

export const Register = async (payload) => {
  try {
    const result = await axios.post(`${baseURL}/registerUser`, payload);
    console.log(result.data);
    toast.success('Registered Successfully, wait for admin approval!');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
