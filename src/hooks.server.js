/* eslint-disable no-unused-vars */
/** @type {import('@sveltejs/kit').Handle} */
import mongoose from 'mongoose';
import { MONGO_KEY } from '$env/static/private';

//_____________________________________________________________________________
const URLdb = `mongodb+srv://corpusne:${MONGO_KEY}@cluster0.gskjvpy.mongodb.net/3d-panels`;

mongoose
	.connect(URLdb)
	.then(async () => {
		console.log('Connected to MongoDB.');
	})
	.catch((err) => console.log(err));
//_____________________________________________________________________________

const getUniqueId = () => {
	return Math.random().toString(36).substring(2, 9);
}

export async function handle({event, resolve}) {
	event.locals.UniId = getUniqueId();
	const response = await resolve(event);

	return response
}