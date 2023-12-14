import { CategoriesService } from '@/services/categories.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import { BsFileText } from 'react-icons/bs';
import { IErrorMessage } from '../../../../../types/interfaces/error.interface';

import styles from '../ModalContent.module.scss';
import SelectCategory from './content/SelectCategory';
import CurrentCategory from './content/CurrentCategory';

export interface ICategory {
	id: number;
	title: string;
}

const Tasks: FC = () => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [showCategories, setShowCategories] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [currentCategory, setCurrentCategory] = useState<number>(0);
	const { data, isLoading, isError } = useQuery({
		queryKey:['get category'],
		queryFn:() => CategoriesService.getCategories(),

			// onSuccess(data) {
			// 	const categories = data.data.map((el: ICategory) => ({
			// 		id: el.id,
			// 		title: el.title
			// 	}));
			// 	setCategories(categories);
			// },
  //   onError:(err: AxiosError) => {
		// 		const error = (err.response?.data as IErrorMessage).message;
		// 		setErrorMessage(error === undefined ? '' : error);
		// 	}
		}
	);

	useEffect(() => {}, [currentCategory]);

	return (
		<div className={styles.content}>
			{isLoading && <div>...Loading</div>}
			{isError && <div className={'absolute text-red-700'}>{errorMessage}</div>}
			{data && showCategories ? (
				<SelectCategory
					categories={categories}
					setShow={setShowCategories}
					setCurrentCategory={setCurrentCategory}
				/>
			) : (
				<CurrentCategory currentCategoryId={currentCategory} />
			)}
			<div className={styles.rightSide}>
				<BsFileText />
			</div>
		</div>
	);
};

export default Tasks;
