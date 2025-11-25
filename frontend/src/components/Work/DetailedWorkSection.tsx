import React from "react";
import Section from "@components/Layout/Section";
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

export interface WorkExperience {
    name: string;
    title: string;
    organization?: string;
    tags: {
        technical: string[];
        thematical: string[];
    };
    summary: string;
    description: string;
    link: string;
    tasksTitle?: string;
    tasks?: Task[];
    projectsTitle?: string;
    projects?: Project[];
}

interface DetailedWorkSectionProps {
    work: WorkExperience;
}

// Composant pour afficher les tasks en disposition tree
const WorkTasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    const { t } = useTranslation();
    return (
        <div className="space-y-4">
            {tasks.map((task, index) => {
                const isLast = index === tasks.length - 1;
                const treeChar = isLast ? "└──" : "├──";
                
                return (
                    <div key={index} className="flex items-start">
                        {/* Caractère tree */}
                        <div className="flex-shrink-0 mr-4 mt-1">
                            <span className="text-accent font-mono text-lg font-medium">
                                {treeChar}
                            </span>
                        </div>
                        
                        {/* Contenu de la task */}
                        <div className="flex-1 bg-background/50 transition-colors">
                            <div className="flex items-start justify-between">
                                <h4 className="text-xl font-title font-medium text-text">
                                    {task.title}
                                </h4>
                                {task.link && (
                                    <a
                                        href={task.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent hover:text-accent/80 transition-colors flex-shrink-0 ml-2"
                                        aria-label={`View ${task.title} details`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                            
                            {task.summary && task.summary !== "TODO" ? (
                                <p className="text-primary leading-relaxed">
                                    {task.summary}
                                </p>
                            ) : (
                                <p className="text-secondary/60 italic">
                                    {t("common:comingSoon")}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Composant pour afficher les projets en disposition grid/cards
const WorkProjects: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const { t } = useTranslation();
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
                const ProjectCard = (
                    <div
                        className="
                            bg-background/50 
                            border border-secondary/50 
                            rounded-lg p-6
                            hover:border-accent/30
                            hover:shadow-lg
                            transition-all
                            group
                            cursor-pointer
                        "
                    >
                        <div className="flex items-start justify-between mb-3">
                            <h4 className="text-xl font-title font-medium text-text group-hover:text-accent transition-colors">
                                {project.title}
                            </h4>
                            {project.link && (
                                <div className="text-accent flex-shrink-0 ml-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        
                        {project.summary && project.summary !== "TODO" ? (
                            <p className="text-primary text-sm leading-relaxed">
                                {project.summary}
                            </p>
                        ) : (
                            <p className="text-secondary/60 text-sm italic">
                                {t("common:comingSoon")}
                            </p>
                        )}
                    </div>
                );

                return project.link ? (
                    <a
                        key={index}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        aria-label={`View ${project.title} project`}
                    >
                        {ProjectCard}
                    </a>
                ) : (
                    <div key={index}>
                        {ProjectCard}
                    </div>
                );
            })}
        </div>
    );
};

// Composant principal
export const DetailedWorkSection: React.FC<DetailedWorkSectionProps> = ({ work }) => {
    const { t } = useTranslation("work");
    const aboutTitle = t("aboutTitle");
    const responsibilitiesTitle = t("responsibilitiesTitle");
    const projectsTitle = t("projectsTitle");
    
    return (
        <Section>
            <div className="bg-background border border-secondary rounded-lg p-8">
                {/* Header avec titre et lien */}
                <div className="mb-8 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-4xl font-title font-bold text-text mb-2">
                                {work.title}
                            </h2>
                        </div>
                        {work.link && work.organization && (
                            <a
                                href={work.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    px-4 py-2 
                                    bg-accent/10 text-accent 
                                    rounded-lg border border-accent/20
                                    hover:bg-accent/20 
                                    transition-colors
                                    font-medium
                                    w-fit
                                "
                            >
                                📍 {work.organization}
                            </a>
                        )}
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {work.tags.technical.map((tag) => (
                            <span
                                key={tag}
                                className="
                                    text-accent
                                    bg-accent/10
                                    text-sm font-medium 
                                    px-3 py-1 
                                    rounded-full
                                    border border-accent/20
                                "
                            >
                                {tag}
                            </span>
                        ))}
                        {work.tags.thematical.map((tag) => (
                            <span
                                key={tag}
                                className="
                                    text-secondary
                                    bg-secondary/10
                                    text-sm font-medium 
                                    px-3 py-1 
                                    rounded-full
                                    border border-secondary/20
                                "
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Summary */}
                    <p className="text-lg text-primary leading-relaxed">
                        {work.summary}
                    </p>
                </div>

                {/* Description */}
                {work.description && work.description !== "TODO" && (
                    <div className="mb-8">
                        <h3 className="text-2xl font-title font-semibold text-text mb-4">
                            {aboutTitle}
                        </h3>
                        <p className="text-primary leading-relaxed">
                            {work.description}
                        </p>
                    </div>
                )}

                {/* Tasks Section */}
                {work.tasks && work.tasks.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-title font-semibold text-text mb-6">
                            {work.tasksTitle || responsibilitiesTitle}
                        </h3>
                        <WorkTasks tasks={work.tasks} />
                    </div>
                )}

                {/* Projects Section */}
                {work.projects && work.projects.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-title font-semibold text-text mb-6">
                            {projectsTitle}
                        </h3>
                        <WorkProjects projects={work.projects} />
                    </div>
                )}
            </div>
        </Section>
    );
};

export default DetailedWorkSection;