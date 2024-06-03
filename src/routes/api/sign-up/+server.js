/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { UserProfiles } from '$lib/models/user_model';
export const POST = async (event) => {
	const data = await event.request.json();

	const newUser = {
		name: data.name,
		start: [],
		frames: [],
		twoparts: [],
		roombrick: [],
		laminat: [],
		kitchen: [],
		floorwalls: [],
		credentials: {
			login: data.login,
			password: data.password
		},
		uploads: []
	};

	let isLogin = await UserProfiles.find({ 'credentials.login': data.login });
	if (!isLogin.length) {
		let userToSave = new UserProfiles(newUser);
		userToSave.save();
	}

	return new Response(JSON.stringify(isLogin));
};
