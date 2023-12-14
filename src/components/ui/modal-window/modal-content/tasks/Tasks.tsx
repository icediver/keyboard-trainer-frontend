import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { BsFileText } from 'react-icons/bs';

import styles from '../ModalContent.module.scss';

const Tasks: FC = () => {
	const { register, handleSubmit } = useForm();
	const onSubmit = (data: {}) => console.log(data);

	return (
		<div className={styles.content}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Select Exercise</h1>
				<div className={styles.select}>
					<label>Select Language: </label>
					<select {...register('language')}>
						<option value={'russian'}>russian</option>
						<option value={'english'}>english</option>
						<option value={'javascript'}>javascript</option>
					</select>
				</div>
				<div className={styles.select}>
					<label>Select level: </label>
					<select {...register('level')}>
						<option value={'easy'}>easy</option>
						<option value={'normal'}>normal</option>
						<option value={'hard'}>hard</option>
					</select>
				</div>
				<div className={styles.select}>
					<label>Select chapter: </label>
					<select {...register('chapter')}>
						<option value={'chapter-1'}>chapter-1</option>
						<option value={'chapter-2'}>chapter-2</option>
						<option value={'chapter-3'}>chapter-3</option>
						<option value={'chapter-4'}>chapter-4</option>
						<option value={'chapter-5'}>chapter-5</option>
					</select>
				</div>
				<div className={styles.select}>
					<label>Select exercise: </label>
					<select {...register('exercise')}>
						<option value={'exercise-1'}>exercise-1</option>
						<option value={'exercise-2'}>exercise-2</option>
						<option value={'exercise-3'}>exercise-3</option>
					</select>
				</div>
				<div className={styles.buttonContainer}>
					<div></div>
					<input type={'submit'} value={'you choice'} />
				</div>
			</form>
			<div className={styles.rightSide}>
				<BsFileText />
			</div>
		</div>
	);
};

export default Tasks;
