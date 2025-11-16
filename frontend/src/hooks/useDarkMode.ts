import { useDarkModeContext } from "@contexts/DarkModeContext";

export function useDarkMode() {
    const { darkMode, setDarkMode } = useDarkModeContext();
    return [darkMode, setDarkMode] as const;
}