import React from "react";

export type WorkProps = {
	title: string;
	description: string;
	tags: {
		technical: string[];
		thematical: string[];
	};
	onClick: () => void;
};

const WorkItem: React.FC<WorkProps> = ({
	title,
	description,
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
		<p className="text-primary mb-3 truncate">{description}</p>
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

export default WorkItem;