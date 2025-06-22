import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	server: {
		host: '0.0.0.0',
		port: 443,
		https: {
			key: fs.readFileSync('/etc/ssl/certs/frontend.key'),
			cert: fs.readFileSync('/etc/ssl/certs/frontend.crt'),
		}
	},
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@utils': path.resolve(__dirname, 'src/utils'),
		}
	}
});