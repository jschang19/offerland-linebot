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

async function bindUserdByToken(userId: string, token: string) {
	const { error } = await global.supabase.rpc("update_user_id_by_token", {
		user_id: userId,
		client_token: token,
	});

	if (error) {
		console.error("getUserIdByLineId error: ", error);
		throw new Error(error.message);
	}

	return true;
}

export async function checkBindingStatus(line_id: string) {
	const { data, error } = await global.supabase
		.from("user_line")
		.select("*")
		.eq("line_id", line_id)
		.not("user_id", "is", null);

	if (error) {
		console.error("checkBindingStatus error");
		throw error;
	}

	if (data && data.length > 0) {
		return true;
	}
	return false;
}

export async function getBindingToken(userLineId: string): Promise<{
	token: string | null;
	error: PostgrestError | null;
}> {
	const { data, error } = await global.supabase.from("user_line").select("token").eq("line_id", userLineId).single();

	return {
		token: data?.token,
		error: error && error,
	};
}
