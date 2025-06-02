import { useState } from 'react'
import { authService } from "@/services/authService"
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/components/login-form'

function Login() {
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (payload: { email: string; password: string }) => {
        const { email, password } = payload
        const result = await authService.login(email, password)
        if (result.success) {
            navigate('/dashboard')
        } else {
            setError(result.message ?? 'Login failed')
        }
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    FinBuddy | Your Personal Finance Buddy
                </a>
                <LoginForm onSubmit={handleSubmit}/>
                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login
