import { TextMessage, FlexMessage, FlexContainer, FlexBubble } from "@line/bot-sdk";
export function TextMessage(text: string) {
	if (!text) throw new Error("Text Message is required");
	// return TextMessage for line bot in typescript
	return {
		type: "text",
		text,
	} as TextMessage;
}

export function FlexMessage(altText: string, contents: FlexContainer) {
	return {
		type: "flex",
		altText: altText,
		contents: contents,
	} as FlexMessage;
}

export function CarouselMessage(altText: string, contents: FlexContainer[]) {
	return {
		type: "flex",
		altText: altText,
		contents: {
			type: "carousel",
			contents: contents,
		},
	} as FlexMessage;
}

export function BubbleMessage(altText: string, contents: FlexBubble) {
	return {
		type: "flex",
		altText: altText,
		contents: contents,
	} as FlexMessage;
}
