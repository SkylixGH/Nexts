/**
 * The Nexts config
 */
export default interface UserConfig {
	/**
	 * The project version
	 */
	version: string;

	/**
	 * Whether the project uses typescript
	 */
	typescript: boolean;

	/**
	 * The project author
	 */
	author: string;

	/**
	 * The project environment settings
	 */
	node?: {
		/**
		 * The minimum node version
		 */
		minVersion: string;

		/**
		 * The maximum node version
		 */
		maxVersion: string;
	},

	/**
	 * The project user/server applications
	 */
	apps: {
		/**
		 * The app's display name
		 */
		name: string;

		/**
		 * The app type
		 */
		type: 'desktop' | 'mobile' | 'web' | 'node';

		/**
		 * The app's root path
		 */
		path: string;

		/**
		 * The app's description
		 */
		description: string;

		/**
		 * The app's keywords
		 */
		keywords: string[];
	}[];

	/**
	 * The project packages
	 */
	packages: {
		/**
		 * The package name
		 */
		name: string;

		/**
		 * The path to the package root
		 */
		path: string;

		/**
		 * The package entry script
		 */
		main: string;

		/**
		 * The package description
		 */
		description: string;

		/**
		 * The package keywords
		 */
		keywords: string[];
	}[];
}
