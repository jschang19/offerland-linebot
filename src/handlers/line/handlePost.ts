import { TextMessageWrapper, BindingMessage, subscriptionMessage } from "@utils/line/message/template";
import { User, PostbackEvent } from "@line/bot-sdk";
import { generateBindingToken } from "@utils/user/generateToken";
import { registerLineId } from "@utils/user/addLineUser";
import { checkBindingStatus, unbindUser, getBindingToken } from "@utils/user/binding";

const handlePostback = async (event: PostbackEvent) => {
	try {
		const userPostback = event.postback.data as string;
		const userId = (event.source as User).userId;
		const hasBinded = await checkBindingStatus(userId);

		switch (userPostback) {
			case "hi":
				return TextMessageWrapper("hi there");
			case "bind_account":
				try {
					if (hasBinded) {
						return TextMessageWrapper(`目前 LINE 帳號已經綁定了！`);
					}
					const { token } = await getBindingToken(userId);
					return BindingMessage(token!);
				} catch (error) {
					return await handleGetTokenError(userId, error);
				}
			case "unibind_account":
				if (!hasBinded) {
					return TextMessageWrapper("您目前沒有綁定任何帳號，無須解除綁定");
				}
				const { error: unbindError } = await unbindUser(userId);
				if (unbindError) {
					console.error("error: ", unbindError);
					return TextMessageWrapper("解除綁定失敗，請稍候再試一次");
				}
				return TextMessageWrapper(
					"解除綁定成功，您不會再收到任何 OfferLand 網站的通知，如果要重新綁定請點選選單任一按鈕"
				);
			case "subscription":
				return subscriptionMessage();
			default:
				// 不回覆任何訊息
				return;
		}
	} catch (error: any) {
		new Error(error);
		return TextMessageWrapper(`mes:\n${error}`);
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

export default handlePostback;
