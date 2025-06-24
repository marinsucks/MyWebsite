import React, { createContext, useContext, useEffect, useState } from "react";

type DarkModeContextType = {
	darkMode: boolean;
	setDarkMode: (value: boolean) => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [darkMode, setDarkMode] = useState(() => {
		const stored = localStorage.getItem("darkMode");
		return stored !== null ? stored === "true" : true;
	});

	useEffect(() => {
		localStorage.setItem("darkMode", String(darkMode));
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

export function useDarkModeContext() {
	const ctx = useContext(DarkModeContext);
	if (!ctx) throw new Error("useDarkModeContext must be used within a DarkModeProvider");
	return ctx;
}