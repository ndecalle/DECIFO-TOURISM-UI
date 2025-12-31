import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContacts, sendReply } from '../../store/contactsSlice'

const AdminContacts = () => {
  const dispatch = useDispatch()
  const contacts = useSelector(s => s.contacts.items)
  const [selected, setSelected] = useState(null)
  const [reply, setReply] = useState({ subject: '', body: '', template: '' })

  useEffect(() => { dispatch(fetchContacts()) }, [dispatch])

  const doSendReply = async () => {
    if (!selected) return
    const res = await dispatch(sendReply({ id: selected._id, payload: reply }))
    if (res && res.meta && res.meta.requestStatus === 'fulfilled') alert('Reply sent')
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold mb-3">Contacts</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <ul>
            {contacts.map(c => (
              <li key={c._id} className="p-2 border-b cursor-pointer" onClick={() => setSelected(c)}>
                <div className="font-bold">{c.name}</div>
                <div className="text-sm text-gray-600">{c.email}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          {selected ? (
            <div>
              <h4 className="font-bold">{selected.name} — {selected.email}</h4>
              <p className="mb-4">{selected.message}</p>

              <div className="mb-2">
                <label className="block text-sm">Template</label>
                <select value={reply.template} onChange={(e) => setReply({ ...reply, template: e.target.value })} className="w-full p-2 border rounded">
                  <option value="">Custom</option>
                  <option value="acknowledgement">Acknowledgement</option>
                  <option value="bookingInfo">Booking Info</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm">Subject</label>
                <input className="w-full p-2 border rounded" value={reply.subject} onChange={(e) => setReply({ ...reply, subject: e.target.value })} />
              </div>
              <div className="mb-2">
                <label className="block text-sm">Body</label>
                <textarea className="w-full p-2 border rounded" rows={6} value={reply.body} onChange={(e) => setReply({ ...reply, body: e.target.value })} />
              </div>
              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={doSendReply}>Send Reply</button>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Select a contact to view details</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminContacts
