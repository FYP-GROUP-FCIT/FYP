import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseURL = 'http://localhost:3300/api/results';

export const getResults = async () => {
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

export const addResult = async (payload) => {
  try {
    const result = await axios.put(`${baseURL}`, payload);
    console.log(result);
    if (result.data) {
      toast.success('Result Added!', { position: toast.POSITION.TOP_RIGHT });
    }
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const getAllFixtureResults = async () => {
  try {
    const result = await axios.get(`${baseURL}/fixtures`);
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
