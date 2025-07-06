import React, { ReactNode } from 'react';

interface SectionProps {
	children: ReactNode;
	className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '' }) => (
	<section className={`w-full max-w-6xl mx-auto p-6 ${className}`}>
		{children}
	</section>
);

export default Section;