import {App} from '@nexts-stack/desktop-uix';
import React from 'react';
import './styles.scss';

/**
 * This is the app root component.
 * @returns The app root component.
 */
export default function Root() {
	const [lines, setLines] = React.useState('1');
	const [linesScrollTop, setLinesScrollTop] = React.useState(0);
	const lcRef = React.useRef<HTMLTextAreaElement>(null);

	return (
		<App center flowDirection={'row'}>
			<textarea className={'lc'} ref={lcRef} value={lines}></textarea>

			<textarea onScroll={(event) => {
				setLinesScrollTop(event.target!.scrollTop ?? 0);
				lcRef.current.scrollTop = event.target!.scrollTop ?? 0;

				const lines = event.target!.value.split('\n');
				setLines(lines.map((l, i) => i).join('\n'));
			}} onChange={(event) => {
				setLinesScrollTop(event.target!.scrollTop ?? 0);
				lcRef.current.scrollTop = event.target!.scrollTop ?? 0;

				const lines = event.target!.value.split('\n');
				setLines(lines.map((l, i) => i).join('\n'));
			}} placeholder={'Type Here...'} onKeyDown={(event) => {
				if (event.key === 'Tab') {
					event.preventDefault();

					const start = event.target.selectionStart;
					const end = event.target.selectionEnd;

					event.target.value = `${event.target.value.substring(0, start) }\t${ event.target.value.substring(end)}`;
					event.target.selectionStart = start + 1;
					event.target.selectionEnd = end + 1;
				}
			}} className={'area'} />
		</App>
	);
}
