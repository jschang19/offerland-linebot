import { TextMessageWrapper } from "@utils/line/Message";
import { PostbackEvent } from "@line/bot-sdk";
const handlePostback = async (event: PostbackEvent) => {
	try {
		const userMessage = event.postback.data as string;
		const userId = event.source.userId as string;
		if (userMessage === "hi") {
			const reply = TextMessageWrapper("hi there");
			return reply;
		}
		return TextMessageWrapper("I dont know what you mean??\n\n just kidding, I know what you mean");
	} catch (error: any) {
		new Error(error);
		return TextMessageWrapper(`mes:\n${error}`);
	}
};

export default handlePostback;
