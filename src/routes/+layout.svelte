<script>
	import { page } from '$app/stores';

	import { onMount } from 'svelte';
	import { slide, fade, fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import { navigating } from '$app/stores';
	import { exit } from '$lib/logic/serverFunctions';
	export let data;
	//console.log(data.userProfile[0]);
	//console.log(data);

	let starVisible = false;
	let currentUrl = $page.route.id?.substr(1);

	let linksVisible = false;
	let favoritesVisible = false;
	let title = '';

	$: isUser = $page.data.userProfile.length;
	$: if ($navigating) {
		favoritesVisible = false;
		setTimeout(() => {
			//console.log(data.userProfile[0][currentUrl])
			if (
				$page.route.id == '/sign-in' ||
				$page.route.id == '/sign-up' ||
				!data.userProfile.length
			) {
				starVisible = false;
			} else {
				starVisible = true;
			}
		}, 100);
	}

	function favorites() {
		if ($page.route.id.substr(1) == '') {
			currentUrl = 'start';
		} else {
			currentUrl = $page.route.id.substr(1);
		}

		favoritesVisible = !favoritesVisible;
		//console.log($page.route.id.substr(1)) //ok
	}

	function burgerClick() {
		linksVisible = !linksVisible;
		if (linksVisible) {
			setTimeout(() => {
				let links = document.querySelectorAll('a');
				links.forEach((item) => {
					item.style.color = 'black';
					item.onclick = function () {
						linksVisible = false;
						links.forEach((item) => {
							item.style.color = 'black';
						});
						this.style.color = 'red';
						title = this.innerText;
					};
				});
			});
		}
	}

	onMount(() => {
		if (data.userProfile.length) {
			starVisible = true;
		}
		// document.cookie = `login=${data.userProfile[0].credentials.login}`
		// document.cookie =`password=${data.userProfile[0].credentials.password}`;
		//return profileStore.subscribe((val) => (profileCurrent = val));
	});
</script>

<nav>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="burger" on:click={burgerClick}>
		<img class="" src="./burger.png" alt="" title="Меню" />
		<span class="text">Меню</span>
	</div>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<a href="/sign-in">Вход</a>
	<a href="/sign-up">Регистрация</a>
	{#if isUser}
		<a href="/uploads" class="load">Загрузить</a>
	{/if}

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#if isUser}
		<p class="text exit" on:click={exit}>Выход</p>
	{/if}
	{#if data.userProfile?.length}
		<span class="text hello name"
			><span class="text hello">Привет, </span>{data.userProfile[0]?.name}</span
		>
	{/if}

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#if starVisible}
		<img class="star" src="/favorites.jpg" alt="favorites" title="Избранное" on:click={favorites} />
	{/if}

	{#if favoritesVisible}
		<div class="favor-window">
			{#each data.userProfile[0][currentUrl] as item}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="item-favorites">
					<div class="image-container">
						<img class="img-favor" src="./textures/{item.url}" alt="" srcset="" />
					</div>
					<span class="info img-title">{item.title}</span>
					<span class="info size">{item.size}</span>
				</div>
			{/each}
		</div>
	{/if}

	{#if linksVisible}
		<div
			class="menu"
			in:slide={{ delay: 100, duration: 500, easing: linear }}
			out:slide={{ delay: 100, duration: 1000, easing: linear }}
		>
			<a href="/" transition:fly={{ delay: 0, x: 250, duration: 250 }}>Начало</a>
			<a href="/frames" transition:fly={{ delay: 0, x: 25, y: 25, duration: 250 }}>
				Плинтус дизайн
			</a>
			<!-- <a href="/onewall"> Одна стена</a> -->
			<a href="/twoparts" transition:fly={{ delay: 0, x: 25, y: 25, duration: 250 }}>
				Две части стены</a
			>
			<a href="/roombrick" transition:fly={{ delay: 0, x: 25, y: 25, duration: 250 }}>
				По кирпичику
			</a>
			<a href="/laminat" transition:fly={{ delay: 0, x: 25, y: 25, duration: 250 }}>
				Самоклеющийся ламинат
			</a>
			<a href="/kitchen" transition:fly={{ delay: 0, x: 25, y: 25, duration: 250 }}> Кухня </a>
			<a href="/floorwalls" transition:fly={{ delay: 0, x: 250, duration: 250 }}
				>Потолок,стены,пол</a
			>
		</div>
	{/if}

	<p class=" text title">{title}</p>
</nav>
<slot />

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	nav {
		position: relative;
		display: flex;

		justify-content: space-around;
		align-items: center;
		padding-left: 1%;
		padding-top: 3px;
		width: 100%;
		height: 6vh;
		gap: 2%;
		background: linear-gradient(to right, #ccccb2, #a5a523, #ccccb2);
	}
	img {
		height: 60%;
		cursor: pointer;
	}
	.burger {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 3%;
		height: 90%;
		padding: 0 2px 0 2px;
		border-radius: 3px;
		color: white;
		background-color: rgb(0, 136, 255);
		cursor: pointer;
		/* border: 1px solid black; */
	}
	.burger > .text {
		font-size: 2.1vh;
	}
	.burger > img {
		width: 60%;
	}
	a {
		text-decoration: none;
		font-size: 3.2vh;
		color: rgb(3, 21, 182);
	}
	a:active {
		transform: translateY(3px);
		text-shadow: 2px 2px 2px rgb(13, 65, 0);
	}
	.exit {
		font-size: 3vh;
		color: rgb(123, 4, 4);
		font-weight: bold;
		font-variant: small-caps;
		cursor: pointer;
	}
	.load {
		color: rgb(12, 246, 0);
		text-decoration: none;
		text-shadow: 1px 1px 2px black;
	}
	.hello {
		font-size: 3vh;
		font-family: 'Courier New', Courier, monospace;
		font-weight: 700;
		color: rgb(3, 21, 182);
	}
	.title {
		font-size: 2.5vw;
		margin-left: 5%;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		font-weight: bolder;
		color: rgb(130, 36, 2);
	}
	.menu {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 50vh;
		background-color: rgba(165, 165, 35, 0.878);
		padding: 5px;
		left: 1vw;
		top: 6vh;
		z-index: 100;
		box-shadow: -3px 3px 3px;
		border: 1px ridge black;
		border-radius: 20% 15% / 10% 40%;
	}

	.favor-window {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 5px;
		position: absolute;
		width: 80vw;
		height: 80vh;
		top: 8vh;
		background-color: rgba(107, 186, 107, 0.973);
		overflow: scroll;
		z-index: 100;
	}
	.item-favorites {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 5px;
		width: 25vw;
		height: 27vw;
		background-color: rgba(61, 87, 61, 0.733);
	}
	.image-container {
		display: flex;
		width: 85%;
		height: 78%;
	}
	.img-favor {
		width: 100%;
		height: 100%;
	}
	.info {
		font-weight: bold;
	}

	@media only screen and (max-width: 480px) {
		a {
			font-size: 3vw;
		}
		.text {
			font-size: 3vw;
		}
		.burger {
			width: 10%;
		}
	}
	@media only screen and (max-height: 440px) {
		a {
			font-size: 0.8em;
		}
	}
</style>
