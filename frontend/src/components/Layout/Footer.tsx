import React from "react";
import { useDarkMode } from "@hooks/useDarkMode";
import { Trans, useTranslation } from "react-i18next";

import EmailIconDark from '@assets/icons/dark/email.svg?react';
import EmailIconLight from '@assets/icons/light/email.svg?react';
import GithubIconDark from '@assets/icons/dark/github.svg?react';
import GithubIconLight from '@assets/icons/light/github.svg?react';
import LinkedinIconDark from '@assets/icons/dark/linkedin.svg?react';
import LinkedinIconLight from '@assets/icons/light/linkedin.svg?react';
import CvIconDark from '@assets/icons/dark/cv.svg?react';
import CvIconLight from '@assets/icons/light/cv.svg?react';

const email = {light: EmailIconLight, dark: EmailIconDark};
const github = {light: GithubIconLight, dark: GithubIconDark,};
const linkedin = {light: LinkedinIconLight, dark: LinkedinIconDark,};
const cv = {light: CvIconLight, dark: CvIconDark,};

// Composant réutilisable pour les liens d'outils
const ToolLink: React.FC<{ href: string; children?: React.ReactNode }> = ({ href, children }) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="font-semibold text-text transition-colors hover:text-accent"
	>
		{children}
	</a>
);

const toolsUrls = {
	vs: "https://code.visualstudio.com/",
	copilot: "https://github.com/features/copilot",
	react: "https://react.dev/",
	ts: "https://www.typescriptlang.org/",
	tailwind: "https://tailwindcss.com/",
	vite: "https://vitejs.dev/",
	docker: "https://docs.docker.com/compose/",
	brain: "https://neurotorium.org/tool/brain-atlas/",
};

/**
 * Creates an map of ToolLink components for each tool URL.
 */
const tools = Object.entries(toolsUrls).reduce((acc, [key, url]) => {
	acc[key] = <ToolLink href={url} />;
	return acc;
}, {} as Record<string, JSX.Element>);

const Footer: React.FC = () => {
	const [darkMode] = useDarkMode();
	useTranslation('common'); // for i18n to load the namespace
	const modePath = darkMode ? "dark" : "light";

	const links = [
		{
			href: "mailto:hello@marinbecker.me",
			title: "hello@marinbecker.me",
			alt: "email icon",
			Icon: email[modePath],
		},
		{
			href: "https://github.com/marinsucks",
			title: "GitHub",
			alt: "GitHub icon",
			Icon: github[modePath],
			target: "_blank",
			rel: "noopener noreferrer",
		},
		{
			href: "https://fr.linkedin.com/in/marin-becker",
			title: "LinkedIn",
			alt: "LinkedIn icon",
			Icon: linkedin[modePath],
			target: "_blank",
			rel: "noopener noreferrer",
		},
		{
			href: "https://www.read.cv/marinbecker/",
			title: "CV",
			alt: "CV icon",
			Icon: cv[modePath],
			target: "_blank",
			rel: "noopener noreferrer",
		},
	];

	return (
		<footer className="text-primary py-6 w-full">
			<div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto px-4 gap-8 md:gap-16">
				<div className="flex gap-8 mb-4 md:mb-0">
					{links.map((link, idx) => (
						<a
							key={idx}
							href={link.href}
							title={link.title}
							target={link.target}
							rel={link.rel}
							className="transition-transform duration-200 hover:scale-125 active:scale-110"
							style={{ transitionProperty: 'transform' }}
						>
							<link.Icon className="footer-icon w-8 h-8" aria-label={link.title} />
						</a>
					))}
				</div>
				<div className="text-sm text-center md:text-left p-2 opacity-80">
					<Trans
						ns="common"
						i18nKey="footer.description"
						components={tools}
					/>
				</div>
			</div>
		</footer>
	);
};

export default Footer;