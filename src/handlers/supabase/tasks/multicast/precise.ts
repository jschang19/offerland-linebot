import { Client, FlexBubble, LINE_REQUEST_ID_HTTP_HEADER_NAME } from "@line/bot-sdk";
import { createPreciseGroup, createResultsMap } from "@/utils/result/groupResult";
import { assignIdToResults } from "@/utils/result/assignId";
import { generateSubscribtionCarousel, generatePreciseBubbles } from "@utils/line/message/multicast";
import { Result } from "@/types/result.types";
import updateMultiQuota from "@/utils/user/updateQuota";

const preciseMulticast = async (line: Client, results: Result[]) => {
	try {
		const assignedResults = assignIdToResults(results);
		const multicastGroups = createPreciseGroup(assignedResults);
		const resultsMap = createResultsMap(assignedResults);

		if (!multicastGroups) {
			return;
		}

		for (const group of multicastGroups) {
			const { resultIds, subscribers } = group;
			const messageBubbles: FlexBubble[] = generatePreciseBubbles(resultIds, resultsMap);
			const carouselMessage = generateSubscribtionCarousel(messageBubbles);
			const lineApiResponse = await line.multicast(subscribers, carouselMessage);

			if (!lineApiResponse[LINE_REQUEST_ID_HTTP_HEADER_NAME]) {
				console.error("Line API response does not contain request id!");
				return;
			}

			await updateMultiQuota(subscribers);
		}

		console.log(
			JSON.stringify({
				severity: "DEFAULT",
				message: `Precise multicast finished at ${new Date().toLocaleString("zh-TW", {
					timeZone: "Asia/Taipei",
				})}`,
			})
		);
	} catch (err: unknown) {
		console.error("preciseMulticast error: " + err);
	}
	return;
};

export default preciseMulticast;
