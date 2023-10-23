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

export {};
