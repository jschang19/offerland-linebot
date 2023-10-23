import { supabase } from "@utils/supabase";

export async function checkBindingStatus(line_id: string) {
	const { data, error } = await supabase.from("user_line").select("*").eq("line_id", line_id).single();

	if (error) {
		console.error("checkBindingStatus error");
		throw error;
	}

	if (data.user_id) {
		return true;
	}
	return false;
}
