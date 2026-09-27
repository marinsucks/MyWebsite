import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';
import DevBackground from '@components/DevBackground';
import DevBackgroundCSS from '@components/DevBackgroundCSS';
import { usePerformanceMode } from '@hooks/usePerformanceMode';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const highPerformance = usePerformanceMode();
	const { pathname } = useLocation();
	const isContact = pathname.replace(/\/+$/, '') === '/contact';

	return (
		<div className="min-h-screen flex flex-col bg-background relative">
			{highPerformance ? <DevBackground /> : <DevBackgroundCSS />}
			<Header />
			<main className={`flex-1 flex flex-col pt-24 pb-32 relative z-10 ${isContact ? 'lg:pb-0' : ''}`}>
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
