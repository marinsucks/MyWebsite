import React from 'react';
import Section from '@components/Layout/Section';
import { useTranslation, Trans } from 'react-i18next';

//import CogIcon from '@assets/icons/cog.svg?react';

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
			<p className="text-lg md:text-xl text-primary mt-4 max-w-2xl p-2">
				{t('description.role')}
			</p>
		</div>
	);
};

const AimsSection: React.FC = () => {
	//const { t } = useTranslation("home");
	return (
		<div className="text-right items-end">
			<p className="text-3xl md:text-4xl font-title text-text mt-8 p-2 leading-tight">
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
		<Section className="flex flex-col gap-y-20 py-20">
			<GreetingSection />
			<AimsSection />
		</Section>
	);
}

export default IntroductionSection;


