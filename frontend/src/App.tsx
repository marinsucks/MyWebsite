import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/Layout";

import Home from "@pages/Home/Home";
//import About from "@pages/About/About";
//import NotFound from "@pages/NotFound";

const App: React.FC = () => (
	<BrowserRouter>
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				{/*<Route path="/about" element={<About />} />
				<Route path="*" element={<NotFound />} />*/}
			</Routes>
		</Layout>
	</BrowserRouter>
);

export default App;