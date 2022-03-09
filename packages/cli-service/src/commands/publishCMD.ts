import {Argv} from 'yargs'
import logger from '@nexts-stack/logger'
import fsSync from 'fs'
import fse from 'fs-extra'
import readConfig from '../misc/readConfig'
import path from 'path'
import crashError from '../misc/crashError'
import {spawn} from 'child_process'

/**
 * The register util for the publish command.
 * @param program The yargs program.
 * @returns {void}
 */
export default function publishCMD(program: Argv) {
	program
		.command('publish [path]', 'Publish all packages', {
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
			otp: {
				type: 'string',
				default: '',
				describe: 'One time password for NPM publishing.',
			},
			tag: {
				type: 'string',
				default: 'latest',
				describe: 'The tag to publish with.',
			},
			versionOverride: {
				type: 'string',
				default: '',
				describe: 'The override version to publish with.',
			},
		}, async (argv) => {
			logger.log('Checking environment for publishing packages')

			const config = await readConfig(argv.path, argv.config)
			logger.log(`Moving build files`)

			if (!config.packages || config.packages.length === 0) {
				logger.error('No packages to publish')
				process.exit(1)
			}

			const buildCopies = [] as number[]

			for (const pkg of config.packages) {
				let publishBuildLocation = path.join(process.cwd(), argv.path, '.nexts', 'publish', pkg.path)
				let buildCopy = 0

				const tryNextBuild = () => {
					if (fsSync.existsSync(path.join(process.cwd(), argv.path, '.nexts', 'publish', `${pkg.path} - ${buildCopy}`))) {
						buildCopy++
						tryNextBuild()
					}
				}

				tryNextBuild()
				publishBuildLocation += ` - ${buildCopy}`

				buildCopies.push(buildCopy)

				try {
					fsSync.mkdirSync(publishBuildLocation, {
						recursive: true,
					})
				} catch (error) {
					logger.error(`Could not create publish build location`)
					crashError(error)

					process.exit(1)
				}

				let appPkg = {} as any
				try {
					appPkg = JSON.parse(fsSync.readFileSync(path.join(process.cwd(), argv.path, pkg.path, 'package.json'), 'utf-8'))
				} catch (error) {
					logger.error(`Failed to read package.json file for the project called ${pkg.org ? `@${ pkg.org }/` : ''}${pkg.name}`)
				}

				try {
					await fse.writeFile(path.join(publishBuildLocation, 'package.json'), JSON.stringify({
						name: `${pkg.org ? `@${pkg.org}/` : ''}${pkg.name}`,
						description: pkg.description,
						version: argv.versionOverride.length > 0 ? argv.versionOverride : config.version,
						dependencies: appPkg.dependencies ?? {},
						bin: appPkg.bin ?? {},
						type: 'module',
						types: `./${ path.join('types/', pkg.main).replace(/\\/g, '/')}`,
						exports: {
							import: './dist.module.mjs',
							require: './dist.commonjs.cjs',
						},
					}))
				} catch (error) {
					logger.error(`Failed to move package file for ${pkg.org ? `@${ pkg.org }/` : ''}${pkg.name}`)
					crashError(error)

					process.exit(1)
				}

				try {
					const commonJS = await fse.readFile(path.join(process.cwd(), argv.path, pkg.path, 'build', 'dist.commonjs.cjs'))
					const moduleJS = await fse.readFile(path.join(process.cwd(), argv.path, pkg.path, 'build', 'dist.esm.mjs'))

					await fse.writeFile(path.join(publishBuildLocation, './dist.commonjs.cjs'), commonJS)
					await fse.writeFile(path.join(publishBuildLocation, './dist.module.mjs'), moduleJS)
				} catch (error) {
					logger.error('Failed to move distribution scripts')
					crashError(error)

					process.exit(1)
				}

				try {
					await fse.copy(path.join(process.cwd(), argv.path, pkg.path, 'build', 'types'), path.join(publishBuildLocation, 'types'))
				} catch (error) {
					logger.error('Failed to move type declarations')
					crashError(error)

					process.exit(1)
				}
			}

			let publishIndex = 0

			const publishNextPackage = () => {
				const pkg = config.packages![publishIndex]
				const buildCopy = buildCopies[publishIndex]

				logger.log(`Publishing ${pkg.org ? `@${ pkg.org }/` : ''}${pkg.name}`)

				const npmChild = spawn(
					`npm${ process.platform === 'win32' ? '.cmd' : ''}`,
					[
						'publish',
						'--access',
						'public',
						'--tag',
						`"${argv.tag}"`,
						'--registry',
						'https://registry.npmjs.org/',
						...(argv.otp ? ['--otp', argv.otp] : []),
					],
					{
						cwd: path.join(process.cwd(), argv.path, '.nexts', 'publish', `${pkg.path} - ${buildCopy}`),
					},
				)

				npmChild.on('error', (error) => {
					logger.error(`Failed to publish ${pkg.org ? `@${ pkg.org }/` : ''}${pkg.name}`)
					crashError(error)

					process.exit(1)
				})

				let errorMessageExtracted = null as null | string

				npmChild.stderr.on('data', (data: Buffer) => {
					if (data.toString().includes('You cannot publish over the previously published versions')) {
						errorMessageExtracted = `v${config.version} of ${pkg.org ? `@${ pkg.org }/` : ''}${pkg.name} has already been published to NPM`
					}
				})

				npmChild.on('exit', (code: number) => {
					try {
						fse.rmSync(`${path.join(process.cwd(), argv.path, '.nexts', 'publish', pkg.path) } - ${ buildCopies[publishIndex]}`, {
							recursive: true,
						})
					} catch (error) {
						logger.error(`Failed to clean build files ${pkg.org ? `@${ pkg.org }/` : ''}`)
						crashError(error)
					}

					if (code !== 0) {
						logger.error(`Failed to publish package ${pkg.org ? `@${ pkg.org }/` : ''}${pkg.name}${errorMessageExtracted ? `, ${ errorMessageExtracted}` : ''}`)
						process.exit(1)
					}

					publishIndex++
					if (publishIndex === (config.packages ?? []).length) {
						logger.success(`Successfully published all (${(config.packages ?? []).length}) packages`)
						process.exit(0)
					}

					publishNextPackage()
				})
			}

			publishNextPackage()
		})
}
