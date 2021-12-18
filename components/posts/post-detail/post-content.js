import ReactMarkdown from 'react-markdown';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import DUMMY_POSTS from '../../../dummy-posts';

const DUMMY_POST = DUMMY_POSTS[0];
DUMMY_POST.content = '# This is a first post';

const PostContent = () => {
	const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

	return (
		<article className={classes.content}>
			<PostHeader title={DUMMY_POST.title} image={imagePath} />
			<ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
		</article>
	);
};

export default PostContent;
