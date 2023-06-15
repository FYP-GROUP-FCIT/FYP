import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.js';
import { getResults } from './services/resultsApi.js';

const results = [
  {
    teamA: 'Team A',
    teamB: 'Team B',
    day: 'Day 1',
    time: '12:00 PM',
    winner: 'Team A',
  },
  {
    teamA: 'Team C',
    teamB: 'Team D',
    day: 'Day 2',
    time: '2:30 PM',
    winner: 'Team D',
  },
  {
    teamA: 'Team E',
    teamB: 'Team F',
    day: 'Day 3',
    time: '5:00 PM',
    winner: 'Team E',
  },
  {
    teamA: 'Team G',
    teamB: 'Team H',
    day: 'Day 4',
    time: '7:30 PM',
    winner: 'Team H',
  },
  {
    teamA: 'Team I',
    teamB: 'Team J',
    day: 'Day 5',
    time: '9:00 PM',
    winner: 'Team J',
  },
];

const Results = () => {
  const [resultss, setResults] = useState([]);
  const getResultsApi = async () => {
    const data = await getResults();
    setResults(data);
  };
  useEffect(() => {
    getResultsApi();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <h2 className="text-3xl font-bold text-center mb-6">Results</h2>
      <div className="grid gap-6">
        {resultss?.map((result, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {result.teamA} vs {result.teamB}
              </h3>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Day:</span> {result.day}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Time:</span> {result.time}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Winner:</span> {result.winner}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
