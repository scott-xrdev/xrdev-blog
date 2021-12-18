import { Fragment } from 'react';
import Head from 'next/head';

import AllPosts from '../../components/posts/all-posts';

// import DUMMY_POSTS from '../../dummy-posts';
import { getAllPosts } from '../../lib/posts-util';

const AllPostsPage = (props) => {
	return (
		<Fragment>
			<Head>
				<title>All Posts</title>
				<meta name="description" content="A list of all xrdev blog posts" />
			</Head>
			<AllPosts posts={props.posts} />
		</Fragment>
	);
};

export const getStaticProps = () => {
	const allPosts = getAllPosts();

	return {
		props: {
			posts: allPosts,
		},
		// Consider adding revalidate after adding user generated content
	};
};

export default AllPostsPage;
