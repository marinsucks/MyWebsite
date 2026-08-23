import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface DonutDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

const FRAME_WIDTH = 64;
const FRAME_HEIGHT = 32;
const VERTICAL_PROJECTION_HEIGHT = 24;
const SHADES = ".,-~:;=!*#$@";

const renderDonutFrame = (rotationX: number, rotationZ: number) => {
	const output = new Array<string>(FRAME_WIDTH * FRAME_HEIGHT).fill(" ");
	const depth = new Float32Array(FRAME_WIDTH * FRAME_HEIGHT);
	const cosX = Math.cos(rotationX);
	const sinX = Math.sin(rotationX);
	const cosZ = Math.cos(rotationZ);
	const sinZ = Math.sin(rotationZ);

	for (let ring = 0; ring < Math.PI * 2; ring += 0.08) {
		const cosRing = Math.cos(ring);
		const sinRing = Math.sin(ring);

		for (let tube = 0; tube < Math.PI * 2; tube += 0.035) {
			const cosTube = Math.cos(tube);
			const sinTube = Math.sin(tube);
			const radius = 2 + cosTube;

			const baseX = radius * cosRing;
			const baseY = radius * sinRing;
			const baseZ = sinTube;

			const rotatedY = baseY * cosX - baseZ * sinX;
			const rotatedZ = baseY * sinX + baseZ * cosX;
			const rotatedX = baseX * cosZ - rotatedY * sinZ;
			const finalY = baseX * sinZ + rotatedY * cosZ;
			const inverseDepth = 1 / (rotatedZ + 6);

			const screenX = Math.floor(FRAME_WIDTH / 2 + FRAME_WIDTH * 0.72 * rotatedX * inverseDepth);
			const screenY = Math.floor(
				FRAME_HEIGHT / 2 - VERTICAL_PROJECTION_HEIGHT * 1.08 * finalY * inverseDepth,
			);

			if (screenX < 0 || screenX >= FRAME_WIDTH || screenY < 0 || screenY >= FRAME_HEIGHT) continue;

			const normalX = cosTube * cosRing;
			const normalY = cosTube * sinRing;
			const normalZ = sinTube;
			const tiltedNormalY = normalY * cosX - normalZ * sinX;
			const tiltedNormalZ = normalY * sinX + normalZ * cosX;
			const finalNormalY = normalX * sinZ + tiltedNormalY * cosZ;
			const light = -0.65 * finalNormalY - 0.75 * tiltedNormalZ;
			const index = screenX + screenY * FRAME_WIDTH;

			if (light > 0 && inverseDepth > depth[index]) {
				depth[index] = inverseDepth;
				const shadeIndex = Math.min(SHADES.length - 1, Math.floor(light * (SHADES.length - 1)));
				output[index] = SHADES[shadeIndex];
			}
		}
	}

	let frame = "";
	for (let row = 0; row < FRAME_HEIGHT; row += 1) {
		frame += output.slice(row * FRAME_WIDTH, (row + 1) * FRAME_WIDTH).join("");
		if (row < FRAME_HEIGHT - 1) frame += "\n";
	}
	return frame;
};

const DonutDialog: React.FC<DonutDialogProps> = ({ isOpen, onClose }) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [frame, setFrame] = useState(() => renderDonutFrame(0.65, 0));
	const { t } = useTranslation("about");

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen && !dialog.open) dialog.showModal();
		if (!isOpen && dialog.open) dialog.close();
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		let elapsed = 0;
		let rotationZ = 0;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		setFrame(renderDonutFrame(0.65, rotationZ));

		if (reducedMotion) return;

		const animation = window.setInterval(() => {
			elapsed += 0.065;
			rotationZ += 0.06;
			const rotationX = 0.65 + Math.sin(elapsed * 1.2) * 0.22;
			setFrame(renderDonutFrame(rotationX, rotationZ));
		}, 50);

		return () => window.clearInterval(animation);
	}, [isOpen]);

	return (
		<dialog
			ref={dialogRef}
			className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-xl border border-secondary bg-background p-0 text-text shadow-2xl backdrop:bg-background-dark/80 backdrop:backdrop-blur-sm"
			onClose={onClose}
			onClick={(event) => {
				if (event.target === event.currentTarget) event.currentTarget.close();
			}}
			aria-labelledby="donut-dialog-title"
		>
			<div className="p-4 sm:p-7">
				<div className="mb-4 flex items-start justify-between gap-4">
					<div>
						<p className="mb-1 font-mono text-xs font-semibold tracking-widest text-accent">
							{t("donut.eyebrow")}
						</p>
						<h2 id="donut-dialog-title" className="font-title text-2xl font-bold text-text sm:text-3xl">
							{t("donut.title")}
						</h2>
					</div>
					<button
						type="button"
						onClick={() => dialogRef.current?.close()}
						className="flex h-10 w-10 flex-none items-center justify-center rounded-lg text-primary transition-colors hover:bg-secondary/30 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
						aria-label={t("donut.close")}
					>
						<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
						</svg>
					</button>
				</div>

				<div className="flex min-h-64 items-center justify-center overflow-hidden rounded-lg border border-secondary/60 bg-background-dark/60 px-2 py-6 sm:min-h-80 sm:px-4 sm:py-8">
					<pre
						className="select-none font-mono text-[7px] font-semibold leading-[7px] text-accent sm:text-[10px] sm:leading-[10px] md:text-[11px] md:leading-[11px]"
						aria-label={t("donut.animationLabel")}
					>
						{frame}
					</pre>
				</div>

				<div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
					<a
						href="https://www.asciiart.eu/animations/ascii-spinning-donut"
						target="_blank"
						rel="noopener noreferrer"
						className="font-mono text-xs text-primary underline decoration-secondary underline-offset-4 transition-colors hover:text-accent"
					>
						{t("donut.credit")}
					</a>
					<button
						type="button"
						onClick={() => dialogRef.current?.close()}
						className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 font-title font-semibold text-accent transition-colors hover:bg-accent hover:text-background"
					>
						{t("donut.dismiss")}
					</button>
				</div>
			</div>
		</dialog>
	);
};

export default DonutDialog;
