import { useRef, useContext } from 'react';

import NotificationContext from '../../store/notification-context';
import classes from './contact-form.module.css';
import { sendContactData } from '../../lib/contact-util';

const ContactForm = () => {
	const emailInputRef = useRef();
	const nameInputRef = useRef();
	const messageInputRef = useRef();
	const { showNotification } = useContext(NotificationContext);

	const sendMessageHandler = async (event) => {
		event.preventDefault();

		showNotification({
			title: 'Sending...',
			message: 'Your message is being sent',
			status: 'pending',
		});

		const enteredEmail = emailInputRef.current.value;
		const enteredName = nameInputRef.current.value;
		const enteredMessage = messageInputRef.current.value;

		// TODO add client side validation

		let data;
		try {
			data = await sendContactData({
				email: enteredEmail,
				name: enteredName,
				message: enteredMessage,
			});

			showNotification({
				title: 'Success!',
				message: 'Your message has been sent',
				status: 'success',
			});

			// TODO clear out input fields
			emailInputRef.current.value = '';
			nameInputRef.current.value = '';
			messageInputRef.current.value = '';
		} catch (error) {
			showNotification({
				title: 'Error',
				message: error.message || 'Something went wrong',
				status: 'error',
			});
		}
	};

	return (
		<section className={classes.contact}>
			<h1>How can I help you?</h1>
			<form className={classes.form} onSubmit={sendMessageHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor="email">Your Email</label>
						<input type="email" id="email" ref={emailInputRef} required />
					</div>
					<div className={classes.control}>
						<label htmlFor="name">Your Name</label>
						<input type="text" id="name" ref={nameInputRef} required />
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor="message">Your Message</label>
					<textarea
						id="message"
						rows="5"
						ref={messageInputRef}
						required
					></textarea>
				</div>
				<div className={classes.actions}>
					<button>Send Message</button>
				</div>
			</form>
		</section>
	);
};

export default ContactForm;
