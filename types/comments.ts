export interface CreateComment {
	value: string;
	parent?: number | null;
	created_by: number;
}
