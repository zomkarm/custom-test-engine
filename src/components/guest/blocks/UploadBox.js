"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTestStore } from "@/stores/testStore";
import { useTestManagerStore } from "@/stores/testManagerStore";

export default function UploadBox() {
  const router = useRouter();

  const setQuestions = useTestStore((state) => state.setQuestions);
  const setTimer = useTestStore((state) => state.setTimer);
  const clearTest = useTestStore((state) => state.clearTest);

  const addTest = useTestManagerStore((state) => state.addTest);
  const clearAllTests = useTestManagerStore((state) => state.clearAllTests);

  const [showFormat, setShowFormat] = useState(false);
  const [error, setError] = useState("");
  const [minutes, setMinutes] = useState("");
  const [uploadType, setUploadType] = useState("single");

  const validateQuestions = (parsed) => {
    if (!Array.isArray(parsed)) {
      return "Invalid format: Root must be an array.";
    }

    for (let q of parsed) {
      if (
        typeof q.id === "undefined" ||
        typeof q.question !== "string" ||
        !Array.isArray(q.options) ||
        typeof q.answer !== "number"
      ) {
        return "Invalid question schema detected.";
      }
    }

    return null;
  };

  const handleFile = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setError("");

    // SINGLE MODE
    if (uploadType === "single") {
      if (files.length > 1) {
        setError("Single mode allows only one file.");
        return;
      }

      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);

          const validationError = validateQuestions(parsed);
          if (validationError) {
            setError(validationError);
            return;
          }

          clearAllTests();
          clearTest();

          if (minutes) {
            setTimer(Number(minutes));
          }

          setQuestions(parsed);
          router.push("/mcq");
        } catch {
          setError("Invalid JSON file.");
        }
      };

      reader.readAsText(file);
    }

    // MULTIPLE MODE
    if (uploadType === "multiple") {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const parsed = JSON.parse(e.target.result);

            const validationError = validateQuestions(parsed);
            if (validationError) {
              setError(`Error in ${file.name}: ${validationError}`);
              return;
            }

            addTest({
              id: crypto.randomUUID(),
              name: file.name,
              questions: parsed,
              timerMinutes: minutes ? Number(minutes) : null,
            });
          } catch {
            setError(`Invalid JSON in ${file.name}`);
          }
        };

        reader.readAsText(file);
      });

      router.push("/test-manager");
    }

    // Reset file input so same file can be reselected
    event.target.value = "";
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

        <div className="mb-4">
          <label className="text-sm text-gray-600">
            Select Test Upload Type :
          </label>
          <select
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value)}
            className="w-full border p-3 rounded-lg mt-1"
          >
            <option value="single">Single Test</option>
            <option value="multiple">Multiple Tests</option>
          </select>
        </div>

        <input
          type="file"
          accept="application/json"
          multiple={uploadType === "multiple"}
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
{`Single Test:
[
  {
    "id": 1,
    "question": "Which hook is used for side effects in React?",
    "options": ["useState", "useEffect", "useMemo", "useReducer"],
    "answer": 1
  },
  {
    "id": 2,
    "question": "Which HTTP status code means Created?",
    "options": ["200", "201", "400", "404"],
    "answer": 1
  }
]


Multiple Tests:
- Select multiple JSON files at once.
- Each file must follow single test format.`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
