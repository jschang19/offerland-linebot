import { nanoid } from "nanoid";
import { Result } from "@/types/result.types";

export const assignIdToResults = (results: Result[]): Result[] => {
	return results.map((result) => ({
		...result,
		id: result.id ?? nanoid(4),
	}));
};
