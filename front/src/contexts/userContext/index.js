import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";

const UserContext = createContext(null);
const MODE_STORAGE_KEY = "timlink-theme-mode";

const getSystemMode = () => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getStoredMode = () => {
  if (typeof window === "undefined") return null;

  const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY);
  return storedMode === "light" || storedMode === "dark" ? storedMode : null;
};

export const UserProvider = ({ children }) => {
  const [mode, setModeState] = useState(
    () => getStoredMode() ?? getSystemMode(),
  );
  const [modePreference, setModePreference] = useState(
    () => getStoredMode() ?? "system",
  );

  useEffect(() => {
    if (typeof window === "undefined" || modePreference !== "system") return;

    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSchemeChange = (event) => {
      setModeState(event.matches ? "dark" : "light");
    };

    colorScheme.addEventListener("change", handleSchemeChange);

    return () => {
      colorScheme.removeEventListener("change", handleSchemeChange);
    };
  }, [modePreference]);

  const setMode = useCallback((nextMode) => {
    if (nextMode !== "light" && nextMode !== "dark") return;

    setModePreference(nextMode);
    setModeState(nextMode);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(MODE_STORAGE_KEY, nextMode);
    }
  }, []);

  const useSystemMode = useCallback(() => {
    const systemMode = getSystemMode();

    setModePreference("system");
    setModeState(systemMode);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(MODE_STORAGE_KEY);
    }
  }, []);

  const value = useMemo(
    () => ({ mode, modePreference, setMode, useSystemMode }),
    [mode, modePreference, setMode, useSystemMode],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
