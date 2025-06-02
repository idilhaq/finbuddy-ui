import { useState } from 'react'
import { authService } from "@/services/authService"
import { useNavigate } from 'react-router-dom'
import { RegistrationForm } from '@/components/registration-form'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (payload: { email: string; password: string, name: string, role: string }) => {
    const { email, password, name, role } = payload
    const result = await authService.register(email, password, name, role)
    if (result.success) {
      navigate('/login')
    } else {
      setError(result.message ?? 'Registration failed')
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          FinBuddy | Your Personal Finance Buddy
        </a>
        <RegistrationForm onSubmit={handleSubmit} />
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default Register
