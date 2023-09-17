import { FlexMessage } from "../Message";

const ServiceMessage = FlexMessage("找服務", {
	type: "bubble",
	body: {
		type: "box",
		layout: "vertical",
		contents: [
			{
				type: "text",
				text: "找服務",
				weight: "bold",
				size: "xl",
				align: "center",
				color: "#FFFFFF",
			},
		],
		backgroundColor: "#1919E8",
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
					type: "message",
					label: "留學代辦",
					text: "找留學代辦",
				},
			},
			{
				type: "button",
				style: "link",
				height: "sm",
				action: {
					type: "message",
					label: "考試補習班",
					text: "找考試補習班",
				},
			},
			{
				type: "button",
				style: "link",
				height: "sm",
				action: {
					type: "message",
					label: "文書潤稿",
					text: "找文書潤稿",
				},
			},
			{
				type: "button",
				style: "link",
				height: "sm",
				action: {
					type: "message",
					label: "語言家教",
					text: "找語言家教",
				},
			},
		],
		flex: 0,
	},
});

export default ServiceMessage;
