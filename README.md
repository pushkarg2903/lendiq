LendIQ — Personal Finance & Credit Health Intelligence Platform

A full-stack machine learning platform that helps Indian users assess their credit risk and financial health in real time.

Live Demo: lend-iq.vercel.app


Overview

LendIQ is an end-to-end credit risk intelligence platform built on real Indian financial data. Users enter their financial details and instantly receive a risk prediction powered by a trained XGBoost model — along with their risk label and score.

The platform covers the complete data science lifecycle: raw data ingestion, exploratory analysis, feature engineering, model training, REST API deployment, and a production frontend.


Live Architecture

User → Next.js Frontend (Vercel)
           ↓
    FastAPI Backend (Render)
           ↓
    XGBoost Model (.pkl)
           ↓
    Prediction Response


Features


Credit Risk Prediction — XGBoost model predicts loan default risk based on user financial profile
Real-time API — FastAPI backend with Pydantic validation and Swagger documentation
Professional Dashboard — Minimal dark-themed Next.js frontend with instant results
Indian Context — Built on Indian customer financial profiles dataset (20,000 rows)
Production Deployed — Frontend on Vercel, backend on Render



Model Performance

MetricScoreAccuracy99.75%Precision95.12%Recall82.98%ModelXGBoost Classifier


Data leakage was identified and resolved during model evaluation — the target variable was originally derived from features that were also used as inputs. After removing leaking features, the model was retrained on genuine financial indicators, producing robust and defensible metrics.




Tech Stack

LayerTechnologyFrontendNext.js 14, TypeScript, Tailwind CSSBackendFastAPI, Python, UvicornMachine LearningXGBoost, Scikit-learn, Pandas, NumPyDeploymentVercel (frontend), Render (backend)Data AnalysisMatplotlib, Seaborn, Joblib


Project Structure

lendiq/
│
├── backend/
│   ├── main.py                  # FastAPI app, CORS, routes
│   ├── models/
│   │   └── xgboost_model.pkl    # Trained XGBoost model
│   ├── routers/                 # Modular route handlers
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx             # Landing page
│   │   └── predict/
│   │       └── page.tsx         # Prediction form
│   ├── components/
│   │   └── ResultCard.tsx       # Risk result display
│   └── package.json
│
├── notebooks/
│   ├── 01_eda.ipynb             # Exploratory Data Analysis
│   ├── 02_feature_engineering.ipynb
│   └── 03_model_training.ipynb  # Model training & evaluation
│
└── README.md


ML Pipeline

1. Exploratory Data Analysis


Analyzed 20,000 Indian customer financial profiles
Identified correlations: yearly_income vs total_debt (0.42), num_credit_cards vs yearly_income (0.47)
Found credit_score and total_debt negatively correlated (-0.21)


2. Feature Engineering


Created debt_to_income ratio feature
Engineered default_risk target variable based on financial thresholds
One-hot encoded categorical variables (gender, use_chip)
Removed irrelevant identifiers and high-cardinality columns


3. Model Training


Trained Logistic Regression (baseline) and XGBoost
Identified and resolved target leakage — removed features used to derive the target
Final model trained on: yearly_income, total_debt, current_age, num_credit_cards, amount, per_capita_income, use_chip, gender
XGBoost selected as production model based on recall performance



API Reference

Base URL: https://lendiq-backend.onrender.com

POST /predict

Predict credit default risk for a user.

Request Body:

json{
  "current_age": 28,
  "per_capita_income": 450000,
  "yearly_income": 900000,
  "total_debt": 150000,
  "num_credit_cards": 2,
  "amount": 3500,
  "use_chip": 1,
  "gender_Female": 0,
  "gender_Male": 1,
  "gender_Other": 0
}

Response:

json{
  "risk_score": 0,
  "risk_label": "Low Risk"
}

GET /health

json{
  "status": "healthy",
  "message": "LendIQ API is running successfully"
}

Swagger UI: https://lendiq-backend.onrender.com/docs


Local Setup

Backend

bashcd backend
pip install -r requirements.txt
uvicorn main:app --reload

API runs at http://localhost:8000
Swagger UI at http://localhost:8000/docs

Frontend

bashcd frontend
npm install
npm run dev

Frontend runs at http://localhost:3000


Update the API URL in frontend/app/predict/page.tsx to http://localhost:8000 for local development.




Dataset

India Customer Financial Profiles — 20,000 rows, 21 features covering age, income, debt, credit score, transaction history, and demographic data for Indian customers.

Source: Kaggle (India Customer Financial Profiles & Transactions)


Author

Pushkar Garg
B.Tech Computer Science Engineering | Cybersecurity Specialization
Chitkara University

GitHub: @pushkarg2903
