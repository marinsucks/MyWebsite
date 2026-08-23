import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDarkMode } from "@hooks/useDarkMode";
import { useTranslation } from "react-i18next";
import Options from "@components/Options";

import YoLogoDark from "@assets/icons/dark/yo-logo.svg?react";
import YoLogoLight from "@assets/icons/light/yo-logo.svg?react";

const Header: React.FC = () => {
	const [darkMode] = useDarkMode();
	const [menuOpen, setMenuOpen] = useState(false);
	const headerRef = useRef<HTMLElement>(null);
	const location = useLocation();
	const Logo = darkMode ? YoLogoDark : YoLogoLight;
	const { t } = useTranslation("common");

	useEffect(() => {
		setMenuOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		if (!menuOpen) return;

		const closeOnOutsideClick = (event: MouseEvent) => {
			if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
				setMenuOpen(false);
			}
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setMenuOpen(false);
		};

		document.addEventListener("mousedown", closeOnOutsideClick);
		document.addEventListener("keydown", closeOnEscape);
		return () => {
			document.removeEventListener("mousedown", closeOnOutsideClick);
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [menuOpen]);

	const navLinkClass = ({ isActive }: { isActive: boolean }) =>
		`transition-colors duration-200 hover:text-accent ${isActive ? "text-accent" : "text-text"}`;

	const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`rounded-lg px-3 py-3 font-title transition-colors hover:bg-secondary/20 hover:text-accent ${
			isActive ? "bg-accent/10 text-accent" : "text-text"
		}`;

	return (
		<header ref={headerRef} className="fixed left-0 right-0 top-0 z-50 w-full bg-transparent px-4 text-primary">
			<div className="site-header-shell relative mx-auto max-w-7xl rounded-b-lg border border-t-0 border-secondary bg-background">
				<nav className="flex min-h-16 items-center justify-between px-4 py-3 sm:px-6 md:py-0 md:pr-0">
					<Link
						to="/"
						className="group flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
						aria-label={t("header.home")}
					>
						<Logo
							className="h-10 w-10 object-contain transition-[filter] duration-300 group-hover:drop-shadow-[0_0_14px_var(--secondary)]"
							aria-hidden="true"
						/>
					</Link>

					<div className="hidden h-16 items-center md:flex">
						<ul className="flex items-center gap-8 font-title">
							<li>
								<NavLink to="/work" className={navLinkClass}>
									{t("header.work")}
								</NavLink>
							</li>
							<li>
								<NavLink to="/about" className={navLinkClass}>
									{t("header.about")}
								</NavLink>
							</li>
							<li>
								<a
									href="mailto:contact@marinbecker.me"
									className="rounded-lg border border-accent px-4 py-2 text-accent transition-colors duration-200 hover:bg-accent hover:text-background"
								>
									{t("header.contact")}
								</a>
							</li>
						</ul>
						<Options className="ml-5 h-full border-l border-secondary px-5" />
					</div>

					<button
						type="button"
						className="flex h-11 w-11 items-center justify-center rounded-lg text-text transition-colors hover:bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
						onClick={() => setMenuOpen((open) => !open)}
						aria-expanded={menuOpen}
						aria-controls="mobile-navigation"
						aria-label={t(menuOpen ? "header.closeMenu" : "header.openMenu")}
					>
						<svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
							{menuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 6h14M5 12h14M5 18h14" />
							)}
						</svg>
					</button>
				</nav>

				{menuOpen && (
					<div id="mobile-navigation" className="border-t border-secondary px-4 pb-4 pt-3 md:hidden">
						<div className="flex flex-col">
							<NavLink to="/work" className={mobileNavLinkClass}>
								{t("header.work")}
							</NavLink>
							<NavLink to="/about" className={mobileNavLinkClass}>
								{t("header.about")}
							</NavLink>
							<a
								href="mailto:contact@marinbecker.me"
								className="rounded-lg px-3 py-3 font-title text-accent/80 transition-colors hover:bg-secondary/20 hover:text-accent"
							>
								{t("header.contact")}
							</a>
						</div>
						<Options inline className="mt-2 w-full border-t border-secondary/70 px-3 pt-3" />
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
