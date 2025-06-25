import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [
		react(),
		svgr()
	],
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
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@contexts': path.resolve(__dirname, 'src/contexts'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@types': path.resolve(__dirname, 'src/types'),
			'@utils': path.resolve(__dirname, 'src/utils'),
		}
	}
});