from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
from pydantic import BaseModel

app = FastAPI(
    title="LendIQ API",
    description="Personal Finance & Credit Health Intelligence Platform",
    version="1.0.0"
)

origins = [ "*"
    # "http://localhost:3000" #Local deployment
    # "https://lend-iq.vercel.app" # Production frontend

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

model = joblib.load("models/xgboost_model.pkl")
# print("Model loaded successfully!")

class CustomerData(BaseModel):
    current_age: int
    per_capita_income: float
    yearly_income: float
    total_debt: float
    num_credit_cards: int
    amount: float
    use_chip: int
    gender_Female: int
    gender_Male: int
    gender_Other: int

@app.post("/predict")
def predict(data: CustomerData):
    features = [[
    data.current_age,
    data.per_capita_income,
    data.yearly_income,
    data.total_debt,
    data.num_credit_cards,
    data.amount,
    data.use_chip,
    data.gender_Female,
    data.gender_Male,
    data.gender_Other
]]

    prediction = model.predict(features)[0]

    if prediction == 1:
        label = "High Risk"
    else:
        label = "Low Risk"

    return {
        "risk_score": int(prediction),
        "risk_label": label
    }

@app.get("/health")
def health():
    return{
        "status": "healthy",
        "message": "LendIQ API is running successfully"
    }