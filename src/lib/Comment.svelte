<script>
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);

	import ReplyButton from './ReplyButton.svelte';
	import UpvoteCounterHorizontal from './UpvoteCounterHorizontal.svelte';
	import UpvoteCounterVertical from './UpvoteCounterVertical.svelte';
	import ReplyTextField from './ReplyTextField.svelte';
	import Replies from './Replies.svelte';

	export let comment;

	let showReplyTextField = false;

	$: timeFromNow = dayjs(comment.created_at).fromNow();
	$: upvotes = comment.upvotes[0].count;

	const toggleReplyTextField = () => (showReplyTextField = !showReplyTextField);
</script>

<div class="space-y-4">
	<div class="space-y-2">
		<section class="bg-white p-4 rounded-lg overflow-hidden md:flex md:p-6 md:space-x-6">
			<div class="hidden md:block">
				<UpvoteCounterVertical {upvotes} />
			</div>
			<div class="space-y-4 md:flex-grow">
				<div class="flex justify-between items-center">
					<div class="flex items-center space-x-4">
						<img src="/image-amyrobson.png" alt="dp" class="w-8 h-8" />
						<h4 class="font-medium text-dark-blue">{comment?.by?.name ?? 'Anonymous'}</h4>
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
			<ReplyTextField parent={comment.id} />
		{/if}
	</div>
	{#if comment.hasOwnProperty('replies')}
		<Replies replies={comment.replies} />
	{/if}
</div>
