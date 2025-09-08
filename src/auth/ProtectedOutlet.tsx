import { Navigate, Outlet, useLocation } from 'react-router-dom'

function hasFrontendAuth(): boolean {
  try {
    const raw = localStorage.getItem('pharmaSaas:auth')
    if (!raw) return false
    const parsed = JSON.parse(raw) as { token?: string; role?: string }
    return Boolean(parsed?.token) && parsed?.role === 'frontend'
  } catch {
    return false
  }
}

const ProtectedOutlet = () => {
  const location = useLocation()
  if (!hasFrontendAuth()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}

export default ProtectedOutlet


