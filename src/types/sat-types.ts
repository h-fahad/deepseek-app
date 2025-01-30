// types/sat-types.ts
export interface Topic {
    id: string;
    name: string;
    prerequisites?: string[];
    difficulty?: 'easy' | 'medium' | 'hard';
  }
  
  export interface Section {
    id: string;
    name: string;
    topics: Topic[];
  }
  
  export interface Subject {
    id: string;
    name: string;
    icon: string;
    sections: Section[];
  }
  
  // Add this to explicitly mark as module
  export {};