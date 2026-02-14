"use client";

import { useEffect, useState } from "react";
import { useCodingStore } from "@/stores/codingStore";

export default function CodingPanel() {
  const {
    problems,
    currentIndex,
    setCurrentIndex,
    setResults,
    submitTest,
    timeLeft,
    startTimer,
  } = useCodingStore();

  const problem = problems[currentIndex];

  const [code, setCode] = useState("");
  const [executionResult, setExecutionResult] = useState(null);

  useEffect(() => {
    startTimer();
  }, []);

  // Reset editor when problem changes
  useEffect(() => {
    setCode("");
    setExecutionResult(null);
  }, [currentIndex]);

  const runCode = () => {
    const worker = new Worker("/codeWorker.js");

    worker.postMessage({ code, problem });

    worker.onmessage = (e) => {
      if (e.data.success) {
        setExecutionResult(e.data.results);
        setResults(currentIndex, e.data.results);
      } else {
        setExecutionResult([{ error: e.data.error }]);
      }
      worker.terminate();
    };

    setTimeout(() => worker.terminate(), 3000);
  };

  const nextProblem = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevProblem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold">{problem.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Problem {currentIndex + 1} of {problems.length}
            </p>
          </div>

          {timeLeft !== null && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold">
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-2">Problem Statement</h3>
          <div className="bg-gray-50 border rounded-xl p-5 text-gray-800 leading-relaxed whitespace-pre-line">
            {problem.description}
          </div>
        </div>

        {/* Examples */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Examples</h3>
          <div className="space-y-4">
            {problem.testCases.map((tc, index) => (
              <div
                key={index}
                className="bg-gray-50 border rounded-xl p-5 text-sm font-mono"
              >
                <div className="mb-2">
                  <span className="font-semibold">Input:</span>{" "}
                  {JSON.stringify(tc.input)}
                </div>
                <div>
                  <span className="font-semibold">Expected Output:</span>{" "}
                  {JSON.stringify(tc.output)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Function Signature */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Required Function
          </h3>
          <div className="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-xl overflow-x-auto">
            function {problem.functionName}(
            {problem.parameters.join(", ")})
          </div>
        </div>

        {/* Code Editor */}
        <div className="mb-6">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 border rounded-xl p-5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder={`function ${problem.functionName}(${problem.parameters.join(
              ", "
            )}) {\n\n}`}
          />
        </div>

        {/* Navigation + Actions */}
        <div className="flex justify-between items-center mt-8">

          <button
            onClick={prevProblem}
            disabled={currentIndex === 0}
            className={`px-6 py-2 rounded-lg ${
              currentIndex === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>

          <div className="flex gap-4">
            <button
              onClick={runCode}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Run Code
            </button>

            <button
              onClick={nextProblem}
              disabled={currentIndex === problems.length - 1}
              className={`px-6 py-2 rounded-lg ${
                currentIndex === problems.length - 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Next
            </button>

            <button
              onClick={submitTest}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Results */}
        {executionResult && (
          <div className="mt-10">
            <h3 className="text-lg font-medium mb-4">Execution Results</h3>

            <div className="space-y-4">
              {executionResult.map((r, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${
                    r.error
                      ? "bg-red-50 border-red-200 text-red-600"
                      : r.passed
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-yellow-50 border-yellow-200 text-yellow-700"
                  }`}
                >
                  {r.error ? (
                    <p>Error: {r.error}</p>
                  ) : (
                    <p>
                      Test Case {i + 1}:{" "}
                      <span className="font-semibold">
                        {r.passed ? "Passed" : "Failed"}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
