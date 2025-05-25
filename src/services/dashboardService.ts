import api from './api';

export const getDashboardSummary = async (userId: string, month: string) => {
  const response = await api.get('/dashboard', {
    params: {
      user_id: userId,
      month: month,
    },
  });
  return response.data;
};