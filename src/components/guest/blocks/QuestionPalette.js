"use client";

import { useTestStore } from "@/stores/testStore";

export default function QuestionPalette() {
  const { questions, answers, setCurrentIndex } = useTestStore();

  return (
    <div className="w-64 bg-gray-900 text-white p-6">
      <h4 className="font-semibold mb-4">Questions</h4>

      <div className="grid grid-cols-4 gap-3">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-10 rounded-lg text-sm
            ${
              answers[index] !== undefined
                ? "bg-green-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
