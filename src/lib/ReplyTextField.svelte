<script>
	import { createComment, isReplyButtonLoading } from '$lib/comments';
	import { session } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';

	export let label = 'REPLY';
	export let parent = null;

	let commentText = '';

	const handleButtonClick = async () => {
		if (!commentText?.length) {
			return;
		}
		const comment = {
			value: commentText,
			created_by: $session.user.id,
			parent: parent
		};
		try {
			await createComment(comment);
			commentText = '';
			toast.push('Your comment was successfully added!', {
				theme: {
					'--toastBackground': 'hsl(239, 57%, 85%)',
					'--toastColor': 'hsl(238, 40%, 52%)',
					'--toastBarBackground': 'hsl(238, 40%, 52%)'
				}
			});
		} catch (error) {
			console.error('There was an error while trying to create a comment: ', error);
			toast.push('There was an error while trying to create your comment!', {
				theme: {
					'--toastBackground': 'hsl(357, 100%, 86%)',
					'--toastColor': 'hsl(358, 79%, 66%)',
					'--toastBarBackground': 'hsl(358, 79%, 66%)'
				}
			});
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
		class="text-white bg-moderate-blue rounded-lg px-6 py-2.5 hover:opacity-50 h-fit hidden md:flex md:items-center disabled:opacity-50"
		disabled={$isReplyButtonLoading}
		on:click={handleButtonClick}
	>
		{#if $isReplyButtonLoading}
			<svg
				class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		{/if}
		{label}</button
	>
	<div class="flex justify-between items-center mt-4 md:hidden">
		<img
			src={`https://source.boringavatars.com/beam?name=${$session.user.user_metadata.name}`}
			alt="dp"
			class="w-8 h-8"
		/>
		<button
			on:click={handleButtonClick}
			disabled={$isReplyButtonLoading}
			class="text-white flex items-center bg-moderate-blue rounded-lg px-6 py-2.5 hover:opacity-50 h-fit disabled:opacity-50"
		>
			{#if $isReplyButtonLoading}
				<svg
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			{/if}
			{label}</button
		>
	</div>
</section>
