import { isValidEmail, isValidText } from '../../lib/validators';
import { connectToDatabase } from '../../lib/db';

const handler = async (req, res) => {
	if (req.method !== 'POST') return;

	const { email, name, message } = req.body;

	if (!isValidEmail(email) || !isValidText(name) || !isValidText(message)) {
		res.status(422).json({ message: 'Invalid input.' });
		return;
	}

	const newMessage = {
		email,
		name,
		message,
	};

	let client;
	try {
		client = await connectToDatabase();
	} catch (error) {
		res.status(500).json({ message: 'Could not connect to database.' });
		return;
	}

	const db = client.db();

	try {
		const result = await db.collection('messages').insertOne(newMessage);
		newMessage.id = result.insertedId;
	} catch (error) {
		client.close();
		res.status(500).json({ message: 'Message could not be sent' });
		return;
	}

	client.close();

	res
		.status(201)
		.json({ message: 'Successfully sent message', message: newMessage });
};

export default handler;
