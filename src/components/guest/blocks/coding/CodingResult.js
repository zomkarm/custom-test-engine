"use client";

import { useCodingStore } from "@/stores/codingStore";
import { useRouter } from "next/navigation";

export default function CodingResult() {
  const router = useRouter();
  const { results, problems, resetAttempt, clearTest } = useCodingStore();

  // Total number of problems
  const totalProblems = problems.length;

  // Count fully solved problems
  const solvedProblems = problems.filter((problem, index) => {
    const problemResults = results[index];

    if (!problemResults) return false; // Not attempted

    return problemResults.every((r) => r.passed);
  }).length;

  const percentage =
    totalProblems > 0
      ? Math.round((solvedProblems / totalProblems) * 100)
      : 0;

  const getStatusColor = () => {
    if (percentage === 100) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            Coding Test Completed
          </h2>

          <div className={`text-4xl font-bold ${getStatusColor()}`}>
            {percentage}%
          </div>

          <p className="text-gray-600 mt-2">
            Solved {solvedProblems} out of {totalProblems} Problems
          </p>
        </div>

        {/* Detailed Breakdown */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">
            Problem Breakdown
          </h3>

          <div className="space-y-3">
            {problems.map((problem, pIndex) => {
              const problemResults = results[pIndex];

              const isSolved =
                problemResults &&
                problemResults.every((r) => r.passed);

              return (
                <div key={pIndex} className="mb-6">
                  <h4 className="font-semibold mb-3">
                    {problem.title}
                  </h4>

                  <div
                    className={`p-3 rounded-lg border flex justify-between ${
                      !problemResults
                        ? "bg-gray-50 border-gray-200 text-gray-500"
                        : isSolved
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-600"
                    }`}
                  >
                    <span>
                      {!problemResults
                        ? "Not Attempted"
                        : isSolved
                        ? "Solved"
                        : "Not Solved"}
                    </span>

                    <span>
                      {!problemResults
                        ? "-"
                        : `${problemResults.filter(r => r.passed).length} / ${problemResults.length} Passed`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={resetAttempt}
            className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            Retry
          </button>

          <button
            onClick={() => {
              clearTest();
              router.push("/coding");
            }}
            className="w-full py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
          >
            Upload New JSON
          </button>

          <button
            onClick={() => {
              clearTest();
              router.push("/");
            }}
            className="w-full py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}
