/**
 * An app entry.
 */
export interface App {
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
	description?: string;

	/**
	 * The app's keywords
	 */
	keywords?: string[];

	/**
	 * The app's display name
	 */
	displayName: string;

	/**
	 * The product ID
	 */
	id: string;

	/**
	 * The app dependencies
	 */
	dependencies?: {
		[name: string]: string;
	}
}

/**
 * The NEXTS  config.
 */
export default interface UserConfig {
	/**
	 * The project version
	 */
	version: string;

	/**
	 * Whether the project uses typescript.
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
	 * Formatting settings for the Nexts generator
	 */
	formatting?: {
		/**
		 * Generation settings for the dynamic package.json files
		 */
		package?: {
			/**
			 * The package file indent string
			 */
			indent?: string;
		}
	}

	/**
	 * The project user/server applications
	 */
	apps?: App[];

	/**
	 * The project packages
	 */
	packages?: {
		/**
		 * The package name
		 */
		name: string;

		/**
		 * The package organization
		 */
		org?: string;

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
		description?: string;

		/**
		 * The package keywords
		 */
		keywords?: string[];

		/**
		 * The project license
		 */
		license?: string;

		/**
		 * The package dependencies
		 */
		dependencies?: {
			[name: string]: string;
		}
	}[]
}
