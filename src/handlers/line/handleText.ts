import { Message, MessageEvent, TextEventMessage, User } from "@line/bot-sdk";
import { TextMessageWrapper, BindingMessage } from "@utils/line/message/template";
import { ServiceMessage } from "@utils/line/message/service";
import { generateBindingToken } from "@utils/user/generateToken";
import { registerLineId } from "@utils/user/addLineUser";
import { checkBindingStatus, unbindUser } from "@utils/user/binding";

const handleText = async (event: MessageEvent): Promise<Message | null> => {
	try {
		const userMessage = (event.message as TextEventMessage).text;
		const userId = (event.source as User).userId;
		const hasBinded = await checkBindingStatus(userId);

		switch (userMessage) {
			case "hi":
				return TextMessageWrapper("hi there");
			case "綁定": {
				try {
					if (hasBinded) {
						return TextMessageWrapper(
							`LINE 帳號已經綁定了！\n\n請到 OfferLand 網頁訂閱科系 👉🏻 https://offerland.cc/subscription?openExternalBrowser=1`
						);
					}
					const token = await generateBindingToken();
					await registerLineId(userId, token);
					return BindingMessage(token);
				} catch (error) {
					return await handleGetTokenError(userId, error);
				}
			}
			case "解除綁定": {
				if (!hasBinded) {
					return TextMessageWrapper("您目前沒有綁定任何帳號，無須解除綁定");
				}
				const { error: unbindError } = await unbindUser(userId);
				if (unbindError) {
					console.error("error: ", unbindError);
					return TextMessageWrapper("解除綁定失敗，請稍候再試一次");
				}
				return TextMessageWrapper("解除綁定成功，您不會再收到任何 OfferLand 網站的通知");
			}
			case "找服務":
				return ServiceMessage;
			default:
				// 不回覆任何訊息
				return null;
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Text Handler Error:", error.message); // Log the error message
		}
		return null;
	}
};

const handleGetTokenError = async (userId: string, error: unknown) => {
	console.error("Get binding token error: ", error);
	console.error("userId: ", userId);
	console.log("the user is added to the database, but you should check if other users have the same problem");

	return TextMessageWrapper("綁定帳號過程出了些問題，請稍候再試一次");
};
export default handleText;
