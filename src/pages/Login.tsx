import { useState } from 'react'
import { authService } from "@/services/authService"
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/components/login-form'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
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
                    Acme Inc.
                </a>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login
