import cn from 'clsx';
import { FC } from 'react';
import { IoTimerOutline } from 'react-icons/io5';
import { TbPlayerPause, TbPlayerPlay } from 'react-icons/tb';
import { useGlobalContext } from '../../../../contexts/current-key-context';
import { formatTime } from '../../../../utils/format-time/formatTime';
import styles from './Timer.module.scss';
import useTimer from './useTimer';

const Timer: FC<{
	currentRow: number;
	totalRows: number;
	countSymbols: number;
	totalSymbols: number;
}> = ({ currentRow, totalRows, countSymbols, totalSymbols }) => {
	const { timer, isActive, isPaused } = useTimer();
	const { setContext } = useGlobalContext();
	return (
		<div className={styles.timer}>
			{!isActive && isPaused ? (
				<TbPlayerPlay size={24} className={styles.icon} />
			) : !isPaused ? (
				<TbPlayerPause
					onClick={() => {
						setContext(prevCtx => ({
							...prevCtx,
							isTimerStarted: false
						}));
					}}
					className={cn(styles.icon, 'cursor-pointer')}
					size={'30'}
				/>
			) : (
				<TbPlayerPlay
					className={cn(styles.icon, 'cursor-pointer')}
					size={'30'}
				/>
			)}
			<div className={styles.label}>{`${countSymbols}(${totalSymbols})`}</div>
			<IoTimerOutline className={styles.icon} size={'30'} />
			<div className={styles.label}>{formatTime(timer)}</div>
		</div>
	);
};

export default Timer;
