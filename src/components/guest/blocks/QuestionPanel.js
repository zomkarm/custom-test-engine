"use client";

import { useEffect } from "react";
import { useTestStore } from "@/stores/testStore";

export default function QuestionPanel() {
  const {
    questions,
    currentIndex,
    answers,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitTest,
    timeLeft,
    startTimer,
  } = useTestStore();

  const question = questions[currentIndex];

  useEffect(() => {
    startTimer();
  }, []);

  const formatTime = (seconds) => {
    if (seconds == null) return null;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex-1 p-10 bg-white">

      {timeLeft !== null && (
        <div className="text-right text-lg font-semibold text-red-600">
          Time Left: {formatTime(timeLeft)}
        </div>
      )}

      <h3 className="text-lg font-medium mb-2">
        Question {currentIndex + 1} of {questions.length}
      </h3>

      <div className="mt-6">
        <p className="text-xl font-semibold mb-6">
          {question.question}
        </p>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectAnswer(currentIndex, index)}
              className={`w-full text-left p-4 rounded-xl border transition
              ${
                answers[currentIndex] === index
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button
          onClick={prevQuestion}
          className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-500"
        >
          Previous
        </button>

        <div className="flex gap-4">
          <button
            onClick={nextQuestion}
            className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-500"
          >
            Next
          </button>

          <button
            onClick={submitTest}
            className="px-5 py-2 bg-black text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
