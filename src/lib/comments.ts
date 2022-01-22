import type { CreateComment } from '../../types/comments';
import { writable } from 'svelte/store';

export const comments = writable([]);
export const commentsLoading = writable(false);
export const isReplyButtonLoading = writable(false);

export const createComment = async (comment: CreateComment): Promise<Response> => {
	isReplyButtonLoading.set(true);
	const response = await fetch('/api/comments', {
		method: 'POST', // or 'PUT'
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(comment)
	});
	if (response.ok) {
		await getComments();
	}
	isReplyButtonLoading.set(false);
	return response;
};

export const getComments = async (): Promise<Response> => {
	commentsLoading.set(true);
	const response = await fetch('/api/comments');

	if (response.ok) {
		comments.set(await response.json());
	}
	commentsLoading.set(false);
	return response;
};
