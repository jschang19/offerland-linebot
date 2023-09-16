import { http } from "@google-cloud/functions-framework";
import { Client, validateSignature, WebhookEvent } from "@line/bot-sdk";
import handleEvent from "./line/handler/index";
import handleOfferland from "./line/handler/handleOfferland";

import dotenv from "dotenv";
dotenv.config();

const line = new Client({
	channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN as string,
	channelSecret: process.env?.LINE_CHANNEL_SECRET as string,
});

http("main", async (req, res) => {
	const reqParam = req.originalUrl;
	const param = reqParam.split("/")[1];
	switch (param) {
		case "line":
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

				const events = req.body.events;
				const results = await Promise.all(events.map((event: WebhookEvent) => handleEvent(line, event)));
				res.status(200).send(results);
			} catch (err: any) {
				res.status(err.status || 500).send(err.message);
			}
			break;
		case "offerland-trigger":
			const result = await handleOfferland(line, req.body);
			res.status(200).send(result);
			break;
		default:
			res.send(404).send("Not Found");
	}
});
