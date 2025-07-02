import React from "react";
import { useDarkMode } from "@hooks/useDarkMode";
import { Trans } from "react-i18next";

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

const tools = {
	vs: (
		<a
			href="https://code.visualstudio.com/"
			target="_blank"
			rel="noopener noreferrer"
			className="font-semibold text-primary transition-colors hover:text-secondary"
		/>
	),
	copilot: (
		<a
			href="https://github.com/features/copilot"
			target="_blank"
			rel="noopener noreferrer"
			className="font-semibold text-primary transition-colors hover:text-secondary"
		/>
	),
	react: (
		<a
			href="https://react.dev/"
			target="_blank"
			rel="noopener noreferrer"
			className="font-semibold text-primary transition-colors hover:text-secondary"
		/>
	),
	ts: (
		<a
			href="https://www.typescriptlang.org/"
			target="_blank"
			rel="noopener noreferrer"
			className="font-semibold text-primary transition-colors hover:text-secondary"
		/>
	),
	tailwind: (
		<a
			href="https://tailwindcss.com/"
			target="_blank"
			rel="noopener noreferrer"
			className="font-semibold text-primary transition-colors hover:text-secondary"
		/>
	),
	vite: (
		<a
			href="https://vitejs.dev/"
			target="_blank"
			rel="noopener noreferrer"
			className="font-semibold text-primary transition-colors hover:text-secondary"
		/>
	),
	docker: (
		<a
			href="https://docs.docker.com/compose/"
			target="_blank"
			rel="noopener noreferrer"
			className="font-semibold text-primary transition-colors hover:text-secondary"
		/>
	),
	brain: (
		<a
			href="https://motherfuckingwebsite.com/"
			target="_blank"
			rel="noopener noreferrer"
			className="font-semibold text-primary transition-colors hover:text-secondary"
		/>
	),
}

const Footer: React.FC = () => {
	const [darkMode] = useDarkMode();
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
		<footer className="bg-background text-text py-6 w-full">
			<div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto px-4 gap-8 md:gap-16">
				<div className="flex gap-8 mb-4 md:mb-0">
					{links.map((link, idx) => (
						<a
							key={idx}
							href={link.href}
							title={link.title}
							target={link.target}
							rel={link.rel}
							className="transition-transform hover:scale-110 focus:scale-110 outline-none"
						>
							<link.Icon className="footer-icon w-8 h-8" aria-label={link.title} />
						</a>
					))}
				</div>
				<div className="text-sm text-muted-foreground text-center md:text-left">
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