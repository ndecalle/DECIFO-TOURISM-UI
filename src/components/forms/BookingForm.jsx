import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBooking } from '../../store/bookingsSlice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BookingForm = ({ initial = {}, onBooked = () => {} }) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ name: '', email: '', date: '', partySize: 1, tour: initial.tour || '', tourName: initial.tourName || '', notes: '' })
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form }
      if (payload.partySize !== undefined) payload.partySize = Number(payload.partySize)
      if (!payload.tour) delete payload.tour
      const res = await dispatch(createBooking(payload))
      if (res.meta && res.meta.requestStatus === 'fulfilled') {
        toast.success('Booking created')
        setForm({ name: '', email: '', date: '', partySize: 1, tour: '' , notes: '' })
        onBooked(res.payload)
      } else {
        toast.error(res.payload?.message || 'Booking failed')
      }
    } catch (err) {
      toast.error('Error creating booking')
    } finally { setLoading(false) }
  }

  return (
    <div data-reveal className="reveal">
      <ToastContainer />
      <form onSubmit={submit} className="bg-white p-4 rounded shadow">
        <div className="mb-2">
          <label className="block text-sm">Name</label>
          <input name="name" value={form.name} onChange={handle} className="w-full p-2 border rounded bg-transparent" required />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Email</label>
          <input type="email" name="email" value={form.email} onChange={handle} className="w-full p-2 border rounded bg-transparent" required />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Date</label>
          <input type="date" name="date" value={form.date} onChange={handle} className="w-full p-2 border rounded bg-transparent" required />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Party Size</label>
          <input type="number" name="partySize" value={form.partySize} onChange={handle} min={1} className="w-full p-2 border rounded bg-transparent" />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Tour (optional)</label>
          {form.tour ? (
            <>
              <input value={form.tourName || form.tour} readOnly className="w-full p-2 border rounded bg-transparent" />
              <input type="hidden" name="tour" value={form.tour} />
            </>
          ) : (
            <input name="tour" value={form.tour} onChange={handle} className="w-full p-2 border rounded bg-transparent" placeholder="Tour slug or id" />
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handle} className="w-full p-2 border rounded bg-transparent" />
        </div>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-3 py-1 rounded" disabled={loading}>{loading ? 'Booking...' : 'Book'}</button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm
