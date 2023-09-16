import handleText from "./handleText";
import handleFollow from "./handleFollow";
import { Client, WebhookEvent, TextMessage } from "@line/bot-sdk";

const handleEvent = async (line: Client, event: WebhookEvent) => {
	if (event.type === "message" && event.message.type === "text") {
		const replyMessage = await handleText(event);
		return line.replyMessage(event.replyToken, replyMessage);
	} else if (event.type === "postback" && event.postback.data) {
		// create a echoing text message for postback event
		// just for temporary use
		const echo = { type: "text", text: "wow a postback" };

		// use reply API
		return line.replyMessage(event.replyToken, echo as TextMessage);
	}
	// follow event
	else if (event.type === "follow") {
		const userId = event.source.userId;
		// // get user profile
		const profile = await line.getProfile(userId as string);
		// // create a user
		// const user = await User.create({
		// 	lineId: userId,
		// 	userName: profile.displayName,
		// });
		const reply = await handleFollow(line, event);
		return line.replyMessage(event.replyToken, reply);
	} else {
		// ignore non-text-message event
		return Promise.resolve(null);
	}
};

export default handleEvent;
