<script>
	import ReplyButton from './ReplyButton.svelte';
	import UpvoteCounterHorizontal from './UpvoteCounterHorizontal.svelte';
	import UpvoteCounterVertical from './UpvoteCounterVertical.svelte';
	import ReplyTextField from './ReplyTextField.svelte';
</script>

<div class="space-y-2">
	<section class="bg-white p-4 rounded-lg overflow-hidden md:flex md:p-6 md:space-x-6">
		<div class="hidden md:block">
			<UpvoteCounterVertical />
		</div>
		<div class="space-y-4 ">
			<div class="flex justify-between items-center">
				<div class="flex items-center space-x-4">
					<img src="/image-amyrobson.png" alt="dp" class="w-8 h-8" />
					<h4 class="font-medium text-dark-blue">amyrobson</h4>
					<span class="text-grayish-blue">1 month ago</span>
				</div>
				<div class="hidden md:block">
					<ReplyButton />
				</div>
			</div>
			<p class="text-grayish-blue">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, harum blanditiis? Id
				dicta exercitationem alias consequatur reprehenderit a, quas, ex provident blanditiis at
				temporibus quidem eius, voluptatem nesciunt? Libero, accusamus.
			</p>
			<div class="flex justify-between md:hidden">
				<UpvoteCounterHorizontal />
				<ReplyButton />
			</div>
		</div>
	</section>
	<ReplyTextField />
</div>
