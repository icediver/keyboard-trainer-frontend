import styles from '../../ModalContent.module.scss';
import { ChangeEvent, ChangeEventHandler, FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ICategory } from '../SelectExercise';
import FieldSelect from './FieldSelect';

const SelectCategory: FC<{
	categories: ICategory[];
	setShow: (a: boolean) => void;
	setCurrentCategory: (a: number) => void;
}> = ({ categories, setShow, setCurrentCategory }) => {
	const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });
	const ref = useRef<HTMLSelectElement | null>(null);

	const onSubmit = (data: { category?: string }) => {
		const currentCategory = categories.filter(
			el => el.title === data.category
		)[0];
		setCurrentCategory(currentCategory.id);
		setShow(false);
	};
	const handleChange: ChangeEventHandler = (
		event: ChangeEvent<HTMLSelectElement>
	) => {
		console.log(event.target.value);
		console.log(ref.current?.value);
		// console.log(categories);
		// console.log(categories.filter(el => el.title === event.target.value)[0]);
		// ref.current.value = event.target.value;
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1>Select Category</h1>
			<div className={styles.select}>
				<label>Select Category: </label>

				<FieldSelect {...register('category')} items={categories} />
			</div>
			<div className={styles.buttonContainer}>
				<input type={'submit'} value={'your choice'} />
			</div>
		</form>
	);
};

export default SelectCategory;
