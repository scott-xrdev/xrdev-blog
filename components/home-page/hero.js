import Image from 'next/image';

import classes from './hero.module.css';

const Hero = () => {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src="/images/site/Scott.JPG"
					alt="An image showing Scott"
					width={300}
					height={300}
				/>
			</div>
			<h1>Hi, I'm Scott</h1>
			<p>I blog about xr development - especially vr interaction frameworks</p>
		</section>
	);
};

export default Hero;
