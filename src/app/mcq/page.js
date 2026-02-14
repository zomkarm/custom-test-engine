"use client";

import { useTestStore } from "@/stores/testStore";
import UploadBox from "@/components/guest/blocks/UploadBox";
import MCQLayout from "@/components/guest/blocks/MCQLayout";

export default function MCQPage() {
  const questions = useTestStore((state) => state.questions);

  return (
    <main className="min-h-screen bg-gray-100">
      {questions.length === 0 ? <UploadBox /> : <MCQLayout />}
    </main>
  );
}
