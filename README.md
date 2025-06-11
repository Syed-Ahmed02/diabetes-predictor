# 🩺 Diabetes Risk Assessment System

A modern, full-stack machine learning application that provides real-time diabetes risk assessment through an intuitive web interface. Built with cutting-edge technologies and featuring comprehensive health data analysis with instant visual feedback.

## 🌟 Features

### 🎯 **Real-Time Risk Assessment**
- **Instant predictions** without page reload
- **Color-coded risk indicators** (Low/Moderate/High)
- **Probability breakdown** with visual progress bars
- **Personalized recommendations** based on risk level

### 🎨 **Modern User Interface**
- **Beautiful, responsive design** built with shadcn/ui components
- **Interactive form elements** with sliders, dropdowns, and tooltips
- **Real-time input validation** and helpful error messages
- **Educational tooltips** explaining medical terms and normal ranges
- **Gradient backgrounds** and smooth animations

### 🧠 **Advanced Machine Learning**
- **Trained ML model** using scikit-learn on 100,000+ patient records
- **Proper feature scaling** using training dataset statistics
- **Multi-feature analysis** including demographics, medical history, and lab values
- **Confidence scoring** with detailed probability breakdowns

## 🏗️ Architecture

```
Diabetes/
├── backend/                    # FastAPI server with ML model
│   ├── app/
│   │   ├── main.py            # FastAPI endpoints with CORS
│   │   └── model/
│   │       └── model.py       # ML model with preprocessing pipeline
│   ├── Data/
│   │   └── diabetes_prediction_dataset.csv  # 100K patient records
│   ├── notebook.ipynb         # Model development & training
│   ├── requirements.txt       # Python dependencies
│   └── diabetes_prediction_model.pkl        # Trained model
├── frontend/                  # Next.js 15 with shadcn/ui
│   ├── app/
│   │   ├── page.tsx          # Main diabetes assessment page
│   │   ├── layout.tsx        # App layout
│   │   └── globals.css       # Global styles
│   ├── components/ui/        # shadcn/ui components
│   └── package.json
└── README.md
```

## 🔬 Machine Learning Model

### Input Features
The model analyzes **8 key health indicators**:

| Feature | Type | Description | Normal Range |
|---------|------|-------------|--------------|
| **Gender** | Categorical | Male/Female/Other | - |
| **Age** | Numerical | Patient age in years | Any |
| **Hypertension** | Binary | High blood pressure (>140/90 mmHg) | No |
| **Heart Disease** | Binary | Any diagnosed cardiovascular disease | No |
| **Smoking History** | Categorical | never/former/current/not current/ever/No Info | Never |
| **BMI** | Numerical | Body Mass Index (kg/m²) | 18.5-24.9 |
| **HbA1c Level** | Numerical | Average blood sugar over 2-3 months (%) | <5.7% |
| **Blood Glucose** | Numerical | Fasting glucose level (mg/dL) | 70-100 |

### Model Performance
- **Dataset**: 100,000 patient records
- **Algorithm**: Logistic Regression with feature scaling
- **Preprocessing**: Z-score normalization using training statistics
- **Features**: 13 total features (including one-hot encoded smoking history)

### Feature Scaling Statistics
```python
FEATURE_STATS = {
    'age': {'mean': 41.89, 'std': 22.52},
    'bmi': {'mean': 27.32, 'std': 6.64},
    'HbA1c_level': {'mean': 5.53, 'std': 1.07},
    'blood_glucose_level': {'mean': 138.06, 'std': 40.71}
}
```

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern, fast web framework with automatic documentation
- **Python 3.13** - Latest Python with enhanced performance
- **scikit-learn** - Machine learning library for model training and prediction
- **Pandas & NumPy** - Data manipulation and numerical computing
- **Pydantic** - Data validation with Python type annotations
- **Uvicorn** - Lightning-fast ASGI server
- **CORS Middleware** - Cross-origin resource sharing for frontend integration

### Frontend
- **Next.js 15** - React framework with App Router and Turbopack
- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **shadcn/ui** - High-quality, accessible UI components
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **pnpm** - Fast, efficient package manager

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ 
- Node.js 18+
- pnpm (recommended) or npm

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Backend running at**: `http://localhost:8000`  
**API Documentation**: `http://localhost:8000/docs`

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

**Frontend running at**: `http://localhost:3000`

## 🌐 API Reference

### Base URL
```
http://localhost:8000
```

### Endpoints

#### `GET /` - Health Check
```json
{
  "message": "Hello World"
}
```

#### `POST /predict` - Diabetes Risk Prediction

**Request:**
```json
{
  "gender": "Female",
  "age": 45,
  "hypertension": "No",
  "heart_disease": "No", 
  "smoking_history": "never",
  "bmi": 27.5,
  "HbA1c_level": 6.1,
  "blood_glucose_level": 120
}
```

**Response:**
```json
{
  "prediction": 0,
  "probability": {
    "no_diabetes": 0.73,
    "diabetes": 0.27
  },
  "risk_level": "Low"
}
```

## 🎨 User Interface Features

### Form Components
- **Interactive sliders** with real-time value updates
- **Dropdown selects** for categorical data
- **Input validation** with helpful error messages
- **BMI category badges** (Underweight/Normal/Overweight/Obese)
- **Tooltips with medical explanations**

### Results Display
- **Risk level badges** with color coding:
  - 🟢 **Low Risk** (< 30% diabetes probability)
  - 🟡 **Moderate Risk** (30-70% diabetes probability) 
  - 🔴 **High Risk** (> 70% diabetes probability)
- **Probability breakdown** with animated progress bars
- **Personalized recommendations** based on risk level
- **Medical disclaimer** for responsible use

### Design Features
- **Responsive layout** works on desktop and mobile
- **Gradient backgrounds** for modern aesthetics
- **Shadow effects** and smooth transitions
- **Icon integration** using Lucide React
- **Accessible components** following WCAG guidelines

## 🧪 Testing the System

### Low Risk Profile
```
Gender: Female
Age: 25
Hypertension: No
Heart Disease: No
Smoking: Never
BMI: 22.0
HbA1c: 5.0%
Blood Glucose: 85 mg/dL
```

### High Risk Profile
```
Gender: Male
Age: 60
Hypertension: Yes
Heart Disease: Yes
Smoking: Current
BMI: 35.0
HbA1c: 8.5%
Blood Glucose: 180 mg/dL
```

## 🔧 Development Notes

### Preprocessing Pipeline
The system uses a sophisticated preprocessing pipeline:

1. **Binary encoding** for gender and Yes/No fields
2. **One-hot encoding** for smoking history categories
3. **Z-score normalization** for continuous features using training statistics
4. **Feature validation** ensuring all required fields are present

### CORS Configuration
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

## 🐳 Docker Deployment

```bash
# Build and run backend
cd backend
docker build -t diabetes-api .
docker run -p 8000:8000 diabetes-api
```

## 🔮 Future Enhancements

- [ ] **User Authentication** - Patient login and history tracking
- [ ] **Data Visualization** - Charts showing risk factors over time
- [ ] **Batch Processing** - Upload CSV for multiple predictions
- [ ] **Model Comparison** - A/B testing different algorithms
- [ ] **Mobile App** - React Native implementation
- [ ] **EMR Integration** - Electronic Medical Record connectivity
- [ ] **Multilingual Support** - Internationalization
- [ ] **Advanced Analytics** - Population health insights

## ⚠️ Important Disclaimers

> **Medical Disclaimer**: This application is for educational and research purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.

> **Data Privacy**: This demo version processes data client-side and doesn't store personal health information. In production, ensure HIPAA compliance and proper data encryption.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**CORS Errors**
- Ensure backend CORS is configured for `localhost:3000`
- Check that both servers are running

**Prediction Always Returns Same Result**
- Verify feature scaling is working correctly
- Check that all form fields are being sent to API

**UI Components Not Loading**
- Ensure shadcn/ui components are properly installed
- Check import paths in `page.tsx`

**Model Loading Errors**
- Verify `diabetes_prediction_model.pkl` exists in backend root
- Check Python dependencies are installed

### Getting Help

1. Check the API documentation at `http://localhost:8000/docs`
2. Review browser console for frontend errors
3. Check backend terminal for Python errors
4. Ensure all dependencies are correctly installed

---

**Built with ❤️ using FastAPI, Next.js 15, shadcn/ui, and scikit-learn** 