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
		<header className="w-full bg-background text-text p-4">
			<nav className="max-w-8xl mx-auto flex items-center justify-between py-4 px-6">
				<Link to="/" className="flex items-center">
					<Logo className="h-10 w-10 object-contain" aria-label="Logo"/>
				</Link>

				<ul className="flex space-x-8 font-title text-lg items-center">
					<li>
						<Link 
							to={'/about'}
							className="hover:text-accent transition-colors duration-200"
						>
							{t('common:about')}
						</Link>
					</li>

					<li>
						{/*<ContactForm />*/}
						{t('common:contact')}
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;