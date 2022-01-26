<script context="module">
	export async function load({ session }) {
		if (session?.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-dark-blue">Create your account</h2>
			<p class="mt-2 text-center text-sm text-grayish-blue">
				Or
				<a href="/auth/signin" class="font-medium text-moderate-blue">
					Sign in to an existing account
				</a>
			</p>
		</div>
		<form class="mt-8 space-y-6" action="/api/signup" method="POST">
			<input type="hidden" name="remember" value="true" />
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="name" class="sr-only">Name</label>
					<input
						id="name"
						name="name"
						type="text"
						autocomplete="name"
						required
						class="relative block w-full appearance-none rounded-none rounded-t-md border border-moderate-blue px-3 py-2 text-dark-blue placeholder-grayish-blue focus:z-10 focus:outline-none sm:text-sm"
						placeholder="Full Name"
					/>
				</div>
				<div>
					<label for="email-address" class="sr-only">Email address</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="relative block w-full appearance-none rounded-none border border-moderate-blue px-3 py-2 text-dark-blue placeholder-grayish-blue focus:z-10 focus:outline-none sm:text-sm"
						placeholder="Email address"
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="relative block w-full appearance-none rounded-none rounded-b-md border border-moderate-blue px-3 py-2 text-dark-blue placeholder-grayish-blue focus:z-10 focus:outline-none sm:text-sm"
						placeholder="Password"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="border-transparent relative flex w-full justify-center rounded-md border bg-moderate-blue py-2 px-4 text-sm font-medium text-white hover:opacity-50 focus:outline-none"
				>
					<span class="absolute inset-y-0 left-0 flex items-center pl-3">
						<!-- Heroicon name: solid/lock-closed -->
						<svg
							class="h-5 w-5 text-light-grayish-blue"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
					Sign up
				</button>
			</div>
		</form>
	</div>
</div>
