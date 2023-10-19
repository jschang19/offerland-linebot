import { TextMessageWrapper, BindingMessage } from "@utils/line/message";
import { MessageEvent, TextEventMessage, User } from "@line/bot-sdk";
import getBindingToken from "@utils/user/getLineBindToken";
import unbindUser from "@utils/user/unBindId";
import { ServiceMessage } from "@utils/line/message/service";
import { generateBindingToken } from "@utils/user/generateToken";
import { addLINEUser } from "@utils/user/addLineUser";
import { checkBindingStatus } from "@utils/user/checkBinding";

const handleText = async (event: MessageEvent): Promise<any> => {
	try {
		const userMessage = (event.message as TextEventMessage).text;
		const userId = (event.source as User).userId;

		switch (userMessage) {
			case "hi":
				return TextMessageWrapper("hi there");
			case "綁定":
				try {
					const isBinded = await checkBindingStatus(userId);
					if (isBinded) {
						return TextMessageWrapper(`目前 LINE 帳號已經綁定了！`);
					}
					const { token } = await getBindingToken(userId);
					return BindingMessage(token!);
				} catch (error) {
					return await handleGetTokenError(userId, error);
				}
			case "解除綁定":
				const wasBinded = await checkBindingStatus(userId);
				if (!wasBinded) {
					return TextMessageWrapper("你目前沒有綁定任何帳號，無須解除綁定");
				}
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
		console.error("Text Handler Error:", error.message); // Log the error message
		return;
	}
};

const handleGetTokenError = async (userId: string, error: any) => {
	console.error("Get binding token error: ", error);
	console.error("userId: ", userId);
	console.log("the user is added to the database, but you should check if other users have the same problem");
	const newToken = await generateBindingToken(userId);
	await addLINEUser(userId, newToken);
	return BindingMessage(newToken);
};
export default handleText;
