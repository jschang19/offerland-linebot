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

export default bindUserdByToken;
