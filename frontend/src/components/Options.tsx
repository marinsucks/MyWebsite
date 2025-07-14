import React, { useState, useRef, useEffect } from "react";
import { useDarkMode } from "@hooks/useDarkMode";
import { useTranslation } from "react-i18next";

// SVG imports
import OptionsIconDark from "@assets/icons/dark/options.svg?react";
import OptionsIconLight from "@assets/icons/light/options.svg?react";
import LightModeIcon from "@assets/icons/dark/light-mode.svg?react";
import DarkModeIcon from "@assets/icons/light/dark-mode.svg?react";
import FlagFrIcon from "@assets/icons/flag-fr.svg?react";
import FlagUkIcon from "@assets/icons/flag-uk.svg?react";

const BUTTON_SIZE = 60;
const RADIUS = 54; // Distance from center to floating buttons

const Options: React.FC = () => {
	const [openByClick, setOpenByClick] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [darkMode, setDarkMode] = useDarkMode();
	const modePath = darkMode ? "dark" : "light";
	const { i18n } = useTranslation();
	const containerRef = useRef<HTMLDivElement>(null);

	const open = openByClick || hovered;

	// Close on outside click if opened by click
	useEffect(() => {
		if (!openByClick) return;
		const handleClick = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setOpenByClick(false);
			}
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [openByClick]);

	// Positions for the floating buttons (in radians)
	const positions = [
		{ // Theme button at 9h (270deg)
			x: -Math.cos(Math.PI / 2) * RADIUS,
			y: -Math.sin(Math.PI / 2) * RADIUS,
		},
		{ // Lang button at 12h (0deg)
			x: -Math.cos(0) * RADIUS,
			y: -Math.sin(0) * RADIUS,
		},
	];

	const OptionsIcon = darkMode ? OptionsIconDark : OptionsIconLight;
	const ThemeIcon = darkMode ? LightModeIcon : DarkModeIcon;
	const LangIcon = i18n.language === "en" ? FlagFrIcon : FlagUkIcon;
	const langAlt = i18n.language === "en" ? "FR" : "EN";

	return (
		<div
			ref={containerRef}
			className="fixed bottom-6 right-6 z-50 text-text"
			style={{
				width: `${RADIUS + BUTTON_SIZE}px`,
				height: `${RADIUS + BUTTON_SIZE}px`,
				pointerEvents: "none", // Only buttons are interactive
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{/* Square container */}
			<div
				className="absolute bottom-0 right-0"
				style={{
					width: `${BUTTON_SIZE}px`,
					height: `${BUTTON_SIZE}px`,
					pointerEvents: "auto",
				}}
			>
				{/* Settings button */}
				<button
					onClick={() => setOpenByClick((o) => !o)}
					className="w-12 h-12 flex items-center justify-center rounded-full bg-background transition-colors duration-150 hover:bg-accent/70"
					aria-label="Open settings"
					type="button"
					style={{
						position: "absolute",
						bottom: 0,
						right: 0,
						zIndex: 2,
					}}
				>
					<OptionsIcon className="w-6 h-6" aria-label="Options" />
				</button>
			</div>
			{/* Floating buttons */}
			{open && (
				<>
					{/* Theme button (9h) */}
					<button
						onClick={() => setDarkMode(!darkMode)}
						className="w-12 h-12 flex items-center justify-center rounded-full bg-background transition-colors duration-1500 hover:bg-secondary"
						aria-label="Toggle dark mode"
						type="button"
						style={{
							position: "absolute",
							bottom: 0,
							right: 0,
							transform: `translate(${positions[0].x}px, ${positions[0].y}px)`,
							transition: "transform 0.3s cubic-bezier(.4,2,.6,1)",
							zIndex: 1,
							pointerEvents: "auto",
						}}
					>
						<ThemeIcon className="w-6 h-6" aria-label={modePath} />
					</button>
					{/* Lang button (12h) */}
					<button
						onClick={() => i18n.changeLanguage(i18n.language === "en" ? "fr" : "en")}
						className="w-12 h-12 flex items-center justify-center rounded-full bg-background transition-colors duration-150 hover:bg-secondary"
						aria-label="Toggle language"
						type="button"
						style={{
							position: "absolute",
							bottom: 0,
							right: 0,
							transform: `translate(${positions[1].x}px, ${positions[1].y}px)`,
							transition: "transform 0.3s cubic-bezier(.4,2,.6,1)",
							zIndex: 1,
							pointerEvents: "auto",
						}}
					>
						<LangIcon className="w-6 h-6" aria-label={langAlt} />
					</button>
				</>
			)}
		</div>
	);
};

export default Options;