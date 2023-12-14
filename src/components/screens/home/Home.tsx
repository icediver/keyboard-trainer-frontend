import { FC } from 'react';
import Layout from '../../ui/layout/Layout';

import styles from './Home.module.scss';

const Home: FC = () => {
	return (
		<div className={styles.home}>
			<Layout />
		</div>
	);
};

export default Home;
