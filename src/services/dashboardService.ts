import api from './api';

export const getDashboardSummary = async (userId: string, month: string) => {
  try {
    const response = await api.get('/dashboard', {
      params: { user_id: userId, month: month },
    })
    return { success: true, data: response.data }
  } catch (error: any) {
    return { success: false, error: error.message || 'Unknown error' }
  }
}
