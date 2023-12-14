import { FC } from 'react';
import AuthForm from './auth-form/AuthForm';
import Keyboard from './keyboard/Keyboard';
import styles from './ModalContent.module.scss';
import Settings from './settings/Settings';
import Statistics from './statistics/Statistics';
import Tasks from './tasks/SelectExercise';
import { Category } from './category/Category';

interface IModalContent {
	typeModal: string;
	setIsOpenOptions: (show: boolean) => void;
}

const ModalContent: FC<IModalContent> = ({ typeModal, setIsOpenOptions }) => {
	switch (typeModal) {
		case 'login':
			return <AuthForm setIsOpenOptions={setIsOpenOptions} />;
		case 'settings':
			return <Settings />;
		case 'tasks':
			return <Category />;
		case 'exercise':
			return <Tasks />;
		case 'stats':
			return <Statistics />;
		case 'keyboard':
			return <Keyboard />;
	}
	return <div className={styles.content}>{typeModal}</div>;
};

export default ModalContent;
