const subscription_list = [
	{
		uni: "a",
		users: ["user1", "user2", "user4", "user5"],
	},
	{
		uni: "b",
		users: ["user1"],
	},
	{
		uni: "c",
		users: ["user1", "user2", "user3", "user4"],
	},
];

const userSchools = {}; // 用于存储用户所订阅的学校

subscription_list.forEach((data) => {
	const university = data.uni;
	const subscribe_users = data.users;

	subscribe_users.forEach((user) => {
		if (!userSchools[user]) {
			userSchools[user] = [];
		}
		userSchools[user].push(university);
	});
});

console.log(userSchools);

// 构建最终输出的对象
const result = {};

for (const user in userSchools) {
	const allUniversities = userSchools[user].join(",");

	if (!result[allUniversities]) {
		result[allUniversities] = [];
	}

	result[allUniversities].push(user);
}

console.log(result);
