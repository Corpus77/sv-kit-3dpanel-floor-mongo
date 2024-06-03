<script>
  import FormLog from "$lib/components/server-side/FormLog.svelte";
  
  
  
</script>

<div class="container">
  
  <FormLog message = "Sign in" isUser = {true}></FormLog>
</div>
<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90vh;
    background-color: burlywood;
  }
</style>
