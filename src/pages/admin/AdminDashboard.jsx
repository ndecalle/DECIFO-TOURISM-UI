import { useEffect, useState } from 'react'
import { API_BASE } from '../../services/config'
import AdminTourList from '../../components/admin/AdminTourList'
import AdminImageUpload from '../../components/admin/AdminImageUpload'
import AdminContacts from '../../components/admin/AdminContacts'
import AdminDestinations from '../../components/admin/AdminDestinations'
import AdminTestimonials from '../../components/admin/AdminTestimonials'
import AdminBookings from '../../components/admin/AdminBookings'

const AdminDashboard = () => {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('tours')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    ;(async () => {
      const res = await fetch(API_BASE + '/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) setUser(await res.json())
    })()
  }, [])

  const menuItems = [
    { key: 'tours', label: 'Tours', component: AdminTourList },
    { key: 'bookings', label: 'Bookings', component: AdminBookings },
    { key: 'contacts', label: 'Contacts', component: AdminContacts },
    { key: 'testimonials', label: 'Testimonials', component: AdminTestimonials },
    { key: 'destinations', label: 'Destinations', component: AdminDestinations },
    { key: 'images', label: 'Images', component: AdminImageUpload },
  ]

  const ActiveComponent = menuItems.find(item => item.key === activeTab)?.component || AdminTourList

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-green-700">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            {menuItems.map(item => (
              <li key={item.key} className="mb-2">
                <button
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full text-left p-2 rounded hover:bg-gray-100 transition ${activeTab === item.key ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700'}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Profile and Logout */}
        <div className="p-4 border-t bg-gray-50">
          {user && (
            <div className="mb-4">
              <div className="font-bold text-gray-800">{user.name}</div>
              <div className="text-sm text-gray-600">{user.email}</div>
            </div>
          )}
          <button
            className="w-full bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded transition"
            onClick={() => { localStorage.removeItem('token'); window.location.href = '/admin/login' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {menuItems.find(item => item.key === activeTab)?.label}
          </h1>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <ActiveComponent />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
