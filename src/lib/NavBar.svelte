<script>
	import { session } from '$app/stores';
</script>

<nav class="border-b-2 border-b-moderate-blue bg-white px-4 py-3 md:px-6">
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-dark-blue">{'</>'} Comments</h1>
		</div>

		{#if $session?.user}
			<button>
				<img
					src={`https://source.boringavatars.com/beam?name=${$session.user.user_metadata.name}`}
					alt="dp"
					class="h-10 w-10"
				/>
			</button>
		{:else}
			<a href="/auth/signin" class="px-6 py-2 font-medium text-white bg-moderate-blue rounded-lg">
				Signin
			</a>
		{/if}
	</div>
</nav>
