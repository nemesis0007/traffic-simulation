# Smart Adaptive Traffic Coordination Platform (SATCP)

A data-driven traffic signal optimization tool where traffic counts are simulated in the UI and sent to a backend AI engine for real-time optimization.

## Features

- **Traffic Simulation UI**: Interactive dashboard with sliders for vehicle counts, emergency toggle, time of day, and weather conditions.
- **AI Optimization**: Backend uses Q-Learning to optimize green light timing dynamically.
- **Real-time Metrics**: Displays optimized green times, priority directions, and estimated waiting times.
- **Visualizations**: Bar charts for vehicle counts, pie charts for signal allocation, and line charts for wait time comparisons.

## Tech Stack

- **Frontend**: React.js with Vite, Tailwind CSS, Chart.js, Axios
- **Backend**: Python with FastAPI, Uvicorn, NumPy, Q-Learning implementation

## Project Structure

```
traffic-simulation/
├── backend/
│   ├── main.py          # FastAPI app
│   ├── optimizer.py     # Optimization logic
│   ├── qlearning.py     # Q-Learning agent
│   ├── models.py        # Pydantic models
│   └── requirements.txt # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TrafficDashboard.jsx
│   │   │   ├── SignalLight.jsx
│   │   │   └── MetricsPanel.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## API Usage

### POST /optimize

Optimizes traffic signal timing based on input parameters.

**Request Body:**
```json
{
  "north": 10,
  "south": 20,
  "east": 15,
  "west": 25,
  "emergency": false,
  "time_of_day": "Morning",
  "weather": "Clear"
}
```

**Response:**
```json
{
  "north_south_green": 30,
  "east_west_green": 30,
  "priority_direction": "EW",
  "estimated_wait_time": 4.5,
  "congestion_score": 50.0
}
```

## AI Logic Explanation

The system uses a Q-Learning agent to decide whether to prioritize North-South (NS) or East-West (EW) directions.

- **State**: Discretized vehicle counts for NS and EW (0-10 levels), and emergency flag.
- **Actions**: 0 (prioritize NS), 1 (prioritize EW).
- **Reward**: Negative of the estimated average waiting time.
- **Update**: Q-table is updated after each optimization call.

For emergency situations, the system prioritizes the direction with higher vehicle count.

Weather and time of day affect the cycle time with penalties.

## Example Test Data

- Normal traffic: north=10, south=10, east=10, west=10, emergency=false, time_of_day="Morning", weather="Clear"
- High NS traffic: north=50, south=50, east=10, west=10
- Emergency: north=20, south=20, east=10, west=10, emergency=true
- Bad weather: north=30, south=30, east=20, west=20, weather="Rain"

## Architecture Diagram

```
[Frontend (React)] <---HTTP---> [Backend (FastAPI)]
       |                            |
       | (Axios)                    | (Q-Learning)
       v                            v
[UI Components]              [Optimizer Module]
[Charts & Signals]           [Metrics Calculation]
```

## Future Enhancements

- Multi-intersection support with corridor coordination.
- Advanced Q-Learning with more states and rewards.
- Real-time data integration from sensors.
- Historical data analysis and predictive optimization.

## License

This project is open-source. Feel free to contribute!