# Custom Test Engine

Custom Test Engine is a client-side assessment platform for running structured MCQ and JavaScript coding tests using configurable JSON files.

The application simulates a controlled test environment with navigation, optional timers, automatic scoring, and in-browser code execution.

---

## Overview

This project provides two independent assessment modules:

### 1. MCQ Module
- JSON-based question upload
- Question navigation
- Optional timer support
- Automatic scoring
- Result summary

### 2. Coding Module
- Structured problem definitions
- Function-based problem format
- Input / Output test cases
- In-browser JavaScript execution
- Per-test-case validation
- Execution result breakdown

All logic runs entirely on the client. No backend required.

---

## MCQ JSON Format

Example structure:

```json
[
  {
    "id": 1,
    "question": "Which hook is used for side effects in React?",
    "options": ["useState", "useEffect", "useMemo", "useReducer"],
    "answer": 1
  },
  {
    "id": 2,
    "question": "Which HTTP status code means Created?",
    "options": ["200", "201", "400", "404"],
    "answer": 1
  }
]
```

### Required Fields

* `id` (number)
* `question` (string)
* `options` (array of strings)
* `answer` (number → 0-based index of correct option)

Optional (if extended later):

* `explanation`
* `difficulty`
* `category`

---

## Coding JSON Format

Example structure:

```json
[
  {
    "id": 1,
    "title": "Sum of Two Numbers",
    "description": "Return sum of two numbers.",
    "functionName": "solve",
    "parameters": ["a", "b"],
    "testCases": [
      { "input": [2, 3], "output": 5 },
      { "input": [10, 5], "output": 15 }
    ]
  }
]
```

### Required Fields

* `id` (number)
* `title` (string)
* `description` (string)
* `functionName` (string)
* `parameters` (array of strings)
* `testCases` (array of objects with `input` and `output`)

---

## Tech Stack

* Next.js (App Router)
* React
* TailwindCSS
* Client-side JavaScript execution using the `Function` constructor
* Zustand

---

## Features

* Structured JSON configuration
* Modular test engine (MCQ + Coding)
* Optional timer-based submission
* Browser-based execution sandbox
* Test case evaluation system
* Fully client-side operation
* Minimal UI focused on assessment workflow

---

## Use Cases

* Interview simulation
* Internal assessments
* Coding practice environment
* Academic evaluation tools
* Custom exam prototyping

---

## Limitations

* JavaScript execution only (no multi-language support)
* No backend persistence
* Execution sandbox is browser-based and not isolated like containerized environments
* Not suitable for secure production exam environments without additional isolation

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/zomkarm/custom-test-engine.git
cd custom-test-engine
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Application runs at:

```
http://localhost:3000
```

---

## Project Structure

```
/app
  /mcq
  /coding
/components
/stores
```

---

## Future Improvements

* Persistent test history
* Multi-language execution support
* Secure execution isolation
* Admin panel for test creation
* Result export (PDF / JSON)
* Authentication layer

---

## License

MIT License

```

---

If you want, I can also provide:

- A shorter README (for cleaner public repo look)
- A more engineering-focused README (for recruiters)
- Or a more product-positioned version

Specify the positioning.
```