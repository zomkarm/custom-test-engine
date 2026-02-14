self.fetch = undefined;
self.XMLHttpRequest = undefined;
self.WebSocket = undefined;
self.EventSource = undefined;
self.importScripts = undefined;
self.navigator = undefined;

self.onmessage = function (e) {
  const { code, problem } = e.data;

  try {
    const fn = new Function(
      `"use strict"; ${code}; return ${problem.functionName};`
    )();

    const start = Date.now();

    const results = problem.testCases.map((test) => {
      if (Date.now() - start > 2000) {
        throw new Error("Execution time limit exceeded");
      }

      const output = fn(...test.input);
      const passed =
        JSON.stringify(output) === JSON.stringify(test.output);

      return { ...test, userOutput: output, passed };
    });

    self.postMessage({ success: true, results });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
};
