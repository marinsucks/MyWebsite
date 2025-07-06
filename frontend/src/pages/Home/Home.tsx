import React from 'react';

import IntroductionSection from '@pages/Home/IntroductionSection';
import WorksSection from '@pages/Home/WorksSection';
import Options from '@components/Options';

const Home: React.FC = () => {
	return (
		<main className="flex flex-col items-center justify-center">
			<IntroductionSection />
			<WorksSection />
			<Options />
		</main>
	);
};

export default Home;
