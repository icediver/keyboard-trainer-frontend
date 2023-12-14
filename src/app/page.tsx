import Home from '@/components/screens/home/Home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Home',
	description: ''
};

export default function Page() {
	return <Home />;
}
