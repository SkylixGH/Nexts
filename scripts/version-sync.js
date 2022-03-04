import {info} from './util/logger.js'
import cliGet from './util/cliGet.js'
import getProjects from './util/getProjects.js'
import path from 'path'
import fs from 'fs/promises'

info(' --- [ Sync version numbers ] ---')

const newVersion = await cliGet('Exact Version')
const projects = await getProjects()

info(`The version of the following package will be updated to '${newVersion}'`)

projects.projects.forEach((project, index) => {
	info(` - ${project}`)
})

projects.paths.forEach(async (projectPath) => {
	const packageFileLocation = path.join(projectPath, 'package.json')
	const packageFile = JSON.parse(await fs.readFile(packageFileLocation, 'utf8'))

	await fs.writeFile(packageFileLocation, JSON.stringify({
		...packageFile,
		version: newVersion,
		publishConfig: {
			registry: 'https://registry.npmjs.org/',
			access: 'public',
		},
	}, null, '\t') + '\n')
})

info('Finished update versions')
