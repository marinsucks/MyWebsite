import React from 'react';

import IntroductionSection from '@pages/Home/IntroductionSection';
import FeaturedWorksSection from '@pages/Home/FeaturedWorksSection';

const Home: React.FC = () => {
	return (
		<div className="items-center justify-center">
			<IntroductionSection />
			<FeaturedWorksSection />
		</div>
	);
};

export default Home;
