//! featured Work Section Component, below is an idea but create a full page for it !!

/**
 * Section Purpose: Renders the "Work" section on the homepage.
 *
 * Hover Effects: - add interactive hover halo around a work item.
 * Tags: - Includes tags for each work item to highlight relevant skills or technologies.
 * Filter/Search: - Could feature a filter or search bar to allow users to quickly find specific work categories or projects.
 * Featured Project: - Consider including a featured project or a carousel of highlighted works.
 * Status Badges: - Optionally, display project completion dates or status badges (e.g., "In Progress", "Completed").
 * Case Studies: - Could integrate links to detailed case studies or external project pages.
 * See More: - Optionally, add a "See More" button to navigate to a dedicated work/portfolio page.
 * Responsive Layout: - Support for responsive layout to ensure optimal display on all devices.
 *
 * @returns The JSX element representing the work section.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import Section from "@components/Layout/Section";

import WorkItem, { WorkProps } from "@components/Home/WorkItem";

const WorksSection: React.FC = () => {
	const { t } = useTranslation("work");

	const experienceData = t("experience", { returnObjects: true }) as Array<{
		name: string;
		title: string;
		tags: { technical: string[]; thematical: string[] };
		description: string;
	}>;
	
	const projectsData = t("projects", { returnObjects: true }) as Array<{
		name: string;
		title: string;
		tags: { technical: string[]; thematical: string[] };
		description: string;
	}>;

	const works: WorkProps[] = [
		...experienceData.map((item) => ({
			title: item.title,
			tags: item.tags,
			description: item.description,
			onClick: () => {
				alert(
					`${item.title}\n\nTags: ${item.tags.technical.join(", ")}, ${item.tags.thematical.join(", ")}\n\nDescription: ${item.description}`
				);
			},
		})),
		...projectsData.map((item) => ({
			title: item.title,
			tags: item.tags,
			description: item.description,
			onClick: () => {
				alert(
					`${item.title}\n\nTags: ${item.tags.technical.join(", ")}, ${item.tags.thematical.join(", ")}\n\nDescription: ${item.description}`
				);
			},
		})),
	];

	return (
		<Section>
			<h2 className="text-3xl font-title font-bold mb-6 text-text">{t("featuredTitle")}</h2>
			<div className="
				flex flex-col gap-6 
				group/works 
				[&:has(:hover)>*:not(:hover)]:opacity-50 
				[&>*]:transition-all 
				[&>*]:duration-150">
				{works.map((work, index) => (
					<WorkItem
						key={index}
						title={work.title}
						description={work.description}
						tags={work.tags}
						onClick={work.onClick}
					/>
				))}
			</div>
		</Section>
	);
}

export default WorksSection;