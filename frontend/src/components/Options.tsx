import React, { useEffect, useRef, useState } from "react";
import { useDarkMode } from "@hooks/useDarkMode";
import { useTranslation } from "react-i18next";

import OptionsIconDark from "@assets/icons/dark/options.svg?react";
import OptionsIconLight from "@assets/icons/light/options.svg?react";
import LightModeIcon from "@assets/icons/dark/light-mode.svg?react";
import DarkModeIcon from "@assets/icons/light/dark-mode.svg?react";
import FlagFrIcon from "@assets/icons/flag-fr.svg?react";
import FlagUkIcon from "@assets/icons/flag-uk.svg?react";

interface OptionsProps {
	className?: string;
	inline?: boolean;
}

const Options: React.FC<OptionsProps> = ({ className = "", inline = false }) => {
	const [open, setOpen] = useState(false);
	const [darkMode, setDarkMode] = useDarkMode();
	const containerRef = useRef<HTMLDivElement>(null);
	const { t, i18n } = useTranslation("common");
	const OptionsIcon = darkMode ? OptionsIconDark : OptionsIconLight;
	const ThemeIcon = darkMode ? LightModeIcon : DarkModeIcon;
	const LangIcon = i18n.language === "en" ? FlagFrIcon : FlagUkIcon;
	const optionButtonClassName =
		"flex h-10 w-10 items-center justify-center rounded-md text-text transition-colors hover:bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent";

	useEffect(() => {
		if (!open) return;

		const closeOnOutsideClick = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("mousedown", closeOnOutsideClick);
		document.addEventListener("keydown", closeOnEscape);
		return () => {
			document.removeEventListener("mousedown", closeOnOutsideClick);
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [open]);

	const controls = (
		<>
			<button
				type="button"
				role={inline ? undefined : "menuitem"}
				onClick={() => setDarkMode(!darkMode)}
				className={optionButtonClassName}
				aria-label={t(darkMode ? "settings.lightMode" : "settings.darkMode")}
				title={t(darkMode ? "settings.lightMode" : "settings.darkMode")}
			>
				<ThemeIcon className="h-6 w-6" aria-hidden="true" />
			</button>
			<button
				type="button"
				role={inline ? undefined : "menuitem"}
				onClick={() => i18n.changeLanguage(i18n.language === "en" ? "fr" : "en")}
				className={optionButtonClassName}
				aria-label={t("settings.language")}
				title={t("settings.language")}
			>
				<LangIcon className="h-6 w-6" aria-hidden="true" />
			</button>
		</>
	);

	if (inline) {
		return (
			<div className={`flex items-center justify-around ${className}`} aria-label={t("settings.title")}>
				{controls}
			</div>
		);
	}

	return (
		<div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
			<button
				onClick={() => setOpen((currentOpen) => !currentOpen)}
				className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
				aria-label={t("settings.open")}
				aria-expanded={open}
				aria-haspopup="menu"
				title={t("settings.title")}
				type="button"
			>
				<OptionsIcon className="h-6 w-6" aria-hidden="true" />
			</button>

			{open && (
				<div
					role="menu"
					aria-label={t("settings.title")}
					className="desktop-options-panel absolute -left-px -right-px top-full z-[60] flex flex-col items-center gap-1 rounded-b-lg border border-t-0 border-secondary bg-background p-2 shadow-xl"
				>
					{controls}
				</div>
			)}
		</div>
	);
};

export default Options;
