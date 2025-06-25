import React from 'react';
import { useTranslation } from 'react-i18next';

import GreetingSection from '@pages/Home/GreetingSection';
import Options from '@components/Options';

const Home: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center justify-center">
			<GreetingSection />
			{/*{<Works></Works>}*/}
			<Options />
		</div>
	);
};

export default Home;
