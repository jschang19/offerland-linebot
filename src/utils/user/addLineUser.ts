import { PostgrestError } from "@supabase/supabase-js";

export async function addLINEUser(
	lineUserId: string,
	bindingToken: string
): Promise<{
	error: PostgrestError | null;
}> {
	const { error } = await global.supabase.rpc("add_line_id", {
		gcf_line_id: lineUserId,
		gcf_token: bindingToken,
	});

	return {
		error: error && error,
	};
}
