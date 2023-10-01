import handleText from "./handleText";
import handleFollow from "./handleFollow";
import { Client, WebhookEvent, TextMessage, Profile } from "@line/bot-sdk";
import { TextMessageWapper } from "@utils/line/Message";

const handleEvent = async (line: Client, event: WebhookEvent) => {
	if (event.type === "message" && event.message.type === "text") {
		const replyMessage = await handleText(event);
		return line.replyMessage(event.replyToken, replyMessage);
	} else if (event.type === "postback" && event.postback.data) {
		// create a echoing text message for postback event
		// just for temporary use
		const echo: TextMessage = { type: "text", text: "wow a postback" };

		// use reply API
		return line.replyMessage(event.replyToken, echo);
	}
	// follow event
	else if (event.type === "follow") {
		// // get user profile
		// we would like to check if the user has binded his/her account
		// if not, issue a token that point to the user's id to supabase
		// TODO: write function to check if the user has binded his/her account
		const reply = await handleFollow(line, event);
		return line.replyMessage(event.replyToken, reply);
	} else {
		// ignore non-text-message event
		return Promise.resolve(null);
	}
};

export default handleEvent;
