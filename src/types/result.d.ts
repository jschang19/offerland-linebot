type Result = {
	id: string;
	date: string;
	type: ResultType;
	user: User;
	major: Major;
	degree: Degree;
	country_id: string;
	created_at: string;
	university: University;
	scholarship: Scholarship;
	country_name: string;
	field?: Field;
	subscribers: Subscriber[];
};

type User = {
	name: string;
	graduated_university: string;
};

type Subscriber = {
	line_id: string;
	user_id: string;
};

type Major = {
	id: string;
	name: string;
};

type Degree = {
	id: string;
	name: string;
};

type University = {
	id: string;
	name: string;
};

type Scholarship = {
	id: string;
	name: string;
};

type Field = {
	id: string;
	name: string;
};

type SubscriberList = {
	[id: string]: string[];
};

type GroupList = {
	[key: string]: string[];
};

type TypeResults = {
	[key in ResultType]: string[];
};

type ResultType = "decision" | "admit" | "reject";

type MulticastGroup = {
	resultIds: string[];
	subscribers: string[];
};

type ExtensiveField = {
	country_id: string;
	country_name: string;
	field: {
		id: string;
		name: string;
	};
	results: number;
};
