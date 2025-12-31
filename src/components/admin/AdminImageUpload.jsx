import { useState } from 'react'

const AdminImageUpload = ({ onUploaded = () => {}, initial = null }) => {
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const upload = async (e) => {
    e.preventDefault()
    if (!file) return setMsg('Please choose a file')
    setLoading(true)
    const form = new FormData()
    form.append('file', file)
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/uploads', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form })
      const data = await res.json()
      if (res.ok) {
        setMsg('Uploaded')
        onUploaded(data)
      } else {
        setMsg(data?.message || 'Upload failed')
      }
    } catch (err) {
      setMsg('Upload error')
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold mb-3">Upload Image</h3>
      <form onSubmit={upload}>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="mb-3" />
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-3 py-1 rounded" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
        </div>
      </form>
      {initial?.url && <div className="mt-3"><img src={initial.url || initial.secure_url} alt="initial" className="h-24 object-cover" /></div>}
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  )
}

export default AdminImageUpload
