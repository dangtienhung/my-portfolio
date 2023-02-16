import { instance } from './config';

export const getAllUser = () => {
	return instance.get('/user');
};

export const getUserInfo = (id) => {
	return instance.get(`/user/${id}`);
};

export const postUserInfo = (newInfo) => {
	return instance.post(`/user`, newInfo);
};

export const updateUserInfo = (userInfo) => {
	return instance.put(`/user/${userInfo.id}`, userInfo);
};

export const deleteUserInfo = (id) => {
	return instance.delete(`/user/${id}`);
};
