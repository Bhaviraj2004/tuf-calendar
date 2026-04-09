"use client";

import { useState } from "react";
import { Trash2, Edit2, Check, X, Plus } from "lucide-react";
import { Note, NoteColor, DateRange } from "@/types";
import { formatDisplayDate } from "@/utils/dateHelpers";
import clsx from "clsx";

const NOTE_COLORS: { value: NoteColor; bg: string; border: string }[] = [
  { value: "yellow", bg: "bg-yellow-100 dark:bg-yellow-900/30", border: "border-yellow-300" },
  { value: "blue",   bg: "bg-blue-100 dark:bg-blue-900/30",     border: "border-blue-300" },
  { value: "green",  bg: "bg-green-100 dark:bg-green-900/30",   border: "border-green-300" },
  { value: "red",    bg: "bg-red-100 dark:bg-red-900/30",       border: "border-red-300" },
  { value: "purple", bg: "bg-purple-100 dark:bg-purple-900/30", border: "border-purple-300" },
];

interface NotesPanelProps {
  notes: Note[];
  range: DateRange;
  onAdd: (text: string, color: NoteColor, range: DateRange) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function NotesPanel({
  notes, range, onAdd, onDelete, onEdit,
}: NotesPanelProps) {
  const [text, setText] = useState("");
  const [color, setColor] = useState<NoteColor>("yellow");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim(), color, range);
    setText("");
  };

  const handleEditSave = (id: string) => {
    onEdit(id, editText);
    setEditId(null);
  };

  const getNoteColor = (c: NoteColor) =>
    NOTE_COLORS.find((n) => n.value === c) ?? NOTE_COLORS[0];

  return (
    <div className="flex flex-col h-full gap-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 calendar-font">
        Notes
      </h3>
      {range.start && (
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
          {range.end
            ? `${formatDisplayDate(range.start)} → ${formatDisplayDate(range.end)}`
            : `From: ${formatDisplayDate(range.start)}`}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            range.start
              ? "Add a note for selected dates..."
              : "Select dates first, then add a note..."
          }
          maxLength={300}
          rows={3}
          className="w-full resize-none rounded-xl border border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                     text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400
                     placeholder:text-gray-300 dark:placeholder:text-gray-600"
        />

        <p className="text-right text-xs text-gray-300 dark:text-gray-600">
          {text.length}/300
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {NOTE_COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={clsx(
                  "w-5 h-5 rounded-full border-2 transition-transform",
                  c.bg,
                  color === c.value
                    ? "border-gray-600 scale-125"
                    : "border-transparent hover:scale-110"
                )}
              />
            ))}
          </div>

          <button
            onClick={handleAdd}
            disabled={!text.trim() || !range.start}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                       bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40
                       disabled:cursor-not-allowed transition-all"
          >
            <Plus size={14} />
            Add Note
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-1">
        {notes.length === 0 && (
          <p className="text-center text-gray-300 dark:text-gray-600 text-sm mt-4">
            No notes yet. Select a date range and add one!
          </p>
        )}

        {notes.map((note) => {
          const nc = getNoteColor(note.color);
          return (
            <div
              key={note.id}
              className={clsx(
                "rounded-xl border p-3 text-sm transition-all",
                nc.bg, nc.border
              )}
            >
              {note.dateRange.start && (
                <p className="text-xs text-gray-400 mb-1">
                  {note.dateRange.end
                    ? `${formatDisplayDate(note.dateRange.start)} → ${formatDisplayDate(note.dateRange.end)}`
                    : formatDisplayDate(note.dateRange.start)}
                </p>
              )}

              {editId === note.id ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={2}
                    maxLength={300}
                    className="w-full resize-none rounded-lg border border-gray-300
                               bg-white/70 text-sm px-2 py-1 focus:outline-none"
                  />
                  <div className="flex gap-1 justify-end">
                    <button onClick={() => handleEditSave(note.id)}
                      className="p-1 rounded text-green-600 hover:bg-green-100">
                      <Check size={14} />
                    </button>
                    <button onClick={() => setEditId(null)}
                      className="p-1 rounded text-gray-400 hover:bg-gray-100">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start gap-2">
                  <p className="text-gray-700 dark:text-gray-200 flex-1 break-words">
                    {note.text}
                  </p>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => { setEditId(note.id); setEditText(note.text); }}
                      className="p-1 rounded text-gray-400 hover:text-blue-500 hover:bg-blue-50"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(note.id)}
                      className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}