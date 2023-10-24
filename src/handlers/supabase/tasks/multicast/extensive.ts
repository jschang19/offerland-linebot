import { Client, FlexBubble } from "@line/bot-sdk";
import { createExtensiveGroup } from "@utils/result/groupResult";
import { assignIdToResults } from "@utils/result/assignId";
import { generateExtensiveBubbles, generateSubscribtionCarousel } from "@utils/line/message/multicast";
import updateMultiQuota from "@utils/user/updateQuota";
import { Result } from "@/types/result.types";

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

		console.log(
			JSON.stringify({
				severity: "DEFAULT",
				message: `Multicast multicast finished at ${new Date().toLocaleString("zh-TW", {
					timeZone: "Asia/Taipei",
				})}`,
			})
		);
	} catch (err: unknown) {
		console.error("extensiveMulticast error: " + err);
	}
	return;
};

export default extensiveMulticast;
