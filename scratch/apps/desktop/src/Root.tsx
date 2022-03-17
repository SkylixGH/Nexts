import {App, Progress, Ring, useAppURL, useMenu, Button, useRouter} from '@nexts-stack/desktop-uix';
import React, {useEffect, useState} from 'react';
import './styles.scss';
import Plus from '@iconify/icons-fluent/add-16-regular';
import Sub from '@iconify/icons-fluent/subtract-16-regular';
import * as events from 'events';

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
	const url = useAppURL();
	const router = useRouter(url);

	useEffect(() => {
		const routeChangeURL = (old: string, newURL: string) => {
			console.log(`${old} ->> ${newURL}`);
		};

		router.events.on('change', routeChangeURL);

		return () => {
			router.events.removeListener('change', routeChangeURL);
		};
	});

	return (
		<App center flowDirection={'row'}>
			<p>{url.urlPathName}</p>

			<div style={{
				padding: '10px',
				display: 'flex',
				gap: '10px',
				color: 'var(--text1)',
			}}>
				<a href={'/'} onClick={function(events) {
					events.preventDefault();
					router.navigate('/');
				}}>Home</a>

				<a href={'/about'} onClick={function(events) {
					events.preventDefault();
					router.navigate('/about');
				}}>About</a>
			</div>
		</App>
	);
}
