//! featured Work Section Component, below is an idea but create a full page for it !!

/**
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


export type WorkProps = {
    title: string;
    summary: string;
    tags: {
        technical: string[];
        thematical: string[];
    };
    onClick: () => void;
};

const WorkSummary: React.FC<WorkProps> = ({
    title,
    summary,
    tags,
    onClick,
}) => (
    <button
        type="button"
        onClick={onClick}
        className="
            group/item
            w-full text-left bg-background p-6 mb-4
            rounded-lg border border-secondary
            hover:z-10
            hover:shadow-[0_0_24px_4px_theme('colors.secondary')]
            focus:shadow-[0_0_24px_4px_theme('colors.secondary')]"
        aria-label={`Open details for project: ${title}`}
    >
        <h3 className="text-2xl font-title font-medium mb-1 text-text group-hover:text-accent group-focus:text-accent transition">
            {title}
        </h3>
        <p className="text-primary mb-3 truncate">{summary}</p>
        <div className="flex flex-wrap gap-2 mb-1 pb-2">
            {tags.technical.map((tag) => (
                <span
                    key={tag}
                    className="
                        text-accent
                        bg-accent/10
                        text-xs font-medium 
                        px-3 py-1 
                        rounded-full"
                >
                    {tag}
                </span>
            ))}
        </div>
        <div className="flex flex-wrap gap-2">
            {tags.thematical.map((tag) => (
                <span
                    key={tag}
                    className="
                        text-accent
                        bg-accent/10
                        text-xs font-medium 
                        px-3 py-1 
                        rounded-full"
                >
                    {tag}
                </span>
            ))}
        </div>
    </button>
);
 
const SummarizedWorksSection: React.FC = () => {
	const { t } = useTranslation("work");

	const experienceData = t("experience", { returnObjects: true }) as Array<{
		name: string;
		title: string;
		tags: { technical: string[]; thematical: string[] };
		summary: string;
	}>;

	const works: WorkProps[] = [
		...experienceData.map((item) => ({
			title: item.title,
			tags: item.tags,
			summary: item.summary,
			onClick: () => {
				alert(
					`${item.title}\n\nTags: ${item.tags.technical.join(", ")}, ${item.tags.thematical.join(", ")}\n\nDescription: ${item.summary}`
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
					<WorkSummary
						key={index}
						title={work.title}
						summary={work.summary}
						tags={work.tags}
						onClick={work.onClick}
					/>
				))}
			</div>
		</Section>
	);
}

export default SummarizedWorksSection;