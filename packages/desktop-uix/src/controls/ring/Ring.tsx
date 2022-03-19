import React, {useEffect} from 'react';
import styles from './Ring.module.scss';

/**
 * The properties of the ring.
 */
export interface Props {
	/**
	 * The side of the spinner.
	 */
	size?: number;
}

/**
 * The ring ref.
 */
export interface Ref {
}

let lastPercent = 20;
let incrementDirection = 'up' as 'up' | 'down';
let percLoop: NodeJS.Timer | undefined;
const calculationJobs = [] as CallableFunction[];

const Ring = React.forwardRef<Ref, Props>((props) => {
	const [radius, setRadius] = React.useState(0);
	const [circumference, setCircumference] = React.useState(0);
	const circleRef = React.useRef<SVGCircleElement>(null);

	const calculatePercent = (percent: number) => {
		if (circleRef.current) {
			const size = props.size ?? 10;
			const radius = size;
			const circumference = radius * 2 * Math.PI;
			const offset = circumference - percent / 100 * circumference;

			circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
			circleRef.current.style.strokeDashoffset = `${offset}`;

			setRadius(radius);
			setCircumference(circumference);
		}
	};

	useEffect(() => {
		calculatePercent(20);
		let index: number | undefined;

		const len = calculationJobs.push(calculatePercent);
		index = len - 1;

		if (!percLoop) {
			percLoop = setInterval(() => {
				if (incrementDirection === 'up' && lastPercent === 70) {
					incrementDirection = 'down';
				} else if (incrementDirection === 'down' && lastPercent === 0) {
					incrementDirection = 'up';
				}

				if (incrementDirection === 'up') {
					lastPercent += 1;
				} else {
					lastPercent -= 1;
				}

				calculationJobs.forEach((job) => job(lastPercent));
			}, 10);
		}

		return () => {
			if (percLoop) {
				clearInterval(percLoop);
				delete calculationJobs[index!];
				percLoop = undefined;
			}
		};
	});

	return (
		<div className={styles.root}>
			<svg width={(+(props.size ?? 10)) * 2 + (radius / 5 < 3 ? 3 : radius / 5)}
				height={(+(props.size ?? 10)) * 2 + (radius / 5 < 3 ? 3 : radius / 5)}
				className={styles.svg}>
				<circle ref={circleRef} strokeWidth={radius / 5 < 3 ? 3 : radius / 5} r={radius}
					cx={(+(props.size ?? 10)) + ((radius / 5 < 3 ? 3 : radius / 5)) / 2}
					cy={(+(props.size ?? 10)) + ((radius / 5 < 3 ? 3 : radius / 5)) / 2}
				/>
			</svg>
		</div>
	);
});

Ring.displayName = 'Ring';
export default Ring;
