from pydantic import BaseModel

class OptimizeRequest(BaseModel):
    north: int
    south: int
    east: int
    west: int
    emergency: bool
    time_of_day: str
    weather: str

class OptimizeResponse(BaseModel):
    north_south_green: int
    east_west_green: int
    priority_direction: str
    estimated_wait_time: float
    congestion_score: float