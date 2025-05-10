// 统一管理前端API请求
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export default api;
