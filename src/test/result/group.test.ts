import { createPreciseGroup, sortResultId, createExtensiveGroup } from ".././../utils/result/groupResult";
import { mockResults, generateMockResults, generateFieldResults } from "../../utils/test/mockResults";

describe("test filiterResultByType", () => {
	test("should return a filtered group", () => {
		const testData: Result[] = generateMockResults(2, 1, 0);
		const testGroup = [
			{
				resultIds: ["a", "b", "c"],
				subscribers: ["L1", "L2", "L3"],
			},
		];
		const expected = [
			{
				resultIds: ["b", "c", "a"],
				subscribers: ["L1", "L2", "L3"],
			},
		];

		const actual = sortResultId(testGroup, testData);
		expect(actual).toEqual(expected);
	});
});
describe("test creating precise subscription group", () => {
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

		const actual = createPreciseGroup(results);
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

		const actual = createPreciseGroup(results);
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

		const actual = createPreciseGroup(results);
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

		const actual = createPreciseGroup(results);
		expect(actual).toEqual(expected);
	});
});

describe("test creating extensive subscription group", () => {
	test("should return empty array when results has no subscribers ", () => {
		const results: any[] = mockResults([]);
		const expected: any[] = [];
		const actual = results;
		expect(actual).toEqual(expected);
	});

	test("should return 3 groups with 3 different fields", () => {
		const results: any[] = generateFieldResults(
			["Field0", "Field1", "Field2"],
			["Country0", "Country1", "Country2"],
			[
				[
					{
						line_id: "L0",
						user_id: "U0",
					},
				],
				[
					{
						line_id: "L1",
						user_id: "U1",
					},
				],
				[
					{
						line_id: "L2",
						user_id: "U2",
					},
				],
			]
		);

		const actual = createExtensiveGroup(results);
		const expected: any[] = [
			{
				fields: [
					{
						country_id: "Country0",
						country_name: "Country Name 0",
						field: {
							id: "Field0",
							name: "Field0",
						},
						results: 1,
					},
				],
				subscribers: ["L0"],
			},
			{
				fields: [
					{
						country_id: "Country1",
						country_name: "Country Name 1",
						field: {
							id: "Field1",
							name: "Field1",
						},
						results: 1,
					},
				],
				subscribers: ["L1"],
			},
			{
				fields: [
					{
						country_id: "Country2",
						country_name: "Country Name 2",
						field: {
							id: "Field2",
							name: "Field2",
						},
						results: 1,
					},
				],
				subscribers: ["L2"],
			},
		];
		expect(actual).toEqual(expected);
	});

	test("should return 2 groups with same field and different country", () => {
		const testFields = ["Field0", "Field1", "Field1"];
		const testCountries = ["Country0", "Country1", "Country2"];
		const testSubscribers: Subscriber[][] = [
			[
				{
					line_id: "L0",
					user_id: "U0",
				},
			],
			[
				{
					line_id: "L1",
					user_id: "U1",
				},
				{
					line_id: "L2",
					user_id: "U2",
				},
			],
			[
				{
					line_id: "L1",
					user_id: "U1",
				},
				{
					line_id: "L2",
					user_id: "U2",
				},
			],
		];

		const results: any[] = generateFieldResults(testFields, testCountries, testSubscribers);
		const expected: any[] = [
			{
				fields: [
					{
						country_id: "Country0",
						country_name: "Country Name 0",
						field: {
							id: "Field0",
							name: "Field0",
						},
						results: 1,
					},
				],
				subscribers: ["L0"],
			},
			{
				fields: [
					{
						country_id: "Country1",
						country_name: "Country Name 1",
						field: {
							id: "Field1",
							name: "Field1",
						},
						results: 1,
					},
					{
						country_id: "Country2",
						country_name: "Country Name 2",
						field: {
							id: "Field1",
							name: "Field1",
						},
						results: 1,
					},
				],
				subscribers: ["L1", "L2"],
			},
		];

		const actual = createExtensiveGroup(results);
		expect(actual).toEqual(expected);
	});

	test("should return 2 groups with same field and country", () => {
		const testFields = ["Field0", "Field1", "Field1"];
		const testCountries = ["Country0", "Country1", "Country1"];
		const testSubscribers: Subscriber[][] = [
			[
				{
					line_id: "L0",
					user_id: "U0",
				},
			],
			[
				{
					line_id: "L1",
					user_id: "U1",
				},
				{
					line_id: "L2",
					user_id: "U2",
				},
			],
			[
				{
					line_id: "L1",
					user_id: "U1",
				},
				{
					line_id: "L2",
					user_id: "U2",
				},
			],
		];

		const results: any[] = generateFieldResults(testFields, testCountries, testSubscribers);
		const expected: any[] = [
			{
				fields: [
					{
						country_id: "Country0",
						country_name: "Country Name 0",
						field: {
							id: "Field0",
							name: "Field0",
						},
						results: 1,
					},
				],
				subscribers: ["L0"],
			},
			{
				fields: [
					{
						country_id: "Country1",
						country_name: "Country Name 1",
						field: {
							id: "Field1",
							name: "Field1",
						},
						results: 2,
					},
				],
				subscribers: ["L1", "L2"],
			},
		];

		const actual = createExtensiveGroup(results);
		expect(actual).toEqual(expected);
	});
});
