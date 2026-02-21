import React from 'react';

const SignalLight = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        <p className="mt-4 text-gray-400">Optimizing signals...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <div className="w-16 h-24 bg-gray-700 rounded-lg flex flex-col items-center justify-around p-2">
          <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
        </div>
        <p className="mt-4">No data available</p>
      </div>
    );
  }

  const nsGreen = results.priority_direction === 'NS';
  const ewGreen = results.priority_direction === 'EW';

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex space-x-8">
        {/* North-South Signal */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-24 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center justify-around p-2">
            <div className={`w-6 h-6 rounded-full transition-all duration-500 ${nsGreen ? 'bg-green-400 shadow-green-400/50 shadow-lg' : 'bg-red-400 shadow-red-400/50 shadow-lg'}`}></div>
            <div className="w-6 h-6 bg-yellow-400 rounded-full opacity-20"></div>
            <div className={`w-6 h-6 rounded-full transition-all duration-500 ${!nsGreen ? 'bg-red-400 shadow-red-400/50 shadow-lg' : 'bg-red-400 opacity-20'}`}></div>
          </div>
          <span className="text-sm font-medium text-gray-300">North-South</span>
        </div>

        {/* East-West Signal */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-24 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center justify-around p-2">
            <div className={`w-6 h-6 rounded-full transition-all duration-500 ${ewGreen ? 'bg-green-400 shadow-green-400/50 shadow-lg' : 'bg-red-400 shadow-red-400/50 shadow-lg'}`}></div>
            <div className="w-6 h-6 bg-yellow-400 rounded-full opacity-20"></div>
            <div className={`w-6 h-6 rounded-full transition-all duration-500 ${!ewGreen ? 'bg-red-400 shadow-red-400/50 shadow-lg' : 'bg-red-400 opacity-20'}`}></div>
          </div>
          <span className="text-sm font-medium text-gray-300">East-West</span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-lg px-4 py-2 border border-blue-700/50">
          <p className="text-sm text-gray-400">NS Green Time</p>
          <p className="text-2xl font-bold text-blue-400">{results.north_south_green}s</p>
        </div>
        <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-lg px-4 py-2 border border-blue-700/50">
          <p className="text-sm text-gray-400">EW Green Time</p>
          <p className="text-2xl font-bold text-blue-400">{results.east_west_green}s</p>
        </div>
      </div>
    </div>
  );
};

export default SignalLight;