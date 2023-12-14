import { FC } from 'react';
import { useGlobalContext } from '../../../contexts/current-key-context';
import TextForm from '../text-form/TextForm';
import styles from './Main.module.scss';

const Main: FC<{ modalOpen: boolean }> = ({ modalOpen }) => {
	const { context } = useGlobalContext();

	return (
		<div className={styles.main}>
			<TextForm modalOpen={modalOpen} idExercise={context.currentExerciseId} />
		</div>
	);
};

export default Main;
