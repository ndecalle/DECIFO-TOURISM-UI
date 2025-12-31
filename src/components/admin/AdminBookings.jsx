import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookings, updateBooking } from '../../store/bookingsSlice'

const AdminBookings = () => {
  const dispatch = useDispatch()
  const items = useSelector(s => s.bookings.items)

  useEffect(() => { dispatch(fetchBookings()) }, [dispatch])

  const updateStatus = async (id, status) => { await dispatch(updateBooking({ id, payload: { status } })) }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold mb-3">Bookings</h3>
      <ul>
        {items.map(b => (
          <li key={b._id} className="p-2 border-b">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">{b.name} — {b.tour?.title || b.tour}</div>
                <div className="text-sm text-gray-600">{b.email} — {b.partySize} persons</div>
              </div>
              <div className="space-x-2">
                <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={() => updateStatus(b._id, 'confirmed')}>Confirm</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => updateStatus(b._id, 'cancelled')}>Cancel</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminBookings
