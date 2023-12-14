import { InputHTMLAttributes } from 'react';

export interface IFieldSelectProps<T> {
	items: T[];
}

type TypeSelectPropsField<T> = InputHTMLAttributes<HTMLSelectElement> &
	IFieldSelectProps<T>;

export interface IFieldSelect<T> extends TypeSelectPropsField<T> {}
