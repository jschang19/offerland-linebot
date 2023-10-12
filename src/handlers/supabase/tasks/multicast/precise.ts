import { Client, FlexBubble } from "@line/bot-sdk";
import { createMulitcastGroup } from "@utils/result/groupResult";
import { assignIdsToResults } from "@utils/result/assignId";
import { generateSubscribtionCarousel, generateSubscribtionBubble } from "@utils/subscriptionList";
import updateMultiQuota from "@utils/user/updateQuota";

const preciseMulticast = async (line: Client, results: Result[]) => {
	try {
		results = assignIdsToResults(results);
		const multicastGroups = createMulitcastGroup(results);

		if (multicastGroups.length === 0) {
			return;
		}

		for (const group of multicastGroups) {
			const messageBubbles: FlexBubble[] = [];
			let { resultIds, subscribers } = group;

			resultIds.forEach((id) => {
				const result = results.find((r: Result) => r.id === id);
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

			console.log("Precise multicast task finished.");
			console.log("Finished at: " + new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }));
		}
	} catch (err: any) {
		console.error("preciseMulticasr error: " + err);
	}
	return;
};

export default preciseMulticast;
