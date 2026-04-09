# TUF Wall Calendar

An interactive wall calendar built with Next.js 14, TypeScript, and Framer Motion.

Live Demo: 

---

## Features

- Wall calendar aesthetic with monthly hero image and ring bindings
- Date range selection with start, end, and in-between highlights
- Notes panel — attach color-tagged notes to selected dates, with edit and delete
- 3D wall split animation when a date is selected
- Light, Dark, and Sepia theme switching
- Year dropdown for quick navigation
- Indian holidays marked on the calendar
- Notes persist via localStorage
- Fully responsive — side-by-side on desktop, stacked on mobile

---

## Tech Stack

Next.js 14, TypeScript, Tailwind CSS, Framer Motion, date-fns, Lucide React

---

## Getting Started

```bash
git clone https://github.com/Bhaviraj2004/tuf-calendar.git
cd tuf-calendar
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Project Structure

```
src/
├── app/             # Next.js app router
├── components/      # Calendar, Grid, DayCell, NotesPanel, etc.
├── hooks/           # useDateRange, useNotes, useTheme
├── utils/           # Date helpers, Indian holidays
├── data/            # Month images
└── types/           # Shared TypeScript types
```

---

## Key Decisions

- **Custom hooks over Redux** — state is local to one component tree, no global store needed
- **maxWidth animation** — avoids layout thrash caused by animating width directly
- **next/dynamic with ssr: false** — calendar uses localStorage, SSR would cause hydration mismatch
- **date-fns** — tree-shakeable, fully typed, works well with immutable React state

---

Or connect your GitHub repo on vercel.com for auto deployments.

---

Built for the takeUforward SWE Summer Internship assessment.