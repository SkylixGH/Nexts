#!/usr/bin/env node

import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import compileCMD from './commands/compileCMD';

const program = yargs(hideBin(process.argv));
program.scriptName('nexts');

compileCMD(program);

program.demandCommand();
program.parse();
