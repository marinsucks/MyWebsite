import React from "react";
import { useDarkMode } from "@hooks/useDarkMode";

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
		<footer className="bg-background text-text py-6">
			<div className="flex justify-center gap-8">
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
		</footer>
	);
};

export default Footer;