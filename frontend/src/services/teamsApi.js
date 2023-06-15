import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseURL = 'http://localhost:3300/api/registration';

export const getTeamsRegs = async () => {
  try {
    const result = await axios.get(`${baseURL}`);
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

export const getTeamStatus = async (payload) => {
  try {
    const result = await axios.get(`${baseURL}/${payload.id}`);
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

export const updateTeamStatus = async (payload) => {
  try {
    const result = await axios.put(`${baseURL}/status`, payload);
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

export const RegisterTeam = async (payload) => {
  try {
    const formData = new FormData();
    formData.append('teamName', payload.teamName);
    formData.append('email', payload.email);
    formData.append('captainName', payload.captainName);
    formData.append('phoneNumber', payload.captainPhone);
    formData.append('address', payload.address);
    formData.append('members', payload.members);
    formData.append('paymentImage', payload.paymentImage);
    formData.append('sports', payload.sports);
    const result = await axios.post(`${baseURL}`, formData);
    console.log(result.data);
    if (result.data) {
      toast.success('Request Received!', {
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
