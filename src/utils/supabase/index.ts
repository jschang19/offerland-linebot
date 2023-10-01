import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

interface SupabaseConfig {
	url: string;
	serviceKey: string;
	options?: {
		auth: {
			persistSession: boolean;
		};
	};
}

const getSupabaseConfig = (): SupabaseConfig => {
	const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;

	if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
		throw new Error("Supabase credentials are not provided.");
	}

	return {
		url: SUPABASE_URL,
		serviceKey: SUPABASE_SERVICE_KEY,
		options: {
			auth: {
				persistSession: false,
			},
		},
	};
};

const config = getSupabaseConfig();
const supabase: SupabaseClient = createClient(config.url, config.serviceKey, config.options);

export { supabase };
