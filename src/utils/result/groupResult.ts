const maxResult = 8;
const maxHardLimit = 11;

export const createResultsMap = (allResults: Result[]): Map<string, Result> => {
	return new Map(allResults.map((result) => [result.id, result]));
};

// 建立各個使用者的訂閱清單
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

// 將同樣訂閱清單的使用者分組
const groupSubscribersByResults = (subscriptions: Map<string, string[]>): Map<string, string[]> => {
	const groups = new Map<string, string[]>();

	subscriptions.forEach((resultIds, subscriber) => {
		const idKey = resultIds.join(",");
		const subscribers = groups.get(idKey) || [];
		subscribers.push(subscriber);
		groups.set(idKey, subscribers);
	});

	return groups;
};

const transformMapToArray = (groups: Map<string, string[]>): MulticastGroup[] => {
	return Array.from(groups.entries()).map(([resultIds, subscribers]) => ({
		resultIds: resultIds.split(","),
		subscribers,
	}));
};

const getTypeResult = (resultIds: string[], resultsMap: Map<string, Result>): TypeResults => {
	const typeResults: TypeResults = {
		decision: [],
		admit: [],
		reject: [],
	};

	resultIds.forEach((id) => {
		const result = resultsMap.get(id);
		if (result && typeResults[result.type]) {
			typeResults[result.type].push(id);
		}
	});

	return typeResults;
};

const sortTypesByDate = (typeResults: TypeResults, resultsMap: Map<string, Result>): TypeResults => {
	const sortedTypeResults: TypeResults = {
		decision: [],
		admit: [],
		reject: [],
	};

	// 針對 decision, admit, reject 的 result ids 分別依照時間排序
	Object.entries(typeResults).forEach(([type, resultIds]) => {
		const sortedResultIds = resultIds.sort((a, b) => {
			const aDate = resultsMap.get(a)?.date;
			const bDate = resultsMap.get(b)?.date;

			if (!aDate || !bDate) return 0;

			return new Date(bDate).getTime() - new Date(aDate).getTime(); // descending order
		});

		sortedTypeResults[type as keyof TypeResults] = sortedResultIds;
	});

	return sortedTypeResults;
};

export const sortResultId = (multicastGroups: MulticastGroup[], allResults: Result[]): MulticastGroup[] => {
	// for each group, sort resultIds by date and type
	const resultsMap = createResultsMap(allResults);
	return multicastGroups.map((group) => {
		const typeResults = getTypeResult(group.resultIds, resultsMap);
		const sortedTypeResults = sortTypesByDate(typeResults, resultsMap);

		return {
			...group,
			resultIds: [...sortedTypeResults.decision, ...sortedTypeResults.admit, ...sortedTypeResults.reject].slice(
				0,
				maxResult,
			),
		};
	});
};

export const createPreciseGroup = (allResults: Result[]): MulticastGroup[] => {
	const validResults = allResults.filter((result) => result.subscribers.length > 0);

	if (validResults.length === 0) return [];

	const userSubscriptionsMap = mapSubscribersToResults(validResults);
	const multicastGroupsMap = groupSubscribersByResults(userSubscriptionsMap);
	const multicastGroups = transformMapToArray(multicastGroupsMap);
	return sortResultId(multicastGroups, validResults);
};

const addOrUpdateField = (fieldArray: ExtensiveField[], result: Result) => {
	const field = fieldArray.find(
		(field) => field.field.id === result.field!.id && field.country_id === result.country_id,
	);
	if (!field) {
		fieldArray.push({
			country_id: result.country_id,
			country_name: result.country_name,
			field: {
				id: result.field!.id,
				name: result.field!.name,
			},
			results: 1,
		});
	} else {
		field.results++;
	}
};

const groupFieldResults = (resultGroups: Map<string, string[]>, allResults: Result[]): ExtensiveGroup[] => {
	const resultMap = createResultsMap(allResults);
	const groups: ExtensiveGroup[] = [];

	resultGroups.forEach((resultIds, subscriber) => {
		const fields: ExtensiveField[] = [];

		resultIds.forEach((id) => {
			const result = resultMap.get(id);
			if (!result) return;

			addOrUpdateField(fields, result);
		});

		groups.push({
			subscribers: [subscriber],
			fields,
		});
	});

	return groups;
};

export const createExtensiveGroup = (allResults: Result[]) => {
	const validResults = allResults.filter((result) => result.subscribers.length > 0);

	if (validResults.length === 0) return [];

	const userSubscriptionsMap = mapSubscribersToResults(validResults);
	const multicastGroupsMap = groupSubscribersByResults(userSubscriptionsMap);
	const multicastGroups = groupFieldResults(multicastGroupsMap, validResults);
	return multicastGroups;
};
