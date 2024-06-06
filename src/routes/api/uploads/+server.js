/* eslint-disable no-unused-vars */
import { UserProfiles } from '$lib/models/user_model';
export const POST = async ({ request }) => {
	const data = await request.json();
	// console.log("filename" + data.fileName );//ok
	// console.log("userlogin" + data.userLogin);//ok
	const userProfile = await UserProfiles.findOne({ 'credentials.login': data.userLogin });
	// console.log(userProfile);//ok
	const customImage = { url: data.fileName, size: '', title: '' };
	let isPresent = false;

	for (const item of userProfile.uploads) {
		if (item.url == data.fileName) {
			isPresent = true;
			//console.log('already exists'); //ok
			break;
		}
	}

	if (!isPresent) {
		userProfile.uploads.push(customImage);
		await userProfile.save();
	}

	return new Response();
};
