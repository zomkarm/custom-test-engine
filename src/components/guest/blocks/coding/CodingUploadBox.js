"use client";

import { useState } from "react";
import { useCodingStore } from "@/stores/codingStore";

export default function CodingUploadBox() {
  const setProblems = useCodingStore((s) => s.setProblems);
  const setTimer = useCodingStore((s) => s.setTimer);

  const [minutes, setMinutes] = useState("");
  const [error, setError] = useState("");
  const [showFormat, setShowFormat] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!Array.isArray(parsed)) {
          setError("Root must be array");
          return;
        }

        if (minutes) setTimer(Number(minutes));

        setProblems(parsed);
        setError("");
      } catch {
        setError("Invalid JSON");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-xl">

        <h2 className="text-2xl font-semibold mb-4">
          Upload Coding Test File
        </h2>

        <input
          type="number"
          min="1"
          placeholder="Optional Timer (minutes)"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="file"
          accept="application/json"
          onChange={handleFile}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {error && <div className="text-red-600 text-sm">{error}</div>}

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
    "title": "Sum of Two Numbers",
    "description": "Return sum of two numbers.",
    "functionName": "solve",
    "parameters": ["a", "b"],
    "testCases": [
      { "input": [2, 3], "output": 5 },
      { "input": [10, 5], "output": 15 }
    ]
  }
]
`}
            </pre>

            <div className="mt-4 text-gray-400 text-xs space-y-1">
              <p>• Root must be an array.</p>
              <p>• Each object must contain: id, title, description, functionName,parameters,testCases.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
