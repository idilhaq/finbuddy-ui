import api from './api'

export const getUserInfo = async () => {
  try {
    const response = await api.get('/users/me')
    return { success: true, data: response.data }
  } catch (error: any) {
    return { success: false, error: error.message || 'Unknown error' }
  }
}