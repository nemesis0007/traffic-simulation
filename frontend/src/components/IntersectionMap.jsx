import React, { useEffect, useRef } from 'react';

const IntersectionMap = ({ vehicleCounts, results, loading }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = 600;
    canvas.width = size;
    canvas.height = size;

    // Clear canvas with background
    ctx.fillStyle = '#111827'; // Dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw intersection background
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Road background
    ctx.fillStyle = '#374151';
    ctx.fillRect(0, centerY - 60, canvas.width, 120); // Horizontal road
    ctx.fillRect(centerX - 60, 0, 120, canvas.height); // Vertical road

    // Road markings
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 10]);

    // Horizontal road lines
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    // Vertical road lines
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    ctx.setLineDash([]);

    // Draw traffic lights
    const drawTrafficLight = (x, y, direction, isGreen) => {
      // Light housing
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(x - 8, y - 30, 16, 60);

      // Lights
      ctx.fillStyle = isGreen ? '#10b981' : '#ef4444'; // Green or Red
      ctx.beginPath();
      ctx.arc(x, y + 10, 6, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#fbbf24'; // Yellow (always off)
      ctx.beginPath();
      ctx.arc(x, y - 10, 6, 0, 2 * Math.PI);
      ctx.fill();

      // Direction indicator
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(direction, x, y + 35);
    };

    // Determine which directions have green light
    const nsGreen = results?.priority_direction === 'NS';
    const ewGreen = results?.priority_direction === 'EW';

    // Draw traffic lights at each corner
    drawTrafficLight(centerX - 80, centerY - 80, 'N', nsGreen); // North
    drawTrafficLight(centerX + 80, centerY - 80, 'S', nsGreen); // South
    drawTrafficLight(centerX - 80, centerY + 80, 'W', ewGreen); // West
    drawTrafficLight(centerX + 80, centerY + 80, 'E', ewGreen); // East

    // Draw cars
    const drawCar = (x, y, color, direction) => {
      ctx.fillStyle = color;
      ctx.fillRect(x - 8, y - 4, 16, 8);

      // Car direction indicator
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(direction, x, y + 1);
    };

    // Generate cars based on vehicle counts
    const cars = [];
    const directions = [
      { name: 'N', count: vehicleCounts.north, startX: centerX - 20, startY: canvas.height, endY: centerY + 60, color: '#3b82f6' },
      { name: 'S', count: vehicleCounts.south, startX: centerX + 20, startY: 0, endY: centerY - 60, color: '#10b981' },
      { name: 'E', count: vehicleCounts.east, startX: 0, startY: centerY - 20, endX: centerX - 60, color: '#f59e0b' },
      { name: 'W', count: vehicleCounts.west, startX: canvas.width, startY: centerY + 20, endX: centerX + 60, color: '#ef4444' },
    ];

    directions.forEach(dir => {
      const carCount = Math.min(dir.count / 10, 5); // Max 5 cars per direction
      for (let i = 0; i < carCount; i++) {
        if (dir.name === 'N' || dir.name === 'S') {
          const y = dir.startY - (i * 30);
          cars.push({ x: dir.startX, y, color: dir.color, direction: dir.name });
        } else {
          const x = dir.startX - (i * 30);
          cars.push({ x, y: dir.startY, color: dir.color, direction: dir.name });
        }
      }
    });

    // Draw all cars
    cars.forEach(car => {
      drawCar(car.x, car.y, car.color, car.direction);
    });

    // Draw intersection center
    ctx.fillStyle = '#6b7280';
    ctx.fillRect(centerX - 10, centerY - 10, 20, 20);

    // Loading overlay
    if (loading) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Optimizing...', centerX, centerY);
    }

  }, [vehicleCounts, results, loading]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <canvas
        ref={canvasRef}
        className="border border-gray-600 rounded-xl shadow-2xl bg-gray-900 w-full"
        style={{ height: '600px' }}
      />
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>North: {vehicleCounts.north}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>South: {vehicleCounts.south}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>East: {vehicleCounts.east}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>West: {vehicleCounts.west}</span>
          </div>
        </div>
      </div>
      {results && (
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
          <div className="text-center">
            <div className={`text-lg font-bold ${results.priority_direction === 'NS' ? 'text-green-400' : 'text-blue-400'}`}>
              {results.priority_direction} Priority
            </div>
            <div className="text-xs text-gray-300">
              NS: {results.north_south_green}s | EW: {results.east_west_green}s
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntersectionMap;