type ResultCardProps = {
  risk_score: number;
  risk_label: string;
};

export default function ResultCard({
  risk_score,
  risk_label,
}: ResultCardProps) {
  const isHighRisk = risk_label === "High Risk";

  return (
    <div
      className={`mt-8 rounded-xl p-6 border ${
        isHighRisk
          ? "bg-red-900 border-red-600"
          : "bg-green-900 border-green-600"
      }`}
    >
      <h2 className="text-2xl font-bold mb-2">
        Prediction Result
      </h2>

      <p className="text-lg">
        <strong>Risk Label:</strong> {risk_label}
      </p>

      <p className="text-lg">
        <strong>Risk Score:</strong> {risk_score}
      </p>
    </div>
  );
}