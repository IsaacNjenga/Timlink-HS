import React, { useState, createContext, useContext } from "react";
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const value = { mode, setMode };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
