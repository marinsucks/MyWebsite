import React from 'react';
import Header from '@components/Layout/Header';
import Options from '@components/Options';
import Footer from '@components/Layout/Footer';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="min-h-screen flex flex-col bg-background">
		<Header />
        <main className="flex-1 flex flex-col">
            {children}
        </main>
		<Options />
		<Footer />
	</div>
);

export default Layout;