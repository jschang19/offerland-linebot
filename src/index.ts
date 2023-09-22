import { http, Request, Response } from "@google-cloud/functions-framework";
import { Client, validateSignature, WebhookEvent } from "@line/bot-sdk";
import handleEvent from "./line/handler/index";
import handleOfferland from "./line/handler/handleOfferland";

const line = new Client({
	channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
	channelSecret: process.env.LINE_CHANNEL_SECRET!,
});

const handleLineRequest = async (req: Request, res: Response) => {
	try {
		// validate signature
		if (
			!validateSignature(
				JSON.stringify(req.body),
				process.env.LINE_CHANNEL_SECRET as string,
				req.headers["x-line-signature"] as string,
			)
		) {
			res.status(401).send("Invalid Signature");
			return;
		}

		const events: WebhookEvent[] = req.body.events;
		const results = await Promise.all(events.map((event) => handleEvent(line, event)));
		res.status(200).send(results);
	} catch (err: any) {
		res.status(err.status || 500).send(err.message);
	}
};

http("main", async (req: Request, res: Response) => {
	// a middleware to validate the signature
	try {
		const reqParam = req.originalUrl;
		const param = reqParam.split("/")[1];
		switch (param) {
			case "line":
				await handleLineRequest(req, res);
				break;
			case "offerland-trigger":
				const result = await handleOfferland(line, req.body);
				res.status(200).send(result);
				break;
			default:
				res.status(404).send("Not Found");
		}
	} catch (error: any) {
		console.error("main function error: ", error);
		res.status(error.status || 500).send(error.message);
	}
});
