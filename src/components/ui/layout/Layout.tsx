'use client';
import { FC, useState } from 'react';
import Keyboard from '../keyboard/Keyboard';
import Main from '../main/Main';
import NavBar from '../navbar/NavBar';
import styles from './Layout.module.scss';

export interface IModalOpen {
	modalOpen: boolean;
	setModalOpen: (modalOpen: boolean) => void;
}

const Layout: FC = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	return (
		<div className={styles.layout}>
			<NavBar modalOpen={modalOpen} setModalOpen={setModalOpen} />
			<Main modalOpen={modalOpen} />
			<Keyboard modalOpen={modalOpen} />
		</div>
	);
};

export default Layout;
