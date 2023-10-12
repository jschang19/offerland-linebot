import { nanoid } from "nanoid";

export const assignIdsToResults = (results: Result[]): Result[] => {
	return results.map((result) => ({
		...result,
		id: result.id ?? nanoid(4),
	}));
};
