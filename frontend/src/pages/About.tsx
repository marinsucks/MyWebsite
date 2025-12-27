import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '@components/Layout/Section';
import me from '@assets/photos/me.jpg';

const H2: React.FC<{ content: string }> = ({ content }) => {
  return (
    <h2 className="text-2xl md:text-3xl font-title font-bold text-text mb-6">
      {content}
    </h2>
  );
}

const P: React.FC<{ content: string }> = ({ content }) => {
    return (
        <p className="text-lg md:text-xl text-primary leading-relaxed">
          {content}
        </p>
    );
}

const About: React.FC = () => {
  const { t } = useTranslation('about');

  return (
    <div className="flex flex-col w-full">
      <Section>
        <h1 className="font-title text-center text-6xl md:text-7xl text-text font-extrabold tracking-tight ">
          {t('title')}
        </h1>
      </Section>

      <Section>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="lg:order-1 w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
            <img src={me} alt="Me" className="rounded-tr-3xl rounded-bl-3xl rounded-br-3xl shadow-lg w-full h-full object-cover border-4 border-primary-dark" />
          </div>
          <div className="lg:order-2 flex-1 lg:flex lg:flex-col lg:justify-center lg:h-48 md:lg:h-56">
            <H2 content={t('intro.title')} />
            <P content={t('intro.content')} />
            <br />
            <P content={t('intro.current')} />
          </div>
        </div>
      </Section>

      <Section>
        <H2 content={t('approach.title')} />
        <P content={t('approach.content')} />
      </Section>

      <Section>
        <H2 content={t('philosophy.title')} />
        <P content={t('philosophy.content')} />
      </Section>
    </div>
  );
};

export default About;