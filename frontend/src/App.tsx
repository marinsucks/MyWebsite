import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/Layout/Layout";

import Home from "@pages/Home";
// import Work from "@pages/Work";
import NotFound from "@pages/NotFound";
import About from "@pages/About";
import Manon from "@pages/Manon";

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			{/* Page indépendante sans Layout */}
			<Route path="/manon" element={<Manon />} />
			
			{/* Pages normales avec Layout */}
			<Route
				path="*"
				element={
					<Layout>
						<Routes>
							<Route path="/" element={<Home />} />
							{/* <Route path="/work" element={<Work />} /> */}
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