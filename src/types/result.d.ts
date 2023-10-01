interface Result {
	id: string;
	date: Date;
	type: string;
	user: User;
	major: Major;
	degree: Degree;
	country_id: string;
	created_at: Date;
	university: University;
	scholarship: Scholarship;
	country_name: string;
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
	// ... other fields
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

type SubscriberList = {
	[id: string]: string[];
};
