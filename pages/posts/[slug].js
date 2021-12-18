import { Fragment } from 'react';
import Head from 'next/head';

import PostContent from '../../components/posts/post-detail/post-content';

import { getPostData, getPostsFiles } from '../../lib/posts-util';

const PostDetailPage = (props) => {
	return (
		<Fragment>
			<Head>
				<title>{props.post.title}</title>
				<meta name="description" content={props.post.excerpt} />
			</Head>
			<PostContent post={props.post} />
		</Fragment>
	);
};

export const getStaticProps = (context) => {
	const { params } = context;
	const { slug } = params;

	const postData = getPostData(slug);

	return {
		props: {
			post: postData,
		},
		// can revalidate here to get latest data if one of the markdown files are edited/updated
		// revalidate: 600
	};
};

export const getStaticPaths = () => {
	const postFileNames = getPostsFiles();

	const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

	const paths = slugs.map((slug) => ({ params: { slug: slug } }));

	return {
		paths,
		fallback: false,
	};
};

export default PostDetailPage;
