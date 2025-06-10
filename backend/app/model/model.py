import pickle
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = pickle.load(open(os.path.join(BASE_DIR, "diabetes_prediction_model.pkl"), "rb"))

def diabetes_prediction(data):
    return model.predict(data)
