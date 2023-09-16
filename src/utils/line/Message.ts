import { TextMessage, FlexMessage, FlexContainer } from "@line/bot-sdk";
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
