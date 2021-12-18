import { MongoClient } from 'mongodb';

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.4rrkb.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

export const connectToDatabase = async () => {
	const client = await MongoClient.connect(connectionString);

	return client;
};
