import { PostgrestError } from "@supabase/supabase-js";

async function getBindingToken(userLineId: string): Promise<{
	token: string | null;
	error: PostgrestError | null;
}> {
	const { data, error } = await global.supabase.from("user_line").select("token").eq("line_id", userLineId).single();

	return {
		token: data?.token,
		error: error && error,
	};
}

export default getBindingToken;
