import { FC, useEffect, useRef } from 'react';
import styles from '../TextForm.module.scss';

const TypingTextarea: FC<{ typingRow: number; value: string }> = ({
	typingRow,
	value
}) => {
	const refTextarea = useRef<HTMLTextAreaElement>(null);
	useEffect(() => {
		refTextarea.current?.blur();
		refTextarea.current?.focus();
	}, [typingRow]);

	return (
		<textarea
			ref={refTextarea}
			autoFocus
			autoCorrect='off'
			spellCheck={false}
			rows={6}
			className={styles['text-area']}
			onChange={() => {}}
			value={value}
		/>
	);
};

export default TypingTextarea;
