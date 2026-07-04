import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">

        <h1 className="text-6xl font-bold mb-6">
          LendIQ
        </h1>

        <p className="text-xl text-gray-400 mb-4">
          Personal Finance & Credit Health Intelligence Platform
        </p>

        <p className="text-gray-500 mb-10">
          Analyze your financial profile using Machine Learning
          and receive an instant credit risk assessment.
        </p>

        <Link
          href="/predict"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl text-lg font-semibold"
        >
          Check Your Risk
        </Link>

      </div>
    </main>
  );
}