import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "@hooks/useDarkMode";
import { useTranslation } from 'react-i18next';

import YoLogoDark from '@assets/icons/dark/yo-logo.svg?react';
import YoLogoLight from '@assets/icons/light/yo-logo.svg?react';

const Header: React.FC = () => {
	const [ darkMode ] = useDarkMode();
	const Logo = darkMode ? YoLogoDark : YoLogoLight;
	const { t } = useTranslation();

	return (
		<header className="fixed top-0 left-0 right-0 w-full bg-transparent text-primary z-50 px-4">
			<div className="max-w-6xl mx-auto bg-background/90 backdrop-blur-sm border border-t-0 border-secondary rounded-b-lg">
				<nav className="flex items-center justify-between py-4 px-6">
				<Link
					to="/"
					className="flex items-center transition-transform duration-200 hover:scale-125 active:scale-110"
					style={{ transitionProperty: 'transform' }}
				>
					<Logo className="h-10 w-10 object-contain" aria-label="Logo" />
				</Link>

				<ul className="flex space-x-8 font-title text-lg items-center">
					<li>
						<Link 
							to={'/about'}
							className="hover:text-accent transition-colors duration-200"
						>
							{t('common:header.about')}
						</Link>
					</li>

					<li>
						<a 
							href="mailto:contact@marinbecker.me"
							className="text-accent px-4 py-2 rounded-lg hover:bg-accent hover:text-background transition-colors duration-200"
						>
							{t('common:header.contact')}
						</a>
					</li>
				</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;