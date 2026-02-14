import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">
            Custom Test Engine
          </h1>

          <p className="text-gray-600 leading-relaxed">
            A client-side assessment engine for running structured MCQ and
            JavaScript coding tests using custom JSON files. Supports
            navigation, timers, execution sandboxing, and detailed result
            breakdown.
          </p>
        </div>

        {/* Capability Overview */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10 text-sm">
          <div className="bg-gray-50 border rounded-xl p-5">
            <h3 className="font-semibold mb-2">MCQ Module</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• JSON-based question upload</li>
              <li>• Navigation between questions</li>
              <li>• Optional timer</li>
              <li>• Automatic scoring</li>
            </ul>
          </div>

          <div className="bg-gray-50 border rounded-xl p-5">
            <h3 className="font-semibold mb-2">Coding Module</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Browser-based JS execution</li>
              <li>• Structured test cases</li>
              <li>• Per-test-case results</li>
              <li>• Optional timer</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-6">
          <Link href="/mcq" className="flex-1">
            <button className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
              Launch MCQ Test
            </button>
          </Link>

          <Link href="/coding" className="flex-1">
            <button className="w-full py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
              Launch Coding Test
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}
