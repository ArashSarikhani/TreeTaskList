export interface TaskInterface {
	id: number;
	parent?: number | null;
	version: number | null;
	name: string;
	description: string | null;
	due_date: string | null;
	state: number;
	children: TaskInterface[];
}

export type CreateFormInputFields = {
	parent?: number;
	name?: string;
	description?: string;
	due_date?: string;
	state?: number;
};
