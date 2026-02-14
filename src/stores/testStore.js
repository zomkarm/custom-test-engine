import { create } from "zustand";

export const useTestStore = create((set, get) => ({
  questions: [],
  answers: {},
  currentIndex: 0,
  submitted: false,

  // TIMER STATE
  timerDuration: null,   // seconds
  timeLeft: null,
  timerInterval: null,

  setQuestions: (data) =>
    set({
      questions: data.map((q) => ({
        ...q,
        answer: q.answer - 1, // convert to 0-based
      })),
      answers: {},
      currentIndex: 0,
      submitted: false,
    }),

  // TIMER SETUP (optional)
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

  selectAnswer: (questionIndex, optionIndex) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionIndex]: optionIndex,
      },
    })),

  setCurrentIndex: (index) => set({ currentIndex: index }),

  nextQuestion: () =>
    set((state) => ({
      currentIndex:
        state.currentIndex < state.questions.length - 1
          ? state.currentIndex + 1
          : state.currentIndex,
    })),

  prevQuestion: () =>
    set((state) => ({
      currentIndex:
        state.currentIndex > 0
          ? state.currentIndex - 1
          : state.currentIndex,
    })),

  submitTest: () => {
    get().stopTimer();
    set({ submitted: true });
  },

  calculateScore: () => {
    const { questions, answers } = get();
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });
    return score;
  },

  resetAttempt: () => {
    get().stopTimer();
    set((state) => ({
      answers: {},
      currentIndex: 0,
      submitted: false,
      timeLeft: state.timerDuration,
    }));
  },

  clearTest: () => {
    get().stopTimer();
    set({
      questions: [],
      answers: {},
      currentIndex: 0,
      submitted: false,
      timerDuration: null,
      timeLeft: null,
    });
  },
}));
