import handleFollow from "../src/line/handler/handleFollow";
import { mocked } from "jest-mock";

// jest test case for typescript

mocked(handleFollow);

// test case 1
test("test case 1", () => {
	expect(true).toBe(true);
});
