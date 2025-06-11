import fastapi
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from enum import Enum
from .model.model import diabetes_prediction
import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

class Gender(str, Enum):
    Male = "Male"
    Female = "Female"
    Other = "Other"

    
class SmokingHistory(str, Enum):
    No_Info = "No Info"
    never = "never"
    former = "former"
    current = "current"
    not_current = "not current"
    ever = "ever"

class HeartDisease(str, Enum):
    No = "No"
    Yes = "Yes"
class Hypertension(str, Enum):
    No = "No"
    Yes = "Yes"
class DiabetesPredictionRequest(BaseModel):
    gender: Gender
    age: int
    hypertension: Hypertension
    heart_disease: HeartDisease
    smoking_history: SmokingHistory
    bmi: float
    HbA1c_level: float
    blood_glucose_level: float

app = fastapi.FastAPI()

# Get frontend URL from environment variable with fallback
frontend_url = os.getenv("FRONTEND_URL")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        frontend_url,
    ],  
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/predict")
def predict(data: DiabetesPredictionRequest):
    return diabetes_prediction(data)