import { useState } from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { isAuthenticated, signIn } from '@/auth/session'
import { login as authLogin } from '@/services'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('demo@pharmasaas.com')
  const [password, setPassword] = useState('demo123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [role, setRole] = useState<'frontend' | 'backend'>('frontend')

  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!username || !password) {
      setError('Please enter username and password')
      return
    }
    try {
      setLoading(true)
      
      let token: string;
      
      try {
        // Try real backend authentication first
        console.log('Attempting backend authentication...')
        const authResult = await authLogin(username, password, role)
        console.log('Backend auth successful:', authResult)
        token = authResult.token
      } catch (backendError) {
        // If backend fails, use frontend-only authentication
        console.warn('Backend authentication failed, using frontend-only mode:', backendError)
        await signIn(username, password)
        token = 'mock-token-frontend-demo'
        console.log('Using frontend-only authentication')
      }
      
      if (role === 'frontend') {
        // For frontend-only mode, the session is already set by signIn()
        // Just ensure we have the right token in localStorage
        if (token === 'mock-token-frontend-demo') {
          const authData = { 
            token, 
            role: 'frontend',
            username: 'Demo User',
            loggedInAt: Date.now()
          };
          localStorage.setItem('pharmaSaas:auth', JSON.stringify(authData));
        }
        
        // Chatbot is loaded directly from index.html
        
        // Redirect to the page they were trying to access, or home page by default
        const from = (location.state as any)?.from || '/'
        console.log('Navigating to:', from);
        navigate(from, { replace: true })
      } else if (role === 'backend') {
        window.location.href = `http://localhost:5000/admin?token=${encodeURIComponent(token)}`;
      } else {
        throw new Error('Unknown role')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl">Sign in</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Role</label>
                  <select
                    className="w-full h-10 px-3 py-2 border rounded-md bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    value={role}
                    onChange={e => setRole(e.target.value as 'frontend' | 'backend')}
                    disabled={loading}
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <Input type="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="jane@company.com" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Password</label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                </div>
                {error ? <div className="text-sm text-red-600">{error}</div> : null}
                <Button type="submit" disabled={loading} className="w-full">{loading ? 'Signing in...' : 'Sign in'}</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

export default Login
