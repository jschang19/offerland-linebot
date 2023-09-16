import { connectToSupa } from "../../utils/supabase/creatClient.js";

const hadleTrigger = async (line, body) => {
	const supabase = connectToSupa();

	line.multicast(["Ucf035f28a267b5e22edc042c4d91623c"]);
};

export default hadleTrigger;
