"use client";

import QuestionPanel from "@/components/guest/blocks/QuestionPanel";
import QuestionPalette from "@/components/guest/blocks/QuestionPalette";
import ResultScreen from "@/components/guest/blocks/ResultScreen";
import { useTestStore } from "@/stores/testStore";

export default function MCQLayout() {
  const submitted = useTestStore((state) => state.submitted);

  if (submitted) return <ResultScreen />;

  return (
    <div className="flex min-h-screen">
      <QuestionPalette />
      <QuestionPanel />
    </div>
  );
}
