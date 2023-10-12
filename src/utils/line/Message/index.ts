import { TextMessage, FlexMessage, FlexContainer, FlexBubble } from "@line/bot-sdk";

export function TextMessageWrapper(text: string): TextMessage {
	if (!text) throw new Error("Text Message is required");
	// return TextMessage for line bot in typescript
	return {
		type: "text",
		text,
	};
}

export function createFlexMessage(altText: string, contents: FlexContainer): FlexMessage {
	return {
		type: "flex",
		altText: altText,
		contents: contents,
	};
}

export function wrapAsCarouselMessage(altText: string, contents: FlexBubble[]): FlexMessage {
	return {
		type: "flex",
		altText: altText,
		contents: {
			type: "carousel",
			contents: contents,
		},
	};
}

export function wrapAsBubbleMessage(altText: string, contents: FlexBubble): FlexMessage {
	return {
		type: "flex",
		altText: altText,
		contents: contents,
	};
}

export function BindingMessage(bindingId: string): FlexMessage {
	if (!bindingId) throw Error("Binding Id is required");

	const bindingMessage: FlexMessage = {
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
							uri: "http://localhost:5173/auth/line/?token=" + bindingId,
						},
						color: "#1919E8",
						height: "md",
						style: "primary",
					},
				],
			},
		},
	};

	return bindingMessage;
}

export function servicesListMessage() {
	return {
		type: "flex",
		altText: "找服務",
		contents: {
			type: "bubble",
			body: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "text",
						text: "找服務",
						weight: "bold",
						size: "xl",
						align: "center",
						color: "#FFFFFF",
					},
				],
				backgroundColor: "#1919E8",
			},
			footer: {
				type: "box",
				layout: "vertical",
				spacing: "sm",
				contents: [
					{
						type: "button",
						style: "link",
						height: "sm",
						action: {
							type: "message",
							label: "留學代辦",
							text: "找留學代辦",
						},
					},
					{
						type: "button",
						style: "link",
						height: "sm",
						action: {
							type: "message",
							label: "考試補習班",
							text: "找考試補習班",
						},
					},
					{
						type: "button",
						style: "link",
						height: "sm",
						action: {
							type: "message",
							label: "文書潤稿",
							text: "找文書潤稿",
						},
					},
					{
						type: "button",
						style: "link",
						height: "sm",
						action: {
							type: "message",
							label: "語言家教",
							text: "找語言家教",
						},
					},
				],
				flex: 0,
			},
		},
	};
}
