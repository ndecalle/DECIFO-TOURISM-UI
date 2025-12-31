import { useEffect, useState } from 'react'
import AdminTourForm from './AdminTourForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTours, deleteTour } from '../../store/toursSlice'

const AdminTourList = () => {
  const dispatch = useDispatch()
  const tours = useSelector((s) => s.tours.items)
  const status = useSelector((s) => s.tours.status)
  const [editing, setEditing] = useState(null)

  useEffect(() => { dispatch(fetchTours()) }, [dispatch])

  const remove = async (id) => {
    if (!confirm('Delete this tour?')) return
    await dispatch(deleteTour(id))
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Tours</h2>
        <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => setEditing({})}>New Tour</button>
      </div>

      {editing && <AdminTourForm tour={editing} onSaved={() => { setEditing(null); dispatch(fetchTours()) }} onCancel={() => setEditing(null)} />}

      <ul className="space-y-4">
        {(status === 'loading' ? [] : tours).map(t => (
          <li key={t._id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <div className="font-bold">{t.title}</div>
              <div className="text-sm text-gray-600">{t.duration} — {t.priceText || t.price}</div>
            </div>
            <div className="space-x-2">
              <button className="px-2 py-1 bg-yellow-400 rounded" onClick={() => setEditing(t)}>Edit</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => remove(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminTourList
