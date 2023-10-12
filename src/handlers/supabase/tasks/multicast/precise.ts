import { Client, FlexBubble } from "@line/bot-sdk";
import { createMulitcastGroup } from "@utils/result/groupResult";
import { assignIdsToResults } from "@utils/result/assignId";
import { generateSubscribtionCarousel, generateSubscribtionBubble } from "@utils/subscriptionList";

// Multicast to users who subscribe to the same result on Line
const preciseMulticast = async (line: Client, results: Result[]) => {
	results = assignIdsToResults(results);
	const multicastGroups = createMulitcastGroup(results);
	if (multicastGroups.length === 0) return;

	for (const group of multicastGroups) {
		const messageBubbles: FlexBubble[] = [];
		let { resultIds, subscribers } = group;

		for (let id in resultIds) {
			const result = results.find((result: Result) => result.id === resultIds[id]);
			if (!result) {
				console.error(`Result ${resultIds[id]} not found`);
				continue;
			}
			const bubble = generateSubscribtionBubble(result);
			messageBubbles.push(bubble);
		}
		const carouselMessage = generateSubscribtionCarousel(messageBubbles);
		await line.multicast(subscribers, carouselMessage);
		console.log(`Multicast to ${subscribers.length} users`);
	}
	return;
};

export default preciseMulticast;
