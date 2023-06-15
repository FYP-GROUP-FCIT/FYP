import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.js';
import { changeStatus, getSubmissions } from './services/hiringApi.js';
import { getTeamsRegs } from './services/teamsApi.js';
import { getUsers } from './services/userApi.js';

const AdminPanel = () => {
  // Hiring Form Data
  const [hiringFormData, setHiringFormData] = useState([]);
  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: '',
    position: '',
    email: '',
    image: '',
    rollNumber: '',
  });

  // Team Registration Data
  const [teamRegistrationData, setTeamRegistrationData] = useState([]);
  const [teamData, setTeamData] = useState({
    teamName: '',
    captainName: '',
    captainPhone: '',
    players: ['', '', '', '', ''],
  });
  const [submissions, setSubmissions] = useState([]);
  const [teamsReg, setTeamsReg] = useState([]);
  const [users, setUsers] = useState([]);
  const getSubmissionsApi = async () => {
    const data = await getSubmissions();
    setSubmissions(data);
  };

  const getTeamsRegApi = async () => {
    const data = await getTeamsRegs();
    setTeamsReg(data);
  };

  const getAllUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    getSubmissionsApi();
    getTeamsRegApi();
    getAllUsers();
  }, []);
  // Function to handle hiring form submissions
  const handleHiringFormSubmit = (e) => {
    e.preventDefault();
    // Add the form data to the hiringFormData state
    setHiringFormData([...hiringFormData, formData]);
    // Clear the form data
    setFormData({
      userName: '',
      phoneNumber: '',
      position: '',
      email: '',
      image: '',
      rollNumber: '',
    });
  };

  // Function to handle team registration form submissions
  const handleTeamRegistrationSubmit = (e) => {
    e.preventDefault();
    // Add the form data to the teamRegistrationData state
    setTeamRegistrationData([...teamRegistrationData, teamData]);
    // Clear the form data
    setTeamData({
      teamName: '',
      captainName: '',
      captainPhone: '',
      players: ['', '', '', '', ''],
    });
  };

  // Function to handle approval of a hiring form
  const handleApproveHiringForm = (index) => {
    // Implement the logic to approve the hiring form at the specified index
    // For example:
    // const updatedFormData = [...hiringFormData];
    // updatedFormData[index].approved = true;
    // setHiringFormData(updatedFormData);
    const payload = {
      userId: index,
      status: 'APPROVED',
    };
    changeStatus(payload);
  };

  // Function to handle rejection of a hiring form
  const handleRejectHiringForm = (index) => {
    // Implement the logic to reject the hiring form at the specified index
    // // For example:
    // const updatedFormData = [...hiringFormData];
    // updatedFormData[index].approved = false;
    // setHiringFormData(updatedFormData);
    const payload = {
      userId: index,
      status: 'REJECTED',
    };
    changeStatus(payload);
  };

  // Function to handle approval of a team registration
  const handleApproveTeamRegistration = (index) => {
    // Implement the logic to approve the team registration at the specified index
    // For example:
    const updatedTeamData = [...teamRegistrationData];
    updatedTeamData[index].approved = true;
    setTeamRegistrationData(updatedTeamData);
  };

  // Function to handle rejection of a team registration
  const handleRejectTeamRegistration = (index) => {
    // Implement the logic to reject the team registration at the specified index
    // For example:
    const updatedTeamData = [...teamRegistrationData];
    updatedTeamData[index].approved = false;
    setTeamRegistrationData(updatedTeamData);
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <Navbar
        loggedIn={JSON.parse(localStorage.getItem('user'))?.role === 'ADMIN'}
      />
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Panel</h2>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 mt-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Hiring Form Submissions</h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2">User Name</th>
              <th className="py-2">Phone Number</th>
              <th className="py-2">Position</th>
              <th className="py-2">Email</th>
              <th className="py-2">Roll Number</th>
              <th className="py-2">Status</th>
              <th className="py-2">Photo</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions?.map((data, index) => (
              <tr key={index}>
                <td className="border-t py-2">{data?.userName}</td>
                <td className="border-t py-2">{data?.phoneNumber}</td>
                <td className="border-t py-2">{data?.position}</td>
                <td className="border-t py-2">{data?.email}</td>
                <td className="border-t py-2">{data?.rollNumber}</td>
                <td className="border-t py-2">{data?.status}</td>
                <td className="border-t py-2">
                  <img src={data?.photos}></img>
                </td>
                <td className="border-t py-2">
                  <button
                    onClick={() => handleApproveHiringForm(data?.id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-1"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectHiringForm(data?.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 mt-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Team Registrations</h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2">Team Name</th>
              <th className="py-2">Captain Name</th>
              <th className="py-2">Captain Phone</th>
              <th className="py-2">Players</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamsReg?.map((data, index) => (
              <tr key={index}>
                <td className="border-t py-2">{data?.teamName}</td>
                <td className="border-t py-2">{data?.captainName}</td>
                <td className="border-t py-2">{data?.phoneNumber}</td>
                {/* <td className="border-t py-2">{data?.members.join(', ')}</td> */}
                <td className="border-t py-2">
                  <button
                    onClick={() => handleApproveTeamRegistration(index)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-1"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectTeamRegistration(index)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  >
                    Reject
                  </button>
                </td>
                <td className="border-t py-2">{data?.teamName}</td>
                <td className="border-t py-2">{data?.captainName}</td>
                <td className="border-t py-2">{data?.phoneNumber}</td>
                {/* <td className="border-t py-2">{data?.members.join(', ')}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 mt-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Platform Users</h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2">User Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Roll Number</th>
              <th className="py-2">Status</th>
              <th className="py-2">Role</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((data, index) => (
              <tr key={index}>
                <td className="border-t py-2">{data?.userName}</td>
                <td className="border-t py-2">{data?.email}</td>
                <td className="border-t py-2">{data?.rollNumber}</td>
                <td className="border-t py-2">{data?.status}</td>
                <td className="border-t py-2">{data?.role}</td>
                <td className="border-t py-2">
                  <button
                    onClick={() => handleApproveHiringForm(data?.id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-1"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectHiringForm(data?.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
