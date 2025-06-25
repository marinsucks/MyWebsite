import '@contexts/i18n/i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@styles/main.css';

import App from './App';
import { DarkModeProvider } from '@contexts/DarkModeContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<DarkModeProvider>
			<App />
		</DarkModeProvider>
	</React.StrictMode>
);

console.log("TypeScript config works!");