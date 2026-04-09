import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "TUF Calendar — Interactive Wall Calendar",
  description:
    "A polished interactive wall calendar with date range selection, notes, and themes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}