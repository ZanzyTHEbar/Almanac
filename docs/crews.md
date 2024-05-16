# AI Experts

Creating Agents Cheat Sheet:

- Think like a boss. Work backwards from the goal and think which employees you need to hire to execute the tasks.
- Define the Manager of the crew who orient the other agents toward the goal.
- Define which experts the Manager needs to communicate with and delegate tasks to.

Build a top-down hierarchy of agents. The Manager is the top agent, and the experts are the agents that the Manager communicates with.

## Goal

Goal: Help the user with their garden. The top-level should be able to answer questions about the garden, predict the garden, and recommend the garden given input data.

Captain/Manager/Boss: The top agent that defines the goal and the tasks to be executed.

- Role: Director of Garden Operations
- Expertise: Data Science, Gardening, Farming

Experts/Employees: Agents that are specialized in a specific task.

- Experts:
  - Plant Intelligence Expert
    - Disease Expert
    - Pest Expert
    - Growth Expert
    - Harvest Expert
    - Planting Expert
    - Watering Expert
    - Fertilizing Expert
    - Pruning Expert
    - Propagating Expert
    - Transplanting Expert
    - Permaculture Expert
    - Mono-Cropping Expert
    - Companion Planting Expert
    - Mulching Expert
    - Indoor Farming Expert
      - Hydroponics Expert
      - Aquaponics Expert
      - Aeroponics Expert
      - Vertical Farming Expert
    - Outdoor Farming Expert
      - Greenhouse Expert
      - Crop Rotation Expert
      - Cover Cropping Expert
    - Composting Expert
      - Vermicomposting Expert
      - Bokashi Composting Expert
      - Hot Composting Expert
      - Cold Composting Expert
      - Sheet Composting Expert
      - Trench Composting Expert
      - Pit Composting Expert
  - EnvironmentAnalysisAgent
    - Soil Expert
    - Light Expert
    - Temperature Expert
    - Weather Expert
      - Predict Weather
      - Fetch Weather
      - Recommend Weather
    - Sensor Expert
      - Time Series Data Expert
      - Data Analysis Expert
      - Pattern Recognition Expert
      - Anomaly Detection Expert

## Notes

- Agents should be results driven and have a clear goal in mind
- Role is their job title
- Goals should be actionable and measurable
- Backstory is the agents resume, a templated system prompt.
- Agents should be able to communicate with each other to achieve the goal
