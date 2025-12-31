import { useEffect, useState } from 'react'
import AdminTourList from '../../components/admin/AdminTourList'
import AdminImageUpload from '../../components/admin/AdminImageUpload'
import AdminContacts from '../../components/admin/AdminContacts'
import AdminDestinations from '../../components/admin/AdminDestinations'
import AdminTestimonials from '../../components/admin/AdminTestimonials'
import AdminBookings from '../../components/admin/AdminBookings'

const AdminDashboard = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    ;(async () => {
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) setUser(await res.json())
    })()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => { localStorage.removeItem('token'); window.location.href = '/admin/login' }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AdminTourList />
          <AdminContacts />
          <AdminTestimonials />
        </div>
        <div className="space-y-6">
          <AdminImageUpload />
          <AdminDestinations />
          <AdminBookings />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
