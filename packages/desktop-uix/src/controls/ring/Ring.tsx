import React, { useEffect } from 'react';
import styles from './Ring.module.scss';

/**
 * The properties of the ring.
 */
export interface Props {
	/**
	 * The side of the spinner.
	 */
	size: number;
}

/**
 * The ring ref.
 */
export interface Ref {
}

let lastPercent = 20;
let incrementDirection = 'up' as 'up' | 'down';

const Ring = React.forwardRef<Ref, Props>((props) => {
	const [radius, setRadius] = React.useState(0);
	const [circumference, setCircumference] = React.useState(0);
	const [rotation, setRotation] = React.useState(0);
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

		const rotateLoop = setInterval(() => {
			setRotation((rotation) => rotation + 1 > 360 ? 0 : rotation + 4);
		});

		const percentLoop = setInterval(() => {
			if (incrementDirection === 'up' && lastPercent === 70) {
				incrementDirection = 'down';
			} else if (incrementDirection === 'down' && lastPercent === 20) {
				incrementDirection = 'up';
			}

			if (incrementDirection === 'up') {
				lastPercent += 1;
			} else {
				lastPercent -= 1;
			}

			calculatePercent(lastPercent);
		}, 10);

		return () => {
			clearInterval(rotateLoop);
			clearInterval(percentLoop);
		};
	}, [circleRef]);

	return (
		<svg width={120} height={120} className={styles.root}>
			<circle style={{
				transform: `rotate(${rotation}deg)`,
			}} ref={circleRef} strokeWidth={radius / 5 < 3 ? 3 : radius / 5} r={radius} cx={60} cy={60} />
		</svg>
	);
});

Ring.displayName = 'Ring';
export default Ring;
