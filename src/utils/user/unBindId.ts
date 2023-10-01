import { PostgrestError } from "@supabase/supabase-js";

const unbindUser = async (
	userLineId: string,
): Promise<{
	error: PostgrestError | null;
}> => {
	const { error } = await global.supabase.rpc("update_id_to_null_by_line", {
		req_line_id: userLineId,
	});

	return {
		error: error && error,
	};
};

export default unbindUser;
