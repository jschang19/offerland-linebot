import { Client, FlexBubble } from "@line/bot-sdk";
import { createMulticastGroup, createResultsMap } from "@utils/result/groupResult";
import { assignIdToResults } from "@utils/result/assignId";
import { generateSubscribtionCarousel, generateSubscribtionBubble } from "@utils/subscriptionList";
import updateMultiQuota from "@utils/user/updateQuota";

const preciseMulticast = async (line: Client, results: Result[]) => {
	try {
		const assignedResults = assignIdToResults(results);
		const multicastGroups = createMulticastGroup(assignedResults);
		const resultsMap = createResultsMap(results);

		if (multicastGroups.length === 0) {
			return;
		}

		for (const group of multicastGroups) {
			const messageBubbles: FlexBubble[] = [];
			let { resultIds, subscribers } = group;

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
			await line.multicast(subscribers, carouselMessage);
			await updateMultiQuota(subscribers);
		}

		console.log("Precise multicast task finished.");
		console.log("Finished at: " + new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }));
		console.log("- - -");
	} catch (err: any) {
		console.error("preciseMulticasr error: " + err);
	}
	return;
};

export default preciseMulticast;
