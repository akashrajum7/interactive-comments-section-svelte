<script>
	import { session } from '$app/stores';
</script>

<nav class="px-4 md:px-6 py-3 bg-white border-b-2 border-b-moderate-blue">
	<div class="max-w-7xl mx-auto flex justify-between items-center">
		<div>
			<h1 class="font-bold text-2xl text-dark-blue">{'</>'} Comments</h1>
		</div>

		{#if $session?.user}
			<button>
				<img
					src={`https://source.boringavatars.com/beam?name=${$session.user.user_metadata.name}`}
					alt="dp"
					class="w-10 h-10"
				/>
			</button>
		{:else}
			<a href="/auth/signin" class="px-6 py-2 font-medium text-white bg-moderate-blue rounded-lg">
				Signin
			</a>
		{/if}
	</div>
</nav>
