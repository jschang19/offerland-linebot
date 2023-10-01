import { nanoid } from "nanoid";

const groupWithSameResults = (allResults: Result[]) => {
	const subscriberList: SubscriberList = {};

	allResults = allResults.filter((result: Result) => result.subscribers.length > 0);

	if (allResults.length === 0) return [];

	allResults.forEach((result: Result) => {
		const { subscribers } = result;
		result.id = nanoid(4);

		subscribers.forEach((subscriber: Subscriber) => {
			if (!subscriberList[subscriber.line_id]) {
				subscriberList[subscriber.line_id] = [];
			}
			subscriberList[subscriber.line_id].push(result.id);
		});
	});

	const groupedResult: { [key: string]: string[] } = {};
	for (const subscriber in subscriberList) {
		const combinedResult = subscriberList[subscriber].join(",");
		if (!groupedResult[combinedResult]) {
			groupedResult[combinedResult] = [];
		}
		groupedResult[combinedResult].push(subscriber);
	}
	const finalList: {
		resultIds: string[];
		subscribers: string[];
	}[] = [];

	for (const group in groupedResult) {
		let seperatedGroup = group.split(",");
		finalList.push({
			resultIds: seperatedGroup,
			subscribers: groupedResult[group],
		});
	}

	return finalList;
};

export default groupWithSameResults;
