import { Routes, Route, Link } from "react-router-dom"
import LandingPage from "@/pages/LandingPage"
import Dashboard from "@/pages/Dashboard"
import Settings from "@/pages/Settings"
import Register from "@/pages/Register"
import Login from "@/pages/Login"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { authService } from "@/services/authService"

authService.setAuthHeader()

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
