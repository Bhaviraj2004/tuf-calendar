import React, { memo } from "react";
import { isToday } from "date-fns";
import { Holiday } from "@/types";
import { isRangeStart, isRangeEnd, isInRange } from "@/utils/dateHelpers";
import { DateRange } from "@/types";
import clsx from "clsx";

interface DayCellProps {
  date: Date;
  range: DateRange;
  hoverDate: Date | null;
  holiday?: Holiday;
  onClick: (date: Date) => void;
  onHover: (date: Date | null) => void;
}

const DayCell = memo(function DayCell({
  date,
  range,
  hoverDate,
  holiday,
  onClick,
  onHover,
}: DayCellProps) {
  const today = isToday(date);
  const isStart = isRangeStart(date, range);
  const isEnd = isRangeEnd(date, range);
  const inRange = isInRange(date, range);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  const hoverRange: DateRange =
    range.start && !range.end && hoverDate
      ? { start: range.start, end: hoverDate }
      : { start: null, end: null };
  const inHoverRange = isInRange(date, hoverRange);

  return (
    <button
      onClick={() => onClick(date)}
      onMouseEnter={() => onHover(date)}
      onMouseLeave={() => onHover(null)}
      className={clsx(
        "relative flex flex-col items-center justify-center",
        "w-full aspect-square rounded-xl text-sm font-medium",
        "transition-all duration-150 select-none",
        "focus:outline-none focus:ring-2 focus:ring-offset-1",

        // Default
        !isStart && !isEnd && !inRange && !inHoverRange &&
          "hover:bg-black/5 dark:hover:bg-white/10",

        // Weekend color
        isWeekend && !isStart && !isEnd && !inRange
          ? "text-rose-400"
          : "text-gray-700 dark:text-gray-200",

        // Today
        today && !isStart && !isEnd &&
          "ring-2 ring-amber-400 ring-offset-1 font-bold",

        // Hover preview
        inHoverRange && !isStart &&
          "bg-blue-100/60 dark:bg-blue-900/30",

        // In range
        inRange && !isStart && !isEnd &&
          "bg-blue-200 dark:bg-blue-800/50 rounded-none text-blue-900 dark:text-blue-100",

        // Start date
        isStart &&
          "bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-300/50 dark:shadow-blue-900/50 z-10",

        // End date
        isEnd &&
          "bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-300/50 dark:shadow-rose-900/50 z-10",
      )}
    >
      <span>{date.getDate()}</span>

      {/* Holiday dot */}
      {holiday && (
        <span
          className={clsx(
            "absolute bottom-1 w-1 h-1 rounded-full",
            holiday.type === "national" ? "bg-orange-500" : "bg-purple-500",
            (isStart || isEnd) && "bg-white"
          )}
          title={holiday.name}
        />
      )}

      {today && !isStart && !isEnd && (
        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-400" />
      )}
    </button>
  );
});

export default DayCell;