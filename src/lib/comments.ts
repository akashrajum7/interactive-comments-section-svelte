import supabase from './supabase';

interface CreateComment {
	value: string;
	parent: number | null;
}

export const createComment = async (comment: CreateComment): Promise<unknown> => {
	const { data, error } = await supabase.from('comments').insert([comment]);
	if (error) {
		console.error(error);
	}
	return data;
};

export const getComments = async (): Promise<unknown> => {
	const { data, error } = await supabase.from('comments').select();
	if (error) {
		console.error(error);
	}
	return data;
};
