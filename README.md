# 🩺 Diabetes Prediction System

A full-stack machine learning application for predicting diabetes risk based on patient health metrics. The system uses a trained machine learning model to provide real-time predictions through a modern web interface.

## 🏗️ Architecture

```
Diabetes/
├── backend/           # FastAPI server with ML model
│   ├── app/          # Application code
│   │   ├── main.py   # FastAPI endpoints
│   │   └── model/    # ML model and prediction logic
│   ├── Data/         # Training dataset
│   ├── notebook.ipynb # Model development & training
│   ├── requirements.txt
│   └── diabetes_prediction_model.pkl
├── frontend/         # Next.js React application
│   ├── app/         # Next.js app directory
│   └── package.json
└── README.md
```

## 🚀 Features

- **Machine Learning Model**: Trained diabetes prediction model using scikit-learn
- **REST API**: FastAPI backend with automatic documentation
- **Modern Frontend**: Next.js 15 with React 19 and Tailwind CSS
- **Real-time Predictions**: Instant diabetes risk assessment
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Mobile-friendly interface

## 📊 Model Details

The machine learning model predicts diabetes risk based on the following features:

- **Gender**: Patient's gender (Male/Female/Other)
- **Age**: Patient's age in years
- **Hypertension**: Binary indicator (0/1)
- **Heart Disease**: Binary indicator (0/1)
- **Smoking History**: Categorical (never, former, current, not current, ever, No Info)
- **BMI**: Body Mass Index
- **HbA1c Level**: Hemoglobin A1c percentage
- **Blood Glucose Level**: Blood glucose concentration

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Python 3.x**: Core programming language
- **scikit-learn**: Machine learning library
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server implementation

### Frontend
- **Next.js 15**: React framework with server-side rendering
- **React 19**: Modern React with latest features
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **pnpm**: Fast, disk space efficient package manager

## 🔧 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 18+
- pnpm (recommended) or npm

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the FastAPI server**
   ```bash
   cd app
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`
   
   **API Documentation**: Visit `http://localhost:8000/docs` for interactive Swagger UI

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## 🌐 API Endpoints

### Base URL
```
http://localhost:8000
```

### Endpoints

#### `GET /`
Health check endpoint
```json
{
  "message": "Hello World"
}
```

#### `POST /predict`
Diabetes prediction endpoint

**Request Body:**
```json
{
  "gender": "Male",
  "age": 45,
  "hypertension": 1,
  "heart_disease": 0,
  "smoking_history": "former",
  "bmi": 28.5,
  "hba1c_level": 6.2,
  "blood_glucose_level": 140.0
}
```

**Response:**
```json
{
  "prediction": [0]  // 0: No diabetes, 1: Diabetes
}
```

## 🧪 Model Development

The machine learning model was developed using Jupyter Notebook (`notebook.ipynb`) with the following process:

1. **Data Exploration**: Analysis of the diabetes dataset
2. **Feature Engineering**: Data preprocessing and feature selection
3. **Model Training**: Training various algorithms and selecting the best performer
4. **Model Evaluation**: Cross-validation and performance metrics
5. **Model Serialization**: Saving the trained model as `diabetes_prediction_model.pkl`

### Dataset
- **File**: `backend/Data/diabetes_prediction_dataset.csv`
- **Size**: ~3.6MB
- **Features**: 8 input features + 1 target variable

## 🐳 Docker Support

A Dockerfile is included in the backend directory for containerized deployment.

```bash
cd backend
docker build -t diabetes-api .
docker run -p 8000:8000 diabetes-api
```

## 📱 Usage Example

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Fill in the patient information form:
   - Select gender
   - Enter age, BMI, HbA1c level, and blood glucose level
   - Select hypertension and heart disease status
   - Choose smoking history
4. Click "Predict" to get the diabetes risk assessment
5. View the prediction result

## 🔮 Future Enhancements

- [ ] User authentication and patient history
- [ ] Data visualization dashboard
- [ ] Model performance monitoring
- [ ] Additional ML models for comparison
- [ ] Mobile application
- [ ] Integration with healthcare systems
- [ ] Batch prediction capabilities
- [ ] Model retraining pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This application is for educational and research purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the API documentation at `http://localhost:8000/docs`
2. Review the console logs for error messages
3. Ensure all dependencies are properly installed
4. Verify that both servers are running on the correct ports

---

**Built with ❤️ using FastAPI, Next.js, and scikit-learn** 