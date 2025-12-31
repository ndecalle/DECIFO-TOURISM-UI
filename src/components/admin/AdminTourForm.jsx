import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTour, updateTour } from '../../store/toursSlice'
import AdminImageUpload from './AdminImageUpload'
import { useForm } from 'react-hook-form'

const AdminTourForm = ({ tour = {}, onSaved = () => {}, onCancel = () => {} }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(tour.image || null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: tour.title || '',
      slug: tour.slug || '',
      description: tour.description || '',
      duration: tour.duration || '',
      priceText: tour.priceText || ''
    }
  })

  useEffect(() => {
    reset({ title: tour.title || '', slug: tour.slug || '', description: tour.description || '', duration: tour.duration || '', priceText: tour.priceText || '' })
    setImage(tour.image || null)
  }, [tour, reset])

  const onSubmit = async (data) => {
    const payload = { ...data }
    if (image) payload.image = typeof image === 'string' ? image : (image.url || image.secure_url || image)
    if (tour && tour._id) {
      await dispatch(updateTour({ id: tour._id, tour: payload }))
    } else {
      await dispatch(createTour(payload))
    }
    onSaved()
  }

  const handleUploaded = (data) => {
    setImage(data.url || data.secure_url || data.url)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 bg-gray-50 p-4 rounded">
      <div className="mb-2">
        <label className="block text-sm">Title</label>
        <input {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Minimum 3 characters' } })} className="w-full p-2 border rounded" />
        {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title.message}</div>}
      </div>
      <div className="mb-2">
        <label className="block text-sm">Slug</label>
        <input {...register('slug', { required: 'Slug is required', minLength: { value: 3, message: 'Minimum 3 characters' } })} className="w-full p-2 border rounded" />
        {errors.slug && <div className="text-red-600 text-sm mt-1">{errors.slug.message}</div>}
      </div>
      <div className="mb-2">
        <label className="block text-sm">Duration</label>
        <input {...register('duration')} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Price text</label>
        <input {...register('priceText')} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Description</label>
        <textarea {...register('description', { required: 'Description is required', minLength: { value: 10, message: 'Minimum 10 characters' } })} className="w-full p-2 border rounded" />
        {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description.message}</div>}
      </div>
      <div className="mb-2">
        <label className="block text-sm">Image</label>
        <AdminImageUpload initial={image ? (typeof image === 'string' ? { url: image } : image) : null} onUploaded={handleUploaded} />
        {image && <div className="mt-2">Uploaded: <img src={typeof image === 'string' ? image : (image.url || image.secure_url)} alt="tour" className="h-20 object-cover" /></div>}
      </div>
      <div className="flex gap-2">
        <button className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
        <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>
      </div>
    </form>
  )
}

export default AdminTourForm
