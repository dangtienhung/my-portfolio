import { instance } from './config';

export const getAll = () => {
	return instance.get(`/skills`);
};

export const getOneSkill = (id) => {
	return instance.get(`/skills/${id}`);
};

export const addSkill = (newSkill) => {
	return instance.post(`/skills`, newSkill);
};
