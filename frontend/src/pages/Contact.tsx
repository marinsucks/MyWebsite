import React, { useRef, useState } from "react";
import {
	Turnstile,
	type TurnstileInstance,
} from "@marsidev/react-turnstile";
import { useTranslation } from "react-i18next";

import Section from "@components/Layout/Section";
import { useDarkMode } from "@hooks/useDarkMode";

type FormState = {
	name: string;
	email: string;
	subject: string;
	message: string;
	website: string;
};

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const initialForm: FormState = {
	name: "",
	email: "",
	subject: "",
	message: "",
	website: "",
};

const inputClassName =
	"mt-2 w-full rounded-lg border border-secondary bg-background/80 px-4 py-3 text-text outline-none transition-colors placeholder:text-primary/50 focus:border-accent focus:ring-2 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60";

const Contact: React.FC = () => {
	const { t, i18n } = useTranslation("contact");
	const [darkMode] = useDarkMode();
	const [form, setForm] = useState<FormState>(initialForm);
	const [turnstileToken, setTurnstileToken] = useState("");
	const [challengeLoadError, setChallengeLoadError] = useState(false);
	const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
	const [status, setStatus] = useState<SubmissionStatus>("idle");
	const [errorKey, setErrorKey] = useState("errors.generic");
	const turnstileRef = useRef<TurnstileInstance>();
	const locale = i18n.resolvedLanguage?.startsWith("fr") ? "fr" : "en";
	const configuredSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
	const siteKey = configuredSiteKey || (import.meta.env.DEV ? TURNSTILE_TEST_SITE_KEY : "");
	const isSubmitting = status === "submitting";

	const updateField = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm((current) => ({
			...current,
			[event.target.name]: event.target.value,
		}));
		if (status !== "submitting") setStatus("idle");
	};

	const resetChallenge = () => {
		setTurnstileToken("");
		turnstileRef.current?.reset();
	};

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!turnstileToken) {
			setErrorKey("errors.challenge");
			setStatus("error");
			return;
		}

		setStatus("submitting");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					...form,
					locale,
					turnstileToken,
					submissionId,
				}),
			});

			if (!response.ok) {
				const errorByStatus: Record<number, string> = {
					400: "errors.validation",
					403: "errors.challenge",
					429: "errors.rateLimit",
					503: "errors.unavailable",
				};
				setErrorKey(errorByStatus[response.status] ?? "errors.generic");
				setStatus("error");
				resetChallenge();
				return;
			}

			setForm(initialForm);
			setSubmissionId(crypto.randomUUID());
			setStatus("success");
			resetChallenge();
		} catch {
			setErrorKey("errors.network");
			setStatus("error");
			resetChallenge();
		}
	};

	return (
		<Section className="pb-16 pt-12 sm:pb-24 sm:pt-16 lg:pb-8">
			<div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
				<div className="lg:pt-8">
					<p className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
						{t("eyebrow")}
					</p>
					<h1 className="mt-4 font-title text-5xl font-extrabold leading-tight tracking-tight text-text sm:text-6xl">
						{t("title")}
					</h1>
					<p className="mt-6 max-w-xl text-lg leading-relaxed text-primary">
						{t("intro")}
					</p>
					<div className="mt-8 rounded-xl border border-secondary/70 bg-background/60 p-5">
						<p className="font-mono text-xs uppercase tracking-wider text-primary/70">
							{t("addressLabel")}
						</p>
						<a
							href="mailto:contact@marinbecker.me"
							className="mt-2 inline-block break-all font-title text-lg font-bold text-text transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
						>
							contact@marinbecker.me
						</a>
					</div>
				</div>

				<form
					onSubmit={submit}
					aria-label={t("formLabel")}
					className="relative rounded-2xl border border-secondary bg-background/90 p-6 shadow-sm backdrop-blur-sm sm:p-8"
				>
					<div className="grid gap-6 sm:grid-cols-2">
						<label className="font-title font-semibold text-text">
							{t("fields.name.label")}
							<input
								name="name"
								type="text"
								autoComplete="name"
								required
								minLength={2}
								maxLength={80}
								value={form.name}
								onChange={updateField}
								disabled={isSubmitting}
								placeholder={t("fields.name.placeholder")}
								className={inputClassName}
							/>
						</label>

						<label className="font-title font-semibold text-text">
							{t("fields.email.label")}
							<input
								name="email"
								type="email"
								inputMode="email"
								autoComplete="email"
								required
								maxLength={254}
								value={form.email}
								onChange={updateField}
								disabled={isSubmitting}
								placeholder={t("fields.email.placeholder")}
								className={inputClassName}
							/>
						</label>
					</div>

					<label className="mt-6 block font-title font-semibold text-text">
						{t("fields.subject.label")}
						<input
							name="subject"
							type="text"
							required
							minLength={3}
							maxLength={120}
							value={form.subject}
							onChange={updateField}
							disabled={isSubmitting}
							placeholder={t("fields.subject.placeholder")}
							className={inputClassName}
						/>
					</label>

					<label className="mt-6 block font-title font-semibold text-text">
						<span className="flex items-center justify-between gap-4">
							<span>{t("fields.message.label")}</span>
							<span className="font-mono text-xs font-normal text-primary/70">
								{form.message.length}/5000
							</span>
						</span>
						<textarea
							name="message"
							required
							maxLength={5_000}
							rows={8}
							value={form.message}
							onChange={updateField}
							disabled={isSubmitting}
							placeholder={t("fields.message.placeholder")}
							className={`${inputClassName} resize-y`}
						/>
					</label>

					<div
						aria-hidden="true"
						className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
					>
						<label>
							Website
							<input
								name="website"
								type="text"
								tabIndex={-1}
								autoComplete="off"
								value={form.website}
								onChange={updateField}
							/>
						</label>
					</div>

					<div className="mt-5">
						{siteKey ? (
							<Turnstile
								key={`${locale}-${darkMode ? "dark" : "light"}`}
								ref={turnstileRef}
								siteKey={siteKey}
								onSuccess={(token) => {
									setTurnstileToken(token);
									setChallengeLoadError(false);
								}}
								onExpire={() => setTurnstileToken("")}
								onError={() => {
									setTurnstileToken("");
									setChallengeLoadError(true);
								}}
								options={{
									action: "contact",
									appearance: "interaction-only",
									language: locale,
									size: "flexible",
									theme: darkMode ? "dark" : "light",
								}}
								className="w-full"
							/>
						) : (
							<p className="text-sm text-accent">{t("errors.challengeConfig")}</p>
						)}
					</div>

					{(status === "success" || status === "error" || challengeLoadError) && (
						<div aria-live="polite" className="mt-4">
							{status === "success" && (
								<div className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-primary" role="status">
									<p className="font-title font-bold">{t("success.title")}</p>
									<p className="mt-1 text-sm">{t("success.body")}</p>
								</div>
							)}
							{status === "error" && (
								<p className="rounded-lg border border-accent/50 bg-accent/10 px-4 py-3 text-sm text-text" role="alert">
									{t(errorKey)}
								</p>
							)}
							{challengeLoadError && status === "idle" && (
								<p className="text-sm text-accent" role="alert">
									{t("errors.challengeLoad")}
								</p>
							)}
						</div>
					)}

					<div className="mt-4 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
						<p className="max-w-sm text-xs leading-relaxed text-primary/70">
							{t("privacy")}
						</p>
						<button
							type="submit"
							disabled={isSubmitting || !turnstileToken || !siteKey}
							className="inline-flex min-w-36 items-center justify-center rounded-lg bg-accent px-6 py-3 font-title font-bold text-background transition-colors hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isSubmitting ? t("submitting") : t("submit")}
						</button>
					</div>
				</form>
			</div>
		</Section>
	);
};

export default Contact;
