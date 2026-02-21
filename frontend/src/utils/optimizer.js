// Q-Learning Agent for traffic optimization
class QLearningAgent {
  constructor(alpha = 0.1, gamma = 0.9, epsilon = 0.1) {
    // States: ns_level (0-10), ew_level (0-10), emergency (0-1)
    this.qTable = Array(11).fill().map(() =>
      Array(11).fill().map(() =>
        Array(2).fill().map(() => [0, 0])
      )
    );
    this.alpha = alpha;
    this.gamma = gamma;
    this.epsilon = epsilon;
  }

  getState(nsCount, ewCount, emergency) {
    const nsLevel = Math.min(10, Math.floor(nsCount / 10));
    const ewLevel = Math.min(10, Math.floor(ewCount / 10));
    return [nsLevel, ewLevel, emergency ? 1 : 0];
  }

  chooseAction(state) {
    if (Math.random() < this.epsilon) {
      return Math.floor(Math.random() * 2);
    }
    const [nsLevel, ewLevel, emergency] = state;
    const qValues = this.qTable[nsLevel][ewLevel][emergency];
    return qValues[0] > qValues[1] ? 0 : 1;
  }

  updateQ(state, action, reward, nextState) {
    const [nsLevel, ewLevel, emergency] = state;
    const [nextNsLevel, nextEwLevel, nextEmergency] = nextState;
    const bestNext = Math.max(...this.qTable[nextNsLevel][nextEwLevel][nextEmergency]);
    this.qTable[nsLevel][ewLevel][emergency][action] +=
      this.alpha * (reward + this.gamma * bestNext - this.qTable[nsLevel][ewLevel][emergency][action]);
  }
}

// Global agent instance
const agent = new QLearningAgent();

function calculateWaitTime(nsCount, ewCount, nsGreen, ewGreen, cycleTime = 60) {
  const nsWait = (ewGreen / cycleTime) * (nsCount * 2);
  const ewWait = (nsGreen / cycleTime) * (ewCount * 2);
  const totalWait = nsWait + ewWait;
  return totalWait / (nsCount + ewCount) || 0;
}

function calculateCongestion(nsCount, ewCount) {
  const maxCount = Math.max(nsCount, ewCount);
  return Math.min(100, maxCount * 2);
}

export function optimizeTraffic(north, south, east, west, emergency, timeOfDay, weather) {
  const nsCount = north + south;
  const ewCount = east + west;
  const total = nsCount + ewCount;

  if (total === 0) {
    return {
      north_south_green: 30,
      east_west_green: 30,
      priority_direction: "NS",
      estimated_wait_time: 0,
      congestion_score: 0
    };
  }

  // Weather penalty
  let weatherPenalty = 1.0;
  if (weather === 'Rain') weatherPenalty = 1.2;
  else if (weather === 'Fog') weatherPenalty = 1.5;

  // Time of day factor
  let timeFactor = 1.0;
  if (timeOfDay === 'Morning' || timeOfDay === 'Evening') timeFactor = 1.1;

  // Get state for Q-learning
  const state = agent.getState(nsCount, ewCount, emergency);

  let nsGreen, ewGreen, priority, action;

  // Emergency handling
  if (emergency) {
    if (nsCount > ewCount) {
      nsGreen = 50;
      ewGreen = 10;
      priority = "NS";
      action = 0;
    } else {
      nsGreen = 10;
      ewGreen = 50;
      priority = "EW";
      action = 1;
    }
  } else {
    // Use Q-learning
    action = agent.chooseAction(state);
    let nsWeight, ewWeight;

    if (action === 0) { // Prioritize NS
      nsWeight = nsCount / total;
      ewWeight = ewCount / total;
    } else { // Prioritize EW
      nsWeight = ewCount / total;
      ewWeight = nsCount / total;
    }

    const cycleTime = 60 * weatherPenalty * timeFactor;
    nsGreen = Math.floor(nsWeight * cycleTime);
    ewGreen = Math.floor(ewWeight * cycleTime);
    priority = action === 0 ? "NS" : "EW";
  }

  // Calculate metrics
  const waitTime = calculateWaitTime(nsCount, ewCount, nsGreen, ewGreen);
  const congestion = calculateCongestion(nsCount, ewCount);

  // Update Q-table
  const reward = -waitTime;
  const nextState = state; // Assume next state is same for simplicity
  agent.updateQ(state, action, reward, nextState);

  return {
    north_south_green: nsGreen,
    east_west_green: ewGreen,
    priority_direction: priority,
    estimated_wait_time: Math.round(waitTime * 100) / 100,
    congestion_score: Math.round(congestion * 100) / 100
  };
}