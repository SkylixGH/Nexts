import {defineConfig} from '@nexts-stack/cli-service';

export default defineConfig({
	version: '1.0.0',
	typescript: true,
	author: 'SkylixGH',
	node: {
		minVersion: '17.2.0',
		maxVersion: '17.6.0',
	},
	apps: [
		{
			type: 'desktop',
			path: './apps/desktop',
			description: 'This is a desktop app',
			keywords: ['desktop', 'app'],
			displayName: 'My Desktop App',
			name: 'desk',
			id: 'net.skylix.desktop',
			rootElementID: 'root',
			icons: {
				windowsLinux: './resources/icons/win-256x256.ico',
				mac: './resources/icons/mac-256x256.icns',
				titleBarDark: './resources/icons/TitleBarDark.svg',
				titleBarLight: './resources/icons/TitleBarLight.svg',
			},
			main: {
				backend: './src/main.ts',
				frontend: './src/se.tsx',
			},
			dependencies: {
				'@nexts-stack/desktop': '../../../packages/desktop',
				'@nexts-stack/desktop-uix': '../../../packages/desktop-uix',
				'sass': '^1.49.9',
				'postcss-scss': '^4.0.3',
			},
		},
		// {
		// 	type: 'mobile',
		// 	path: './apps/mobile',
		// 	description: 'This is a mobile app',
		// 	keywords: ['mobile', 'app'],
		// 	name: 'My Mobile App',
		// 	main: 'sda',
		// 	id: 'net.skylix.mobile',
		// 	displayName: 'My Mobile App',
		// },
		// {
		// 	type: 'node',
		// 	path: './apps/server',
		// 	description: 'This is a server app',
		// 	keywords: ['server', 'app'],
		// 	name: 'My Server App',
		// },
	],
	packages: [
		{
			path: './packages/api-interfaces',
			name: 'api-interfaces',
			// org: 'xfaon-foundation',
			main: 'src/main/index.ts',
			description: 'This is a package for the API types',
			keywords: ['api', 'package'],
		},
		{
			path: './packages/api-client',
			name: 'api-client-xf-founders',
			// org: 'xfaon-foundation',
			main: 'src/index.ts',
			description: 'This is a package for the API client',
			keywords: ['api', 'package'],
		},
		{
			path: './packages/my-ext',
			name: 'my-ext',
			main: 'plugin.ts',
			dependencies: {
				'@nexts-stack/desktop-plugin': '../../../packages/desktop-plugin',
			},
		},
	],
});
