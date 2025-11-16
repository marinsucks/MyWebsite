import React from 'react';

// import IntroductionSection from '@components/IntroductionSection';
// import DetailedWorksSection from '@pages/Home/DetailedWorksSection';
import { Trans, useTranslation } from "react-i18next";
import DetailedWorkSection, { WorkExperience } from "@components/Work/DetailedWorkSection";
import Section from '@components/Layout/Section';



const IntroductionSection: React.FC = () => {
	const { t } = useTranslation("home");

	return (
		<Section className="flex flex-col gap-y-20 py-20">

			{/* Greetings */}
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

			{/* Aims */}
			<div className="text-right items-end">
				<p className="text-3xl md:text-4xl font-title text-text mt-8 p-2 leading-tight">
					<Trans
						i18nKey="description.quality"
						ns="home"
						components={{
							reliable: <span className="text-accent font-semibold"></span>,
							clean: <span className="text-accent font-semibold"></span>,
							accessible: <span className="text-accent font-semibold"></span>
						}}
					/>
				</p>
			</div>
		</Section>
	);
}

const WorksSection: React.FC = () => {
	const { t } = useTranslation("work");
	
	// Récupération des données d'expérience depuis les traductions
	const experienceData = t("experience", { returnObjects: true }) as WorkExperience[];

	return (
		<Section>
			<h2 className="text-3xl font-title font-bold text-text mb-6">
				{t("featuredTitle")}
			</h2>
			{experienceData.map((work, index) => (
				<DetailedWorkSection key={work.name || index} work={work} />
			))}
		</Section>
	);
};

const Home: React.FC = () => {

	return (
		<div className="items-center justify-center">
			<IntroductionSection />
			<WorksSection />
		</div>
	);
};

export default Home;
