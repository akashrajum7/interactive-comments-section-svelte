<script>
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	dayjs.extend(relativeTime);

	import ReplyButton from './ReplyButton.svelte';
	import UpvoteCounterHorizontal from './UpvoteCounterHorizontal.svelte';
	import UpvoteCounterVertical from './UpvoteCounterVertical.svelte';
	import ReplyTextField from './ReplyTextField.svelte';
	import Replies from './Replies.svelte';

	import { session } from '$app/stores';

	export let comment;

	let showReplyTextField = false;

	$: timeFromNow = dayjs(comment.created_at).fromNow();
	$: upvotes = comment.upvotes[0].count;

	const toggleReplyTextField = () => (showReplyTextField = !showReplyTextField);
</script>

<div class="space-y-4">
	<div class="space-y-2">
		<section class="overflow-hidden rounded-lg bg-white p-4 md:flex md:space-x-6 md:p-6">
			<div class="hidden md:block">
				<UpvoteCounterVertical {upvotes} />
			</div>
			<div class="space-y-4 md:flex-grow">
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-4">
						<img
							src={`https://source.boringavatars.com/beam?name=${comment?.by?.name ?? 'Anonymous'}`}
							alt="dp"
							class="h-8 w-8"
						/>
						<div class="flex items-center justify-center space-x-2">
							<h4 class="font-medium text-dark-blue">{comment?.by?.name ?? 'Anonymous'}</h4>
							{#if comment.by.id === $session.user.id}
								<div
									class="flex items-center justify-center rounded-sm bg-moderate-blue py-px px-2"
								>
									<p class="m-0 p-0 text-center text-sm font-medium text-very-light-gray">you</p>
								</div>
							{/if}
						</div>
						<div class="text-grayish-blue">{timeFromNow}</div>
					</div>
					{#if comment.hasOwnProperty('replies')}
						<div class="hidden md:block">
							<ReplyButton on:click={toggleReplyTextField} />
						</div>
					{/if}
				</div>
				<p class="text-grayish-blue">
					{comment?.value ?? ''}
				</p>
				<div class="flex justify-between md:hidden">
					<UpvoteCounterHorizontal />
					{#if comment.hasOwnProperty('replies')}
						<ReplyButton on:click={toggleReplyTextField} />
					{/if}
				</div>
			</div>
		</section>
		{#if showReplyTextField}
			<ReplyTextField parent={comment.id} on:comment-created={() => (showReplyTextField = false)} />
		{/if}
	</div>
	{#if comment.hasOwnProperty('replies')}
		<Replies replies={comment.replies} />
	{/if}
</div>
