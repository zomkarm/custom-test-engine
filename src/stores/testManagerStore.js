import { create } from "zustand";

export const useTestManagerStore = create((set, get) => ({
  tests: [], // [{ id, name, questions, timerMinutes, status, score, total }]
  activeTestId: null,

  addTest: (test) =>
    set((state) => ({
      tests: [
        ...state.tests,
        {
          ...test,
          status: "pending",
          score: null,
          total: test.questions.length,
        },
      ],
    })),

  removeTest: (id) =>
    set((state) => ({
      tests: state.tests.filter((t) => t.id !== id),
    })),

  setActiveTest: (id) => set({ activeTestId: id }),

  markCompleted: (id, score) =>
    set((state) => ({
      tests: state.tests.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "completed",
              score,
            }
          : t
      ),
    })),

  clearAllTests: () => set({ tests: [], activeTestId: null }),
}));
