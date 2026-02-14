self.onmessage = function (e) {
  const { code, problem } = e.data;

  try {
    const fn = new Function(
      `${code}; return ${problem.functionName};`
    )();

    const results = problem.testCases.map((test) => {
      const output = fn(...test.input);
      const passed = JSON.stringify(output) === JSON.stringify(test.output);
      return { ...test, userOutput: output, passed };
    });

    self.postMessage({ success: true, results });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
};
