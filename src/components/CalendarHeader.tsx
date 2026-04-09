"use client";

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Theme } from "@/types";
import clsx from "clsx";

interface CalendarHeaderProps {
  currentMonth: Date;
  theme: Theme;
  onPrev: () => void;
  onNext: () => void;
  onThemeChange: (t: Theme) => void;
  onYearChange: (year: number) => void;
}

function getYearRange(currentYear: number) {
  const years = [];
  for (let y = currentYear - 10; y <= currentYear + 10; y++) {
    years.push(y);
  }
  return years;
}

export default function CalendarHeader({
  currentMonth,
  onPrev,
  onNext,
  onYearChange,
}: CalendarHeaderProps) {
  const [yearOpen, setYearOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentYear = currentMonth.getFullYear();
  const years = getYearRange(currentYear);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setYearOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (yearOpen) {
      setTimeout(() => {
        const el = document.getElementById(`year-${currentYear}`);
        el?.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 50);
    }
  }, [yearOpen, currentYear]);

  return (
    <div className="flex items-center justify-between px-1 mb-4">

      <div className="flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100 calendar-font">
          {format(currentMonth, "MMMM")}
        </h2>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setYearOpen((v) => !v)}
            className={clsx(
              "flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-md",
              "text-sm font-medium transition-all duration-150",
              "border border-transparent",
              yearOpen
                ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                : "text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
            )}
          >
            {currentYear}
            <ChevronDown
              size={12}
              className={clsx(
                "transition-transform duration-200",
                yearOpen && "rotate-180"
              )}
            />
          </button>
          {yearOpen && (
            <div
              className={clsx(
                "absolute left-0 top-full mt-1 z-50",
                "w-28 max-h-52 overflow-y-auto",
                "rounded-xl border shadow-xl",
                "bg-white dark:bg-gray-900",
                "border-gray-100 dark:border-gray-700",
                "scrollbar-thin"
              )}
            >
              {years.map((year) => (
                <button
                  id={`year-${year}`}
                  key={year}
                  onClick={() => {
                    onYearChange(year);
                    setYearOpen(false);
                  }}
                  className={clsx(
                    "w-full text-left px-4 py-2 text-sm transition-colors",
                    year === currentYear
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button
            onClick={onPrev}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                       transition-colors text-gray-600 dark:text-gray-300"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={onNext}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                       transition-colors text-gray-600 dark:text-gray-300"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}