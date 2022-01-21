<script context="module">
	export async function load({ session, fetch }) {
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/auth/signin'
			};
		}

		let response = await fetch('/api/comments');

		if (response.ok) {
			let comments = await response.json();
			return {
				props: {
					comments
				}
			};
		}
	}
</script>

<script>
	import Comment from '$lib/Comment.svelte';
	import Replies from '$lib/Replies.svelte';
	import ReplyTextField from '$lib/ReplyTextField.svelte';

	export let comments;
</script>

<div class="bg-very-light-gray px-4 py-8 ">
	<div class="max-w-3xl mx-auto space-y-4">
		<Comment />
		<Replies />
		<ReplyTextField label="SEND" />
	</div>
</div>
