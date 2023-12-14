import { FC, useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../contexts/current-key-context';
import styles from './Letter.module.scss';

const Letter: FC = () => {
	const {
		context: { pressedKey }
	} = useGlobalContext();

	const [key, setKey] = useState('');

	useEffect(() => {
		if (pressedKey?.key) setKey(pressedKey.key);
	}, [pressedKey]);

	return <div className={styles.letter}>{key}</div>;
};

export default Letter;
