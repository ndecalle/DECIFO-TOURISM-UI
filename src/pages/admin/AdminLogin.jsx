import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/authSlice'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const authState = useSelector((s) => s.auth)

  const submit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login({ email, password, baseUrl: import.meta.env.VITE_API_BASE_URL })).unwrap()
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <form onSubmit={submit}>
          <label className="block mb-2">Email</label>
          <input className="w-full mb-4 p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="block mb-2">Password</label>
          <input type="password" className="w-full mb-4 p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-green-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
