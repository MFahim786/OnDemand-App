// useApi.js
import { useState } from 'react';
import axios from 'axios';

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // You can set your token here or fetch it from a secure storage like localStorage or sessionStorage
  const authToken = 'your_auth_token';

  const api = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  const makeRequest = async (method, url, requestData = {}) => {
    try {
      setLoading(true);
      const response = await api[method](url, requestData);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const get = async (url, params = {}) => makeRequest('get', url, { params });
  const post = async (url, data) => makeRequest('post', url, data);
  const put = async (url, data) => makeRequest('put', url, data);
  const del = async (url) => makeRequest('delete', url);
  const patch = async (url, data) => makeRequest('patch', url, data);

  return {
    get,
    post,
    put,
    delete: del,
    patch,
    data,
    error,
    loading,
  };
};

export default useApi;