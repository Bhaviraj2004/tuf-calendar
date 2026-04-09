"use client";

import { useState, useCallback, useMemo } from "react";
import { addMonths, subMonths } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useDateRange } from "@/hooks/useDateRange";
import { useNotes } from "@/hooks/useNotes";
import { useTheme } from "@/hooks/useTheme";
import { getMonthImage } from "@/data/monthImages";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import MonthImage from "./MonthImage";
import NotesPanel from "./NotesPanel";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(1);
  const [showNotes, setShowNotes] = useState(false);

  const monthImage = useMemo(
    () => getMonthImage(currentMonth.getMonth()),
    [currentMonth],
  );

  const { theme, setTheme } = useTheme(monthImage.accent);
  const { range, hoverDate, setHoverDate, selectDate, clearRange } =
    useDateRange();
  const { notes, addNote, deleteNote, editNote } = useNotes();

  const handleDateClick = useCallback(
    (date: Date) => {
      selectDate(date);
      setShowNotes(true);
    },
    [selectDate],
  );

  const closeNotes = useCallback(() => {
    setShowNotes(false);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentMonth((prev) => subMonths(prev, 1));
    clearRange();
    setShowNotes(false);
  }, [clearRange]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentMonth((prev) => addMonths(prev, 1));
    clearRange();
    setShowNotes(false);
  }, [clearRange]);

  const handleYearChange = useCallback(
    (year: number) => {
      setCurrentMonth((prev) => {
        const updated = new Date(prev);
        updated.setFullYear(year);
        return updated;
      });
      clearRange();
      setShowNotes(false);
    },
    [clearRange],
  );

  const bgPage =
    theme === "dark"
      ? "bg-gray-950"
      : theme === "sepia"
        ? "bg-amber-50"
        : "bg-slate-100";

  const bgCard =
    theme === "dark"
      ? "bg-gray-900"
      : theme === "sepia"
        ? "bg-amber-100/80"
        : "bg-white";

  return (
    <div
      className={`min-h-screen transition-colors duration-500 py-10 ${bgPage}`}
    >
      <div
        className={`
          max-w-5xl mx-auto mx-4 rounded-3xl shadow-2xl
          transition-colors duration-500 overflow-hidden
          ${bgCard}
        `}
      >
        <div className="flex flex-col md:flex-row min-h-[620px]">
          <motion.div
            animate={{
              maxWidth: showNotes ? 0 : 500,
              opacity: showNotes ? 0 : 1,
            }}
            transition={{
              maxWidth: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, ease: "easeInOut" },
            }}
            className="overflow-hidden flex-shrink-0 md:w-[38%]"
            style={{ maxWidth: 500 }}
          >
            <div className="h-full p-6 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
              <MonthImage image={monthImage} />
            </div>
          </motion.div>
          <div className="flex-1 flex flex-col md:flex-row min-w-0">
            {/* Calendar */}
            <div className="flex-1 p-5 md:p-6 min-w-0 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
              <CalendarHeader
                currentMonth={currentMonth}
                theme={theme}
                onPrev={goToPrev}
                onNext={goToNext}
                onThemeChange={setTheme}
                onYearChange={handleYearChange}
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentMonth.toISOString()}
                  custom={direction}
                  initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -50 : 50, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <CalendarGrid
                    currentMonth={currentMonth}
                    range={range}
                    hoverDate={hoverDate}
                    onDateClick={handleDateClick}
                    onDateHover={setHoverDate}
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {(range.start || range.end) && (
                  <motion.button
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    onClick={clearRange}
                    className="mt-4 text-sm text-gray-400 hover:text-red-400 transition-colors cursor-pointer calendar-font"
                  >
                    Clear selection
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Notes Panel */}
            <motion.div
              animate={{
                maxWidth: showNotes ? 420 : 0,
                opacity: showNotes ? 1 : 0,
              }}
              transition={{
                maxWidth: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                opacity: {
                  duration: 0.3,
                  delay: showNotes ? 0.15 : 0,
                  ease: "easeInOut",
                },
              }}
              className="overflow-hidden flex-shrink-0"
              style={{ maxWidth: 0 }}
            >
              <div
                className={`
                  w-80 lg:w-96 h-full p-5 md:p-6 flex flex-col
                  border-t md:border-t-0 md:border-l
                  border-gray-100 dark:border-gray-800
                  backdrop-blur-sm
                  ${bgCard}
                `}
              >
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100 calendar-font">
                    Notes
                  </h3>
                  <button
                    onClick={closeNotes}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800
                               rounded-xl transition-all group"
                  >
                    <X
                      size={20}
                      className="text-gray-400 group-hover:text-red-400 transition-colors"
                    />
                  </button>
                </div>

                <NotesPanel
                  notes={notes}
                  range={range}
                  onAdd={addNote}
                  onDelete={deleteNote}
                  onEdit={editNote}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
