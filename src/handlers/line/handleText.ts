import { MessageEvent, TextEventMessage, User } from "@line/bot-sdk";
import { TextMessageWrapper, BindingMessage, subscriptionMessage } from "@utils/line/message/template";
import { ServiceMessage } from "@utils/line/message/service";
import { generateBindingToken } from "@utils/user/generateToken";
import { registerLineId } from "@utils/user/addLineUser";
import { checkBindingStatus, unbindUser, getBindingToken } from "@utils/user/binding";

const handleText = async (event: MessageEvent): Promise<any> => {
	try {
		const userMessage = (event.message as TextEventMessage).text;
		const userId = (event.source as User).userId;
		const hasBinded = await checkBindingStatus(userId);

		switch (userMessage) {
			case "hi":
				return TextMessageWrapper("hi there");
			case "綁定帳號":
				try {
					if (hasBinded) {
						return TextMessageWrapper(`目前 LINE 帳號已經綁定了！`);
					}
					const { token } = await getBindingToken(userId);
					return BindingMessage(token!);
				} catch (error) {
					return await handleGetTokenError(userId, error);
				}
			case "解除綁定":
				if (!hasBinded) {
					return TextMessageWrapper("你目前沒有綁定任何帳號，無須解除綁定");
				}
				const { error: unbindError } = await unbindUser(userId);
				if (unbindError) {
					console.error("error: ", unbindError);
					return TextMessageWrapper("解除綁定失敗，請稍候再試一次");
				}
				return TextMessageWrapper("解除綁定成功，你不會再收到任何 OfferLand 網站的通知");
			case "訂閱通知":
				return subscriptionMessage();
			case "找服務":
				return ServiceMessage;
			default:
				// 不回覆任何訊息
				return null;
		}
	} catch (error: any) {
		console.error("Text Handler Error:", error.message); // Log the error message
		return;
	}
};

const handleGetTokenError = async (userId: string, error: any) => {
	console.error("Get binding token error: ", error);
	console.error("userId: ", userId);
	console.log("the user is added to the database, but you should check if other users have the same problem");
	const newToken = await generateBindingToken();
	await registerLineId(userId, newToken);
	return BindingMessage(newToken);
};
export default handleText;
