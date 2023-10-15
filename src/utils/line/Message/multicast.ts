import { createFlexMessage } from "../message";
import { FlexBubble } from "@line/bot-sdk";

export const generateSubscribtionCarousel = (carousel: any) => {
	return createFlexMessage("訂閱內容", {
		type: "carousel",
		contents: carousel,
	});
};

export const generateSubscribtionBubble = (subscribtion: Result): FlexBubble => {
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
									text: subscribtion.university.name,
									weight: "bold",
									size: "lg",
									wrap: true,
								},
								{
									type: "text",
									text: subscribtion.major.name,
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
									text: new Date(subscribtion.date).toLocaleDateString(),
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
									text: subscribtion.type,
									color: subscribtion.type === "admit" ? "#008000" : "#808080",
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
									text: subscribtion.user.graduated_university,
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

export const generateExtensiveBubble = (field: ExtensiveField) => {
	const message = `${field.country_name} 的 ${field.field.name} 有 ${field.results} 則新錄取結果回報！`;
	const bubble: any = {
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
							text: message + "\n\n到 OfferLand 網站看更多 👇🏻",
							wrap: true,
							size: "sm",
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
						uri: encodeURI(
							`https://offerland.cc/results?type=field&country=${field.country_name}&university=&major=&field=${field.field.name}`,
						),
					},
					color: "#1919E8",
					height: "sm",
					style: "primary",
				},
			],
		},
	};

	return bubble;
};
