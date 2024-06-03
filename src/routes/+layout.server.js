/* eslint-disable no-unused-vars */

export const load = async ({ fetch, locals, cookies }) => {
	let userProfile;
	await fetch('/api/sign-in')
		.then((res) => res.json())
		.then((cont) => {
			userProfile = cont;
			//console.log(userProfile);
			//console.log(locals);
			// console.log(cookies.get('login'));
			// console.log(cookies.get('password'));
			return userProfile;
		});
	//_______________________________________________________

	return { userProfile };
};
