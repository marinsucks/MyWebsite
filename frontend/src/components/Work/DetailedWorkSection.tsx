import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export interface Task {
    title: string;
    summary: string;
    link?: string | null;
    media?: {
        image: string;
        alt: string;
    };
}

export interface Project {
    title: string;
    summary: string;
    link?: string | null;
    media?: {
        image: string;
        alt: string;
    };
}

export interface Milestone {
    period: string;
    title: string;
}

export interface WorkExperience {
    name: string;
    title: string;
    organization?: string;
    period?: string;
    tags: {
        technical: string[];
        thematical: string[];
    };
    summary: string;
    description?: string;
    link?: string;
    tasksTitle?: string;
    tasks?: Task[];
    milestones?: Milestone[];
    projectsTitle?: string;
    projects?: Project[];
}

interface DetailedWorkSectionProps {
    work: WorkExperience;
}

const ExternalLinkIcon: React.FC = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const WorkTasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    const { t } = useTranslation("work");

    return (
        <div className="space-y-5">
            {tasks.map((task) => (
                <div key={task.title} className="flex items-start gap-4">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-accent" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                            <h4 className="font-title text-lg font-semibold text-text sm:text-xl">
                                {task.title}
                            </h4>
                            {task.link && (
                                <a
                                    href={task.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 flex-none text-accent transition-colors hover:text-accent/70"
                                    aria-label={t("accessibility.viewTask", { title: task.title })}
                                >
                                    <ExternalLinkIcon />
                                </a>
                            )}
                        </div>
                        {task.summary && task.summary !== "TODO" ? (
                            <p className="mt-1 leading-relaxed text-primary">{task.summary}</p>
                        ) : (
                            <p className="mt-1 italic text-secondary/60">{t("common:comingSoon")}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

const WorkProjects: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const { t } = useTranslation("work");

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
                const card = (
                    <div className="group h-full rounded-lg border border-secondary/50 bg-background/50 p-5 transition-all hover:border-accent/40 hover:shadow-lg">
                        <div className="mb-2 flex items-start justify-between gap-3">
                            <h4 className="font-title text-lg font-semibold text-text transition-colors group-hover:text-accent">
                                {project.title}
                            </h4>
                            {project.link && <ExternalLinkIcon />}
                        </div>
                        {project.summary && project.summary !== "TODO" ? (
                            <p className="text-sm leading-relaxed text-primary">{project.summary}</p>
                        ) : (
                            <p className="text-sm italic text-secondary/60">{t("common:comingSoon")}</p>
                        )}
                    </div>
                );

                return project.link ? (
                    <a
                        key={project.title}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        aria-label={t("accessibility.viewProject", { title: project.title })}
                    >
                        {card}
                    </a>
                ) : (
                    <div key={project.title}>{card}</div>
                );
            })}
        </div>
    );
};

const WorkMilestones: React.FC<{ milestones: Milestone[] }> = ({ milestones }) => (
    <div className="space-y-4">
        {milestones.map((milestone) => (
            <div
                key={`${milestone.period}-${milestone.title}`}
                className="rounded-r-lg border-l-2 border-accent bg-secondary/10 px-4 py-3"
            >
                <p className="font-mono text-xs font-semibold text-accent sm:text-sm">{milestone.period}</p>
                <h4 className="mt-1 font-title text-base font-semibold text-text sm:text-lg">{milestone.title}</h4>
            </div>
        ))}
    </div>
);

const WorkTags: React.FC<{ work: WorkExperience }> = ({ work }) => (
    <div className="flex flex-wrap gap-2">
        {work.tags.technical.map((tag) => (
            <span
                key={tag}
                className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent sm:text-sm"
            >
                {tag}
            </span>
        ))}
        {work.tags.thematical.map((tag) => (
            <span
                key={tag}
                className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-primary sm:text-sm"
            >
                {tag}
            </span>
        ))}
    </div>
);

export const DetailedWorkSection: React.FC<DetailedWorkSectionProps> = ({ work }) => {
    const [expanded, setExpanded] = useState(false);
    const { t } = useTranslation("work");
    const hasDescription = work.description && work.description !== "TODO";
    const hasDetails = hasDescription || Boolean(work.tasks?.length) || Boolean(work.projects?.length);

    return (
        <article className="rounded-xl border border-secondary bg-background/90 p-6 shadow-sm backdrop-blur-sm sm:p-8">
			<div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="font-title text-2xl font-bold leading-tight text-text sm:text-3xl">
                    {work.title}
                </h2>
                {work.link && work.organization && (
                    <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-lg border border-accent/20 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
                    >
                        {work.organization}
                        <ExternalLinkIcon />
                    </a>
                )}
            </div>

            <p className="mt-5 max-w-4xl text-base leading-relaxed text-primary sm:text-lg">{work.summary}</p>

            <div className="mt-6">
                <WorkTags work={work} />
            </div>

            {work.milestones && work.milestones.length > 0 && (
                <div className="mt-8">
					<h3 className="mb-4 font-title text-lg font-semibold text-text">{t("journeyTitle")}</h3>
                    <WorkMilestones milestones={work.milestones} />
                </div>
            )}

            {hasDetails && (
                <details
                    className="group/details mt-8 border-t border-secondary/60 pt-2"
                    onToggle={(event) => setExpanded(event.currentTarget.open)}
                >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-1 py-4 font-title font-semibold text-accent transition-colors hover:text-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
                        <span>{t(expanded ? "details.collapse" : "details.expand")}</span>
                        <svg
                            className={`h-5 w-5 flex-none transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
                        </svg>
                    </summary>

					<div className="space-y-10 pb-2 pt-4">
                        {hasDescription && (
                            <section>
                                <h3 className="mb-3 font-title text-xl font-semibold text-text">{t("aboutTitle")}</h3>
                                <p className="max-w-4xl leading-relaxed text-primary">{work.description}</p>
                            </section>
                        )}

                        {work.tasks && work.tasks.length > 0 && (
                            <section>
                                <h3 className="mb-5 font-title text-xl font-semibold text-text">
                                    {work.tasksTitle || t("responsibilitiesTitle")}
                                </h3>
                                <WorkTasks tasks={work.tasks} />
                            </section>
                        )}

                        {work.projects && work.projects.length > 0 && (
                            <section>
                                <h3 className="mb-5 font-title text-xl font-semibold text-text">
                                    {work.projectsTitle || t("projectsTitle")}
                                </h3>
                                <WorkProjects projects={work.projects} />
                            </section>
                        )}
                    </div>
                </details>
            )}
        </article>
    );
};

export default DetailedWorkSection;
