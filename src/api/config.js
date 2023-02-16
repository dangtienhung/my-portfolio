import axios from 'axios';

export const instance = axios.create({
	// baseURL: 'http://localhost:3000',
	baseURL: 'https://3egmoi-8080.preview.csb.app/api',
});
