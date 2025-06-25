import React from 'react';
import { useTranslation } from 'react-i18next';

const GreetingSection: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className="text-left items-start">
			<h3 className="font-mono text-4xl md:text-5xl font-bold text-accent p-2">
				{t('home:greeting')}
			</h3>
			<h1 className="font-title text-6xl md:text-7xl text-text font-extrabold p-2 tracking-tight">
				{t('home:name')}
			</h1>
			<p className="text-lg md:text-xl text-text mt-4 max-w-2xl p-2">
				{t('home:description.role') + ' '}
				{t('home:description.1st')}
				<span className="text-accent font-semibold">
					{t('home:description.stable')} 
					{/* TODO: set mechanisms dynamic icons here*/}
				</span>
				{t('home:description.2nd')}
				<span className="text-accent font-semibold">
					{t('home:description.clean')}
					{/* TODO: set glitters icons here*/}
				</span>
				{t('home:description.3rd')}
			</p>
		</div>
	);
};

export default GreetingSection;
