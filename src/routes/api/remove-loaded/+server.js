/* eslint-disable no-unused-vars */
import { unlink } from 'fs';

export async function POST({ request }) {
	const data = await request.json();
	console.log(data.url);
	unlink(`static/uploads/${data.url}`, function (err) {
		if (err) return console.log(err);
		console.log('file deleted successfully' + data.url);
	});

	return new Response();
}
