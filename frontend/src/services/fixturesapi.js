import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseURL = 'http://localhost:3300/api/fixtures';

export const getFixtures = async () => {
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

export const addFixture = async (payload) => {
  try {
    const result = await axios.post(`${baseURL}/add-fixtures`, payload);
    console.log(result);
    if (result.data) {
      toast.success('fixture added Successfully!', {
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
