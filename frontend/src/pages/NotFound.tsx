import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "@components/Layout/Section";

const NotFound: React.FC = () => {
    const { t } = useTranslation("common");

    return (
        <Section className="flex flex-col items-center justify-center min-h-full h-full">
            <h1 className="text-6xl font-title font-extrabold text-accent mb-2">
                404
            </h1>
            <h2 className="text-3xl font-title font-bold text-text mb-2">
                {t("notFound.title")}
            </h2>
            <p className="text-lg text-primary mb-6 max-w-xl text-center">
                {t("notFound.description")}
            </p>
            <Link
                to="/"
                className="
                    font-semibold text-lg rounded-full border
                    text-accent border-accent
                    px-6 py-3 
                    hover:bg-accent hover:text-text
                    transition-colors"
            >
                {t("notFound.backToHome")}
            </Link>
        </Section>
    );
};

export default NotFound;
