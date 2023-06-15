import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseURL = 'http://localhost:3300/api/auth';

export const GoogleLogin = async () => {
  try {
    const result = await axios.get(`${baseURL}/social-login`);
    console.log(result.data);
    // toast.success('Registered Successfully!');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const Login = async (payload) => {
  try {
    console.log(payload);
    const result = await axios.post(`${baseURL}/login`, payload);
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
