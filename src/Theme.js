import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getThemeClasses = () => ({
    // Background
    background:
      theme === "dark"
        ? "bg-gray-900 text-gray-100"
        : "bg-gray-50 text-gray-900",

    // Header
    headerBorder: theme === "dark" ? "border-gray-800" : "border-gray-200",

    icon: theme === "dark" ? "text-gray-300" : "text-gray-600",

    // Hero section
    heroTitle: theme === "dark" ? "text-white" : "text-gray-900",

    subtitle: theme === "dark" ? "text-gray-400" : "text-gray-600",

    // Main card
    card:
      theme === "dark"
        ? "bg-gray-800 border-gray-700 shadow-2xl"
        : "bg-white border-gray-200 shadow-lg",

    // Formula section
    formulaSection:
      theme === "dark"
        ? "bg-gray-800 border-gray-700"
        : "bg-gray-50 border-gray-200",

    formula:
      theme === "dark"
        ? "bg-gray-800 text-blue-200 px-3 py-2 font-mono text-base"
        : "bg-gray-100 text-blue-700 px-3 py-2 font-mono text-base",

    // Input panel
    inputPanel:
      theme === "dark"
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200",

    label: theme === "dark" ? "text-gray-300" : "text-gray-700",

    input:
      theme === "dark"
        ? "bg-gray-900 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500",

    button:
      theme === "dark"
        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg",

    buttonDisabled:
      theme === "dark"
        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
        : "bg-gray-200 text-gray-400 cursor-not-allowed",

    // Output panel
    outputPanel: theme === "dark" ? "bg-gray-800" : "bg-gray-50",

    successBadge: "bg-green-100 text-green-800 border border-green-200",
    errorBadge: "bg-red-100 text-red-800 border border-red-200",

    resultDetails: theme === "dark" ? "text-gray-200" : "text-gray-800",

    resultSubtext: theme === "dark" ? "text-gray-400" : "text-gray-500",

    shareButton:
      theme === "dark"
        ? "bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600"
        : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300",

    // Placeholder
    placeholder: theme === "dark" ? "text-gray-400" : "text-gray-500",

    placeholderIcon: theme === "dark" ? "text-gray-600" : "text-gray-300",

    // Theme toggle
    themeToggle:
      theme === "dark"
        ? "bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600"
        : "bg-white hover:bg-gray-50 text-gray-600 border border-gray-300",

    // Footer
    footer: theme === "dark" ? "text-gray-500" : "text-gray-400",

    githubLink:
      theme === "dark"
        ? "text-gray-400 hover:text-gray-200"
        : "text-gray-500 hover:text-gray-700",
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getThemeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
};
