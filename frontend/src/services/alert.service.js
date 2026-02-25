import api from './api.client';

export const getAlerts = async (params) => {
  const response = await api.get('/alerts', { params });
  return response.data;
};
