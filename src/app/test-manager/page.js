"use client";

import { useRouter } from "next/navigation";
import { useTestManagerStore } from "@/stores/testManagerStore";
import { useTestStore } from "@/stores/testStore";

export default function TestManager() {
  const router = useRouter();

  const tests = useTestManagerStore((state) => state.tests);
  const removeTest = useTestManagerStore((state) => state.removeTest);

  const setQuestions = useTestStore((state) => state.setQuestions);
  const setTimer = useTestStore((state) => state.setTimer);
  const clearTest = useTestStore((state) => state.clearTest);
  const setActiveTest = useTestManagerStore((state) => state.setActiveTest);
  const clearAllTests = useTestManagerStore((state) => state.clearAllTests);

  const startTest = (test) => {
    clearTest();

    setActiveTest(test.id);

    setQuestions(test.questions);

    if (test.timerMinutes) {
      setTimer(test.timerMinutes);
    }

    router.push("/mcq");
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          
          <h2 className="text-2xl font-semibold">
            Test Manager
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                clearAllTests();
                router.push("/mcq");
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded-lg"
            >
              Back to Uploads
            </button>

            <button
              onClick={() => {
                clearAllTests();
                router.push("/");
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded-lg"
            >
              Back to Home
            </button>
          </div>

        </div>

        {tests.length === 0 && (
          <p className="text-gray-500 text-sm">
            No tests uploaded.
          </p>
        )}

        <div className="space-y-4">
          {tests.map((test) => (
            <div
              key={test.id}
              className="border p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{test.name}</p>
                <p className="text-xs text-gray-500">
                  {test.questions.length} Questions
                  {test.timerMinutes ? ` • ${test.timerMinutes} min` : ""}
                </p>

                {test.status === "completed" && (
                  <p className="text-xs text-green-600 mt-1">
                    Completed • Score: {test.score} / {test.total}
                  </p>
                )}

                {test.status === "pending" && (
                  <p className="text-xs text-yellow-600 mt-1">
                    Pending
                  </p>
                )}
              </div>


              <div className="flex gap-3">
                <button
                  onClick={() => startTest(test)}
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                >
                  Start
                </button>

                <button
                  onClick={() => removeTest(test.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
