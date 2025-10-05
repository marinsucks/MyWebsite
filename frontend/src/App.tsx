import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/Layout/Layout";

import Home from "@pages/Home";
// import Work from "@pages/Work";
import NotFound from "@pages/NotFound";
//import About from "@pages/About/About";

const App: React.FC = () => (
	<BrowserRouter>
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/work" element={<Work />} /> */}
				{/* <Route path="/about" element={<About />} /> */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	</BrowserRouter>
);

export default App;