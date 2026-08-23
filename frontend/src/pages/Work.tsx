import React from "react";
import { useTranslation } from "react-i18next";
import DetailedWorkSection, { WorkExperience } from "@components/Work/DetailedWorkSection";
import Section from "@components/Layout/Section";

const Work: React.FC = () => {
	const { t } = useTranslation("work");
	
	// Récupération des données d'expérience depuis les traductions
	const experienceData = t("experience", { returnObjects: true }) as WorkExperience[];

	return (
		<div className="flex w-full flex-col">
			<Section className="pb-24 pt-16 sm:pb-28 sm:pt-20">
				<div className="text-center">
				<h1 className="text-center font-title text-5xl font-extrabold tracking-tight text-text sm:text-6xl md:text-7xl">
					{t("pageTitle")}
				</h1>
				</div>

				<div className="relative mt-20 sm:mt-24">
					<div
						className="absolute bottom-8 left-[7px] top-2 w-px bg-secondary sm:left-[11px]"
						aria-hidden="true"
					/>
					<ol className="space-y-16 sm:space-y-20" aria-label={t("timelineLabel")}>
						{experienceData.map((work, index) => (
							<li key={work.name || index} className="relative pl-8 sm:pl-14">
								<span
									className="absolute left-0 top-0.5 h-4 w-4 rounded-full border-[3px] border-accent bg-background sm:h-6 sm:w-6 sm:border-4"
									aria-hidden="true"
								/>
								<p className="mb-4 font-mono text-sm font-semibold text-accent">
									{work.period || t("timelineUndated")}
								</p>
								<DetailedWorkSection work={work} />
							</li>
						))}
					</ol>
				</div>
			</Section>
		</div>
	);
};

export default Work;
