import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
import supabase from '$lib/supabase';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	const { user } = await supabase.auth.api.getUser(cookies.access_token);
	request.locals.user = user || false;
	const response = await resolve(request);
	return response;
};

export const getSession: GetSession = async (request) => {
	return request.locals;
};
