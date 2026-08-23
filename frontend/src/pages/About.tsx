import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DonutDialog from "@components/DonutDialog";
import Section from "@components/Layout/Section";
import me from "@assets/photos/me.png";
import rotationSprite from "@assets/sprites/rotation.gif";

type ConversationExchange = {
	question: string;
	answers: string[];
};

interface ChatMessageProps {
	sender: "visitor" | "marin";
	children: React.ReactNode;
	showAvatar?: boolean;
	delayMs?: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
	sender,
	children,
	showAvatar = false,
	delayMs = 0,
}) => {
	const messageRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);
	const isVisitor = sender === "visitor";

	useEffect(() => {
		const message = messageRef.current;
		if (!message) return;

		if (!("IntersectionObserver" in window)) {
			setVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setVisible(true);
				observer.unobserve(entry.target);
			},
			{ threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
		);

		observer.observe(message);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={messageRef}
			className={`flex items-end gap-2 transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
				isVisitor ? "justify-end" : "justify-start"
			} ${
				visible
					? "translate-x-0 translate-y-0 scale-100 opacity-100"
					: isVisitor
						? "translate-x-4 translate-y-2 scale-[0.98] opacity-0"
						: "-translate-x-4 translate-y-2 scale-[0.98] opacity-0"
			}`}
			style={{ transitionDelay: `${delayMs}ms` }}
		>
			{!isVisitor && (
				<div className="h-9 w-9 flex-none" aria-hidden="true">
					{showAvatar && (
						<img
							src={me}
							alt=""
							className="h-full w-full rounded-full border-2 border-primary-dark object-cover"
						/>
					)}
				</div>
			)}

			<div
				className={`max-w-[82%] px-4 py-3 shadow-sm sm:max-w-[76%] sm:px-5 sm:py-4 ${
					isVisitor
						? "rounded-2xl rounded-br-sm bg-accent font-title font-semibold text-background"
						: "rounded-2xl rounded-bl-sm border border-secondary/70 bg-background text-primary"
				}`}
			>
				<p className={isVisitor ? "text-base sm:text-lg" : "text-base leading-relaxed sm:text-lg"}>{children}</p>
			</div>
		</div>
	);
};

const About: React.FC = () => {
	const [donutOpen, setDonutOpen] = useState(false);
	const { t } = useTranslation("about");
	const conversation = t("chat.messages", { returnObjects: true }) as ConversationExchange[];

	return (
		<div className="flex w-full flex-col">
			<Section className="pb-8 pt-16 sm:pb-12">
				<div className="mx-auto flex flex-col items-center justify-center sm:flex-row sm:gap-3">
					<h1 className="text-center font-title text-5xl font-extrabold tracking-tight text-text sm:text-6xl md:text-7xl">
						{t("title")}
					</h1>
					<img
						src={rotationSprite}
						alt=""
						width="256"
						height="256"
						className="-mb-6 -mt-2 h-36 w-36 flex-shrink-0 object-contain [image-rendering:pixelated] sm:-mb-10 sm:-mt-10 sm:h-44 sm:w-44"
						aria-hidden="true"
					/>
				</div>
			</Section>

			<Section className="py-8 sm:py-12">
				<div className="mx-auto w-full max-w-4xl">
					<ol aria-label={t("chat.label")} className="space-y-10 px-1 sm:space-y-14 sm:px-4">
						{conversation.map((exchange, exchangeIndex) => (
							<li key={`${exchangeIndex}-${exchange.question}`} className="space-y-3">
								<ChatMessage sender="visitor">{exchange.question}</ChatMessage>
								{exchange.answers.map((answer, answerIndex) => (
									<ChatMessage
										key={answer}
										sender="marin"
										showAvatar={answerIndex === 0}
										delayMs={Math.min(answerIndex, 2) * 80}
									>
										{answer}
									</ChatMessage>
								))}
							</li>
						))}
					</ol>

					<div className="mt-16 flex justify-center sm:mt-20">
						<button
							type="button"
							onClick={() => setDonutOpen(true)}
							className="group inline-flex items-center gap-2 rounded-full border border-secondary/60 bg-background/60 px-4 py-2 font-mono text-xs text-primary/70 transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-sm"
						>
							<span aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-12">◎</span>
							{t("easterEgg.cta")}
						</button>
					</div>
				</div>
			</Section>

			<DonutDialog isOpen={donutOpen} onClose={() => setDonutOpen(false)} />
		</div>
	);
};

export default About;
