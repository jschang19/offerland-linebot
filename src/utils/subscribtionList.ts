import { FlexMessage } from "./line/Message";
const generateSubscribtionBubble = (subscribtion: any) => {
	return {
		type: "bubble",
		header: {
			type: "box",
			layout: "horizontal",
			backgroundColor: "#2943D1",
			contents: [
				{
					type: "text",
					text: "訂閱內容",
					weight: "bold",
					size: "sm",
					color: "#FFFFFFFF",
					contents: [],
				},
			],
		},
		body: {
			type: "box",
			layout: "horizontal",
			spacing: "md",
			contents: [
				{
					type: "box",
					layout: "vertical",
					spacing: "lg",
					contents: [
						{
							type: "text",
							text: subscribtion.schoolName + " - " + subscribtion.majorName,
							weight: "bold",
							size: "lg",
							wrap: true,
							contents: [],
						},
						{
							type: "box",
							layout: "horizontal",
							spacing: "sm",
							contents: [
								{
									type: "text",
									text: "日期",
									size: "sm",
									color: "#AAAAAA",
									flex: 1,
									contents: [],
								},
								{
									type: "text",
									text: subscribtion.date,
									size: "sm",
									flex: 2,
									wrap: true,
									contents: [],
								},
							],
						},
						{
							type: "box",
							layout: "horizontal",
							spacing: "sm",
							contents: [
								{
									type: "text",
									text: "申請結果",
									size: "sm",
									color: "#AAAAAA",
									flex: 1,
									contents: [],
								},
								{
									type: "text",
									text: subscribtion.status,
									size: "sm",
									flex: 2,
									wrap: true,
									contents: [],
								},
							],
						},
						{
							type: "box",
							layout: "horizontal",
							spacing: "sm",
							contents: [
								{
									type: "text",
									text: "畢業學校",
									size: "sm",
									color: "#AAAAAA",
									flex: 1,
									contents: [],
								},
								{
									type: "text",
									text: subscribtion.originalUniversity,
									size: "sm",
									flex: 2,
									wrap: true,
									contents: [],
								},
							],
						},
					],
				},
			],
		},
		footer: {
			type: "box",
			layout: "horizontal",
			contents: [
				{
					type: "button",
					action: {
						type: "uri",
						label: "查看資訊",
						uri: encodeURI(`https://offerland.cc/profile/${subscribtion.userName}?tab=錄取結果`),
					},
					color: "#2943D1",
					height: "sm",
					style: "primary",
				},
			],
		},
	};
};

export const generateSubscribtionCarousel = (subscribtions: any) => {
	const SubscribtionCarousel = subscribtions.map((subscribtion: any) => {
		return generateSubscribtionBubble(subscribtion);
	});

	return FlexMessage("訂閱內容", {
		type: "carousel",
		contents: SubscribtionCarousel,
	});
};
