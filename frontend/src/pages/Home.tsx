import React from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import Section from "@components/Layout/Section";
import aboutSprite from "@assets/sprites/about.png";
import workingSprite from "@assets/sprites/working.png";

interface StatementProps {
	title: string;
	subtitle: React.ReactNode;
	align?: "left" | "right";
	compactTopOnMobile?: boolean;
	children: React.ReactNode;
}

const Statement: React.FC<StatementProps> = ({
	title,
	subtitle,
	align = "left",
	compactTopOnMobile = false,
	children,
}) => {
	const isRightAligned = align === "right";

	return (
		<div
			className={`flex w-full flex-col pb-8 sm:py-12 ${compactTopOnMobile ? "pt-0" : "pt-8"} ${
				isRightAligned ? "items-end text-right" : "items-start text-left"
			}`}
		>
			<h2 className="max-w-4xl font-title text-4xl font-extrabold leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl">
				{title}
			</h2>
			<p className="mt-6 max-w-3xl text-lg leading-relaxed text-primary sm:text-xl">
				{subtitle}
			</p>
			<div className="mt-8">{children}</div>
		</div>
	);
};

const SectionDivider: React.FC<{ featured?: boolean; className?: string }> = ({
	featured = false,
	className = "",
}) => (
	<div
		aria-hidden="true"
		className={`mx-auto h-[3px] w-48 rounded-full bg-gradient-to-r from-transparent to-transparent sm:w-56 ${
			featured
				? "via-accent drop-shadow-[0_0_4px_var(--accent)]"
				: "via-text/40"
		} ${className}`}
	/>
);

const CtaContent: React.FC<{ children: React.ReactNode; arrow?: string }> = ({ children, arrow = "→" }) => (
	<>
		<span>{children}</span>
		<span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
			{arrow}
		</span>
	</>
);

const Home: React.FC = () => {
	const { t } = useTranslation("home");
	const ctaClassName =
		"group inline-flex items-center gap-2 border-b border-accent/40 pb-1 font-mono text-sm font-semibold text-accent transition-colors hover:border-accent hover:text-accent-dark focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-base";

	return (
		<Section className="py-20 sm:py-28">
				<div className="items-start text-left">
					<h3 className="p-2 font-mono text-4xl font-bold text-accent sm:text-5xl md:text-6xl">
						{t("greeting")}
					</h3>
					<h1 className="max-w-5xl p-2 font-title text-6xl font-extrabold tracking-tight text-text sm:text-7xl md:text-8xl">
						{t("name")}
					</h1>
					<p className="mt-6 max-w-3xl p-2 text-xl text-primary md:text-2xl">
						{t("description.role")}
					</p>
				</div>

				<SectionDivider featured className="mt-16 sm:mt-24" />

				<div className="mt-8 flex flex-col">
					<div className="grid items-center gap-4 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(20rem,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
						<Link
							to="/work"
							aria-label={t("statements.work.cta")}
							className="group mx-auto block w-full max-w-2xl rounded-2xl transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:mx-0"
						>
							<img
								src={workingSprite}
								alt=""
								width="1536"
								height="1024"
								loading="lazy"
								decoding="async"
								className="w-full scale-110 object-contain transition-[filter] duration-300 [image-rendering:pixelated] group-hover:drop-shadow-[0_0_14px_var(--secondary)] sm:scale-125"
								aria-hidden="true"
							/>
						</Link>

						<Statement
							title={t("statements.work.title")}
							subtitle={(
								<Trans
									i18nKey="statements.work.subtitle"
									ns="home"
									components={{
										git: <code className="rounded bg-secondary/20 px-1.5 py-0.5 font-mono text-[0.9em]" />,
									}}
								/>
							)}
							align="right"
							compactTopOnMobile
						>
							<Link to="/work" className={ctaClassName}>
								<CtaContent>{t("statements.work.cta")}</CtaContent>
							</Link>
						</Statement>
					</div>

					<SectionDivider className="my-8 sm:my-12" />

					<div className="grid items-center gap-4 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:gap-16">
						<Link
							to="/about"
							aria-label={t("statements.about.cta")}
							className="group mx-auto block w-full max-w-2xl rounded-2xl transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:order-2 lg:ml-auto lg:mr-0"
						>
							<img
								src={aboutSprite}
								alt=""
								width="1536"
								height="1024"
								loading="lazy"
								decoding="async"
								className="w-full scale-110 object-contain transition-[filter] duration-300 [image-rendering:pixelated] group-hover:drop-shadow-[0_0_14px_var(--secondary)] sm:scale-125"
								aria-hidden="true"
							/>
						</Link>

						<div className="lg:order-1">
							<Statement
								title={t("statements.about.title")}
								subtitle={t("statements.about.subtitle")}
								compactTopOnMobile
							>
								<Link to="/about" className={ctaClassName}>
									<CtaContent>{t("statements.about.cta")}</CtaContent>
								</Link>
							</Statement>
						</div>
					</div>

					<SectionDivider className="my-8 sm:my-12" />

					<a
						href="mailto:contact@marinbecker.me"
						className="group my-8 rounded-2xl border-2 border-accent/70 bg-accent/[0.04] px-6 py-10 transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_28px_rgb(from_var(--accent)_r_g_b_/_0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:my-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
					>
						<p className="font-mono text-sm font-semibold uppercase tracking-widest text-accent sm:text-base">
							{t("statements.contact.eyebrow")}
						</p>
						<div className="mt-5 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end lg:gap-12">
							<div>
								<h2 className="max-w-4xl font-title text-4xl font-extrabold leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl">
									{t("statements.contact.title")}
								</h2>
								<p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary sm:text-xl">
									{t("statements.contact.subtitle")}
								</p>
							</div>
							<span className="inline-flex flex-none items-center gap-3 rounded-lg bg-accent px-5 py-3 font-title text-lg font-bold text-background transition-transform duration-300 group-hover:translate-x-1 sm:px-6 sm:py-4">
								{t("statements.contact.cta")}
								<span aria-hidden="true">→</span>
							</span>
						</div>
					</a>
				</div>
			</Section>
	);
};

export default Home;
