import fastapi
from pydantic import BaseModel
from model.model import diabetes_prediction

class Gender(str, Enum):
    Female = "Female"
    Male = "Male"
    Other = "Other"

    ###GENDER Distribution:
    
class SmokingHistory(str, Enum):
    No_Info = "No Info"
    never = "never"
    former = "former"
    current = "current"
    not_current = "not current"
    ever = "ever"

class DiabetesPredictionRequest(BaseModel):
    gender: str
    age: int
    hypertension: int
    heart_disease: int
    smoking_history: str
    bmi: float
    hba1c_level: float
    blood_glucose_level: float

app = fastapi.FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/predict")
def predict(data: DiabetesPredictionRequest):
    return {"prediction": diabetes_prediction(data)}