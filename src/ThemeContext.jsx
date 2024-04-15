import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark(!isDark);

  return <ThemeContext.Provider value={{ isDark, toggleDark }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
