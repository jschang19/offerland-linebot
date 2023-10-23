import { Client } from "@line/bot-sdk";
import handleMulticast from "./tasks/multicast";
import { Result } from "@/types/result.types";

const handleSupabase = async (
	line: Client,
	param: string[],
	body: {
		results: Result[];
	}
) => {
	try {
		const task = param[2];
		switch (task) {
			case "multicast": {
				const { results } = body;
				await handleMulticast(line, param, results);
				return "success";
			}
			default:
				break;
		}
	} catch (err: unknown) {
		console.error(err);
		return "error";
	}
};

export default handleSupabase;
