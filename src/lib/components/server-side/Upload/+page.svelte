<script>
	
	import { refresh } from '$lib/logic/serverFunctions';

	import { page } from '$app/stores';

	//export let form;
	const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
	
	let userLogin = $page.data?.userProfile[0]?.credentials.login;
	let userPassword = $page.data?.userProfile[0]?.credentials.password;
	// console.log(userLogin);
	console.log($page.form)
</script>

<form method="post" enctype="multipart/form-data">
	<div class="group">
		
		<label for="file">Upload your profile picture</label>
		<input
			type="file"
			id="file"
			name="fileToUpload"
			accept={authorizedExtensions.join(',')}
			required
		/>
		<input type="text" name="userLogin" id="userLogin" value={userLogin} />
	</div>

	<button type="submit" on:click={refresh(userLogin, userPassword)}>Submit</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2%;
		background-color: rgb(228, 121, 54);
		border-radius: 5px;
	}
	.group {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 60vw;
		height: 20vh;
		gap: 5px;
		/* border: 1px solid black; */
	}
	label {
		font-size: 3.5vh;
		font-weight: bold;
		color:white;
		text-shadow: 1px 1px black;
	}
	button {
		background-color: rgb(57, 170, 57);
		font-weight: 600;
	}
	#userLogin {
		display: none;
	}
</style>
