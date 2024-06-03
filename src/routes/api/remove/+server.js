/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { UserProfiles } from '$lib/models/user_model';
export async function POST({ request }) {
	const data = await request.json();
	const profile = await UserProfiles.findOne({
		credentials: {
			login: data.currentLogin,
			password: data.currentPassword
		}
	});
	console.log(data.url);
	profile[data.pathName].remove({
		url: data.url,
		size: data.size,
		title: data.title
	});
	await profile.save();
	
	return new Response();
}
