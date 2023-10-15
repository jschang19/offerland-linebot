import { Client, FlexBubble, LINE_REQUEST_ID_HTTP_HEADER_NAME } from "@line/bot-sdk";
import { createExtensiveGroup, createResultsMap } from "@utils/result/groupResult";
import { assignIdToResults } from "@utils/result/assignId";
import { generateExtensiveBubbles, generateSubscribtionCarousel } from "@utils/line/message/multicast";
import updateMultiQuota from "@utils/user/updateQuota";

const extensiveMulticast = async (line: Client, results: Result[]) => {
	try {
		const assignedResults = assignIdToResults(results);
		const multicastGroups = createExtensiveGroup(assignedResults);

		if (!multicastGroups) {
			return;
		}

		for (const group of multicastGroups) {
			const { fields, subscribers } = group;
			const messageBubbles: FlexBubble[] = generateExtensiveBubbles(fields);
			const carousel = generateSubscribtionCarousel(messageBubbles);
			await line.multicast(subscribers, carousel);
			await updateMultiQuota(subscribers);
		}

		console.log("Extensive multicast task finished.");
		console.log("Finished at: " + new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }));
		console.log("- - -");
	} catch (err: any) {
		console.error("extensiveMulticast error: " + err);
	}
	return;
};

export default extensiveMulticast;
