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
            <div>
              <div className="font-bold">{d.name}</div>
              <div className="text-sm text-gray-600">{d.shortDescription}</div>
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
    const payload = { ...data }
    if (image) payload.image = typeof image === 'string' ? image : (image.url || image.secure_url || image)
    onSave({ ...payload, _id: item._id })
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="mb-4 bg-gray-50 p-4 rounded">
      <div className="mb-2">
        <label className="block text-sm">Name</label>
        <input {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })} className="w-full p-2 border rounded" />
        {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name.message}</div>}
      </div>
      <div className="mb-2">
        <label className="block text-sm">Slug</label>
        <input {...register('slug', { required: 'Slug is required', minLength: { value: 2, message: 'Too short' } })} className="w-full p-2 border rounded" />
        {errors.slug && <div className="text-red-600 text-sm mt-1">{errors.slug.message}</div>}
      </div>
      <div className="mb-2">
        <label className="block text-sm">Short Description</label>
        <input {...register('shortDescription', { required: 'Short description is required', minLength: { value: 5, message: 'Too short' } })} className="w-full p-2 border rounded" />
        {errors.shortDescription && <div className="text-red-600 text-sm mt-1">{errors.shortDescription.message}</div>}
      </div>
      <div className="mb-2">
        <label className="block text-sm">Description</label>
        <textarea {...register('description')} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Image</label>
        <AdminImageUpload initial={image ? (typeof image === 'string' ? { url: image } : image) : null} onUploaded={(data) => setImage(data.url || data.secure_url || data.url)} />
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
