"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-xl transition-all duration-300 hover:bg-accent/10 group"
      aria-label="Alternar tema"
    >
      <div className="relative w-6 h-6 overflow-hidden">
        <Sun className={`w-6 h-6 text-accent transition-all duration-500 transform ${
          theme === "dark" ? "translate-y-10 rotate-90" : "translate-y-0 rotate-0"
        }`} />
        <Moon className={`absolute top-0 left-0 w-6 h-6 text-accent transition-all duration-500 transform ${
          theme === "dark" ? "translate-y-0 rotate-0" : "-translate-y-10 -rotate-90"
        }`} />
      </div>
    </button>
  );
}
