import logger from "@nexts-stack/logger";
import askCLI from "./askCLI";

/**
 * Let the user select an item from a list of items
 * @param question The question to ask
 * @param options The options for the list
 * @returns The index of the item selected
 */
export default async function askListCLI(question: string, listOptions: string[]) {
	const options = [...listOptions];

	options.forEach((opt, index) => {
		console.log(` ${index + 1}) ${opt}`);
	});

	return +await askCLI(`${question} [1..${options.length}]`, (answer) => {
		if (isNaN(answer as any) || answer.length === 0) {
			return 'Please specify the number for the option you would like to select';
		}

		if (+answer > options.length || +answer < 1) {
			return `${answer} is out of bounds, please select an option from 1 to ${options.length}`;
		}
	});
}
