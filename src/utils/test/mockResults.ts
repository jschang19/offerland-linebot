export const mockResults = (subscribers: number[]) => {
	if (subscribers.length === 0) {
		return [];
	}
	const results: any[] = [];
	subscribers.forEach((subscriber) => {
		results.push({
			id: subscriber.toString(),
			subscribers: [subscriber],
		});
	});

	return results;
};

export const generateMockResults = (descion: number, admitted: number, reject: number): Result[] => {
	const total = descion + admitted + reject;
	if (admitted > total) {
		throw new Error("The number of admitted results cannot exceed the total number of results.");
	}

	if (total < 0 || descion < 0 || admitted < 0) {
		throw new Error("The number of results cannot be negative.");
	}

	if (total > 26) {
		throw new Error("The total number of results cannot exceed 26 when using a-z as IDs.");
	}

	const results: Result[] = [];

	for (let i = 0; i < total; i++) {
		// generate admitted results first
		// then generate descion results
		// then generate reject results if any

		const isAdmitted = admitted > 0;
		const isDescion = descion > 0;
		const isReject = reject > 0;

		const result: Result = {
			id: String.fromCharCode(97 + i), // 97 is the ASCII code for 'a'
			date: new Date().toDateString(),
			type: isAdmitted ? "admit" : isDescion ? "descion" : isReject ? "reject" : "unknown",
			user: {
				name: `User${i}`,
				graduated_university: `University${i}`,
			},
			major: {
				id: `m${i}`,
				name: `Major${i}`,
			},
			degree: {
				id: `d${i}`,
				name: `Degree${i}`,
			},
			country_id: `Country${i}`,
			created_at: new Date().toDateString(),
			university: {
				id: `u${i}`,
				name: `University${i}`,
			},
			scholarship: {
				id: `s${i}`,
				name: `Scholarship${i}`,
			},
			country_name: `Country Name ${i}`,
			subscribers: [
				{
					line_id: `L${i}`,
					user_id: `U${i}`,
				},
			],
		};

		results.push(result);

		if (isAdmitted) {
			admitted--;
		} else if (isDescion) {
			descion--;
		} else if (isReject) {
			reject--;
		}
	}

	return results;
};
