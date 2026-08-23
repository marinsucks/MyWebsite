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
	react: "https://react.dev/",
	ts: "https://www.typescriptlang.org/",
	tailwind: "https://tailwindcss.com/",
	docker: "https://docs.docker.com/compose/",
	nginx: "https://nginx.org/",
	actions: "https://github.com/features/actions",
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
		<footer className="fixed bottom-0 left-0 right-0 w-full bg-transparent text-primary relative z-50 px-4">
			<div className="max-w-7xl mx-auto py-4 bg-background/90 backdrop-blur-sm border border-b-0 border-secondary rounded-t-lg">
				<div className="flex flex-col sm:flex-row justify-between items-center px-2 sm:px-4 gap-4 sm:gap-8">
				<div className="flex justify-between w-full sm:w-auto gap-0 sm:gap-8 mb-2 sm:mb-0 px-4 sm:px-0">
					{links.map((link, idx) => (
						<a
							key={idx}
							href={link.href}
							title={link.title}
							target={link.target}
							rel={link.rel}
							className="transition-transform duration-200 hover:scale-125 active:scale-110 flex-1 sm:flex-none flex justify-center sm:justify-start"
							style={{ transitionProperty: 'transform' }}
						>
							<link.Icon className="footer-icon w-10 h-10 sm:w-8 sm:h-8" aria-label={link.title} />
						</a>
					))}
				</div>
				<div className="px-1 text-center text-xs opacity-80 sm:p-2 sm:text-left sm:text-sm">
					<Trans
						ns="common"
						i18nKey="footer.description"
						components={{
							...tools,
							codex: <span className="font-semibold text-text" />,
						}}
					/>
				</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
