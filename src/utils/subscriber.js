const getSubscribers = (supabase, result) => {};

const addSubscribe = (userId, universityId) => {};

const checkUnique = (value, index, array) => {
	return array.indexOf(value) === index;
};
const removeDuplicates = ({ conturySubs, universitySubs, groupSubs }) => {
	const combinedSubscribers = [...conturySubs, ...universitySubs, ...groupSubs].sort();
	const uniqueSubscribers = combinedSubscribers.filter(checkUnique);
	return uniqueSubscribers;
};
