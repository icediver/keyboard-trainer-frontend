import { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../../../../contexts/current-key-context';

export interface ITimer {
	timer: number;
	isActive: boolean;
	isPaused: boolean;
	handleStart: () => void;
	handlePause: () => void;
	handleResume: () => void;
	handleReset: () => void;
}

const useTimer = (initialState: number = 0): ITimer => {
	const [timer, setTimer] = useState<number>(initialState);
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const countRef = useRef<NodeJS.Timer>();

	const {
		context: { isTimerStarted }
	} = useGlobalContext();

	useEffect(() => {
		if (isTimerStarted) {
			handleStart();
		}

		if (!isTimerStarted) {
			handlePause();
		}
	}, [isTimerStarted]);

	const handleStart = () => {
		setIsActive(true);
		setIsPaused(false);

		countRef.current = setInterval(() => {
			setTimer(timer => timer + 1);
		}, 1000);
	};

	const handlePause = () => {
		clearInterval(countRef.current);
		setIsPaused(true);
		setIsActive(false);
	};

	const handleResume = () => {
		setIsPaused(true);
		countRef.current = setInterval(() => {
			setTimer(timer => timer + 1);
		}, 1000);
	};

	const handleReset = () => {
		clearInterval(countRef.current);
		setIsActive(false);
		setIsPaused(false);
		setTimer(0);
	};

	return {
		timer,
		isActive,
		isPaused,
		handleStart,
		handlePause,
		handleResume,
		handleReset
	};
};

export default useTimer;
