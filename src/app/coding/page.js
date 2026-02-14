"use client";

import { useCodingStore } from "@/stores/codingStore";
import CodingUploadBox from "@/components/guest/blocks/coding/CodingUploadBox";
import CodingLayout from "@/components/guest/blocks/coding/CodingLayout";

export default function CodingPage() {
  const problems = useCodingStore((state) => state.problems);

  return (
    <main className="min-h-screen bg-gray-100">
      {problems.length === 0 ? <CodingUploadBox /> : <CodingLayout />}
    </main>
  );
}
