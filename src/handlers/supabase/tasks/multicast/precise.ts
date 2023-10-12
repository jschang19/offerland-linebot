import { Client } from "@line/bot-sdk";
import { createMulitcastGroup } from "@utils/result/groupResult";
import { generateSubscribtionCarousel, generateSubscribtionBubble } from "@utils/subscriptionList";

// Multicast to users who subscribe to the same result on Line
const preciseMulticast = async (line: Client, results: Result[]) => {
	const multicastGroups = createMulitcastGroup(results);
	if (multicastGroups.length === 0) return;

	for (const group of multicastGroups) {
		const messageBubbles = [];
		const { resultIds, subscribers } = group;

		for (let id in resultIds) {
			const result = results.find((result: Result) => result.id === resultIds[id]);
			const bubble = generateSubscribtionBubble(result);
			messageBubbles.push(bubble);
		}
		const carouselMessage = generateSubscribtionCarousel(messageBubbles);
		await line.multicast(subscribers, carouselMessage);
	}
	return;
};

export default preciseMulticast;
