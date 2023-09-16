const groupSubscribersByResults = (allResults) => {
	const subscriberList = {};

	allResults.forEach((result) => {
		const { subscribers, universityId } = result;
		subscribers.forEach((id) => {
			if (!subscriberList[id]) {
				subscriberList[id] = [];
			}
			subscriberList[id].push(universityId);
		});
	});

	const groupedResult = {};
	for (const subscriber in subscriberList) {
		const combinedResult = subscriberList[subscriber].join(",");
		if (!groupedResult[combinedResult]) {
			groupedResult[combinedResult] = [];
		}
		groupedResult[combinedResult].push(subscriber);
	}
	console.log(groupedResult);
};

groupSubscribersByResults([
	{
		universityId: "a",
		subscribers: [1, 2, 3, 4, 5],
	},
	{
		universityId: "b",
		subscribers: [1, 2, 5, 7, 8],
	},
]);
