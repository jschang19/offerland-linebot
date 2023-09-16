export function TextMessage(text) {
	if (!text) throw new Error("Text Message is required");
	// return TextMessage for line bot in typescript
	return {
		type: "text",
		text,
	};
}

export function FlexMessage(altText, contents) {
	return {
		type: "flex",
		altText: altText,
		contents: contents,
	};
}
