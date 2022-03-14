/**
 * Check to see if the given element ID is valid.
 * @param elementID The HTML element ID to check.
 * @returns If the element ID is valid and can be used.
 */
export default function validateElementID(elementID: string) {
	let isValid = true;

	if (elementID.length === 0) {
		isValid = false;
	}

	if (elementID.indexOf(' ') !== -1) {
		isValid = false;
	}

	if (!/^[a-zA-Z]/.test(elementID)) {
		isValid = false;
	}

	if (!/^[A-Za-z.:\-_0-9]*$/.test(elementID)) {
		isValid = false;
	}

	return isValid;
}
