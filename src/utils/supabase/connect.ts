import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";
dotenv.config();

const connectToSupa = () => {
	return createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_KEY as string, {
		auth: {
			persistSession: false,
		},
	});
};

// export const supabae for global use
const supabase = connectToSupa();
export { supabase };
