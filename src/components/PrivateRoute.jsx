import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token)
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}

export default PrivateRoute
