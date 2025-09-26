import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

apiClient.interceptors.request.use(config => {
  // Aquí puedes agregar headers comunes, como tokens de autenticación
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU4NTg4MjY0LCJleHAiOjE3NTg1OTE4NjR9.tgUzGP_1SZgq2YPtQqxaqhNtzgPib9iZa8gS6twwFJU`;
  return config;
}, error => {
  return Promise.reject(error);
});