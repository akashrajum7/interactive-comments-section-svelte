import supabase from './supabase';
import type { CreateComment } from '../../types/comments';

export const createComment = async (comment: CreateComment): Promise<void> => {
	fetch('/api/comments', {
		method: 'POST', // or 'PUT'
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(comment)
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
};

export const getComments = async (): Promise<unknown> => {
	const { data, error } = await supabase.from('comments').select();
	if (error) {
		console.error(error);
	}
	return data;
};
