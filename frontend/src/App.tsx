import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "@components/Layout/Layout";

import Home from "@pages/Home";
import Work from "@pages/Work";
import NotFound from "@pages/NotFound";
import About from "@pages/About";

const ScrollToTop: React.FC = () => {
	const { pathname } = useLocation();

	React.useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, [pathname]);

	return null;
};

const App: React.FC = () => (
	<BrowserRouter>
		<ScrollToTop />
		<Routes>
			{/* Pages normales avec Layout */}
			<Route
				path="*"
				element={
					<Layout>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/work" element={<Work />} />
							<Route path="/about" element={<About />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Layout>
				}
			/>
		</Routes>
	</BrowserRouter>
);

export default App;
