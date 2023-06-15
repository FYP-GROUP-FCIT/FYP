import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.js';
import { getFixtures } from './services/fixturesapi.js';
const fixtures = [
  {
    teamA: 'Team A',
    teamB: 'Team B',
    time: '12:00 PM',
    venue: 'Stadium 1',
  },
  {
    teamA: 'Team C',
    teamB: 'Team D',
    time: '2:30 PM',
    venue: 'Stadium 2',
  },
  {
    teamA: 'Team E',
    teamB: 'Team F',
    time: '5:00 PM',
    venue: 'Stadium 3',
  },
  {
    teamA: 'Team G',
    teamB: 'Team H',
    time: '7:30 PM',
    venue: 'Stadium 4',
  },
  {
    teamA: 'Team I',
    teamB: 'Team J',
    time: '9:00 PM',
    venue: 'Stadium 5',
  },
];

const Fixtures = () => {
  const [fixturess, setFixtures] = useState([]);
  const getFixtruesApi = async () => {
    const data = await getFixtures();
    setFixtures(data);
  };
  useEffect(() => {
    getFixtruesApi();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <h2 className="text-3xl font-bold text-center mb-6">Fixtures</h2>
      <div className="grid gap-6">
        {fixturess?.map((fixture, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {fixture.teamA} vs {fixture.teamB}
              </h3>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Time:</span> {fixture.time}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Venue:</span> {fixture.venue}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fixtures;
