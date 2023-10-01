import { Client } from "@line/bot-sdk";
import preciseMulticast from "./precise";

const handleMulticast = async (line: Client, param: string[], results: Result[]) => {
	const target = param[3];
	switch (target) {
		case "precise":
			await preciseMulticast(line, results);
		case "extensive":
		// to be implemented
		default:
			console.log("Invalid target: " + target);
	}
};

export default handleMulticast;
