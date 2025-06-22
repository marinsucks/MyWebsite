import React from 'react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
	const { t } = useTranslation();

	return (
		//<div className="flex items-center justify-center bg-background">
			<h1 className="font-title text-4xl text-text p-6 rounded-lg shadow-md text-center">
				{t('welcome')}
			</h1>
		//</div>
	);
};

export default Home;
