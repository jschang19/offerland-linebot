import { createMulticastGroup, sortResultId } from ".././../utils/result/groupResult";
import { mockResults, generateMockResults } from "../../utils/test/mockResults";

describe("test filiterResultByType", () => {
	test("should return a filtered group", () => {
		const testData: Result[] = generateMockResults(2, 1, 0);
		const testGroup = [
			{
				resultIds: ["a", "b", "c"],
				subscribers: ["1", "2", "3"],
			},
		];
		const expected = [
			{
				resultIds: ["b", "c", "a"],
				subscribers: ["1", "2", "3"],
			},
		];

		const actual = sortResultId(testGroup, testData);
		expect(actual).toEqual(expected);
	});
});
describe("test createMulticastGroup", () => {
	test("should return empty array when results has no subscribers ", () => {
		const results: any[] = mockResults([]);
		const expected: any[] = [];
		const actual = results;
		expect(actual).toEqual(expected);
	});

	test("should return groups with 2 users subscribing same major ", () => {
		const results: any[] = [
			{
				id: "a",
				type: "admit",
				subscribers: [
					{
						line_id: "1",
					},
					{
						line_id: "2",
					},
				],
			},
			{
				id: "b",
				type: "decision",
				subscribers: [
					{
						line_id: "1",
					},
					{
						line_id: "2",
					},
				],
			},
		];

		const expected: any[] = [
			{
				resultIds: ["b", "a"],
				subscribers: ["1", "2"],
			},
		];

		const actual = createMulticastGroup(results);
		expect(actual).toEqual(expected);
	});

	test("should return groups with 2 users subscribing same major and 1 user subscribing different major", () => {
		const results: any[] = [
			{
				id: "a",
				type: "admit",
				subscribers: [
					{
						line_id: "1",
					},
					{
						line_id: "2",
					},
				],
			},
			{
				id: "b",
				type: "reject",
				subscribers: [
					{
						line_id: "1",
					},
					{
						line_id: "2",
					},
				],
			},
			{
				id: "c",
				type: "decision",
				subscribers: [
					{
						line_id: "3",
					},
				],
			},
		];

		const expected: any[] = [
			{
				resultIds: ["a", "b"],
				subscribers: ["1", "2"],
			},
			{
				resultIds: ["c"],
				subscribers: ["3"],
			},
		];

		const actual = createMulticastGroup(results);
		expect(actual).toEqual(expected);
	});

	test("should return results with 3 groups", () => {
		const results: any[] = [
			{
				id: "a",
				type: "admit",
				subscribers: [
					{
						line_id: "1",
					},
					{
						line_id: "2",
					},
				],
			},
			{
				id: "b",
				type: "reject",
				subscribers: [
					{
						line_id: "1",
					},
					{
						line_id: "2",
					},
				],
			},
			{
				id: "c",
				type: "reject", // "reject" is not "decision
				subscribers: [
					{
						line_id: "3",
					},
					{
						line_id: "4",
					},
				],
			},
			{
				id: "d",
				type: "decision",
				subscribers: [
					{
						line_id: "4",
					},
				],
			},
		];

		const expected: any[] = [
			{
				resultIds: ["a", "b"],
				subscribers: ["1", "2"],
			},
			{
				resultIds: ["c"],
				subscribers: ["3"],
			},
			{
				resultIds: ["d", "c"],
				subscribers: ["4"],
			},
		];

		const actual = createMulticastGroup(results);
		expect(actual).toEqual(expected);
	});

	test("should return results with desc date", () => {
		const results: any[] = [
			{
				id: "a",
				type: "reject",
				date: "2021-01-01",
				subscribers: [
					{
						line_id: "1",
					},
				],
			},
			{
				id: "b",
				type: "reject",
				date: "2021-01-02",
				subscribers: [
					{
						line_id: "1",
					},
				],
			},
			{
				id: "c",
				type: "decision",
				date: "2021-01-03",
				subscribers: [
					{
						line_id: "2",
					},
				],
			},
			{
				id: "d",
				type: "decision",
				date: "2021-01-04",
				subscribers: [
					{
						line_id: "2",
					},
				],
			},
		];

		const expected: any[] = [
			{
				resultIds: ["b", "a"],
				subscribers: ["1"],
			},
			{
				resultIds: ["d", "c"],
				subscribers: ["2"],
			},
		];

		const actual = createMulticastGroup(results);
		expect(actual).toEqual(expected);
	});
});
