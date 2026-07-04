"use client";
import ResultCard from "@/components/ResultCard";
import { useState } from "react";

export default function PredictPage() {
  const [formData, setFormData] = useState({
    current_age: "",
    per_capita_income: "",
    yearly_income: "",
    total_debt: "",
    num_credit_cards: "",
    amount: "",
    use_chip: "1",
    gender_Female: "0",
    gender_Male: "1",
    gender_Other: "0",
  });

  const [result, setResult] = useState<{
  risk_score: number;
  risk_label: string;
} | null>(null);

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setResult(null);

  try {
  const response = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      current_age: Number(formData.current_age),
      per_capita_income: Number(formData.per_capita_income),
      yearly_income: Number(formData.yearly_income),
      total_debt: Number(formData.total_debt),
      num_credit_cards: Number(formData.num_credit_cards),
      amount: Number(formData.amount),
      use_chip: Number(formData.use_chip),
      gender_Female: Number(formData.gender_Female),
      gender_Male: Number(formData.gender_Male),
      gender_Other: Number(formData.gender_Other),
    }),
  });

  if (!response.ok) {
    throw new Error("Prediction failed.");
  }

  const data = await response.json();

  setResult(data);

  } catch (err) {
    console.error(err);
    setError("Unable to connect to the backend. Please try again.");

  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-zinc-950 text-white flex justify-center py-12 px-6">

      <div className="w-full max-w-2xl">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Credit Risk Prediction
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Current Age
            </label>

            <input
              type="number"
              placeholder="Enter your age"
              value={formData.current_age}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  current_age: e.target.value,
                })
              }
              className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700"
            />
          </div>

          
          
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Per Capita Income
            </label>

            <input
              type="number"
              placeholder="Enter Per Capita Income"
              value={formData.per_capita_income}
              onChange={(e) =>
                setFormData({
                ...formData,
              per_capita_income: e.target.value,
                })
              }
              className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Yearly Income
            </label>
            <input
              type="number"
              placeholder="Enter your Yearly Income"
              value={formData.yearly_income}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  yearly_income: e.target.value,
                })
              }
              className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Total Debt
            </label>
            <input
              type="number"
              placeholder="Enter Total Debt"
              value={formData.total_debt}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  total_debt: e.target.value,
                })
              }
              className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Number of Credit Cards
            </label>
            <input
              type="number"
              placeholder="Enter total number of Credit Cards"
              value={formData.num_credit_cards}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  num_credit_cards: e.target.value,
                })
              }
              className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Transaction Amount
            </label>
            <input
              type="number"
              placeholder="Enter transaction Amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: e.target.value,
                })
              }
              className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Use Chip
            </label>
            <select
              value={formData.use_chip}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  use_chip: e.target.value,
                })
              }
              className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700"
              >         
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Select gender
            </label>
            <select
              value={
                formData.gender_Other === "1"
                  ? "Other"
                  : formData.gender_Male === "1"
                  ? "Male"
                  : "Female"
              }
              onChange={(e) => {
                const value = e.target.value;

                setFormData({
                  ...formData,
                  gender_Female: value === "Female" ? "1" : "0",
                  gender_Male: value === "Male" ? "1" : "0",
                  gender_Other: value === "Other" ? "1" : "0",
                });
              }}
              className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
  type="submit"
  disabled={loading}
  className={`w-full rounded-lg py-4 font-semibold transition ${
    loading
      ? "bg-gray-600 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {loading ? "Predicting..." : "Predict Risk"}
</button>

        </form>
{error && (
  <div className="mt-6 rounded-lg border border-red-500 bg-red-900/30 p-4 text-red-300">
    {error}
  </div>
)}

            {result && (
            <ResultCard
                risk_score={result.risk_score}
                risk_label={result.risk_label}
            />
            )}
      </div>

    </main>
  );
}