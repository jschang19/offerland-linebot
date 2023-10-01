import { FlexMessage } from "./line/Message";
export const generateSubscribtionBubble = (subscribtion: any) => {
	return {
		type: "bubble",
		header: {
			type: "box",
			layout: "horizontal",
			backgroundColor: "#1919E8",
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
							text: subscribtion.university.name + " - " + subscribtion.major.name,
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
									text: subscribtion.type,
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
									text: subscribtion.user.graduated_university,
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
						uri: encodeURI(`https://offerland.cc/profile/${subscribtion.user.name}?tab=錄取結果`),
					},
					color: "#1919E8",
					height: "sm",
					style: "primary",
				},
			],
		},
	};
};

export const generateSubscribtionCarousel = (carousel: any) => {
	return FlexMessage("訂閱內容", {
		type: "carousel",
		contents: carousel,
	});
};

export const extensiveSubscribtionBubble = (subscribtion: any) => {
	return {
		type: "bubble",
		header: {
			type: "box",
			layout: "horizontal",
			backgroundColor: "#1919E8",
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
							text: "US - Marketing",
							weight: "bold",
							size: "lg",
							wrap: true,
							contents: [],
						},
						{
							type: "text",
							text: "US 的 Marketing 學群有 8 則新錄取結果回報！\n\n到 OfferLand 網站看更多 👇🏻",
							wrap: true,
							contents: [],
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
						label: "查看新回報",
						uri: "https://offerland.cc/results?type=field&country=United+States+(US)&university=&major=&field=Marketing",
					},
					color: "#1919E8",
					height: "sm",
					style: "primary",
				},
			],
		},
	};
};
