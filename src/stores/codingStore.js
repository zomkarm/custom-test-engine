import { create } from "zustand";

export const useCodingStore = create((set, get) => ({
  problems: [],
  currentIndex: 0,
  submitted: false,
  results: {},

  // TIMER
  timerDuration: null,
  timeLeft: null,
  timerInterval: null,

  setProblems: (data) =>
    set({
      problems: data,
      currentIndex: 0,
      submitted: false,
      results: [],
    }),

  setTimer: (minutes) => {
    if (!minutes || minutes <= 0) {
      set({ timerDuration: null, timeLeft: null });
      return;
    }

    const seconds = minutes * 60;
    set({ timerDuration: seconds, timeLeft: seconds });
  },

  startTimer: () => {
    const { timerDuration, timerInterval } = get();
    if (!timerDuration || timerInterval) return;

    const interval = setInterval(() => {
      const { timeLeft, submitTest } = get();

      if (timeLeft <= 1) {
        clearInterval(interval);
        set({ timeLeft: 0, timerInterval: null });
        submitTest();
      } else {
        set({ timeLeft: timeLeft - 1 });
      }
    }, 1000);

    set({ timerInterval: interval });
  },

  stopTimer: () => {
    const { timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval);
    set({ timerInterval: null });
  },

  setCurrentIndex: (index) => set({ currentIndex: index }),

  setResults: (problemIndex, results) =>
    set((state) => ({
      results: {
        ...state.results,
        [problemIndex]: results,
      },
    })),


  submitTest: () => {
    get().stopTimer();
    set({ submitted: true });
  },

  resetAttempt: () => {
    get().stopTimer();
    set((state) => ({
      submitted: false,
      results: [],
      timeLeft: state.timerDuration,
    }));
  },

  clearTest: () => {
    get().stopTimer();
    set({
      problems: [],
      currentIndex: 0,
      submitted: false,
      results: [],
      timerDuration: null,
      timeLeft: null,
    });
  },
}));
