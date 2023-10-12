const maxResult = 6;

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

const tranformToArray = (groups: GroupList): MulticastGroup[] => {
	return Object.entries(groups).map(([resultIds, subscribers]) => ({
		resultIds: resultIds.split(","),
		subscribers,
	}));
};

export const sortResultIdByDate = (multicastGroups: MulticastGroup[], allResults: Result[]): MulticastGroup[] => {
	return multicastGroups.map((group) => ({
		...group,
		resultIds: group.resultIds.sort((a, b) => {
			const aDate = allResults.find((r) => r.id === a)?.date;
			const bDate = allResults.find((r) => r.id === b)?.date;

			if (!aDate || !bDate) return 0;
			// sort by date descending
			return new Date(bDate).getTime() - new Date(aDate).getTime();
		}),
	}));
};

export const filterAdmitted = (groups: GroupList, allResults: Result[]): GroupList => {
	const filtered: GroupList = {};

	Object.entries(groups).forEach(([resultIds, subscribers]) => {
		const ids = resultIds.split(",");
		const filteredIds =
			ids.length > maxResult ? ids.filter((id) => allResults.find((r) => r.id === id)?.type === "admitted") : ids;

		if (!filteredIds.length) return;
		if (filteredIds.length > maxResult) filteredIds.splice(maxResult);
		if (!filtered[filteredIds.join(",")]) filtered[filteredIds.join(",")] = [];

		filtered[filteredIds.join(",")].push(...subscribers);
	});

	return filtered;
};

export const createMulitcastGroup = (allResults: Result[]): MulticastGroup[] => {
	allResults = allResults.filter((result) => result.subscribers.length > 0);
	if (allResults.length === 0) return [];

	const userSubscriptions = mapSubscribersToResults(allResults);
	const groupedSubscribers = groupSubscribersByResults(userSubscriptions);
	const filteredSubscribers = filterAdmitted(groupedSubscribers, allResults);
	const multicastGroups = tranformToArray(filteredSubscribers);
	return sortResultIdByDate(multicastGroups, allResults);
};
