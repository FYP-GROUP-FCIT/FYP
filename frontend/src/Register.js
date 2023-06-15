import React, { useState } from 'react';
import Navbar from './Navbar.js';
import { RegisterTeam } from './services/teamsApi.js';

const RegisterTeamComponent = () => {
  const [teamData, setTeamData] = useState({
    teamName: '',
    captainName: '',
    captainPhone: '',
    members: ['', '', '', '', ''],
  });

  const [errors, setErrors] = useState({
    teamName: '',
    captainName: '',
    captainPhone: '',
    members: Array(5).fill(''),
  });

  const handleInputChange = (e, index) => {
    const updatedPlayers = [...teamData.members];
    updatedPlayers[index] = e.target.value;
    setTeamData({ ...teamData, members: updatedPlayers });
  };

  const handleAddPlayer = () => {
    if (teamData.members.length < 14) {
      setTeamData((prevData) => {
        const updatedPlayers = [...prevData.members, ''];
        return { ...prevData, members: updatedPlayers };
      });
    }
  };

  const handleRemovePlayer = (index) => {
    if (teamData.members.length > 5) {
      setTeamData((prevData) => {
        const updatedPlayers = [...prevData.members];
        updatedPlayers.splice(index, 1);
        return { ...prevData, members: updatedPlayers };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic here
      // const payload=teamData
      console.log(teamData);
      RegisterTeam(teamData);
    }
  };

  const validateForm = () => {
    const { teamName, captainName, captainPhone, members } = teamData;
    const errorsCopy = {
      teamName: '',
      captainName: '',
      captainPhone: '',
      members: Array(5).fill(''),
    };
    let isValid = true;

    // Validate teamName
    if (!teamName) {
      errorsCopy.teamName = 'Team Name is required';
      isValid = false;
    }

    // Validate captainName
    if (!captainName) {
      errorsCopy.captainName = 'Captain Name is required';
      isValid = false;
    }

    // Validate captainPhone
    if (!captainPhone) {
      errorsCopy.captainPhone = 'Captain Phone is required';
      isValid = false;
    } else if (!/^\d{11}$/.test(captainPhone)) {
      errorsCopy.captainPhone = 'Please enter a valid phone number';
      isValid = false;
    }

    // Validate players
    members?.forEach((player, index) => {
      if (!player) {
        errorsCopy.players[index] = `Player ${index + 1} Name is required`;
        isValid = false;
      }
    });

    setErrors(errorsCopy);
    return isValid;
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <div className="mb-8"></div> {/* Section break */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Register your team
      </h2>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Guidelines/Rules:</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>Fill out all the required fields.</li>
            <li>
              Ensure the team name, captain name, and captain phone are
              accurate.
            </li>
            <li>Add the names of all the players in the team.</li>
            <li>Upload a clear picture of the payment proof.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="teamName"
            >
              Team Name
            </label>
            <input
              type="text"
              name="teamName"
              value={teamData.teamName}
              onChange={(e) =>
                setTeamData({ ...teamData, teamName: e.target.value })
              }
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.teamName && 'border-red-500'
              }`}
              required
            />
            {errors.teamName && (
              <p className="text-red-500 text-xs italic">{errors.teamName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="captainName"
            >
              Captain Name
            </label>
            <input
              type="text"
              name="captainName"
              value={teamData.captainName}
              onChange={(e) =>
                setTeamData({ ...teamData, captainName: e.target.value })
              }
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.captainName && 'border-red-500'
              }`}
              required
            />
            {errors.captainName && (
              <p className="text-red-500 text-xs italic">
                {errors.captainName}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="captainPhone"
            >
              Captain Phone
            </label>
            <input
              type="text"
              name="captainPhone"
              value={teamData.captainPhone}
              onChange={(e) =>
                setTeamData({ ...teamData, captainPhone: e.target.value })
              }
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.captainPhone && 'border-red-500'
              }`}
              required
              placeholder="03xxxxxxxxx" // Add the placeholder here
            />

            {errors.captainPhone && (
              <p className="text-red-500 text-xs italic">
                {errors.captainPhone}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Players
            </label>
            {teamData?.members?.map((player, index) => (
              <div key={index} className="mb-2">
                <label
                  className="text-gray-700 font-bold"
                  htmlFor={`player${index + 1}`}
                >
                  Player {index + 1}
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name={`player${index + 1}`}
                    placeholder={`Player ${index + 1} Name`}
                    value={player}
                    onChange={(e) => handleInputChange(e, index)}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.members[index] && 'border-red-500'
                    }`}
                    required
                  />
                  {index >= 5 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePlayer(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {errors.members[index] && (
                  <p className="text-red-500 text-xs italic">
                    {errors.members[index]}
                  </p>
                )}
              </div>
            ))}
            {teamData?.members?.length < 14 && (
              <button
                type="button"
                onClick={handleAddPlayer}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add More
              </button>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="paymentProof"
            >
              Payment Proof
            </label>
            <input
              type="file"
              name="paymentProof"
              // Add onChange event handler for uploading the picture of payment proof
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeamComponent;
