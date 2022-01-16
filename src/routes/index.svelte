<script context="module">
	export async function load({ session }) {
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/auth/signin'
			};
		}
		return {};
	}
</script>

<script>
	import Comment from '$lib/Comment.svelte';
	import Replies from '$lib/Replies.svelte';
</script>

<div class="bg-very-light-gray px-4 py-8 ">
	<div class="max-w-3xl mx-auto space-y-4">
		<Comment />
		<Replies />
	</div>
</div>
