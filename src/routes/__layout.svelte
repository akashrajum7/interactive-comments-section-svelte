<script lang="ts">
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import NavBar from '$lib/NavBar.svelte';
</script>

<main>
	<NavBar />
	<slot />
	<SvelteToast />
</main>
