/* eslint-disable no-unused-vars */
import { UserProfiles } from '$lib/models/user_model.js';
let userProfile = 
[
	// {
	// 	name: '',
	// 	frames: [],
	// 	twoparts: [],
	// 	roombrick: [],
	// 	laminat: [],
	// 	kitchen: [],
	// 	floorwalls: [],
	// 	credentials: {
	// 		login: '',
	// 		password: ''
	// 	},
	// 	uploads: []
	// }
];
export const POST = async ({ request }) => {
	const loginRequest = await request.json();

	const user = await UserProfiles.find({
		credentials: { login: loginRequest.login, password: loginRequest.password }
	}).lean();
	userProfile = user;
	//console.log(user);
	return new Response(JSON.stringify(userProfile));
};

export const GET = async () => {
	return new Response(JSON.stringify(userProfile));
};
