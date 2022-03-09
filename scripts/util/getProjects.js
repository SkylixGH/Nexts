import path from 'path'
import {fileURLToPath} from 'url'
import fs from 'fs/promises'

/**
 * Get all the projects.
 * @returns {Promise<{projects: *[], paths: *[]}>} The projects and their paths.
 */
export default async function getProjects() {
	const projectRoot = path.join(
		path.dirname(fileURLToPath(import.meta.url)),
		'../../',
	)

	const projects = await fs.readdir(path.join(projectRoot, 'packages'))
	const result = {projects: [], paths: []}

	projects.forEach((project) => {
		result.projects.push(project)
		result.paths.push(path.join(projectRoot, 'packages', project))
	})

	return result
}
