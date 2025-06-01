import { Navigate } from 'react-router-dom'
import { authService } from "@/services/authService"
import { JSX } from 'react'

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}
