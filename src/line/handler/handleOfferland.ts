import {
	generateSubscribtionCarousel,
	generateSubscribtionBubble,
	extensiveSubscribtionBubble,
} from "@utils/subscribtionList";
import { Client } from "@line/bot-sdk";
const handleOfferland = async (line: Client, body: any) => {
	const { userIds, taskType } = body;
	const testData = [
		{
			schoolName: "UBC",
			majorName: "Civil and Environmental Engineering",
			date: "2023/02/21",
			status: "admitted",
			originalUniversity: "National Taiwan University",
			userName: "Cheng-Hsuan Hsu",
		},
		{
			schoolName: "UIUC",
			majorName: "Computer Science, M.C.S.",
			date: "2023/03/14",
			status: "admitted",
			originalUniversity: "University of Illinois at Urbana-Champaign (UIUC)",
			userName: "Derek Peng",
		},
	];
	switch (taskType) {
		case "sendTest":
			const carousel = testData.map((subscribtion) => generateSubscribtionBubble(subscribtion));
			const flexResult = generateSubscribtionCarousel(testData, carousel);
			return line.multicast(["Ucf035f28a267b5e22edc042c4d91623c"], flexResult);

		case "extensiveTest":
			const bubble = extensiveSubscribtionBubble(testData[0]);
			const flexResult2 = generateSubscribtionCarousel(testData, [bubble]);
			return line.multicast(["Ucf035f28a267b5e22edc042c4d91623c"], flexResult2);
	}
};

export default handleOfferland;
