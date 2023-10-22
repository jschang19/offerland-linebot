import handleText from "./handleText";
import handleFollow from "./handleFollow";
import { Client, WebhookEvent, TextMessage } from "@line/bot-sdk";
import { Request, Response } from "@google-cloud/functions-framework";

const handleEvent = async (line: Client, event: WebhookEvent) => {
	if (event.type === "message" && event.message.type === "text") {
		const replyMessage = await handleText(event);

		if (!replyMessage) return Promise.resolve(null);
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

const handleLineRequest = async (line: Client, req: Request, res: Response): Promise<void> => {
	try {
		const requestBody = req.body;
		const events: WebhookEvent[] = requestBody.events;
		const results = await Promise.all(events.map((event) => handleEvent(line, event)));
		res.status(200).send(results);
	} catch (err: any) {
		console.error("line handler error: ", err);
		res.status(err.status || 500).send(err.message);
	}
};

export default handleLineRequest;
