import ChangePasswordForm from './change-password-form';
import classes from './user-profile.module.css';

const UserProfile = () => {
	const changePasswordHandler = async (passwordData) => {
		const response = await fetch('/api/user/change-password', {
			method: 'PATCH',
			body: JSON.stringify(passwordData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		console.log(data);

		// TODO show feedback notification

		// TODO clear password inputs or redirect or something
	};

	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<ChangePasswordForm onChangePassword={changePasswordHandler} />
		</section>
	);
};

export default UserProfile;
