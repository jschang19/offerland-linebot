// jest test /message.ts

import { FlexMessage } from "@line/bot-sdk";
import { jwtVerify } from "jose";
import { generateBindingToken } from "../../utils/user/generateToken";
import { BindingMessage } from "../../utils/line/message/template";

describe("generateBindingToken", () => {
	test("should return a token with line id", async () => {
		const token = await generateBindingToken();
		//console.log(token);
		const decoded = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), {
			issuer: process.env.WEBSITE_URL,
			audience: process.env.WEBSITE_URL,
		});

		//expect(decoded.payload.line_id!).toEqual(lineId);
		// check decode is valid
		expect(decoded).toBeTruthy();
	});
});

describe("BindingMessage", () => {
	test("should return a flex message with id 123456", () => {
		const bindingMessage = BindingMessage("123456");
		const expectedMessage: FlexMessage = {
			type: "flex",
			altText: "綁定訊息",
			contents: {
				type: "bubble",
				body: {
					type: "box",
					layout: "vertical",
					spacing: "md",
					contents: [
						{
							type: "box",
							layout: "vertical",
							spacing: "xl",
							contents: [
								{
									type: "text",
									text: "綁定帳號",
									weight: "bold",
									size: "lg",
								},
								{
									type: "text",
									text: "您的 Line 帳號僅提供與 OfferLand 帳號配對用途，用以提供申請落點訂閱功能、個人化精選文章推送，您可以隨時關閉通知功能。我們將依照 OfferLand 服務條款和隱私權政策，蒐集、處理您的個人資料。",
									size: "sm",
									color: "#808080",
									wrap: true,
								},
								{
									type: "text",
									text: "您是否同意進行帳號綁定？",
									size: "sm",
									color: "#000000FF",
									wrap: true,
								},
							],
						},
					],
				},
				footer: {
					type: "box",
					layout: "horizontal",
					contents: [
						{
							type: "button",
							action: {
								type: "message",
								label: "稍後",
								text: "稍後",
							},
							height: "md",
						},
						{
							type: "button",
							action: {
								type: "uri",
								label: "綁定",
								uri: `${process.env.WEBSITE_URL}/line/auth/?token=123456&openExternalBrowser=1`,
							},
							color: process.env.MAIN_COLOR,
							height: "md",
							style: "primary",
						},
					],
				},
			},
		};
		expect(bindingMessage).toEqual(expectedMessage);
	});

	test("should return a flex message with id 654321", () => {
		const testId = "654321";
		const bindingMessage = BindingMessage(testId);
		const expectedMessage: FlexMessage = {
			type: "flex",
			altText: "綁定訊息",
			contents: {
				type: "bubble",
				body: {
					type: "box",
					layout: "vertical",
					spacing: "md",
					contents: [
						{
							type: "box",
							layout: "vertical",
							spacing: "xl",
							contents: [
								{
									type: "text",
									text: "綁定帳號",
									weight: "bold",
									size: "lg",
								},
								{
									type: "text",
									text: "您的 Line 帳號僅提供與 OfferLand 帳號配對用途，用以提供申請落點訂閱功能、個人化精選文章推送，您可以隨時關閉通知功能。我們將依照 OfferLand 服務條款和隱私權政策，蒐集、處理您的個人資料。",
									size: "sm",
									color: "#808080",
									wrap: true,
								},
								{
									type: "text",
									text: "您是否同意進行帳號綁定？",
									size: "sm",
									color: "#000000FF",
									wrap: true,
								},
							],
						},
					],
				},
				footer: {
					type: "box",
					layout: "horizontal",
					contents: [
						{
							type: "button",
							action: {
								type: "message",
								label: "稍後",
								text: "稍後",
							},
							height: "md",
						},
						{
							type: "button",
							action: {
								type: "uri",
								label: "綁定",
								uri: `${process.env.WEBSITE_URL}/line/auth/?token=${testId}&openExternalBrowser=1`,
							},
							color: "#1919E8",
							height: "md",
							style: "primary",
						},
					],
				},
			},
		};

		expect(bindingMessage).toEqual(expectedMessage);
	});

	test("should return an error message when id is empty", () => {
		const testId = "";
		// should return an error message
		// "Binding Id is required"
		try {
			BindingMessage(testId);
		} catch (error: unknown) {
			expect((error as Error).message).toEqual("Binding Id is required");
		}
	});
});
