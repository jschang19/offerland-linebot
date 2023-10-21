import { PostgrestError } from "@supabase/supabase-js";
import { generateBindingToken } from "./generateToken";

export async function unbindUser(userLineId: string): Promise<{
	error: PostgrestError | null;
}> {
	const newToken = await generateBindingToken();

	const { error } = await global.supabase
		.from("user_line")
		.update({
			user_id: null,
			token: newToken,
		})
		.match({ line_id: userLineId });

	return {
		error: error && error,
	};
}
