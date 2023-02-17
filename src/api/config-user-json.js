import { instance } from './config';

export const register = (userInfo) => {
	return instance.post(`/signup`, userInfo);
};

export const login = (userInfo) => {
	return instance.get(
		`/signup?email=${userInfo.email}&password=${userInfo.password}`
	);
};
