"use client";

import { useState } from "react";
import { useTestStore } from "@/stores/testStore";

export default function UploadBox() {
  const setQuestions = useTestStore((state) => state.setQuestions);
  const setTimer = useTestStore((state) => state.setTimer);

  const [showFormat, setShowFormat] = useState(false);
  const [error, setError] = useState("");
  const [minutes, setMinutes] = useState("");

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);

        if (!Array.isArray(parsed)) {
          setError("Invalid format: Root must be an array.");
          return;
        }

        for (let q of parsed) {
          if (
            typeof q.id === "undefined" ||
            typeof q.question !== "string" ||
            !Array.isArray(q.options) ||
            typeof q.answer !== "number"
          ) {
            setError("Invalid question schema detected.");
            return;
          }
        }

        setError("");

        if (minutes) {
          setTimer(Number(minutes));
        }

        setQuestions(parsed);
      } catch {
        setError("Invalid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl">

        <h2 className="text-2xl font-semibold mb-3">
          Upload MCQ Test File
        </h2>

        <div className="mb-4">
          <label className="text-sm text-gray-600">
            Optional Timer (minutes)
          </label>
          <input
            type="number"
            min="1"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-full border p-3 rounded-lg mt-1"
            placeholder="e.g. 10"
          />
        </div>

        <input
          type="file"
          accept="application/json"
          onChange={handleFile}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <button
          onClick={() => setShowFormat(!showFormat)}
          className="text-xs bg-gray-900 rounded-md p-2 text-white hover:bg-gray-700"
        >
          {showFormat ? "Hide Format Example" : "View Required Format"}
        </button>

                {showFormat && (
          <div className="bg-gray-900 text-gray-100 mt-2 text-xs rounded-xl p-5 overflow-x-auto">
            <pre>
{`[
  {
    "id": 1,
    "question": "Which hook is used for side effects in React?",
    "options": [
      "useState",
      "useEffect",
      "useMemo",
      "useReducer"
    ],
    "answer": 2
  },
  {
    "id": 2,
    "question": "Which HTTP status code means Created?",
    "options": [
      "200",
      "201",
      "400",
      "404"
    ],
    "answer": 2
  }
]`}
            </pre>

            <div className="mt-4 text-gray-400 text-xs space-y-1">
              <p>• Root must be an array.</p>
              <p>• Each object must contain: id, question, options, answer.</p>
              <p>• options must be an array of strings.</p>
              <p>• answer must be 1-based index (e.g., 2 = second option).</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
