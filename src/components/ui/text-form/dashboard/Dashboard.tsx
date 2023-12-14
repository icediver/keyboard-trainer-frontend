import { FC, useEffect, useState } from 'react';
import { GiProgression } from 'react-icons/gi';
import { MdReportGmailerrorred } from 'react-icons/md';
import { TfiDashboard } from 'react-icons/tfi';
import { useGlobalContext } from '../../../../contexts/current-key-context';
import Timer from '../timer/Timer';
import useTimer from '../timer/useTimer';
import styles from './Dashboard.module.scss';
import { IIndicators } from './indicators.interface';

const Dashboard: FC<IIndicators> = ({
	// totalProgress,
	totalRows,
	totalSymbols,
	mistakes,
	countSymbols,
	currentRow
}) => {
	const { context } = useGlobalContext();
	const { timer, isActive, isPaused } = useTimer();
	const [charPerMinute, setCharPerMinute] = useState<number>(100);

	useEffect(() => {
		if (isActive) {
			setCharPerMinute(Math.round((countSymbols * 60) / timer));
		}
	}, [currentRow]);

	return (
		<div className={styles.dashboard}>
			<Timer
				currentRow={currentRow}
				totalRows={totalRows}
				countSymbols={countSymbols}
				totalSymbols={totalSymbols}
			/>
			<TfiDashboard className={styles.icon} size={'30'} />
			<div className={styles.label}>
				{`${
					timer < 10
						? '100'
						: charPerMinute < 100
						? '0' + charPerMinute
						: charPerMinute
				}
				(${currentRow < totalRows - 1 ? currentRow + 1 : totalRows - 1}
				/${totalRows - 1})`}
			</div>
			<MdReportGmailerrorred className={styles.icon} size={'30'} />
			<div className={styles.label}>
				{mistakes}/5
				{/*{context.errorCount ? context.errorCount : 0}/5*/}
			</div>
			<GiProgression className={styles.icon} size={'22'} />
			<div className={styles.label}>
				{Math.round((countSymbols / totalSymbols) * 100)}%
			</div>
		</div>
	);
};

export default Dashboard;
