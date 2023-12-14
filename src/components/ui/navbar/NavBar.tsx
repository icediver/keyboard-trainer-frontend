import { FC } from 'react';
import { IModalOpen } from '../layout/Layout';
import NavMenu from './nav-menu/NavMenu';
import styles from './NavBar.module.scss';

const NavBar: FC<IModalOpen> = ({ modalOpen, setModalOpen }) => {
	return (
		<div className={styles.navbar}>
			<NavMenu modalOpen={modalOpen} setModalOpen={setModalOpen} />
		</div>
	);
};

export default NavBar;
