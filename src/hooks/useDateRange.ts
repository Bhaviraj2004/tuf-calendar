import { useState, useCallback } from "react";
import { DateRange } from "@/types";
import { isBefore } from "date-fns";

export function useDateRange() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const selectDate = useCallback((date: Date) => {
    setRange((prev) => {
      if (!prev.start) return { start: date, end: null };
      if (prev.start && !prev.end) {
        if (isBefore(date, prev.start)) {
          return { start: date, end: prev.start };
        }
        return { start: prev.start, end: date };
      }

      return { start: date, end: null };
    });
  }, []);

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
    setHoverDate(null);
  }, []);

  return { range, hoverDate, setHoverDate, selectDate, clearRange };
}