import {info} from './util/logger.js';
import getProjects from './util/getProjects.js';
import cliGet from './util/cliGet.js';
import {spawn} from 'child_process';

info('NPM Release');

const projects = await getProjects();
const npmExtraArgs = await cliGet('Extra NPM Arguments');
const npmParams = ['publish', '--access', 'public'];
let projectIndex = 0;

if (npmExtraArgs && npmExtraArgs.length > 0) {
	npmParams.push(...npmExtraArgs.split(' '));
}

const nextProject = () => {
	const project = projects.paths[projectIndex];
	info('Publishing: ' + projects.projects[projectIndex]);

	const proc = spawn('npm' + (process.platform === 'win32' ? '.cmd' : ''), npmParams, {cwd: project, stdio: 'inherit'});

	proc.on('exit', () => {
		projectIndex++;

		if (projectIndex >= projects.paths.length) {
			info('All projects have been released');
			process.exit(0);
		}

		nextProject();
	});
};

nextProject();
