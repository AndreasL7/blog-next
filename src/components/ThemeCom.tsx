"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeCom = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-gray-900 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default ThemeCom;
