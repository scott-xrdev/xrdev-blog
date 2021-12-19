import { connectToDatabase } from '../../../lib/db';
import { isValidEmail, isValidPassword } from '../../../lib/validators';
import { hashPassword } from '../../../lib/auth';

const handler = async (req, res) => {
	if (req.method !== 'POST') return;

	const data = req.body;

	const { email, password } = data;

	if (!isValidEmail(email) || !isValidPassword(password)) {
		res.status(422).json({
			message:
				'Invalid input - must enter a valid email and password must be at least 7 characters',
		});
		return;
	}

	let client;
	try {
		client = await connectToDatabase();
	} catch (error) {
		res.status(500).json({ message: 'Connecting to database failed' });
		return;
	}

	const db = client.db();

	const existingUser = await db.collection('users').findOne({ email: email });

	if (existingUser) {
		res
			.status(422)
			.json({ message: 'Could not register with this email address' });
		client.close();
		return;
	}

	const hashedPassword = await hashPassword(password);

	let result;
	try {
		result = await db.collection('users').insertOne({
			email: email,
			password: hashedPassword,
		});

		res.status(201).json({ message: 'Created user!' });
	} catch (error) {
		res.status(500).json({ message: 'Inserting data failed' });
	}

	client.close();
};

export default handler;
