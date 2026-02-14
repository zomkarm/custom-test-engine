"use client";

import { useCodingStore } from "@/stores/codingStore";
import CodingPanel from "./CodingPanel";
import CodingResult from "./CodingResult";

export default function CodingLayout() {
  const submitted = useCodingStore((s) => s.submitted);

  if (submitted) return <CodingResult />;

  return (
    <div className="flex min-h-screen">
      <CodingPanel />
    </div>
  );
}
