import { Client } from "@line/bot-sdk";
import handleMulticast from "./tasks/multicast/handler";

const handleSupabase = async (
	line: Client,
	param: string[],
	body: {
		results: Result[];
	},
) => {
	try {
		const task = param[2];
		switch (task) {
			case "multicast":
				const { results } = body;
				await handleMulticast(line, param, results);
				return "success";
			default:
				break;
		}
	} catch (err: any) {
		console.error(err);
		return "error";
	}
};

export default handleSupabase;
