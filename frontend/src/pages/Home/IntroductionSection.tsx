import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import CogIcon from '@assets/icons/cog.svg?react';

const GreetingSection: React.FC = () => {
	const { t } = useTranslation("home");
	
	return (
		<div className="text-left items-start">
			<h3 className="font-mono text-4xl md:text-5xl font-bold text-accent p-2">
				{t('greeting')}
			</h3>
			<h1 className="font-title text-6xl md:text-7xl text-text font-extrabold p-2 tracking-tight">
				{t('name')}
			</h1>
			<p className="text-lg md:text-xl text-text mt-4 max-w-2xl p-2">
				{t('description.role')}
			</p>
		</div>
	);
};

const AimsSection: React.FC = () => {
	const { t } = useTranslation("home");
	return (
		<div className="text-left items-start">
			<p className="text-lg md:text-xl text-text mt-4 max-w-2xl p-2">
				<Trans
					i18nKey="description.quality"
					ns="home"
					components={{
						stable: <span className="text-accent font-semibold"></span>,
						clean: <span className="text-accent font-semibold"></span>
					}}
				/>
			</p>
		</div>
	);
};

const IntroductionSection: React.FC = () => {
	return (
		<div className="flex flex-col justify-center">
			<GreetingSection />
			<AimsSection />
		</div>
	);
}

export default IntroductionSection;


