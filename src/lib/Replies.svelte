<script>
	import Comment from './Comment.svelte';
	export let replies;
</script>

<div class="space-y-4 border-l-2 border-light-gray pl-4 md:ml-12 md:pl-12">
	{#each replies as comment (comment.id)}
		<Comment {comment} />
	{/each}
</div>
