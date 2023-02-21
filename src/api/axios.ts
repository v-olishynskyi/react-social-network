import axios from 'axios';

const apiClient = axios.create({});

apiClient.interceptors.request.use(
  config => ({ ...config }),
  error => Promise.reject(error)
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };

export default apiClient;
