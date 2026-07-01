import { useEffect } from 'react'
import LoginForm from '../components/auth/loginForm'

export default function Login() {
  useEffect(() => { document.title = "Login — Notes" }, [])
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="w-2.5 h-2.5 bg-[#FFC400] inline-block mb-4" />
          <h1 className="font-bold text-2xl tracking-tight text-black dark:text-white">
            Welcome back<span className="text-[#FFC400]">.</span>
          </h1>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
            Log in to continue
          </p>
        </div>

        <div className="border border-black/10 dark:border-white/10 p-8">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
          No account yet?{' '}
          <a href="/register" className="text-black dark:text-white hover:text-[#FFC400] transition-colors">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}