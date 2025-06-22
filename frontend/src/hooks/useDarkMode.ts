import { useEffect, useState } from "react";

export function useDarkMode() {
	const [darkMode, setDarkMode] = useState(true);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return [darkMode, setDarkMode] as const;
}