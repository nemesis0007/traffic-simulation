from qlearning import agent
import numpy as np

def calculate_wait_time(ns_count, ew_count, ns_green, ew_green, cycle_time=60):
    # Simple calculation: wait time proportional to opposite green time
    ns_wait = (ew_green / cycle_time) * (ns_count * 2)  # average wait
    ew_wait = (ns_green / cycle_time) * (ew_count * 2)
    total_wait = ns_wait + ew_wait
    avg_wait = total_wait / (ns_count + ew_count) if ns_count + ew_count > 0 else 0
    return avg_wait

def calculate_congestion(ns_count, ew_count):
    # Simple score based on max count
    max_count = max(ns_count, ew_count)
    return min(100, max_count * 2)  # scale to 0-100

def optimize_traffic(north, south, east, west, emergency, time_of_day, weather):
    ns_count = north + south
    ew_count = east + west
    total = ns_count + ew_count

    if total == 0:
        return {
            "north_south_green": 30,
            "east_west_green": 30,
            "priority_direction": "NS",
            "estimated_wait_time": 0,
            "congestion_score": 0
        }

    # Weather penalty
    weather_penalty = 1.0
    if weather == 'Rain':
        weather_penalty = 1.2
    elif weather == 'Fog':
        weather_penalty = 1.5

    # Time of day factor
    time_factor = 1.0
    if time_of_day in ['Morning', 'Evening']:
        time_factor = 1.1

    # Get state for Q-learning
    state = agent.get_state(ns_count, ew_count, emergency)

    # Emergency
    if emergency:
        if ns_count > ew_count:
            ns_green = 50
            ew_green = 10
            priority = "NS"
            action = 0  # NS priority
        else:
            ns_green = 10
            ew_green = 50
            priority = "EW"
            action = 1  # EW priority
    else:
        # Use Q-learning
        action = agent.choose_action(state)
        if action == 0:  # Prioritize NS
            ns_weight = ns_count / total
            ew_weight = ew_count / total
        else:
            ns_weight = ew_count / total  # Swap for EW priority
            ew_weight = ns_count / total

        cycle_time = 60 * weather_penalty * time_factor
        ns_green = int(ns_weight * cycle_time)
        ew_green = int(ew_weight * cycle_time)
        priority = "NS" if action == 0 else "EW"

    # Calculate metrics
    wait_time = calculate_wait_time(ns_count, ew_count, ns_green, ew_green)
    congestion = calculate_congestion(ns_count, ew_count)

    # Update Q-table
    reward = -wait_time
    # Assume next state is same for simplicity
    next_state = state
    agent.update_q(state, action, reward, next_state)

    return {
        "north_south_green": ns_green,
        "east_west_green": ew_green,
        "priority_direction": priority,
        "estimated_wait_time": wait_time,
        "congestion_score": congestion
    }