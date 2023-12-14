import styles from '../../ModalContent.module.scss';
import { forwardRef } from 'react';
import { IFieldSelect } from './field-select.interface';
import { ICategory } from '../SelectExercise';

const FieldSelect = forwardRef<HTMLSelectElement, IFieldSelect<ICategory>>(
	({ items, ...rest }, ref) => {
		return (
			<div className={styles.select}>
				{items.length > 0 && (
					<select ref={ref} {...rest}>
						{items.map((el: ICategory) => (
							<option key={el.title} value={el.title}>
								{el.title}
							</option>
						))}
					</select>
				)}
			</div>
		);
	}
);
FieldSelect.displayName = 'FieldSelect';
export default FieldSelect;
