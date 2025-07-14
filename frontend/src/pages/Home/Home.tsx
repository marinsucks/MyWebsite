import React from 'react';

import IntroductionSection from '@pages/Home/IntroductionSection';
import WorksSection from '@pages/Home/WorksSection';

const Home: React.FC = () => {
	return (
		<div className="items-center justify-center">
			<IntroductionSection />
			<WorksSection />
		</div>
	);
};

export default Home;
