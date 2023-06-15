import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import Navbar from './Navbar';
import { getTeamsRegs } from './services/teamsApi';

const CoordinatorComponent = () => {
  const [teams, setTeams] = useState();
  const [fixtureData, setFixtureData] = useState({
    teamA: '',
    teamB: '',
    date: new Date(),
    time: '',
    Venue: '',
    sports: '',
  });

  const [resultData, setResultData] = useState({
    teamA: '',
    teamB: '',
    date: new Date(),
    time: '',
    Venue: '',
    winner: '',
  });

  const handleFixtureInputChange = (e) => {
    setFixtureData({ ...fixtureData, [e.target.name]: e.target.value });
  };

  const handleResultInputChange = (e) => {
    setResultData({ ...resultData, [e.target.name]: e.target.value });
  };

  const handleFixtureDateChange = (date) => {
    setFixtureData({ ...fixtureData, date });
  };

  const handleResultDateChange = (date) => {
    setResultData({ ...resultData, date });
  };

  const handleFixtureTimeChange = (time) => {
    setFixtureData({ ...fixtureData, time });
  };

  const handleResultTimeChange = (time) => {
    setResultData({ ...resultData, time });
  };

  const handleAddFixture = (e) => {
    e.preventDefault();
    // Handle adding fixture logic here
    console.log(fixtureData);
  };

  const handleAddResult = (e) => {
    e.preventDefault();
    // Handle adding result logic here
    console.log(resultData);
  };

  const handleViewRegistrations = () => {
    getTeams();
    // Handle viewing team registrations logic here

    console.log('Viewing team registrations');
  };

  const getTeams = async () => {
    const data = await getTeamsRegs();
    setTeams(data);
  };

  return (
    <div>
      <Navbar
        loggedIn={
          JSON.parse(localStorage.getItem('user'))?.role === 'COORDINATOR'
        }
      />
      <br />
      <br />
      <br />
      <br />
      <div className="mb-8"></div> {/* Section break */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Coordinator Dashboard
      </h2>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Add Fixture</h3>
        <form onSubmit={handleAddFixture}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="teamA"
            >
              Team A
            </label>
            <input
              type="text"
              name="teamA"
              value={fixtureData.teamA}
              onChange={handleFixtureInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="teamB"
            >
              Team B
            </label>
            <input
              type="text"
              name="teamB"
              value={fixtureData.teamB}
              onChange={handleFixtureInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <DatePicker
              selected={fixtureData.date}
              onChange={handleFixtureDateChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Time
            </label>
            <TimePicker
              value={fixtureData.time}
              onChange={handleFixtureTimeChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="venue"
            >
              Venue
            </label>
            <input
              type="text"
              name="venue"
              value={fixtureData.Venue}
              onChange={handleFixtureInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Fixture
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-md mx-auto bg-white p-8 mt-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Add Result</h3>
        <form onSubmit={handleAddResult}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="teamA"
            >
              Team A
            </label>
            <input
              type="text"
              name="teamA"
              value={resultData.teamA}
              onChange={handleResultInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="teamB"
            >
              Team B
            </label>
            <input
              type="text"
              name="teamB"
              value={resultData.teamB}
              onChange={handleResultInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <DatePicker
              selected={resultData.date}
              onChange={handleResultDateChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Time
            </label>
            <TimePicker
              value={resultData.time}
              onChange={handleResultTimeChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="venue"
            >
              Venue
            </label>
            <input
              type="text"
              name="venue"
              value={resultData.Venue}
              onChange={handleResultInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="winner"
            >
              Winner
            </label>
            <input
              type="text"
              name="winner"
              value={resultData.winner}
              onChange={handleResultInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Result
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-md mx-auto bg-white p-8 mt-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Team Registrations</h3>
        <button
          onClick={handleViewRegistrations}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View Registrations
        </button>
      </div>
    </div>
  );
};

export default CoordinatorComponent;
