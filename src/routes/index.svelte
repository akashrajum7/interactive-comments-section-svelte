<script context="module">
	export async function load({ session, fetch }) {
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/auth/signin'
			};
		}
		const response = await fetch('/api/comments');
		if (response.ok) {
			return {
				props: {
					ssrcomments: await response.json()
				}
			};
		}
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { comments, commentsLoading } from '$lib/comments';
	import Comment from '$lib/Comment.svelte';
	import ReplyTextField from '$lib/ReplyTextField.svelte';
	import Loader from '$lib/Loader.svelte';
	export let ssrcomments;

	onMount(() => {
		$comments = ssrcomments;
	});
</script>

<div class="min-h-screen bg-very-light-gray px-4 py-8 ">
	<div class="mx-auto max-w-3xl space-y-4">
		{#each $comments as comment (comment.id)}
			<Comment {comment} />
		{/each}
		<ReplyTextField label="SEND" />
	</div>
</div>
