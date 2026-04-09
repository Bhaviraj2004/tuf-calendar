import { MonthImage } from "@/types";

export const MONTH_IMAGES: MonthImage[] = [
  { month: 0, url: "images/jan.jpg", alt: "January", accent: "#7eb8d4" },
  { month: 1, url: "images/feb.jpg", alt: "February", accent: "#e8a0b4" },
  { month: 2, url: "images/march.jpg", alt: "March", accent: "#7dba84" },
  { month: 3, url: "images/april.jpg", alt: "April", accent: "#f4a460" },
  { month: 4, url: "images/may.jpg", alt: "May", accent: "#d4a853" },
  { month: 5, url: "images/june.jpg", alt: "June", accent: "#4fc3c8" },
  { month: 6, url: "images/july.jpg", alt: "July", accent: "#3a8fd1" },
  { month: 7, url: "images/august.jpg", alt: "August", accent: "#5b8fa8" },
  {
    month: 8,
    url: "images/september.jpg",
    alt: "September",
    accent: "#c4783a",
  },
  {
    month: 9,
    url: "images/october.jpg",
    alt: "October",
    accent: "#c45c2a",
  },
  {
    month: 10,
    url: "images/november.jpg",
    alt: "November",
    accent: "#7a6a8a",
  },
  {
    month: 11,
    url: "images/december.jpg",
    alt: "December",
    accent: "#c84b4b",
  },
];

export function getMonthImage(month: number): MonthImage {
  return MONTH_IMAGES[month];
}
