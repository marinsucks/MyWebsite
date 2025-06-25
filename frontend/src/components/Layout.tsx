import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="min-h-screen flex flex-col bg-background">
		<Header />
		<main className="flex-1">{children}</main>
		<Footer />
	</div>
);

export default Layout;