import {defineConfig} from '@nexts-stack/cli-service'

export default defineConfig({
	version: '1.0.0',
	typescript: true,
	author: 'SkylixGH',
	node: {
		minVersion: '16.*',
		maxVersion: '*',
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
		},
		// {
		// 	type: 'mobile',
		// 	path: './apps/mobile',
		// 	description: 'This is a mobile app',
		// 	keywords: ['mobile', 'app'],
		// 	name: 'My Mobile App',
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
	],
})
