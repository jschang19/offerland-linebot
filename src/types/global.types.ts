declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;
			LINE_CHANNEL_SECRET: string;
			LINE_CHANNEL_ACCESS_TOKEN: string;
			SUPABASE_URL: string;
			SUPABASE_SERVICE_KEY: string;
			WEBSITE_URL: string;
			MAIN_COLOR: string;
		}
	}
	var supabase: import("@supabase/supabase-js").SupabaseClient;
}

export {};
