import { instance } from './config';

export const register = (userInfo) => {
	return instance.post(`/users`, userInfo);
};

export const login = (userInfo) => {
	return instance.get(
		`/users?email=${userInfo.email}&password=${userInfo.password}`
	);
};

export const updateUerInfo = (newInfo) => {
	return instance.put(`/users/${newInfo.id}`, newInfo);
};

export const getUserInfo = (id) => {
	return instance.get(`/users/${id}`);
};
