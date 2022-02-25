import chalk from 'chalk';

function formatLog(prefix: string, message: string) {
  console.log(`${chalk.hex('#999')('[')}${prefix}${chalk.hex('#999')(']')}: ${message}`);
}

export function log(text: string) {
	formatLog(chalk.hex('#999')('Info'), text);
}

export function warn(text: string) {
	formatLog(chalk.hex('#FFFF55')('Warning'), text);
}

export function error(text: string) {
	formatLog(chalk.hex('#FF5555')('Error'), text);
}

export function success(text: string) {
	formatLog(chalk.hex('#55FF55')('Success'), text);
}

const logger = {
  log,
  warn,
  error,
  success,
};

export default logger;
