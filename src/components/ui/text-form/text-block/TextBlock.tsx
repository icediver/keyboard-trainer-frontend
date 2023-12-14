import { FC, useEffect, useRef, useState } from 'react';
import styles from '../TextForm.module.scss';

const TextBlock: FC<{
	typingArray: string[];
	typingRow: number;
	index: number;
}> = ({ typingArray, typingRow, index }) => {
	const refDivText = useRef<HTMLDivElement>(null);
	const [scroll, setScroll] = useState<number>(0);
	const scrollHeight = 28;
	// parseInt(getComputedStyle(document.documentElement).fontSize) * 1.75;

	useEffect(() => {
		setScroll(scroll + scrollHeight);
		refDivText.current?.scrollTo({
			top: scroll,
			left: 0,
			behavior: 'smooth'
		});
	}, [typingRow]);
	return (
		<div spellCheck={false} className={styles.text} ref={refDivText}>
			{typingArray.slice(0, typingRow).map((row, i) => (
				<span
					className={'text-gray-500 text-opacity-60 bg-gray-800'}
					key={'upper' + i}
				>
					{row}
					<br />
				</span>
			))}

			{typingArray.slice(typingRow).map((row, i) =>
				i === 0 ? (
					<span key={'lower' + i}>
						<span className={'text-gray-500 text-opacity-60 bg-gray-800'}>
							{row.slice(0, index)}
						</span>
						<span>
							{row.slice(index)} <br />
						</span>
					</span>
				) : (
					<span key={'lower-rows' + i}>
						{row} <br />
					</span>
				)
			)}
		</div>
	);
};

export default TextBlock;
