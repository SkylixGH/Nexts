/**
 * The app global configuration that all apps can use.
 */
type AppCommon = {
	/**
	 * The app's display name.
	 */
	name: string;

	/**
	 * The app's root path.
	 */
	path: string;

	/**
	 * The app's description.
	 */
	description?: string;

	/**
	 * The app's keywords.
	 */
	keywords?: string[];

	/**
	 * The app's display name.
	 */
	displayName: string;

	/**
	 * The product ID.
	 */
	id: string;

	/**
	 * The app dependencies.
	 */
	dependencies?: {
		[name: string]: string;
	}
}

/**
 * App desktop configuration.
 */
export type AppDesktop = AppCommon & {
	/**
	 * The app type.
	 */
	type: 'desktop';

	/**
	 * The ID of the root element.
	 */
	rootElementID: string;

	/**
	 * The app's entry files.
	 */
	main: {
		/**
		 * Backend entry file.
		 */
		backend: string;

		/**
		 * Frontend entry file.
		 */
		frontend: string;
	}
}

/**
 * App mobile configuration.
 */
export type AppMobile = AppCommon & {
	/**
	 * The app type.
	 */
	type: 'mobile';

	/**
	 * The app's entry file.
	 */
	main: string;
}

/**
 * App configuration.
 */
export type App = AppDesktop | AppMobile;

/**
 * The Nexts  config.
 */
export default interface UserConfig {
	/**
	 * The project version.
	 */
	version: string;

	/**
	 * Whether the project uses typescript.
	 */
	typescript: boolean;

	/**
	 * The project author.
	 */
	author: string;

	/**
	 * The project environment settings.
	 */
	node: {
		/**
		 * The minimum node version.
		 */
		minVersion: string;

		/**
		 * The maximum node version.
		 */
		maxVersion: string;
	},

	/**
	 * Formatting settings for the Nexts generator.
	 */
	formatting?: {
		/**
		 * Generation settings for the dynamic package.json files.
		 */
		package?: {
			/**
			 * The package file indent string.
			 */
			indent?: string;
		}
	}

	/**
	 * The project user/server applications.
	 */
	apps?: App[];

	/**
	 * The project packages.
	 */
	packages?: {
		/**
		 * The package name.
		 */
		name: string;

		/**
		 * The package organization.
		 */
		org?: string;

		/**
		 * The path to the package root.
		 */
		path: string;

		/**
		 * The package entry script.
		 */
		main: string;

		/**
		 * The package description.
		 */
		description?: string;

		/**
		 * The package keywords.
		 */
		keywords?: string[];

		/**
		 * The project license.
		 */
		license?: string;

		/**
		 * The package dependencies.
		 */
		dependencies?: {
			[name: string]: string;
		}
	}[]
};;;;;;;;;;;;;;;;;;;;;;;;;;;;;
