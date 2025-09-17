export type Session = {
  token: string
  role: string
  username: string
  loggedInAt: number
}

const KEY = 'pharmaSaas:auth'

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getSession()?.username)
}

export async function signIn(username: string, password: string): Promise<void> {
  // Replace with real API call later
  if (!username || !password) throw new Error('Missing credentials')
  
  // Mock credentials for frontend-only access
  const mockCredentials = {
    username: 'demo@pharmasaas.com',
    password: 'demo123'
  }
  
  // Check if using mock credentials
  if (username === mockCredentials.username && password === mockCredentials.password) {
    const session: Session = { 
      username: 'Demo User', 
      loggedInAt: Date.now(), 
      token: "mock-token-frontend-demo", 
      role: "frontend" 
    }
    localStorage.setItem(KEY, JSON.stringify(session))
    return
  }
  
  // For other credentials, create a basic session (can be extended later)
  const session: Session = { username, loggedInAt: Date.now(), token: "", role: "frontend" }
  localStorage.setItem(KEY, JSON.stringify(session))
}

export function signOut(): void {
    console.log('Signing out...')
    
    // Chatbot is loaded directly from index.html
    
    // Clear auth data
    localStorage.removeItem(KEY)
    sessionStorage.clear();
    console.log('✅ Auth data cleared')
}
