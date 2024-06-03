<script>
	import { invalidateAll } from '$app/navigation';
	import { profileStore } from './../../stores/profile_store.js';

	export let message = '';
	export let nameVisible = null;
	export let isUser;
	
	
	let login = '';
	let password = '';
	let name = '';
	let loginStatus = '';

	

	async function handler() {
		const signIn = {
			login,
			password,
			name
		};
		if(isUser) {
			
			if (login && password) {
				await fetch('/api/sign-in', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;utf-8'
					},

					body: JSON.stringify(signIn)
				})
					.then((res) => res.json())
					.then((cont) => {
						profileStore.set(cont);

						if (!cont.length) {
							loginStatus = 'Wrong login or password.';
							invalidateAll();
						} else {
							loginStatus = '';
							console.log(cont);
							loginStatus = `Hello, ${cont[0].name}!`;
							setTimeout(() => {
								window.location.href = '/';
							}, 1000);
						}
					})
					.then(() => {})
					.catch((err) => console.log(err));
			} else {
				loginStatus = 'All fields must be fullfilled.';
			}
		} else {
			
			if (login && password && name) {
				await fetch('/api/sign-up', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;utf-8'
					},

					body: JSON.stringify(signIn)
				})
				.then((res) => res.json())
				.then((isLogin) => {
					console.log(isLogin)
					if(isLogin.length) {
						message = "Login already exists"
					} else {
						 fetch('/api/sign-in', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;utf-8'
					},

					body: JSON.stringify({login, password})
				})
				.then(() => invalidateAll())
				.then(() => {
					loginStatus = `Hello, ${name}!`;
							setTimeout(() => {
								window.location.href = '/';
							}, 1000)
				})
					}
				})
			}
		}
		
	}
</script>

<div class="container">
	<h1>{message}</h1>
	{#if loginStatus}
		<span class="status">{loginStatus}</span>
	{/if}
	<input type="text" placeholder="Enter login" bind:value={login} />
	<input type="text" placeholder="Enter password" bind:value={password} />
	{#if nameVisible}
		<input type="text" placeholder="Enter your name" bind:value={name} />
	{/if}

	<button on:click={handler}>Submit</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
		width: 40%;
		height: 50vh;
		background-color: aquamarine;
		border-radius: 3%;
		box-shadow: 1.5vh 1vh 2vh;
	}
	.status {
		font-size: 3vh;
		font-weight: bold;
		color: rgb(207, 84, 84);
	}
	h1 {
		text-shadow: 1px 1px 1px grey;

	}
</style>
