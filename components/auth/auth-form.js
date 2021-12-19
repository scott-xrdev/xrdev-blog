import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

import classes from './auth-form.module.css';
import { createUser } from '../../lib/auth';

const AuthForm = () => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const [isLogin, setIsLogin] = useState(true);
	const router = useRouter();

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// TODO add client side validation (already have it on server)

		if (isLogin) {
			const result = await signIn('credentials', {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			});

			// TODO add loading feedback while login is being verified

			// TODO add error notification if failed

			if (!result.error) {
				router.replace('/profile');
			}
		} else {
			try {
				// TODO add spinner until user created response received

				const result = await createUser(enteredEmail, enteredPassword);
				console.log(result);

				// automatically change to isLogin
				setIsLogin(true);
				passwordInputRef.current.value = '';

				// TODO send a notification to log in with new credentials
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" ref={emailInputRef} required />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						ref={passwordInputRef}
						required
					/>
				</div>
				<div className={classes.actions}>
					<button>{isLogin ? 'Login' : 'Create Account'}</button>
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
