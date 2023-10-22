/* eslint-disable no-var */
import { SupabaseClient } from "@supabase/supabase-js";

declare global {
	interface ProcessEnv {
		LINE_CHANNEL_SECRET: string;
		LINE_CHANNEL_ACCESS_TOKEN: string;
		SUPABASE_URL: string;
		SUPABASE_SERVICE_KEY: string;
		WEBSITE_URL: string;
		MAIN_COLOR: string;
	}
}

declare global {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	var supabase: SupabaseClient;
}

export {};
