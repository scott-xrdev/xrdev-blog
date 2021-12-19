import Head from 'next/head';
import { Provider } from 'next-auth/client';

import Layout from '../components/layout/layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Layout>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					// TODO add favicon
				</Head>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
