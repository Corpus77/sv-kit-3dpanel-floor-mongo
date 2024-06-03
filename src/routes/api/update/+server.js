/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { UserProfiles } from '../../../lib/models/user_model';
export const POST = async ({ request }) => {
	const data = await request.json();
	let isPresent = false;
	const profile = await UserProfiles.findOne({
		credentials: {
			login: data.currentLogin,
			password: data.currentPassword
		}
	});

	for (const item of profile[data.pathName]) {
		if (item.url == data.url) {
			isPresent = true;
			break;
		}
	}
	if (!isPresent) {
		profile[data.pathName].push(data.panelTosave);
		await profile.save();
	}

	return new Response();
};
