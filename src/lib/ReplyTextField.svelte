<script>
	import { createComment } from '$lib/comments';
	import { session } from '$app/stores';

	export let label = 'REPLY';
	export let parentComment = null;

	let commentText = '';

	const handleButtonClick = async () => {
		const comment = {
			value: commentText,
			created_by: $session.user.id,
			parent: parentComment
		};
		console.log('comment:', comment);
		const createdComment = await createComment(comment);
		// console.log('Created Comment:', createdComment);
	};
</script>

<section
	class="bg-white p-4 rounded-lg overflow-hidden flex flex-col md:flex-row md:p-6 md:space-x-4"
>
	<img src="/image-amyrobson.png" alt="dp" class="w-9 h-9 hidden md:block" />
	<textarea
		class="flex-grow rounded-lg border border-moderate-blue px-6 py-3 text-base text-dark-blue focus:outline-none"
		rows="3"
		bind:value={commentText}
		placeholder="Add a comment..."
	/>
	<button
		class="text-white bg-moderate-blue rounded-lg px-6 py-2.5 hover:opacity-50 h-fit hidden md:block"
		on:click={handleButtonClick}>{label}</button
	>
	<div class="flex justify-between items-center mt-4 md:hidden">
		<img src="/image-amyrobson.png" alt="dp" class="w-8 h-8" />
		<button
			on:click={handleButtonClick}
			class="text-white bg-moderate-blue rounded-lg px-6 py-2.5 hover:opacity-50 h-fit"
			>{label}</button
		>
	</div>
</section>
