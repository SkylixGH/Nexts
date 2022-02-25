import {info} from './util/logger.js';
import cliGet from './util/cliGet.js';
import getProjects from './util/getProjects.js';
import path from 'path';
import fs from 'fs/promises';

info(' --- [ Sync version numbers ] ---');

const newVersion = await cliGet('Exact Version');
const projects = await getProjects();

info(`The version of the following package will be updated to '${newVersion}'`);

projects.projects.forEach((project, index) => {
	info(` - ${project}`);
});

projects.paths.forEach(async (projectPath) => {
	const packageFileLocation = path.join(projectPath, 'package.json');

	await fs.writeFile(packageFileLocation, JSON.stringify({
		version: newVersion,
	}, null, '\t') + '\n');
});

info('Finished update versions');
