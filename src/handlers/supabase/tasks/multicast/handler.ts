import { Client } from "@line/bot-sdk";
import preciseMulticast from "./precise";

const handleMulticast = async (line: Client, param: string[], results: Result[]) => {
	console.log("Starting LINE multicast task");
	console.log("Started at: " + new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }));
	const target = param[3];
	switch (target) {
		case "precise":
			console.log("Task type: precise");
			await preciseMulticast(line, results);
			break;
		case "extensive":
		// to be implemented
		default:
			console.log("Invalid target: " + target);
	}
};

export default handleMulticast;
