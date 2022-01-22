import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
import supabase from '$lib/supabase';
import { constructCookies } from '../utils';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	const superbaseResponse = await supabase.auth.api.getUser(cookies.access_token);
	let { user } = superbaseResponse;
	let setTokens = false;
	let refresh_token, access_token, expires_at;
	if (superbaseResponse.error) {
		const { data, error } = await supabase.auth.api.refreshAccessToken(cookies.refresh_token);
		if (!error) {
			setTokens = true;
			const cookieData = constructCookies(data);
			refresh_token = cookieData.refresh_token;
			access_token = cookieData.access_token;
			expires_at = cookieData.access_token;
			user = data?.user;
		}
	}
	request.locals.user = user || false;
	const response = await resolve(request);
	if (setTokens && refresh_token && access_token && expires_at) {
		return {
			...response,
			headers: { ...response.headers, 'set-cookie': [refresh_token, access_token, expires_at] }
		};
	} else {
		return response;
	}
};

export const getSession: GetSession = async (request) => {
	return request.locals;
};
