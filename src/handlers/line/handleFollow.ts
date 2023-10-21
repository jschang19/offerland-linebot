import { Client, FollowEvent, Profile } from "@line/bot-sdk";
import { TextMessageWrapper } from "@utils/line/message/template";
import { generateBindingToken } from "@utils/user/generateToken";
import { registerLineId } from "@utils/user/addLineUser";

const handleFollow = async (line: Client, event: FollowEvent) => {
	try {
		const lineUserId = event.source.userId!;
		const bindingToken = await generateBindingToken();

		// Add line ID to Supabase
		try {
			await registerLineId(lineUserId, bindingToken);
		} catch (error) {
			console.error("Follow handler can't add line id to supabase\n\nerr:", error);
		}

		// Retrieve the profile of the user
		const profile = await line.getProfile(lineUserId);
		return createFollowReplyMessage(profile);
	} catch (error) {
		console.error("Follow Event Handler Error:", error);
		console.log("user id: " + event.source.userId);
		return TextMessageWrapper("歡迎加入 OfferLand 官方帳號好友！");
	}
};

const createFollowReplyMessage = (profile: Profile) => {
	const welcomeMessage = `${profile.displayName} 你好👋🏻
	🚀 Land your Offers, OfferLand!
	留學生＆職場新鮮人都在 OfferLand 上討論！`;

	const instructionMessage = `傳送「 綁定帳號 」兩步驟快速綁定，Offerland 就能給你訂閱校系的新錄取回報通知！現在馬上綁定帳號吧！`;

	return TextMessageWrapper(`${welcomeMessage}\n\n${instructionMessage}`);
};

export default handleFollow;
