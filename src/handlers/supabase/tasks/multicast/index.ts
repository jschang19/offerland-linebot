import { Client } from "@line/bot-sdk";
import preciseMulticast from "./precise";
import extensiveMulticast from "./extensive";
import { Result } from "@/types/result.types";

const handleMulticast = async (line: Client, param: string[], results: Result[]) => {
	console.log(
		JSON.stringify({
			severity: "DEFAULT",
			message: `Received Supabase request. Starting LINE multicast at ${new Date().toLocaleString("zh-TW", {
				timeZone: "Asia/Taipei",
			})}`,
		})
	);

	if (!results) {
		console.log("No results this time. End execution");
		return;
	}

	const target = param[3];
	switch (target) {
		case "precise":
			console.log("Task type: precise");
			await preciseMulticast(line, results);
			break;
		case "extensive":
			console.log("Task type: extensive");
			await extensiveMulticast(line, results);
			break;
		default:
			console.log("Invalid target: " + target);
	}
};

export default handleMulticast;
