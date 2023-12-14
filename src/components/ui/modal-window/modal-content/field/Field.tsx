import { IField } from '@/ui/modal-window/modal-content/field/field.interface';
import { forwardRef } from 'react';
import styles from './Field.module.scss';

const Field = forwardRef<HTMLInputElement, IField>(
	({ error, type = 'text', style, Icon, ...rest }, ref) => {
		return (
			<div className={styles.input}>
				<input ref={ref} type={type} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		);
	}
);

Field.displayName = 'Field';
export default Field;
