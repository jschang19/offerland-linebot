const getUserIdByLine = async (lineId: string) => {
	const { data, error } = await global.supabase.rpc("get_user_account_id", {
		gcf_line_id: lineId,
	});

	if (error) {
		console.error("getUserIdByLineId error: ", error);
		throw new Error(error.message);
	}

	return data?.user_id;
};

export default getUserIdByLine;
