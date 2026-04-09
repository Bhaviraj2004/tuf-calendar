import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  isSameDay,
  isWithinInterval,
  isToday,
  isSameMonth,
} from "date-fns";
import { DateRange } from "@/types";

export function getCalendarDays(date: Date): (Date | null)[] {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days = eachDayOfInterval({ start, end });

  // Sunday = 0, fill leading nulls
  const leadingBlanks = Array(getDay(start)).fill(null);
  return [...leadingBlanks, ...days];
}

export function isInRange(date: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false;
  return isWithinInterval(date, {
    start: range.start,
    end: range.end,
  });
}

export function isRangeStart(date: Date, range: DateRange): boolean {
  if (!range.start) return false;
  return isSameDay(date, range.start);
}

export function isRangeEnd(date: Date, range: DateRange): boolean {
  if (!range.end) return false;
  return isSameDay(date, range.end);
}

export function formatDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatDisplayDate(date: Date): string {
  return format(date, "dd MMM yyyy");
}

export { isToday, isSameMonth, isSameDay, format };