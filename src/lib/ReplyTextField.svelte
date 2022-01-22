<script>
	import { createComment } from '$lib/comments';
	import { session } from '$app/stores';

	export let label = 'REPLY';
	export let parent = null;

	let commentText = '';

	const handleButtonClick = async () => {
		const comment = {
			value: commentText,
			created_by: $session.user.id,
			parent: parent
		};
		try {
			const createdComment = await createComment(comment);
			commentText = '';
		} catch (error) {
			console.error('There was an error while trying to create a comment: ', error);
		}
	};
</script>

<section
	class="bg-white p-4 rounded-lg overflow-hidden flex flex-col md:flex-row md:p-6 md:space-x-4"
>
	<img
		src={`https://source.boringavatars.com/beam?name=${$session.user.user_metadata.name}`}
		alt="dp"
		class="w-9 h-9 hidden md:block"
	/>
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
		<img
			src={`https://source.boringavatars.com/beam?name=${$session.user.user_metadata.name}`}
			alt="dp"
			class="w-8 h-8"
		/>
		<button
			on:click={handleButtonClick}
			class="text-white bg-moderate-blue rounded-lg px-6 py-2.5 hover:opacity-50 h-fit"
			>{label}</button
		>
	</div>
</section>
