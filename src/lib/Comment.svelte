<script>
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	dayjs.extend(relativeTime);

	import ButtonWithIcon from './ButtonWithIcon.svelte';
	import UpvoteCounterHorizontal from './UpvoteCounterHorizontal.svelte';
	import UpvoteCounterVertical from './UpvoteCounterVertical.svelte';
	import ReplyTextField from './ReplyTextField.svelte';
	import Replies from './Replies.svelte';

	import { session } from '$app/stores';

	export let comment;

	let showReplyTextField = false;

	$: timeFromNow = dayjs(comment.created_at).fromNow();
	$: upvotes = comment.upvotes[0].count;
	$: commentOwner = comment.by.id === $session.user.id;
	$: commentHasReplies = comment.hasOwnProperty('replies');

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
							{#if commentOwner}
								<div
									class="flex items-center justify-center rounded-sm bg-moderate-blue py-px px-2"
								>
									<p class="m-0 p-0 text-center text-sm font-medium text-very-light-gray">you</p>
								</div>
							{/if}
						</div>
						<div class="text-grayish-blue">{timeFromNow}</div>
					</div>
					{#if commentOwner}
						<div class="hidden items-center space-x-2 md:flex md:space-x-4">
							<ButtonWithIcon
								buttonText="Delete"
								color="red"
								icon="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
							/>
							<ButtonWithIcon
								buttonText="Edit"
								color="blue"
								icon="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
							/>
						</div>
					{/if}
					{#if commentHasReplies && !commentOwner}
						<div class="hidden md:block">
							<ButtonWithIcon on:click={toggleReplyTextField} />
						</div>
					{/if}
				</div>
				<p class="text-grayish-blue">
					{comment?.value ?? ''}
				</p>
				<div class="flex justify-between md:hidden">
					<UpvoteCounterHorizontal />
					{#if commentOwner}
						<div class="flex items-center space-x-2 md:hidden md:space-x-2">
							<ButtonWithIcon
								buttonText="Delete"
								color="red"
								icon="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
							/>
							<ButtonWithIcon
								buttonText="Edit"
								color="blue"
								icon="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
							/>
						</div>
					{/if}
					{#if commentHasReplies && !commentOwner}
						<ButtonWithIcon on:click={toggleReplyTextField} />
					{/if}
				</div>
			</div>
		</section>
		{#if showReplyTextField}
			<ReplyTextField parent={comment.id} on:comment-created={() => (showReplyTextField = false)} />
		{/if}
	</div>
	{#if commentHasReplies}
		<Replies replies={comment.replies} />
	{/if}
</div>
