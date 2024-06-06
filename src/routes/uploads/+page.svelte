<script>
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
  import Upload from '$lib/components/server-side/Upload/+page.svelte';
	
	console.log($page.form);
	
	
</script>

<div class="container">
	<Upload></Upload>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 90vh;
		background-color: grey;
	}
	
</style>
