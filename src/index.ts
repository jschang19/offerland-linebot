import { http, Request, Response } from "@google-cloud/functions-framework";
import { Client, validateSignature } from "@line/bot-sdk";
import handleLineRequest from "@handlers/line";
import handleSupabase from "@handlers/supabase";
import { supabase as supaClient } from "@utils/supabase";

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET!;

const line = new Client({
	channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
	channelSecret: LINE_CHANNEL_SECRET,
});

global.supabase = supaClient;

const handleRequest = async (req: Request, res: Response): Promise<void> => {
	try {
		const param = req.originalUrl.split("/")[1];

		switch (param) {
			case "line": {
				const requestBody = req.body;
				if (
					!validateSignature(
						JSON.stringify(requestBody),
						LINE_CHANNEL_SECRET,
						req.headers["x-line-signature"] as string
					)
				) {
					res.status(401).send("Invalid Signature");
					return;
				}
				await handleLineRequest(line, req, res);
				break;
			}
			case "supabase": {
				const result = await handleSupabase(line, req.originalUrl.split("/"), req.body);
				res.status(200).send(result);
				break;
			}
			default:
				res.status(404).send("Not Found");
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).send(error.message);
		} else {
			console.error(error);
			res.status(500).send("Internal Server Error");
		}
	}
};

http("main", handleRequest);
