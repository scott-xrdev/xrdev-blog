import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

import AuthForm from '../../components/auth/auth-form';

const AuthPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const getSessionWrapper = async () => {
			const session = await getSession();

			if (session) {
				router.replace('/');
			} else {
				setIsLoading(false);
			}
		};

		getSessionWrapper();
	}, [router]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return <AuthForm />;
};

export default AuthPage;
