import pickle
import os
import pandas as pd
import numpy as np

# Get the path to the backend directory (two levels up from this file)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, "diabetes_prediction_model.pkl")

# Training data statistics for proper scaling
FEATURE_STATS = {
    'age': {'mean': 41.89, 'std': 22.52},
    'bmi': {'mean': 27.32, 'std': 6.64},
    'HbA1c_level': {'mean': 5.53, 'std': 1.07},
    'blood_glucose_level': {'mean': 138.06, 'std': 40.71}
}

def normalize_features(df, feature_stats):
    """Apply normalization using training data statistics"""
    df_normalized = df.copy()
    for feature, stats in feature_stats.items():
        if feature in df_normalized.columns:
            df_normalized[feature] = (df_normalized[feature] - stats['mean']) / stats['std']
    return df_normalized

# Load the model
model = pickle.load(open(MODEL_PATH, "rb"))

def diabetes_prediction(data):
  
    data_dict = data.dict()
    
    gender_encoded = 1 if data_dict['gender'] == 'Male' else 0
    
    heart_disease_encoded = 1 if data_dict['heart_disease'] == 'Yes' else 0 

    hypertension_encoded = 1 if data_dict['hypertension'] == 'Yes' else 0
    smoking_features = {
        'smoke_No Info': 0,
        'smoke_current': 0,
        'smoke_ever': 0,
        'smoke_former': 0,
        'smoke_never': 0,
        'smoke_not current': 0
    }
    
    smoking_value = data_dict['smoking_history']
    
    if hasattr(smoking_value, 'value'):
        smoking_value = smoking_value.value
    
    smoking_key = f'smoke_{smoking_value}'
    
    if smoking_key in smoking_features:
        smoking_features[smoking_key] = 1
   
    
    feature_data = {
        'gender': gender_encoded,
        'age': data_dict['age'],
        'hypertension': hypertension_encoded,
        'heart_disease': heart_disease_encoded,
        'bmi': data_dict['bmi'],
        'HbA1c_level': data_dict['HbA1c_level'],
        'blood_glucose_level': data_dict['blood_glucose_level'],
        **smoking_features 
    }
    
    df = pd.DataFrame([feature_data])
    
    # Apply proper normalization using training statistics
    df_normalized = normalize_features(df, FEATURE_STATS)
   
    prediction_proba = model.predict_proba(df_normalized)[0]
    prediction = model.predict(df_normalized)[0]
    
    
    result = {
        "prediction": int(prediction),
        "probability": {
            "no_diabetes": float(prediction_proba[0]),
            "diabetes": float(prediction_proba[1])
        },
        "risk_level": "High" if prediction_proba[1] > 0.7 else "Moderate" if prediction_proba[1] > 0.3 else "Low"
    }
    
    return result
