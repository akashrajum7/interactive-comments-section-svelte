import type { EndpointOutput } from '@sveltejs/kit';
import supabase from '$lib/supabase';
import * as cookie from 'cookie';

export async function post({
	body,
	headers
}: {
	body: unknown;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	headers: any;
}): Promise<EndpointOutput> {
	const cookies = cookie.parse(headers.cookie || '');

	if (cookies?.access_token) {
		await supabase.auth.setAuth(cookies.access_token);
		const { data, error } = await supabase.from('comments').insert([body]);

		if (error) {
			console.error(error);
			return {
				status: 500,
				body: error
			};
		}

		return {
			status: 200,
			body: data
		};
	} else {
		return {
			status: 401,
			body: { message: 'Unauthorized' }
		};
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function get({ headers }: { headers: any }): Promise<EndpointOutput> {
	const cookies = cookie.parse(headers.cookie || '');

	if (cookies?.access_token) {
		await supabase.auth.setAuth(cookies.access_token);
		const { data, error } = await supabase
			.from('comments')
			.select(
				`
	id,
	created_at,
	value,
	by:created_by(*),
	upvotes(*),
	replies:comments(id,
		created_at,
		value,
		by:created_by(*),
		upvotes(*),
		replies:comments(id,
			created_at,
			value,
			by:created_by(*),
			upvotes(*)
			)
		)
	)
	`
			)
			.is('parent', null);

		if (error) {
			console.error(error);
			return {
				status: 500,
				body: error
			};
		}

		return {
			status: 200,
			body: data
		};
	} else {
		return {
			status: 401,
			body: { message: 'Unauthorized' }
		};
	}
}
