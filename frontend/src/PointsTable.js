import React from 'react';

const teams = [
  {
    name: 'Team A',
    points: 12,
    nrr: 0.56,
    matchesPlayed: 8,
    wins: 6,
    losses: 2,
    nr: 0,
  },
  {
    name: 'Team B',
    points: 10,
    nrr: 0.32,
    matchesPlayed: 8,
    wins: 5,
    losses: 3,
    nr: 0,
  },
  {
    name: 'Team C',
    points: 8,
    nrr: 0.21,
    matchesPlayed: 8,
    wins: 4,
    losses: 4,
    nr: 0,
  },
  {
    name: 'Team D',
    points: 6,
    nrr: -0.1,
    matchesPlayed: 8,
    wins: 3,
    losses: 5,
    nr: 0,
  },
  {
    name: 'Team E',
    points: 4,
    nrr: -0.5,
    matchesPlayed: 8,
    wins: 2,
    losses: 6,
    nr: 0,
  },
];

const PointsTable = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Points Table</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-200 text-left font-semibold text-gray-800">
                Team
              </th>
              <th className="py-3 px-4 bg-gray-200 text-left font-semibold text-gray-800">
                Points
              </th>
              <th className="py-3 px-4 bg-gray-200 text-left font-semibold text-gray-800">
                NRR
              </th>
              <th className="py-3 px-4 bg-gray-200 text-left font-semibold text-gray-800">
                Matches Played
              </th>
              <th className="py-3 px-4 bg-gray-200 text-left font-semibold text-gray-800">
                Wins
              </th>
              <th className="py-3 px-4 bg-gray-200 text-left font-semibold text-gray-800">
                Losses
              </th>
              <th className="py-3 px-4 bg-gray-200 text-left font-semibold text-gray-800">
                NR
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-4">{team.name}</td>
                <td className="py-3 px-4">{team.points}</td>
                <td className="py-3 px-4">{team.nrr}</td>
                <td className="py-3 px-4">{team.matchesPlayed}</td>
                <td className="py-3 px-4">{team.wins}</td>
                <td className="py-3 px-4">{team.losses}</td>
                <td className="py-3 px-4">{team.nr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PointsTable;
