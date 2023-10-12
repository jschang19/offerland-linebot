import { nanoid } from "nanoid";

const maxResult = 6;

const assignIdsToResults = (results: Result[]): Result[] => {
	return results.map((result) => ({
		...result,
		id: result.id ?? nanoid(4),
	}));
};

const mapSubscribersToResults = (results: Result[]): SubscriberList => {
	const mapping: SubscriberList = {};

	results.forEach((result) => {
		result.subscribers.forEach((subscriber) => {
			if (!mapping[subscriber.line_id]) {
				mapping[subscriber.line_id] = [];
			}
			mapping[subscriber.line_id].push(result.id);
		});
	});

	return mapping;
};

const groupSubscribersByResults = (subscriptions: SubscriberList): GroupList => {
	const groups: GroupList = {};

	Object.entries(subscriptions).forEach(([subscriber, results]) => {
		const key = results.join(",");
		groups[key] = groups[key] ?? [];
		groups[key].push(subscriber);
	});

	return groups;
};

const formatMulticastGroups = (groups: GroupList): MulticastGroup[] => {
	return Object.entries(groups).map(([resultIds, subscribers]) => ({
		resultIds: resultIds.split(","),
		subscribers,
	}));
};

export const filterResultsByType = (groups: GroupList, allResults: Result[]): GroupList => {
	const filtered: GroupList = {};

	Object.entries(groups).forEach(([resultIds, subscribers]) => {
		let ids = resultIds.split(",");
		const filteredIds =
			ids.length >= maxResult
				? ids.filter((id) => allResults.find((r) => r.id === id)?.type === "admitted")
				: ids;

		if (filteredIds.length) filtered[filteredIds.join(",")] = subscribers;
	});

	return filtered;
};

export const createMulitcastGroup = (allResults: Result[]): MulticastGroup[] => {
	allResults = allResults.filter((result) => result.subscribers.length > 0);
	if (allResults.length === 0) return [];

	allResults = assignIdsToResults(allResults);
	const userSubscriptions = mapSubscribersToResults(allResults);
	const groupedSubscribers = groupSubscribersByResults(userSubscriptions);
	const filteredSubscribers = filterResultsByType(groupedSubscribers, allResults);

	return formatMulticastGroups(filteredSubscribers);
};
