import { useState, useEffect, useCallback } from "react";
import { Note, NoteColor, DateRange } from "@/types";

const STORAGE_KEY = "tuf-calendar-notes";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Revive Date objects
        const revived = parsed.map((n: Note) => ({
          ...n,
          createdAt: new Date(n.createdAt),
          dateRange: {
            start: n.dateRange.start ? new Date(n.dateRange.start) : null,
            end: n.dateRange.end ? new Date(n.dateRange.end) : null,
          },
        }));
        setNotes(revived);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = useCallback(
    (text: string, color: NoteColor, dateRange: DateRange) => {
      const note: Note = {
        id: crypto.randomUUID(),
        text,
        color,
        dateRange,
        createdAt: new Date(),
      };
      setNotes((prev) => [note, ...prev]);
    },
    []
  );

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const editNote = useCallback((id: string, text: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, text } : n)));
  }, []);

  return { notes, addNote, deleteNote, editNote };
}