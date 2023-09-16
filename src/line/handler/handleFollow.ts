import { Client, FollowEvent, TextEventMessage } from "@line/bot-sdk";
import { TextMessage } from "../../utils/line/Message";
const handleFollow = async (line: Client, event: FollowEvent) => {
	const userId = event.source.userId as string;
	const profile = await line.getProfile(userId);
	const reply = TextMessage(
		`Hi ${profile.displayName}!\n\n
        綁定帳號後，Offerland 就能給你訂閱校系的新錄取回報通知！
        \n\n
        現在馬上綁定帳號吧！
        `,
	);

	return reply;
};

export default handleFollow;
