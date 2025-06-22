import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/Layout";

import Home from "./pages/Home";
//import About from "./pages/About";
//import Projects from "./pages/Projects";
//import NotFound from "./pages/NotFound";

const App: React.FC = () => (
	<BrowserRouter>
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				{/*<Route path="/about" element={<About />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="*" element={<NotFound />} />*/}
			</Routes>
		</Layout>
	</BrowserRouter>
);

export default App;