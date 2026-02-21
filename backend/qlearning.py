import numpy as np
import random

class QLearningAgent:
    def __init__(self, alpha=0.1, gamma=0.9, epsilon=0.1):
        # States: ns_level (0-10), ew_level (0-10), emergency (0-1)
        self.q_table = np.zeros((11, 11, 2, 2))  # actions: 0=NS, 1=EW
        self.alpha = alpha
        self.gamma = gamma
        self.epsilon = epsilon

    def get_state(self, ns_count, ew_count, emergency):
        ns_level = min(10, ns_count // 10)
        ew_level = min(10, ew_count // 10)
        return (ns_level, ew_level, int(emergency))

    def choose_action(self, state):
        if random.uniform(0, 1) < self.epsilon:
            return random.choice([0, 1])
        return np.argmax(self.q_table[state])

    def update_q(self, state, action, reward, next_state):
        best_next = np.max(self.q_table[next_state])
        self.q_table[state][action] += self.alpha * (reward + self.gamma * best_next - self.q_table[state][action])

# Global agent
agent = QLearningAgent()