import axios from 'axios';

const api = axios.create({
	//возможно :3000 должен быть
	baseURL: 'http://localhost:8000',
	// headers: {
	// 	'Content-Type': 'application/json',
	// },
});

export default api;
