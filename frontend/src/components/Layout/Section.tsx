import React, { ReactNode } from 'react';

interface SectionProps {
	children: ReactNode;
	className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '' }) => (
	<section className={`mx-auto flex w-full max-w-7xl flex-1 flex-col p-6 ${className}`}>
		{children}
	</section>
);

export default Section;
