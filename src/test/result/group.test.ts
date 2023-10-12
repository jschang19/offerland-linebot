import { createMulitcastGroup, filterResultsByType } from ".././../utils/result/groupResult";
import { mockResults, generateMockResults } from "../../utils/test/mockResults";

describe("test filiterResultByType", () => {
	test("should return a filtered group", () => {
		const testGroup = {
			"a,b,c,d,e,f,g,h": ["1", "2", "3", "4"],
		};
		const testUser: User = {
			name: "test shawn",
			graduated_university: "test_123",
		};

		const testData: Result[] = generateMockResults(10, 2);

		const expected = {
			"a,b": ["1", "2", "3", "4"],
		};
		const actual = filterResultsByType(testGroup, testData);
		expect(actual).toEqual(expected);
	});

	test("should return 2 filtered groups", () => {
		const testGroup = {
			"a,b,c,d,e,f,g,h": ["1", "2", "3", "4"], // reach the limit of 6
			"a,b,c": ["87", "88"],
		};
		const testUser: User = {
			name: "test shawn",
			graduated_university: "test_123",
		};

		const testData: Result[] = generateMockResults(10, 2);

		const expected = {
			"a,b": ["1", "2", "3", "4"],
			"a,b,c": ["87", "88"],
		};
		const actual = filterResultsByType(testGroup, testData);
		expect(actual).toEqual(expected);
	});
});
describe("test createMulitcastGroup", () => {
	test("should return empty array when results has no subscribers ", () => {
		const results: any[] = mockResults([]);
		const expected: any[] = [];
		const actual = createMulitcastGroup(results);
		expect(actual).toEqual(expected);
	});

	test("should return groups with 2 users subscribing same major ", () => {
		const results: any[] = [
			{
				id: "a",
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
				resultIds: ["a", "b"],
				subscribers: ["1", "2"],
			},
		];

		const actual = createMulitcastGroup(results);
		expect(actual).toEqual(expected);
	});

	test("should return groups with 2 users subscribing same major and 1 user subscribing different major", () => {
		const results: any[] = [
			{
				id: "a",
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

		const actual = createMulitcastGroup(results);
		expect(actual).toEqual(expected);
	});

	test("should return results with 3 groups", () => {
		const results: any[] = [
			{
				id: "a",
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
				resultIds: ["c", "d"],
				subscribers: ["4"],
			},
		];

		const actual = createMulitcastGroup(results);
		expect(actual).toEqual(expected);
	});
});
