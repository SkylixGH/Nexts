import {info} from './util/logger.js';
import {exec} from 'child_process';
import getProjects from './util/getProjects.js';
import fs from 'fs/promises';
import * as esBuild from 'esBuild';
import * as path from 'path';

info('Watch compiler');

const projects = await getProjects();
const builders = [];
const tsc = [];

projects.paths.forEach(async (project) => {
	const packageFile = JSON.parse(await fs.readFile(path.join(project, 'package.json'), 'utf8'));
	const dependencies = Object.keys(packageFile.dependencies ?? {});

	packageFile.main = './build/common.cjs';
	packageFile.type = 'module';
	packageFile.types = './build/types/index.d.ts';

	packageFile.exports = {
		import: './build/module.mjs',
		require: './build/common.cjs',
	};

	await fs.writeFile(path.join(project, 'package.json'), JSON.stringify(packageFile, null, '\t') + '\n', 'utf8');

	tsc.push(exec('npx tsc --watch', {
		cwd: project,
	}));

	info(`[Debug] ${project} -> ${dependencies.join(', ')}`);

	const buildAgain = async (type) => {
		try {
			if (['cjs', 'both'].indexOf(type)) {
				builders.push(await esBuild.build({
					format: 'cjs',
					outfile: path.join(project, './build/common.cjs'),
					bundle: true,
					target: 'ESNext',
					entryPoints: [path.join(project, 'src/index.ts')],
					incremental: true,
					external: dependencies,
					sourcemap: true,
					watch: true,
					platform: 'node',
				}));
			}
		} catch {
			await buildAgain('cjs');
		}

		try {
			if (['esm', 'both'].indexOf(type)) {
				builders.push(await esBuild.build({
					format: 'esm',
					outfile: path.join(project, './build/module.mjs'),
					bundle: true,
					target: 'ESNext',
					entryPoints: [path.join(project, 'src/index.ts')],
					incremental: true,
					external: dependencies,
					sourcemap: true,
					watch: true,
					platform: 'node',
				}));
			}
		} catch {
			await buildAgain('esm');
		}
	};

	await buildAgain('both');
});
