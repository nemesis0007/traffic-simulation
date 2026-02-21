from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import OptimizeRequest, OptimizeResponse
from optimizer import optimize_traffic

app = FastAPI(title="SATCP Backend", description="Smart Adaptive Traffic Coordination Platform API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177", "http://localhost:5178", "*"],  # Allow Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/optimize", response_model=OptimizeResponse)
async def optimize(request: OptimizeRequest):
    result = optimize_traffic(
        request.north, request.south, request.east, request.west,
        request.emergency, request.time_of_day, request.weather
    )
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)