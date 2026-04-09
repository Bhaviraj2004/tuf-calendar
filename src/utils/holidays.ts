import { Holiday } from "@/types";

export const INDIAN_HOLIDAYS: Holiday[] = [
  { date: "01-01", name: "New Year's Day", type: "national" },
  { date: "01-26", name: "Republic Day", type: "national" },
  { date: "03-25", name: "Holi", type: "festival" },
  { date: "04-14", name: "Dr. Ambedkar Jayanti", type: "national" },
  { date: "04-18", name: "Good Friday", type: "national" },
  { date: "05-01", name: "Labour Day", type: "national" },
  { date: "08-15", name: "Independence Day", type: "national" },
  { date: "08-27", name: "Janmashtami", type: "festival" },
  { date: "10-02", name: "Gandhi Jayanti", type: "national" },
  { date: "10-02", name: "Dussehra", type: "festival" },
  { date: "10-20", name: "Diwali", type: "festival" },
  { date: "11-05", name: "Guru Nanak Jayanti", type: "festival" },
  { date: "12-25", name: "Christmas", type: "national" },
];

export function getHolidayForDate(date: Date): Holiday | undefined {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const key = `${month}-${day}`;
  return INDIAN_HOLIDAYS.find((h) => h.date === key);
}