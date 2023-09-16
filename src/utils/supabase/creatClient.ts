import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

export const connectToSupa = () => {
	return createClient("https://yqytewaxbycjxkiityeb.supabase.co", process.env.SUPABASE_SERVICE_KEY as string, {
		auth: {
			persistSession: false,
		},
	});
};
