// components/theme-toggle.tsx
"use client";

import { useTheme } from "./theme-provider";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg glass-card hover:scale-105 transition-all"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <FaMoon className="w-5 h-5 text-amber-500" />
        ) : (
          <FaSun className="w-5 h-5 text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}