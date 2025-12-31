import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)
  if (!token) return <Navigate to="/admin/login" replace />
  if (user && user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

export default AdminRoute
