// lib/mock/sat-data.ts
interface Topic {
  id: string;
  name: string;
  prerequisites?: string[];
  difficulty?: string;
}

interface Section {
  id: string;
  name: string;
  topics: Topic[];
}

interface Subject {
  name: string;
  icon: string;
  sections: Section[];
}

export const SAT_CONTENT: Record<string, Subject> = {
  math: {
    name: "Mathematics",
    icon: "🧮",
    sections: [
      {
        id: "algebra",
        name: "Algebra",
        topics: [
          {
            id: "linear-equations",
            name: "Linear Equations",
            prerequisites: [],
            difficulty: "medium"
          },
          {
            id: "quadratic-equations",
            name: "Quadratic Equations",
            prerequisites: ["linear-equations"],
            difficulty: "hard"
          }
        ]
      },
      {
        id: "advanced-math",
        name: "Advanced Math",
        topics: [
          {
            id: "polynomials",
            name: "Polynomials",
            prerequisites: [],
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  reading: {
    name: "Reading",
    icon: "📚",
    sections: [] // Add sections similarly
  }
} as const;

export type SubjectId = keyof typeof SAT_CONTENT;