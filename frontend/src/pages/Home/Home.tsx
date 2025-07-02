import React from 'react';
import { useTranslation } from 'react-i18next';

import IntroductionSection from '@pages/Home/IntroductionSection';
import Options from '@components/Options';

const Home: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center justify-center">
			<IntroductionSection />
			{/*{<Works></Works>}*/}
			<Options />
		</div>
	);
};

export default Home;
