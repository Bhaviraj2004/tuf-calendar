import { useState, useEffect } from "react";
import { Theme } from "@/types";

export function useTheme(accentColor: string) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.setProperty("--accent", accentColor);
  }, [theme, accentColor]);

  return { theme, setTheme };
}