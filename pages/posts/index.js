import AllPosts from '../../components/posts/all-posts';

// import DUMMY_POSTS from '../../dummy-posts';
import { getAllPosts } from '../../lib/posts-util';

const AllPostsPage = (props) => {
	return <AllPosts posts={props.posts} />;
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
