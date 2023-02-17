import { instance } from './config';

export const getAll = () => {
	return instance.get(`/education`);
};

export const getOne = (id) => {
	return instance.get(`/education/${id}`);
};

export const addEducation = (newEducate) => {
	return instance.post(`/education`, newEducate);
};

export const deleteEducate = (id) => {
	return instance.delete(`/education/${id}`);
};

export const editEducate = (educate) => {
	return instance.put(`/education/${educate.id}`, educate);
};
