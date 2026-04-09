import React, { useMemo } from "react";
import { DateRange } from "@/types";
import { getCalendarDays } from "@/utils/dateHelpers";
import { getHolidayForDate } from "@/utils/holidays";
import DayCell from "./DayCell";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
  currentMonth: Date;
  range: DateRange;
  hoverDate: Date | null;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
}

export default function CalendarGrid({
  currentMonth,
  range,
  hoverDate,
  onDateClick,
  onDateHover,
}: CalendarGridProps) {
  const days = useMemo(
    () => getCalendarDays(currentMonth),
    [currentMonth]
  );

  return (
    <div className="w-full">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className={`text-center text-xs font-semibold uppercase tracking-widest py-2
              ${day === "Sun" || day === "Sat"
                ? "text-rose-400"
                : "text-gray-400 dark:text-gray-500"
              }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells  */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) =>
          date === null ? (
            <div key={`blank-${idx}`} />
          ) : (
            <DayCell
              key={date.toISOString()}
              date={date}
              range={range}
              hoverDate={hoverDate}
              holiday={getHolidayForDate(date)}
              onClick={onDateClick}
              onHover={onDateHover}
            />
          )
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          National Holiday
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          Festival
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          Today
        </span>
      </div>
    </div>
  );
}