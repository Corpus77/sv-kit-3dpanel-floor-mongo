<script>
	// import { wallArray, floorArray, laminatArray, plintusArray }
	//  from '../typesArrays.js';
	import { destroy_block, get_current_component, mount_component } from 'svelte/internal';
	import { page } from '$app/stores';
	import { slide, scale } from 'svelte/transition';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { linear } from 'svelte/easing';
	import { createEventDispatcher, onMount } from 'svelte';
	import {
		filenamesBrick,
		filenamesDecBrick,
		filenamesBambook,
		filenamesEk,
		filenamesKladka,
		filenamesMramor,
		filenamesStone,
		filenamesWood,
		filenamesVintage,
		filenamesCeil,
		filenamesVinilWall
	} from '../filenames.js';
	import { filenamesPuzzles, filenamesVinil, filenamesPuzzlesButton } from '../filenamesfloor';
	import { filenamesPlintus } from '../filenamesplintus';

	import { refresh } from '$lib/logic/serverFunctions';

	export let globalSurface;
	export let isUploads;
	const THISComponent = get_current_component();
	let isUser;
	$: isUser = $page.data.userProfile.length;
	//!_______________________________________________________________
	
	let pathName = $page.url.pathname.substring(1);
	if (pathName == '') {
		pathName = 'start';
	}

	function getProfileArr() {
		//console.log($page.data); //ok

		if ($page.data.userProfile.length) {
			return $page.data.userProfile[0][pathName];
		} else {
			return [];
		}
	}

	function getUploadsArr() {
		//console.log($page.data.userProfile[0].uploads);//ok

		if ($page.data.userProfile.length) {
			return $page.data.userProfile[0].uploads;
		} else {
			return [];
		}
	}
//________________________________________________________
	let uploadsArr = getUploadsArr();
	let favoritesArr = getProfileArr();
	let currentLogin = $page.data.userProfile.length
		? $page.data.userProfile[0].credentials.login
		: '';
	let currentPassword = $page.data.userProfile.length
		? $page.data.userProfile[0].credentials.password
		: '';
//________________________________________________________

	function save(e) {
		e.stopPropagation();
		let infoPannelArr = Array.from(e.target.parentNode.querySelectorAll('span'));
		let panelTosave = {
			url: '',
			size: '',
			title: ''
		};

		infoPannelArr.forEach((span) => {
			if (span.classList.contains('url-hidden')) {
				panelTosave.url = span.textContent;
			}
			if (span.classList.contains('size')) {
				panelTosave.size = span.textContent;
			}
			if (span.classList.contains('title')) {
				panelTosave.title = span.textContent;
			}

			//console.log(span.textContent) //ok
		});
		//console.log(panelTosave);  //ok

		fetch('api/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;utf-8'
			},
			body: JSON.stringify({
				currentLogin,
				currentPassword,
				panelTosave,
				pathName,
				url: this.parentNode.querySelector('.url-hidden').textContent
			})
		})
			.then(() => {
				refresh(currentLogin, currentPassword);
			})
			.then(() => {
				THISComponent.$destroy();
			});

		//____________________________________________________________________
	}

	function remove(e) {
		e.stopPropagation();
		fetch('/api/remove', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;utf-8'
			},

			body: JSON.stringify({
				currentLogin,
				currentPassword,
				pathName,
				url: this.parentNode.querySelector('.url-hidden').textContent,
				size: this.parentNode.querySelector('.size').textContent,
				title: this.parentNode.querySelector('.title').textContent
			})
		})
			.then(() => {
				refresh(currentLogin, currentPassword);
			})
			.then(() => {
				THISComponent.$destroy();
			});
	}

	function removeLoaded(e) {
		e.stopPropagation();
		fetch('/api/remove-loaded', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;utf-8'
			},
			body: JSON.stringify({
				url: this.parentNode.querySelector('.url-hidden').textContent
			})
		}).then(() => {
			fetch('/api/remove', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;utf-8'
				},

				body: JSON.stringify({
					currentLogin,
					currentPassword,
					pathName: 'uploads',
					url: this.parentNode.querySelector('.url-hidden').textContent,
					size: this.parentNode.querySelector('.size').textContent,
					title: this.parentNode.querySelector('.title').textContent
				})
			})
			.then(() => {
				refresh(currentLogin, currentPassword);
			})
			.then(() => {
				THISComponent.$destroy();
			});
		});
	}
	//____________________________________________________________
	onMount(() => {});

	// -------------------------------------------------
	function active(button, typePanel, surfaceArray) {
		button.classList.toggle('non-active');
		let buttonArr = document.querySelectorAll('button');
		surfaceArray.forEach((item) => {
			if (item.type !== typePanel.type) {
				item.visible = false;
				buttonArr.forEach((butt) => {
					if (button !== butt) {
						butt.classList.add('non-active');
					}
				});
			}
		});
	}
	//  dispatch event target panel
	const dispatch = createEventDispatcher();
	const panelChoice = (url) => {
		dispatch('panelChoice', url);
	};

	// //  Array of object`s panels for walls
	let wallArray = [
		{
			type: 'uploads',
			visible: false,
			title: 'Сохраненные',
			imgArr: uploadsArr
		},
		{
			type: 'favorites',
			visible: false,
			title: 'Избранное',
			imgArr: favoritesArr
		},
		{
			type: 'simpleBrick',
			visible: false,
			title: 'Кирпич',
			imgArr: filenamesBrick
		},
		{
			type: 'decBrick',
			visible: false,
			title: 'Декоративный кирпич',
			imgArr: filenamesDecBrick
		},
		{
			type: 'ekBrick',
			visible: false,
			title: 'Екатеринославский кирпич',
			imgArr: filenamesEk
		},
		{
			type: 'kladka',
			visible: false,
			title: 'Кладка',
			imgArr: filenamesKladka
		},
		{
			type: 'mramor',
			visible: false,
			title: 'Мрамор',
			imgArr: filenamesMramor
		},
		{
			type: 'bambook',
			visible: false,
			title: 'Бамбук',
			imgArr: filenamesBambook
		},
		{ type: 'stone', visible: false, title: 'Камень', imgArr: filenamesStone },
		{ type: 'wood', visible: false, title: 'Дерево', imgArr: filenamesWood },
		{
			type: 'vintage',
			visible: false,
			title: 'Винтаж',
			imgArr: filenamesVintage
		},
		{
			type: 'ceil',
			visible: false,
			title: 'Потолочные',
			imgArr: filenamesCeil
		},
		{
			type: 'vinil',
			visible: false,
			title: 'Виниловая плитка',
			imgArr: filenamesVinilWall
		}
	];
	// Array of object`s items for floor
	let floorArray = [
		
		{
			type: 'pazzles',
			visible: false,
			title: 'Пол-пазл',
			imgArr: filenamesPuzzles
		},

		{
			type: 'vinil',
			visible: false,
			title: 'Виниловая плитка',
			imgArr: filenamesVinil
		}
	];
	let laminatArray = [
		
		{
			type: 'favorites',
			visible: false,
			title: 'Избранное',
			imgArr: favoritesArr
		},
		{
			type: 'vinil',
			visible: false,
			title: 'Виниловая плитка',
			imgArr: filenamesVinilWall
		}
	];
	let plintusArray = [
		{
			type: 'gluePlintus',
			visible: false,
			title: 'Самоклеющийся плинтус',
			imgArr: filenamesPlintus
		}
	];
</script>

<div class="container" transition:slide={{ delay: 100, duration: 500 }}>
	<div class="btnContainer" transition:scale={{ delay: 250, duration: 500 }}>
		<!-- "'each' cycle button rendering" -->
		{#if globalSurface == 'wall'}
			{#each wallArray as item, index}
				<!-- ! uploads -->
				<button
					class="btn non-active"
					on:click={(e) => {
						active(e.target, item, wallArray);
						item.visible = !item.visible;
						if (item.type == 'uploads') {
							isUploads = true;
						} else {
							isUploads = false;
						}
					}}
					>{item.title}
				</button>
			{/each}
		{:else if globalSurface == 'floor'}
			{#each floorArray as item, index}
				<button
					class="btn non-active"
					on:click={(e) => {
						active(e.target, item, floorArray);
						item.visible = !item.visible;
					}}
					>{item.title}
				</button>
			{/each}
			<!-- for laminat -->
		{:else if globalSurface == 'laminat'}
			{#each laminatArray as item, index}
				<button
					class="btn non-active"
					on:click={(e) => {
						active(e.target, item, laminatArray);
						item.visible = !item.visible;
					}}
					>{item.title}
				</button>
			{/each}
		{:else if globalSurface == 'ceil'}
			{#each wallArray as item, index}
				<button
					class="btn non-active"
					on:click={(e) => {
						active(e.target, item, wallArray);
						item.visible = !item.visible;
						if (item.type == 'uploads') {
							isUploads = true;
						} else {
							isUploads = false;
						}
					}}
					>{item.title}
				</button>
			{/each}
			<!--! for plintus -->
		{:else if globalSurface == 'plintusUp' || 'plintusDown'}
			{#each plintusArray as item, index}
				<button
					class="btn non-active"
					on:click={(e) => {
						active(e.target, item, plintusArray);
						item.visible = !item.visible;
					}}
					>{item.title}
				</button>
			{/each}
		{/if}

		<!-- --------------------------------  -->
	</div>
	<!-- 'each' cycle panel rendering -->
	{#if globalSurface == 'wall'}
		{#each wallArray as item}
			{#if item.visible}
				{#each item.imgArr as filename}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						transition:scale={{ delay: 200, duration: 500, easing: linear }}
						class="divImg"
						on:click={() => {
							panelChoice(filename.url);
						}}
					>
						<!--! uploads  -->
						<img
							src="./textures/{filename.url}"
							alt=""
							loading="lazy"
							on:error|preventDefault={(e) => {
								e.target.setAttribute('src', `./uploads/${filename.url}`);
							}}
						/>
						<span class="url-hidden">{filename.url}</span>
						<span class="title">{filename.title}</span>
						<span class="size">{filename.size}</span>
						{#if item.type !== 'favorites' && item.type !== 'uploads' && isUser}
							<span class="save" on:click={save}>Сохранить</span>
						{/if}
						{#if item.type == 'favorites' && isUser}
							<span class="remove" on:click={remove}>Удалить</span>
						{/if}
						{#if item.type == 'uploads' && isUser}
							<span class="remove" on:click={removeLoaded}>Удалить</span>
						{/if}
					</div>
				{/each}
			{/if}
		{/each}
	{:else if globalSurface == 'floor'}
		{#each floorArray as item}
			{#if item.visible}
				{#each item.imgArr as filename}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						transition:scale={{ delay: 200, duration: 500, easing: linear }}
						class="divImg"
						on:click={() => {
							panelChoice(filename.url);
						}}
					>
						<img src="./textures/floor/{filename.url}" alt="" loading="lazy" />
						<span class="url-hidden">{filename.url}</span>

						<span class="title">{filename.title}</span>
						<span class="size">{filename.size}</span>
						{#if item.type == 'uploads' && isUser}
							<span class="remove" on:click={removeLoaded}>Удалить</span>
						{/if}
					</div>
				{/each}
			{/if}
		{/each}
		<!--! For laminat  -->
	{:else if globalSurface == 'laminat'}
		{#each laminatArray as item}
			{#if item.visible}
				{#each item.imgArr as filename}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						transition:scale={{ delay: 200, duration: 500, easing: linear }}
						class="divImg"
						on:click={() => {
							panelChoice(filename.url);
						}}
					>
						<img src="./textures/floor/{filename.url}" alt="" loading="lazy"  />
						<span class="url-hidden">{filename.url}</span>

						<span class="title">{filename.title}</span>
						<span class="size">{filename.size}</span>
						{#if item.type !== 'favorites' && isUser}
							<span class="save" on:click={save}>Save</span>
						{/if}
						{#if item.type == 'favorites' && isUser}
							<span class="remove" on:click={remove}>Удалить</span>
						{/if}
					</div>
				{/each}
			{/if}
		{/each}
	{:else if globalSurface == 'ceil'}
		{#each wallArray as item}
			{#if item.visible}
				{#each item.imgArr as filename}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						transition:scale={{ delay: 200, duration: 500, easing: linear }}
						class="divImg"
						on:click={() => {
							panelChoice(filename.url);
						}}
					>
						<img src="./textures/{filename.url}" alt="" loading="lazy" on:error|preventDefault={(e) => {
							e.target.setAttribute('src', `./uploads/${filename.url}`);
						}} />
						<span class="url-hidden">{filename.url}</span>

						<span class="title">{filename.title}</span>
						<span class="size">{filename.size}</span>
						{#if item.type !== 'favorites' && isUser && item.type !== 'uploads'}
							<span class="save" on:click={save}>Сохранить</span>
						{/if}
						{#if item.type == 'favorites' && isUser && item.type !== 'uploads'}
							<span class="remove" on:click={remove}>Удалить</span>
						{/if}
						{#if item.type == 'uploads' && isUser}
							<span class="remove" on:click={removeLoaded}>Удалить</span>
						{/if}
					</div>
				{/each}
			{/if}
		{/each}
		<!--! for plintus -->
	{:else if globalSurface == 'plintusUp' || 'plintusDown' || 'frame'}
		{#each plintusArray as item}
			{#if item.visible}
				{#each item.imgArr as filename}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						transition:scale={{ delay: 200, duration: 500, easing: linear }}
						class="divImg"
						on:click={() => {
							panelChoice(filename.url);
						}}
					>
						<img src="./textures/plintus/{filename.url}" alt="" loading="lazy" />
						<span class="url-hidden">{filename.url}</span>

						<span class="title">{filename.title}</span>
						<span class="size">{filename.size}</span>
					</div>
				{/each}
			{/if}
		{/each}
	{/if}

	<!-- --------------------------------------- -->
</div>

<style>
	.container {
		position: absolute;
		right: 2%;
		top: 15%;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-around;
		gap: 1em;
		width: 45%;
		height: 80%;
		background-color: grey;
		border: 1px solid black;
		z-index: 20;
		overflow: auto;
	}
	.btnContainer {
		position: sticky;
		top: 0.5em;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-evenly;
		gap: 5px;
		padding: 0.5em;
		width: 95%;
		height: auto;
		background-color: rgba(0, 0, 0, 0.274);
		box-shadow: 0.3em 0.3em 1em black;
	}
	.btn {
		padding: 0 1em 0 1em;
		background-color: rgb(186, 235, 97);
		font-weight: bolder;
		font-size: large;
		height: 2rem;
		border-radius: 5px;
	}
	.non-active {
		background-color: white;
	}
	.divImg {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 30%;
		min-height: 30%;
		cursor: pointer;
	}
	img {
		width: 90%;
		height: auto;
	}
	.title {
		color: white;
		font-weight: bold;
	}
	.size {
		color: white;
	}
	.url-hidden {
		display: none;
	}
	.remove {
		background-color: rgba(186, 23, 23, 0.625);
		padding: 0 20% 0 20%;
		border-radius: 3px;
		color: white;
	}
	.save {
		background-color: rgba(4, 152, 4, 0.625);
		padding: 0 20% 0 20%;
		border-radius: 3px;
		color: white;
	}
	@media only screen and (max-width: 480px) {
		.container {
			width: 65%;
			font-size: smaller;
			font-weight: lighter;
		}
		.title,
		.size {
			font-weight: lighter;
		}
		.btn {
			font-weight: bold;
			font-size: 0.7em;
		}
	}
	@media only screen and (max-height: 480px) {
		.btn {
			padding: 0 0.3em 0.3em;
			font-weight: bold;
			font-size: smaller;
		}
		.btnContainer {
			justify-content: space-around;
			word-wrap: break-word;
		}
		.container {
			width: 65%;

			font-size: smaller;
		}
	}
</style>
