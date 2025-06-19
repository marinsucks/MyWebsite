import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
	build: {
		outDir: 'dist', // Output directory for the build
	},
	server: {
		host: '0.0.0.0',
		port: 443,
		https: {
			key: fs.readFileSync('/etc/ssl/certs/frontend.key'),
			cert: fs.readFileSync('/etc/ssl/certs/frontend.crt'),
		}
	},
});