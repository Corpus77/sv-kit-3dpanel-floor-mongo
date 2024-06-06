/* eslint-disable no-unused-vars */

//import { fail } from '@sveltejs/kit';
import { log } from 'console';
import { readdirSync } from 'fs';
import { writeFileSync } from 'fs';
let filesArr;

export const load = async () => {};
export const actions = {
	default: async ({ request, fetch }) => {
		filesArr = readdirSync('static/uploads/');
		//console.log(filesArr);

		const data = await request.formData();
		const formData = Object.fromEntries(data);

		let fileName = `${crypto.randomUUID()}${formData.fileToUpload.name}`;
		//formData.fileToUpload.name;
		let userLogin = data.get('userLogin');

		//console.log(fileName); // ok
		//console.log(data.get('userLogin')); // ok
		if (!formData.fileToUpload.name || formData.fileToUpload.name === 'undefined') {
			return  {
				error: true,
				message: 'You must provide a file to upload'
			};
		}

		const { fileToUpload } = formData;

		writeFileSync(
			`static/uploads/${fileName}`,
			//${fileToUpload.name}
			Buffer.from(await fileToUpload.arrayBuffer())
		);

		await fetch('/api/uploads', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json;utf-8'
			},
			body: JSON.stringify({ fileName, userLogin })
		});

		return {
			success: true,
			fileName
		};
	}
};
