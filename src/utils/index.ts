import type { Session } from '@supabase/supabase-js';

interface CookieResponse {
	refresh_token: string;
	access_token: string;
	expires_at: string;
}

export const constructCookies = (session: Session): CookieResponse => {
	const cookieOptions = `Path=/;HttpOnly;Secure;SameSite=Strict;Expires=${new Date(
		session.expires_at * 1000
	).toUTCString()};`;

	return {
		refresh_token: `refresh_token=${session.refresh_token};${cookieOptions}`,
		access_token: `access_token=${session.access_token};${cookieOptions}`,
		expires_at: `expires_at=${session.expires_at};${cookieOptions}`
	};
};
