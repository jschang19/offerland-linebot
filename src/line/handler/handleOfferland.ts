import { generateSubscribtionCarousel } from "../../utils/subscribtionList";
import { Client } from "@line/bot-sdk";
const handleOfferland = async (line: Client, body: any) => {
	const { userIds, taskType } = body;
	switch (taskType) {
		case "sendTest":
			const testData = [
				{
					schoolName: "UBC",
					majorName: "Computer Science",
					date: "2021/01/01",
					status: "admitted",
					originalUniversity: "National Taiwan University",
					userName: "Cheng-Hsuan Hsu",
				},
			];

			const carousel = generateSubscribtionCarousel(testData);
			return line.multicast(["Ucf035f28a267b5e22edc042c4d91623c"], carousel);
	}
};

export default handleOfferland;
