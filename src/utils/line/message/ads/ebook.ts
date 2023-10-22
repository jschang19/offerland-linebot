import { FlexBubble } from "@line/bot-sdk";

const eBookCampaignBubble: FlexBubble = {
	type: "bubble",
	header: {
		type: "box",
		layout: "vertical",
		contents: [
			{
				type: "text",
				text: "Jason 學長｜電子書 🎉",
				weight: "bold",
				size: "sm",
				color: "#FFFFFF",
			},
		],
		backgroundColor: process.env.MAIN_COLOR,
	},
	hero: {
		type: "image",
		url: "https://auth.offerland.cc/storage/v1/object/public/offerland/ads/OL100.png",
		size: "full",
		aspectRatio: "22:13",
		aspectMode: "cover",
		action: {
			label: "查看電子書",
			type: "uri",
			uri: "https://jason-career.com/product-category/ebook/?openExternalBrowser=1",
		},
	},
	body: {
		type: "box",
		layout: "vertical",
		contents: [
			{
				type: "box",
				layout: "vertical",
				margin: "lg",
				spacing: "sm",
				contents: [
					{
						type: "box",
						layout: "baseline",
						spacing: "sm",
						contents: [
							{
								type: "text",
								text: "優惠碼",
								color: "#aaaaaa",
								size: "xs",
								flex: 1,
							},
							{
								type: "text",
								text: "OL100",
								wrap: true,
								color: "#666666",
								size: "sm",
								flex: 5,
							},
						],
					},
					{
						type: "box",
						layout: "baseline",
						spacing: "sm",
						contents: [
							{
								type: "text",
								text: "電子書",
								color: "#aaaaaa",
								size: "xs",
								flex: 1,
							},
							{
								type: "text",
								text: "SOP 完整解析、履歷全攻略、英文面試大揭秘",
								wrap: true,
								color: "#666666",
								size: "xs",
								flex: 5,
							},
						],
					},
				],
			},
			{
				type: "box",
				layout: "vertical",
				contents: [
					{
						margin: "lg",
						type: "text",
						text: "每本折扣 $100、一次購買三本即折 $300",
						size: "xs",
						wrap: true,
					},
				],
			},
		],
	},
	footer: {
		type: "box",
		layout: "vertical",
		spacing: "sm",
		contents: [
			{
				type: "button",
				style: "link",
				height: "sm",
				action: {
					type: "uri",
					label: "點進來看看高 CP 值電子書 📖",
					uri: "https://jason-career.com/product-category/ebook?openExternalBrowser=1&utm_source=line_oa&utm_medium=multicast",
				},
			},
		],
		flex: 0,
	},
};

export default eBookCampaignBubble;
