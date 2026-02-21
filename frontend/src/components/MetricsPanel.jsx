import React from 'react';

const MetricsPanel = ({ results, loading, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-600 rounded w-32"></div>
          <div className="h-4 bg-gray-600 rounded w-24"></div>
          <div className="h-4 bg-gray-600 rounded w-28"></div>
        </div>
        <p className="mt-4 text-gray-400">Calculating metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-400">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <div className="text-4xl mb-4">📊</div>
        <p>No metrics available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-lg p-4 border border-blue-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Priority Direction</p>
              <p className="text-2xl font-bold text-blue-400">{results.priority_direction}</p>
            </div>
            <div className="text-3xl">🚦</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-lg p-4 border border-green-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Average Wait Time</p>
              <p className="text-2xl font-bold text-green-400">{results.estimated_wait_time.toFixed(1)} min</p>
            </div>
            <div className="text-3xl">⏱️</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-900/50 to-amber-900/50 rounded-lg p-4 border border-orange-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Congestion Score</p>
              <p className="text-2xl font-bold text-orange-400">{results.congestion_score.toFixed(1)}%</p>
            </div>
            <div className="text-3xl">🚗</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;