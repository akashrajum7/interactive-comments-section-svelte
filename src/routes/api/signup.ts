import type { EndpointOutput } from '@sveltejs/kit';
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper';
import supabase from '$lib/supabase';
import { constructCookies } from '../../utils';

export async function post({ body }: { body: ReadOnlyFormData }): Promise<EndpointOutput> {
	const name = body.get('name');
	const email = body.get('email');
	const password = body.get('password');

	const { session } = await supabase.auth.signUp(
		{ email, password },
		{
			data: {
				name
			}
		}
	);

	const { refresh_token, access_token, expires_at } = constructCookies(session);

	return {
		status: 302,
		body: 'success',
		headers: {
			'set-cookie': [refresh_token, access_token, expires_at],
			location: '/'
		}
	};
}
