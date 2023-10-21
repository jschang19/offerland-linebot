import { PostgrestError } from "@supabase/supabase-js";

export async function registerLineId(
	lineUserId: string,
	bindingToken: string
): Promise<{
	error: PostgrestError | null;
}> {
	// upsert line id
	const { error } = await global.supabase.rpc("register_line_id", {
		gcf_line_id: lineUserId,
		gcf_token: bindingToken,
	});

	return {
		error: error && error,
	};
}
