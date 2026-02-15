"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTestStore } from "@/stores/testStore";
import { useTestManagerStore } from "@/stores/testManagerStore";

export default function ResultScreen() {
  const router = useRouter();

  const {
    questions,
    answers,
    resetAttempt,
    clearTest,
    calculateScore
  } = useTestStore();

  const tests = useTestManagerStore((state) => state.tests);
  const clearAllTests = useTestManagerStore((state) => state.clearAllTests);

  const activeTestId = useTestManagerStore((state) => state.activeTestId);
  const markCompleted = useTestManagerStore((state) => state.markCompleted);

  const isBatchMode = tests.length > 0;

  const score = calculateScore();
  const total = questions.length;
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);

  let performanceLabel = "Needs Improvement";
  let performanceColor = "text-red-500";

  if (percentage >= 80) {
    performanceLabel = "Excellent";
    performanceColor = "text-green-600";
  } else if (percentage >= 50) {
    performanceLabel = "Good";
    performanceColor = "text-yellow-600";
  }

  const attempted = Object.keys(answers).length;
  const unattempted = total - attempted;

  useEffect(() => {
    if (activeTestId) {
      markCompleted(activeTestId, score);
    }
  }, []);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-10">

        <h2 className="text-3xl font-bold text-center mb-6">
          Test Completed
        </h2>

        {/* Score Section */}
        <div className="text-center mb-8">
          <div className="text-5xl font-bold mb-2">
            {percentage}%
          </div>

          <p className={`text-lg font-medium ${performanceColor}`}>
            {performanceLabel}
          </p>

          <p className="text-gray-600 mt-2">
            Score: {score} / {total}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
          <div
            className="bg-black h-4 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
          <div className="bg-gray-100 p-4 rounded-xl text-center">
            <p className="font-semibold">{attempted}</p>
            <p className="text-gray-600">Attempted</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl text-center">
            <p className="font-semibold">{unattempted}</p>
            <p className="text-gray-600">Unattempted</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">

          <button
            onClick={() => {
              resetAttempt();
            }}
            className="w-full py-3 bg-gray-800 text-white rounded-xl hover:bg-black transition"
          >
            Retake Test
          </button>

          {isBatchMode && (
            <button
              onClick={() => {
                clearTest();
                router.push("/test-manager");
              }}
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Back to Test Manager
            </button>
          )}

          <button
            onClick={() => {
              clearTest();
              clearAllTests();
              router.push("/mcq");
            }}
            className="w-full py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
          >
            Upload New JSON
          </button>

          <button
            onClick={() => {
              clearTest();
              clearAllTests();
              router.push("/");
            }}
            className="w-full py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
          >
            Back to Home
          </button>

        </div>

      </div>
    </div>
  );
}
