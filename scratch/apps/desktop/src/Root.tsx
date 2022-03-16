import {App, Progress, Ring, useMenu} from '@nexts-stack/desktop-uix';
import React from 'react';
import './styles.scss';
import Plus from '@iconify/icons-fluent/add-16-regular';
import Sub from '@iconify/icons-fluent/subtract-16-regular'

/**
 *
 */
function useMicro() {
	const [volume, setVolume] = React.useState(0);

	navigator.mediaDevices.getUserMedia({
		audio: true,
		video: false,
	})
		.then(function(stream) {
			const audioContext = new AudioContext();
			const analyser = audioContext.createAnalyser();
			const microphone = audioContext.createMediaStreamSource(stream);
			const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

			analyser.smoothingTimeConstant = 0.8;
			analyser.fftSize = 1024;

			microphone.connect(analyser);
			analyser.connect(scriptProcessor);
			scriptProcessor.connect(audioContext.destination);
			scriptProcessor.onaudioprocess = function() {
				const array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
				const arraySum = array.reduce((a, value) => a + value, 0);
				const average = arraySum / array.length;
				setVolume(Math.round(average));
				// colorPids(average);
			};
		})
		.catch(function(err) {
			/* handle the error */
			console.error(err);
		});

	return volume;
}

/**
 * This is the app root component.
 * @returns The app root component.
 */
export default function Root() {
	const [lines, setLines] = React.useState('1');
	const [linesScrollTop, setLinesScrollTop] = React.useState(0);
	const lcRef = React.useRef<HTMLTextAreaElement>(null);
	const [size, setSize] = React.useState(1);
	const menu = useMenu();

	return (
		<App center flowDirection={'row'}>
			<div style={{
				width: '50vw',
				position: 'fixed',
				top: '10px',
				left: '10px',
				display: 'flex',
				gap: '10px',
				alignItems: 'center',
			}}>
				<Progress value={Math.floor((size / 6) * 100)} mode="determinate" />
				<Ring size={9} />
			</div>

			<div style={{
				width: '100px',
				height: '100px',
				outline: '4px solid #fff',
				borderRadius: '100%',
				transform: `scale(${size})`,
				transition: '100ms'
			}} onContextMenu={(event) => {
				event.preventDefault();

				menu.open({
					header: [
						{
							icon: {
								src: Plus,
							},
							action: () => {
								if (size > 5) return;
								setSize((s) => s + 1);
							},
						},
						{
							icon: {
								src: Sub,
							},
							action: () => {
								if (size < 2) return;
								setSize((s) => s - 1);
							},
						},
					],
					body: [
						{
							label: 'Restart',
							action: () => {
								window.location.reload();
							}
						}
					]
				});
			}}></div>
			<br />

			{/* <textarea className={'lc'} ref={lcRef} value={lines}></textarea>

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
			}} className={'area'} /> */}
		</App>
	);
}
