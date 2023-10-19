async function updateMultiQuota(users: string[]) {
	const { error } = await global.supabase.rpc("update_line_quota", {
		line_ids: users,
	});

	if (error) {
		console.error("updateMultiQuota error: " + error);
	}
	return;
}

export default updateMultiQuota;
