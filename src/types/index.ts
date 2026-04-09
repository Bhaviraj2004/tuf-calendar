export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  text: string;
  color: NoteColor;
  dateRange: DateRange;
  createdAt: Date;
}

export type NoteColor = "red" | "blue" | "green" | "yellow" | "purple";

export type Theme = "light" | "dark" | "sepia";

export interface Holiday {
  date: string;
  name: string;
  type: "national" | "regional" | "festival";
}

export interface MonthImage {
  month: number;
  url: string;
  alt: string;
  accent: string; 
}