import api from './api.client';

export const getAnalytics = async () => {
  // TODO: Create a real analytics endpoint. For now we can aggregate from other endpoints or mock it in backend
  // But let's assume we have one
  return {
    activeAlerts: 12,
    highRiskUsers: 3,
    processedEvents: 1450,
    systemHealth: 'Healthy'
  };
};

export const getEvents = async (params) => {
  const response = await api.get('/events', { params });
  return response.data;
};
