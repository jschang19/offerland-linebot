import { TextMessageWrapper, BindingMessage } from "@utils/line/message";
import { MessageEvent, TextEventMessage, User } from "@line/bot-sdk";
import getBindingToken from "@utils/user/getLineBindToken";
import unbindUser from "@utils/user/unBindId";
import { ServiceMessage } from "@utils/line/message/service";

const handleText = async (event: MessageEvent): Promise<any> => {
	try {
		const userMessage = (event.message as TextEventMessage).text;
		const userId = (event.source as User).userId;

		switch (userMessage) {
			case "hi":
				return TextMessageWrapper("hi there");
			case "綁定":
				// TODO: check if user already binding
				const { token, error } = await getBindingToken(userId);
				if (error) {
					console.error("error: ", error);
					return TextMessageWrapper("綁定失敗");
				}
				return BindingMessage(token!);
			case "解除綁定":
				const { error: unbindError } = await unbindUser(userId);
				if (unbindError) {
					console.error("error: ", unbindError);
					return TextMessageWrapper("解除綁定失敗，請稍候再試一次");
				}
				return TextMessageWrapper("解除綁定成功，你不會再收到任何 OfferLand 網站的通知");
			case "找服務":
				return ServiceMessage;
			default:
				// 不回覆任何訊息
				return;
		}
	} catch (error: any) {
		console.error("An error occurred:", error.message); // Log the error message
		return;
	}
};

export default handleText;
