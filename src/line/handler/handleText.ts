import { TextMessage } from "@utils/line/Message";
import { MessageEvent, TextEventMessage } from "@line/bot-sdk";
import BindingMessage from "@utils/line/flex/binding";
import ServiceMessage from "@utils/line/flex/service";

const handleText = async (event: MessageEvent) => {
	try {
		const userMessage = (event.message as TextEventMessage).text;
		const userId = event.source.userId;

		switch (userMessage) {
			case "hi":
				return TextMessage("hi there");
			case "綁定":
				return BindingMessage;
			case "找服務":
				return ServiceMessage;
			default:
				break;
		}
		return TextMessage("I dont know what you mean??\n\n just kidding, I know what you mean");
	} catch (error: any) {
		new Error(error);
		return TextMessage(`mes:\n${error}`);
	}
};

export default handleText;
