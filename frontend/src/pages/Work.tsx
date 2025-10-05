import React from "react";
import { useTranslation } from "react-i18next";
import DetailedWorkSection, { WorkExperience } from "@components/Work/DetailedWorkSection";

const Work: React.FC = () => {
	const { t } = useTranslation("work");
	
	// Récupération des données d'expérience depuis les traductions
	const experienceData = t("experience", { returnObjects: true }) as WorkExperience[];

	return (
		<div className="min-h-screen bg-background flex flex-col items-center pt-20">
			<div className="w-full max-w-6xl mx-auto p-6 mb-8">
				<h1 className="text-5xl md:text-6xl font-title font-bold text-center text-text">
					My Work & Experience
				</h1>
				<p className="text-xl text-primary text-center mt-4 max-w-3xl mx-auto">
					A detailed look at my professional journey, projects, and the technologies I've worked with.
				</p>
			</div>

			<div className="w-full flex flex-col">
				{experienceData.map((work, index) => (
					<DetailedWorkSection key={work.name || index} work={work} />
				))}
			</div>
		</div>
	);
};

export default Work;