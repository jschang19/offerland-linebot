import { http, Request, Response } from "@google-cloud/functions-framework";
import { Client, validateSignature, WebhookEvent } from "@line/bot-sdk";
import handleEvent from "@handlers/line";
import handleSupabase from "@handlers/supabase";
import { supabase as supaClient } from "@utils/supabase";

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET!;

const line = new Client({
	channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
	channelSecret: LINE_CHANNEL_SECRET,
});

global.supabase = supaClient;

const handleLineRequest = async (req: Request, res: Response): Promise<void> => {
	try {
		const requestBody = req.body;
		if (
			!validateSignature(
				JSON.stringify(requestBody),
				LINE_CHANNEL_SECRET,
				req.headers["x-line-signature"] as string,
			)
		) {
			res.status(401).send("Invalid Signature");
			return;
		}

		const events: WebhookEvent[] = requestBody.events;
		const results = await Promise.all(events.map((event) => handleEvent(line, event)));
		res.status(200).send(results);
	} catch (err: any) {
		res.status(err.status || 500).send(err.message);
	}
};

const handleRequest = async (req: Request, res: Response): Promise<void> => {
	try {
		const param = req.originalUrl.split("/")[1];

		switch (param) {
			case "line":
				await handleLineRequest(req, res);
				break;
			case "supabase":
				console.log("supabase");
				const result = await handleSupabase(line, req.originalUrl.split("/"), req.body);
				res.status(200).send(result);
				break;
			default:
				res.status(404).send("Not Found");
		}
	} catch (error: any) {
		console.error("main function error: ", error);
		res.status(error.status || 500).send(error.message);
	}
};

http("main", handleRequest);
