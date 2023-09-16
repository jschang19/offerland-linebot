import { TextMessage } from "../../utils/line/Message";
import BindingMessage from "../../utils/line/flex/binding";
import { Client, MessageEvent, TextEventMessage } from "@line/bot-sdk";

const handleText = async (event: MessageEvent) => {
	try {
		const userMessage = (event.message as TextEventMessage).text;
		const userId = event.source.userId;
		if (userMessage === "hi") {
			const reply = TextMessage("hi there");
			return reply;
		} else if (userMessage === "綁定") {
			return BindingMessage;
		}
		return TextMessage("I dont know what you mean??\n\n just kidding, I know what you mean");
	} catch (error: any) {
		new Error(error);
		return TextMessage(`mes:\n${error}`);
	}
};

export default handleText;
