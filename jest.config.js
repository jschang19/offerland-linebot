/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/src/test/**/*.test.ts"],
	moduleNameMapper: {
		"^(\\.\\/.+)\\.js$": "$1",
	},
};

process.env = Object.assign(process.env, {
	WEBSITE_URL: "https://feat-subscription.client-new.pages.dev",
	DECISION_COLOR: "#1919E8",
	ADMIT_COLOR: "#007500",
	REJECT_COLOR: "#808080",
	MAIN_COLOR: "#1919E8",
	JWT_SECRET: "test_mock_secret_not_real",
});
