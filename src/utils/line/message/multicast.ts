import { createFlexMessage } from "./template";
import { FlexBubble } from "@line/bot-sdk";
import { capitalize } from "@utils/capitalize";
import eBookCampaignBubble from "./ads/ebook";
import "dotenv/config";

export const generateSubscribtionCarousel = (carousel: FlexBubble[]) => {
	return createFlexMessage("訂閱內容", {
		type: "carousel",
		contents: carousel,
	});
};

export const generatePreciseBubbles = (resultIds: string[], allResults: Map<string, Result>): FlexBubble[] => {
	const bubbles: FlexBubble[] = resultIds.map((id) => {
		const subscribtion = allResults.get(id);

		return {
			type: "bubble",
			header: {
				type: "box",
				layout: "horizontal",
				backgroundColor: process.env.MAIN_COLOR,
				contents: [
					{
						type: "text",
						text: "訂閱內容",
						weight: "bold",
						size: "sm",
						color: "#FFFFFFFF",
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
								type: "box",
								layout: "vertical",
								spacing: "md",
								contents: [
									{
										type: "text",
										text: subscribtion!.university.name,
										weight: "bold",
										size: "lg",
										wrap: true,
									},
									{
										type: "text",
										text: subscribtion!.major.name,
										weight: "bold",
										size: "sm",
										flex: 2,
										margin: "lg",
										wrap: true,
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
										text: "日期",
										size: "sm",
										color: "#AAAAAA",
										flex: 1,
									},
									{
										type: "text",
										text: new Date(subscribtion!.date).toISOString().split("T")[0],
										size: "sm",
										flex: 2,
										wrap: true,
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
									},
									{
										type: "text",
										text: capitalize(subscribtion!.type),
										color:
											subscribtion!.type === "decision"
												? process.env.DECISION_COLOR
												: subscribtion!.type === "admit"
												? process.env.ADMIT_COLOR
												: process.env.REJECT_COLOR,
										size: "sm",
										flex: 2,
										wrap: true,
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
									},
									{
										type: "text",
										text: subscribtion?.user?.graduated_university || "未填寫",
										size: "sm",
										flex: 2,
										wrap: true,
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
							uri: encodeURI(
								`${process.env.WEBSITE_URL}/profile/${
									subscribtion!.user.name
								}?tab=錄取結果&openExternalBrowser=1`
							),
						},
						height: "sm",
						style: "secondary",
					},
				],
			},
		};
	});

	bubbles.push(eBookCampaignBubble);
	bubbles.push(EditSubscribtionMessage);

	return bubbles;
};

export const generateExtensiveBubbles = (groupField: ExtensiveField[]) => {
	const bubbles: FlexBubble[] = groupField.map((field) => {
		const message = `${field.country_name} 的 ${field.field.name} 有 ${field.results} 則新錄取結果回報！`;

		const bubble: FlexBubble = {
			type: "bubble",
			header: {
				type: "box",
				layout: "horizontal",
				backgroundColor: process.env.MAIN_COLOR,
				contents: [
					{
						type: "text",
						text: "訂閱內容",
						weight: "bold",
						size: "sm",
						color: "#FFFFFFFF",
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
								text: message + "\n\n到 OfferLand 網站看更多 👇🏻",
								wrap: true,
								size: "sm",
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
							uri: encodeURI(
								`${process.env.WEBSITE_URL}/results?type=field&country=${field.country_name}&university=&major=&field=${field.field.name}&openExternalBrowser=1`
							),
						},
						height: "sm",
						style: "secondary",
					},
				],
			},
		};

		return bubble;
	});

	bubbles.push(eBookCampaignBubble);
	bubbles.push(EditSubscribtionMessage);

	return bubbles;
};

const EditSubscribtionMessage: FlexBubble = {
	type: "bubble",
	header: {
		type: "box",
		layout: "horizontal",
		backgroundColor: process.env.MAIN_COLOR,
		contents: [
			{
				type: "text",
				text: "訂閱內容",
				weight: "bold",
				size: "sm",
				color: "#FFFFFFFF",
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
						text: "想取消或更新訂閱的科系嗎？點選下方按鈕即可變更您的訂閱清單",
						weight: "regular",
						gravity: "center",
						wrap: true,
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
					label: "編輯訂閱",
					uri: `${process.env.WEBSITE_URL}/subscription?openExternalBrowser=1`,
				},
				height: "sm",
				style: "secondary",
			},
		],
	},
};
