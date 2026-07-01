import { useEffect } from 'react'
import RegisterForm from '../components/auth/registerForm'

export default function Register() {
  useEffect(() => { document.title = "Register — Notes" }, [])
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="w-2.5 h-2.5 bg-[#FFC400] inline-block mb-4" />
          <h1 className="font-bold text-2xl tracking-tight text-black dark:text-white">
            Create account<span className="text-[#FFC400]">.</span>
          </h1>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
            Get started in seconds
          </p>
        </div>

        <div className="border border-black/10 dark:border-white/10 p-8">
          <RegisterForm />
        </div>

        <p className="mt-6 text-center text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
          Already have an account?{' '}
          <a href="/login" className="text-black dark:text-white hover:text-[#FFC400] transition-colors">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}