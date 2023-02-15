import axios from 'axios';
import { instance } from './config';

export const getAllProjects = () => {
	return instance.get(`/projects`);
};

export const getOneProject = (id) => {
	return instance.get(`/projects/${id}`);
};

export const updateProject = (project) => {
	return instance.put(`/projects/${project.id}`, project);
};

export const addProject = (newProject) => {
	return instance.post(`/projects`, newProject);
};

export const deleteProject = (id) => {
	return instance.delete(`/projects/${id}`);
};
