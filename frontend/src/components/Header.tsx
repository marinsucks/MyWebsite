import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";
import { useTranslation } from 'react-i18next';

const navLinks = [
	{ name: "about", to: "/about" },
	{ name: "projects", to: "/projects" },
	{ name: "contact", to: "/contact" },
];

const languages = [
	{ code: "en", label: "EN" },
	{ code: "fr", label: "FR" },
];

const Header: React.FC = () => {
	const [darkMode, setDarkMode] = useDarkMode();
  const { t, i18n } = useTranslation();

	return (
		<header className="w-full bg-background text-text shadow-md">
			<nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
				<Link to="/" className="flex items-center">
					<img
						src="/assets/favicon.png"
						alt="Logo"
						className="h-10 w-10 object-contain"
					/>
					<span className="ml-3 text-xl font-title font-bold tracking-tight">
						Marin Dev
					</span>
				</Link>

				<ul className="flex space-x-8 font-title text-lg items-center">
					{navLinks.map((link) => (
						<li key={link.name}>
							<Link
								to={link.to}
								className="hover:text-accent transition-colors duration-200"
							>
								{t(link.name)}
							</Link>
						</li>
					))}
					<li>
						<button
							onClick={() => setDarkMode((d) => !d)}
							className="ml-4 px-2 py-1 rounded hover:bg-accent/10 transition"
							aria-label="Toggle dark mode"
						>
							{darkMode ? "🌙" : "☀️"}
						</button>
					</li>
					<li>
						<select
							value={i18n.language}
							onChange={e => i18n.changeLanguage(e.target.value)}
							className="ml-2 px-2 py-1 rounded bg-transparent border border-gray-300 dark:border-gray-600"
							aria-label="Select language"
						>
							<option value="en">EN</option>
							<option value="fr">FR</option>
						</select>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;