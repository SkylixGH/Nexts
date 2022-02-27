import {Argv} from 'yargs'
import {BuildOptions, BuildResult} from 'esBuild'
import type ESBuildModuleType from 'esbuild'
import logger from '@nexts-stack/logger'
import readConfig from '../misc/readConfig'
import getAppPackages from '../manager/getAppPackages'
import path from 'path'

/**
 * CLI command flags
 */
interface Flags {
	/**
	 * Path to the config
	 */
	config: string;

	/**
	 * Path to project
	 */
	path: string;
}

/**
 * The compile command.
 * @param program The yargs program.
 * @returns Nothing.
 */
export default function compileCMD(program: Argv<Flags>) {
	program
		.command('compile [path]', 'Compile your project.', {
			config: {
				type: 'string',
				default: '*',
				describe: 'Path to the config file.',
				alias: 'c',
			},
			path: {
				type: 'string',
				default: './',
				describe: 'Path to the project.',
			},
			watch: {
				type: 'boolean',
				default: false,
				describe: 'Watch for changes and compile on the fly.',
				alias: 'w',
			},
		}, async (argv) => {
			const startTime = performance.now()

			logger.log('Checking environment for compilation')
			logger.log('Fetching sub projects')

			// This dynamic import was designed to not be built by ESBuild
			const esBuild = await import(['es', 'build'].join('')) as typeof ESBuildModuleType
			const config = await readConfig(argv.path, argv.config)
			const projects = await getAppPackages(argv.path, config)
			const esBuilders = [] as BuildResult[]
			const maxBuilds = projects.packages?.length
			let buildsStarted = 0

			logger.log('Starting ESBuild compiler')

			const generalESBuildConfig: BuildOptions = {
				logLevel: 'silent',
				jsx: 'preserve',
				bundle: true,
				incremental: true,
				target: 'ESNext',
				sourcemap: true,
			}

			for (const pkg of projects.packages ?? []) {
				const mainPathExact = path.join(process.cwd(), argv.path, pkg.path, pkg.main)
				const buildDirExact = path.join(process.cwd(), argv.path, 'build', pkg.name)

				const esBuilderCommon = await esBuild.build({
					...generalESBuildConfig,
					entryPoints: [mainPathExact],
					outfile: path.join(buildDirExact, 'dist.commonjs.cjs'),
					format: 'cjs',
					watch: argv.watch ? {
						onRebuild: () => {
							logger.log(`All (${maxBuilds}) projects will be rebuilt for CJS`)
						},
					} : false,
				})

				const esBuilderESM = await esBuild.build({
					...generalESBuildConfig,
					entryPoints: [mainPathExact],
					outfile: path.join(buildDirExact, 'dist.esm.mjs'),
					format: 'esm',
					watch: argv.watch ? {
						onRebuild: () => {
							logger.log(`All (${maxBuilds}) projects will be rebuilt for ESM`)
						},
					} : false,
				})

				esBuilders.push(esBuilderCommon, esBuilderESM)
				buildsStarted++

				const getBootTime = () => Math.round(performance.now() - startTime)

				if (buildsStarted === maxBuilds && config.typescript) {
					logger.log('Starting TypeScript type generations')
				} else if (buildsStarted === maxBuilds) {
					if (argv.watch) {
						logger.success(`Successfully started watch compiler for all (${maxBuilds}) project(s) in ${getBootTime()}ms`)
					} else {
						logger.success(`Successfully compiled all (${maxBuilds}) project(s) in ${getBootTime()}ms`)
						process.exit(0)
					}
				}
			}
		})
}
