import { instance } from './config';

export const getAllCategories = () => {
	return instance.get(`/categories`);
};

export const getOneCategory = (id) => {
	return instance.get(`/categories/${id}`);
};

export const addCategory = (category) => {
	return instance.post(`/categories`, category);
};

export const updateCategory = (category) => {
	return instance.put(`/categories/${category.id}`, category);
};

export const deleteCategory = (id) => {
	return instance.delete(`/categories/${id}`);
};
