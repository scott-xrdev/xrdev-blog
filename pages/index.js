import { Fragment } from 'react';
import Head from 'next/head';

import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import { getFeaturedPosts } from '../lib/posts-util';

// import DUMMY_POSTS from '../dummy-posts';

const HomePage = (props) => {
	return (
		<Fragment>
			<Head>
				<title>XRDEV.com</title>
				<meta name="description" content="I blog about xr development" />
			</Head>
			<Hero />
			<FeaturedPosts posts={props.posts} />
		</Fragment>
	);
};

export const getStaticProps = () => {
	const featuredPosts = getFeaturedPosts();

	return {
		props: {
			posts: featuredPosts,
		},
		// When add user generated content consider adding revalidate: 1800 (30 mins) or something like that
	};
};

export default HomePage;
