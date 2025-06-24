import React from "react";
import { useDarkMode } from "@hooks/useDarkMode";

const links = [
	{
		href: "mailto:hello@marinbecker.me",
		title: "hello@marinbecker.me",
		alt: "email icon",
		filename: "email.svg",
	},
	{
		href: "https://github.com/marinsucks",
		title: "GitHub",
		alt: "GitHub icon",
		filename: "github.svg",
		target: "_blank",
		rel: "noopener noreferrer",
	},
	{
		href: "https://fr.linkedin.com/in/marin-becker",
		title: "LinkedIn",
		alt: "LinkedIn icon",
		filename: "linkedin.svg",
		target: "_blank",
		rel: "noopener noreferrer",
	},
	{
		href: "https://www.read.cv/marinbecker/",
		title: "CV",
		alt: "CV icon",
		filename: "cv.svg",
		target: "_blank",
		rel: "noopener noreferrer",
	},
];

const Footer: React.FC = () => {
	const [darkMode] = useDarkMode();
	const modePath = darkMode ? "dark" : "light";

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
						<img
							className="footer-icon w-8 h-8 object-contain"
							src={`/assets/icons/${modePath}/${link.filename}`}
							alt={link.alt}
						/>
					</a>
				))}
			</div>
		</footer>
	);
};

export default Footer;