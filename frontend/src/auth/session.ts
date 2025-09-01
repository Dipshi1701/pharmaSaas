export type Session = {
  username: string
  loggedInAt: number
}

const KEY = 'pharmaSaas:session'

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
  const session: Session = { username, loggedInAt: Date.now() }
  localStorage.setItem(KEY, JSON.stringify(session))
}

export function signOut(): void {
  localStorage.removeItem(KEY)
}
