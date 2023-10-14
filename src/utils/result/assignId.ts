import { nanoid } from "nanoid";

export const assignIdToResults = (results: Result[]): Result[] => {
	return results.map((result) => ({
		...result,
		id: result.id ?? nanoid(4),
	}));
};
