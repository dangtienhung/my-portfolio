import { instance } from './config';

export const signUpUserInfo = (userInfo) => {
	return instance.post(`/signup`, userInfo);
};

export const signInUserInfo = (userInfo) => {
	return instance.post(`/signin`, userInfo);
};
