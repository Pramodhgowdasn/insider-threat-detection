import api from './api.client';

export const getCases = async (params) => {
  const response = await api.get('/cases', { params });
  return response.data;
};

export const createCase = async (caseData) => {
  const response = await api.post('/cases', caseData);
  return response.data;
};

export const getCaseById = async (id) => {
  const response = await api.get(`/cases/${id}`);
  return response.data;
};

export const updateCase = async (id, updateData) => {
  const response = await api.put(`/cases/${id}`, updateData);
  return response.data;
};
