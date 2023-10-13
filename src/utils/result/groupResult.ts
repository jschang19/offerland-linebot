const maxResult = 8;

const mapSubscribersToResults = (results: Result[]): Map<string, string[]> => {
	const mapping = new Map<string, string[]>();

	results.forEach((result) => {
		result.subscribers.forEach((subscriber) => {
			const ids = mapping.get(subscriber.line_id) || [];
			ids.push(result.id);
			mapping.set(subscriber.line_id, ids);
		});
	});

	return mapping;
};

const groupSubscribersByResults = (subscriptions: Map<string, string[]>): Map<string, string[]> => {
	const groups = new Map<string, string[]>();

	subscriptions.forEach((results, subscriber) => {
		const key = results.join(",");
		const subs = groups.get(key) || [];
		subs.push(subscriber);
		groups.set(key, subs);
	});

	return groups;
};

const transformToArray = (groups: Map<string, string[]>): MulticastGroup[] => {
	return Array.from(groups.entries()).map(([resultIds, subscribers]) => ({
		resultIds: resultIds.split(","),
		subscribers,
	}));
};

const getTypeResult = (resultIds: string[], allResults: Result[]): TypeResults => {
	const typeResults: TypeResults = {
		decision: [],
		admit: [],
		reject: [],
	};

	const resultsMap = new Map(allResults.map((result) => [result.id, result]));
	console.log("resultIds", resultIds);
	resultIds.forEach((id) => {
		const result = resultsMap.get(id);
		console.log(result?.type);
		if (result) {
			typeResults[result.type].push(id);
		}
	});

	return typeResults;
};

const sortTypesByDate = (typeResults: TypeResults, allResults: Result[]): TypeResults => {
	const resultsMap = new Map(allResults.map((result) => [result.id, result]));

	Object.entries(typeResults).forEach(([type, resultIds]) => {
		typeResults[type] = resultIds.sort((a, b) => {
			const aDate = new Date(resultsMap.get(a)?.date || "").getTime();
			const bDate = new Date(resultsMap.get(b)?.date || "").getTime();
			if (aDate === bDate) return 0;
			return bDate - aDate; // descending order
		});
	});

	return typeResults;
};

export const sortResultId = (multicastGroups: MulticastGroup[], allResults: Result[]): MulticastGroup[] => {
	return multicastGroups.map((group) => {
		const typeResults = getTypeResult(group.resultIds, allResults);
		const sortedTypeResults = sortTypesByDate(typeResults, allResults);

		return {
			...group,
			resultIds: [...sortedTypeResults.decision, ...sortedTypeResults.admit, ...sortedTypeResults.reject].slice(
				0,
				maxResult,
			),
		};
	});
};

export const createMulticastGroup = (allResults: Result[]): MulticastGroup[] => {
	allResults = allResults.filter((result) => result.subscribers.length > 0);

	if (allResults.length === 0) {
		console.log("Oops, no result to multicast");
		return [];
	}

	const userSubscriptions = mapSubscribersToResults(allResults);
	const groupedSubscribers = groupSubscribersByResults(userSubscriptions);
	const multicastGroups = transformToArray(groupedSubscribers);
	return sortResultId(multicastGroups, allResults);
};
