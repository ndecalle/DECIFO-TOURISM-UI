import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTestimonials, approveTestimonial, deleteTestimonial } from '../../store/testimonialsSlice'

const AdminTestimonials = () => {
  const dispatch = useDispatch()
  const items = useSelector(s => s.testimonials.items)

  useEffect(() => { dispatch(fetchTestimonials()) }, [dispatch])

  const approve = async (id) => { await dispatch(approveTestimonial({ id })) }
  const remove = async (id) => { if (!confirm('Delete this testimonial?')) return; await dispatch(deleteTestimonial(id)) }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold mb-3">Testimonials</h3>
      <ul>
        {items.map(t => (
          <li key={t._id} className="p-2 border-b flex justify-between items-center">
            <div>
              <div className="font-bold">{t.name}</div>
              <div className="text-sm text-gray-600">{t.testimonial}</div>
            </div>
            <div className="space-x-2">
              {!t.approved && <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={() => approve(t._id)}>Approve</button>}
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => remove(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminTestimonials
