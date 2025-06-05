import api from './api'

export const getUserExpenses = async () => {
  try {
    const response = await api.get('/expenses/me')
    return { success: true, data: response.data }
  } catch (error: any) {
    return { success: false, error: error.message || 'Unknown error' }
  }
}

export const createExpense = async (expense: any) => {
  try {
    const response = await api.post('/expenses', expense)
    return { success: true, data: response.data }
  } catch (error: any) {
    return { success: false, error: error.message || 'Unknown error' }
  }
}

export const updateExpense = async (expense: any) => {
  try {
    const response = await api.put(`/expenses/${expense.id}`, expense)
    return { success: true, data: response.data }
  } catch (error: any) {
    return { success: false, error: error.message || 'Unknown error' }
  }
}

export const deleteExpense = async (id: string) => {
  try {
    await api.delete(`/expenses/${id}`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Unknown error' }
  }
}

export const getExpenseById = async (id: string) => {
  try {
    const response = await api.get(`/expenses/${id}`)
    return { success: true, data: response.data }
  } catch (error: any) {
    return { success: false, error: error.message || 'Unknown error' }
  }
}