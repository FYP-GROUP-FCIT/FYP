import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseURL = 'http://localhost:3300/api/inventory';

export const getMaterials = async () => {
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

export const getSingleMaterial = async (payload) => {
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

export const getMaterialByCategory = async (payload) => {
  try {
    const result = await axios.get(`${baseURL}/?${payload.category}`);
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

export const addToInventory = async (payload) => {
  try {
    const result = await axios.post(`${baseURL}`, payload);
    console.log(result);
    // toast.success('Registered Successfully!');\
    if (result.data) {
      toast.success('Item Added!', {
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

export const deleteItem = async (payload) => {
  try {
    const result = await axios.delete(`${baseURL}/${payload.id}`);
    console.log(result);
    // toast.success('Registered Successfully!');
    if (result.data) {
      toast.success('Item Deleted!', {
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

export const updateItem = async (payload) => {
  try {
    const result = await axios.put(`${baseURL}/${payload.id}`, payload);
    console.log(result);
    // toast.success('Registered Successfully!');
    if (result.data) {
      toast.success('Item Updated!', {
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

export const issueItem = async (payload) => {
  try {
    const result = await axios.put(`${baseURL}/issue-item`, payload);
    console.log(result);
    // toast.success('Registered Successfully!');
    if (result.data) {
      toast.success('Item issued!', {
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

export const returnItem = async (payload) => {
  try {
    const result = await axios.put(`${baseURL}/return-item`, payload);
    console.log(result);
    // toast.success('Registered Successfully!');
    if (result.data) {
      toast.success('Item returned!', {
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
