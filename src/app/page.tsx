"use client";
import dynamic from "next/dynamic";

// Skeleton while Calendar loads
function CalendarSkeleton() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-4 h-[600px] rounded-3xl bg-white
                      animate-pulse shadow-2xl" />
    </div>
  );
}

// Lazy load — Calendar uses localStorage so ssr: false
const Calendar = dynamic(() => import("@/components/Calendar"), {
  loading: () => <CalendarSkeleton />,
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Calendar />
    </main>
  );
}