interface Result {
	id: string;
	date: string;
	type: string;
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
}

interface User {
	name: string;
	graduated_university: string;
}

interface Subscriber {
	line_id: string;
	user_id: string;
}

interface Major {
	id: string;
	name: string;
}

interface Degree {
	id: string;
	name: string;
}

interface University {
	id: string;
	name: string;
}

interface Scholarship {
	id: string;
	name: string;
}

interface Field {
	id: string;
	name: string;
}

type SubscriberList = {
	[id: string]: string[];
};

type GroupList = {
	[key: string]: string[];
};

interface MulticastGroup {
	resultIds: string[];
	subscribers: string[];
}
