import { Client, FlexBubble, LINE_REQUEST_ID_HTTP_HEADER_NAME } from "@line/bot-sdk";
import { createPreciseGroup, createResultsMap } from "@utils/result/groupResult";
import { assignIdToResults } from "@utils/result/assignId";
import { generateSubscribtionCarousel, generateSubscribtionBubble } from "@utils/line/message/multicast";
import updateMultiQuota from "@utils/user/updateQuota";

const preciseMulticast = async (line: Client, results: Result[]) => {
	try {
		const assignedResults = assignIdToResults(results);
		const multicastGroups = createPreciseGroup(assignedResults);
		const resultsMap = createResultsMap(assignedResults);

		if (!multicastGroups) {
			return;
		}

		for (const group of multicastGroups) {
			const messageBubbles: FlexBubble[] = [];
			const { resultIds, subscribers } = group;

			resultIds.forEach((id) => {
				const result = resultsMap.get(id);
				if (!result) {
					console.error(`Result ${id} not found!`);
					return;
				}
				const bubble = generateSubscribtionBubble(result);
				messageBubbles.push(bubble);
			});
			const carouselMessage = generateSubscribtionCarousel(messageBubbles);
			const lineApiResponse = await line.multicast(subscribers, carouselMessage);

			if (!lineApiResponse[LINE_REQUEST_ID_HTTP_HEADER_NAME]) {
				console.error("Line API response does not contain request id!");
				return;
			}

			await updateMultiQuota(subscribers);
		}

		console.log("Precise multicast task finished.");
		console.log("Finished at: " + new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }));
		console.log("- - -");
	} catch (err: any) {
		console.error("preciseMulticast error: " + err);
	}
	return;
};

export default preciseMulticast;
