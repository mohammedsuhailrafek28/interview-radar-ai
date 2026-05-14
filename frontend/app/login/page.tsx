'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from '../utils/motion'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simple client-side validation
    if (!email || !password) {
      setError('Email and password are required')
      setLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    // TODO: Connect to backend auth endpoint
    // For now, just store in sessionStorage and redirect
    try {
      sessionStorage.setItem('user_email', email)
      sessionStorage.setItem('is_authenticated', 'true')
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      router.push('/')
    } catch (err) {
      setError('Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-80 h-80 bg-primary/20 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-80 h-80 bg-accent/20 blur-[100px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6 text-2xl font-black text-gradient">
            Interview Radar
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        {/* Form Card */}
        <div className="glass p-8 rounded-3xl border border-white/10">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer"
                />
                Remember me
              </label>
              <Link href="#" className="text-primary hover:text-primary/80 transition-colors font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent font-bold text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Demo Login */}
          <button
            onClick={() => {
              setEmail('demo@example.com')
              setPassword('demo123')
            }}
            disabled={loading}
            className="w-full py-3 rounded-xl border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-medium transition-all disabled:opacity-50 text-sm"
          >
            Try Demo Account
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center text-gray-400">
          Don't have an account?{' '}
          <Link href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign up
          </Link>
        </div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400"
        >
          <p className="font-medium text-gray-300 mb-2">Demo Credentials:</p>
          <p>Email: <span className="text-accent font-mono">demo@example.com</span></p>
          <p>Password: <span className="text-accent font-mono">demo123</span></p>
        </motion.div>
      </motion.div>
    </div>
  )
}
