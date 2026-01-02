import { useEffect, useState } from 'react'
import AdminImageUpload from './AdminImageUpload'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDestinations, createDestination, updateDestination, deleteDestination } from '../../store/destinationsSlice'

const AdminDestinations = () => {
  const dispatch = useDispatch()
  const items = useSelector(s => s.destinations.items)
  const [editing, setEditing] = useState(null)

  useEffect(() => { dispatch(fetchDestinations()) }, [dispatch])

  const remove = async (id) => {
    if (!confirm('Delete this destination?')) return
    await dispatch(deleteDestination(id))
  }

  const save = async (payload) => {
    // support FormData passed from the form
    if (payload && payload.formData) {
      const form = payload.formData
      if (payload._id) await dispatch(updateDestination({ id: payload._id, item: form }))
      else await dispatch(createDestination(form))
      setEditing(null)
      return
    }

    const p = { ...payload }
    if (p.image && typeof p.image === 'object') p.image = p.image.url || p.image
    if (payload._id) await dispatch(updateDestination({ id: payload._id, item: p }))
    else await dispatch(createDestination(p))
    setEditing(null)
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Destinations</h3>
        <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => setEditing({})}>New</button>
      </div>
      {editing && (
        <DestinationForm item={editing} onSave={save} onCancel={() => setEditing(null)} />
      )}
      <ul>
        {items.map(d => (
          <li key={d._id} className="p-2 border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
              {d.image && <img src={d.image} alt={d.name} className="w-20 h-14 object-cover rounded" />}
              <div>
                <div className="font-bold">{d.name}</div>
                <div className="text-sm text-gray-600">{d.shortDescription}</div>
              </div>
            </div>
            <div className="space-x-2">
              <button className="px-2 py-1 bg-yellow-400 rounded" onClick={() => setEditing(d)}>Edit</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => remove(d._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const DestinationForm = ({ item = {}, onSave, onCancel }) => {
  const [image, setImage] = useState(item.image || null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: { name: item.name || '', slug: item.slug || '', shortDescription: item.shortDescription || '', description: item.description || '' } })

  useEffect(() => {
    reset({ name: item.name || '', slug: item.slug || '', shortDescription: item.shortDescription || '', description: item.description || '' })
    setImage(item.image || null)
  }, [item, reset])

  const submit = (data) => {
    // If image is a File, send it as FormData through onSave
    if (image && image instanceof File) {
      const form = new FormData()
      form.append('file', image)
      Object.keys(data).forEach(k => { if (data[k] != null) form.append(k, data[k]) })
      onSave({ formData: form, _id: item._id })
      return
    }
    const payload = { ...data }
    if (image) payload.image = typeof image === 'string' ? image : (image.url || image.secure_url || image)
    onSave({ ...payload, _id: item._id })
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="mb-4 bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Name</label>
        <input {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
        {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name.message}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Slug</label>
        <input {...register('slug', { required: 'Slug is required', minLength: { value: 2, message: 'Too short' } })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
        {errors.slug && <div className="text-red-600 text-sm mt-1">{errors.slug.message}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Short Description</label>
        <input {...register('shortDescription', { required: 'Short description is required', minLength: { value: 5, message: 'Too short' } })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
        {errors.shortDescription && <div className="text-red-600 text-sm mt-1">{errors.shortDescription.message}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Description</label>
        <textarea {...register('description')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Image</label>
        <AdminImageUpload initial={image ? (typeof image === 'string' ? { url: image } : image) : null} onUploaded={(data) => setImage(data.url || data.secure_url || data.url)} onFileSelect={(f) => setImage(f)} />
        {image && <div className="mt-2">Uploaded: <img src={typeof image === 'string' ? image : (image.url || image.secure_url)} alt="destination" className="h-20 object-cover" /></div>}
      </div>
      <div className="flex gap-2">
        <button className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
        <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>
      </div>
    </form>
  )
}

export default AdminDestinations
