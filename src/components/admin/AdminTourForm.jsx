import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTour, updateTour } from '../../store/toursSlice'
import AdminImageUpload from './AdminImageUpload'
import { useForm } from 'react-hook-form'
import { formatDate } from '../../utils/dateFormatter'

const AdminTourForm = ({ tour = {}, onSaved = () => {}, onCancel = () => {} }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(tour.image || null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: tour.title || '',
      slug: tour.slug || '',
      description: tour.description || '',
      duration: tour.duration || '',
      priceText: tour.priceText || '',
      date: tour.date ? (new Date(tour.date)).toISOString().slice(0,10) : ''
    }
  })

  useEffect(() => {
    reset({ title: tour.title || '', slug: tour.slug || '', description: tour.description || '', duration: tour.duration || '', priceText: tour.priceText || '', date: tour.date ? (new Date(tour.date)).toISOString().slice(0,10) : '' })
    setImage(tour.image || null)
  }, [tour, reset])

  const onSubmit = async (data) => {
    // If `image` is a File (selected but not uploaded), send multipart/form-data
    if (image && image instanceof File) {
      const form = new FormData()
      form.append('file', image)
      Object.keys(data).forEach(k => { if (data[k] != null) form.append(k, data[k]) })
      if (tour && tour._id) {
        await dispatch(updateTour({ id: tour._id, tour: form }))
      } else {
        await dispatch(createTour(form))
      }
    } else {
      const payload = { ...data }
      if (image) payload.image = typeof image === 'string' ? image : (image.url || image.secure_url || image)
      if (tour && tour._id) {
        await dispatch(updateTour({ id: tour._id, tour: payload }))
      } else {
        await dispatch(createTour(payload))
      }
    }
    onSaved()
  }

  const handleUploaded = (data) => {
    setImage(data.url || data.secure_url || data.url)
  }

  const handleFileSelect = (file) => {
    setImage(file)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 bg-white p-6 rounded-lg shadow-md">
      {tour && tour.createdAt && <div className="mb-4 text-sm text-gray-600">Created: {formatDate(tour.createdAt)}</div>}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Tour date</label>
        <input type="date" {...register('date')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Title</label>
        <input {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Minimum 3 characters' } })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
        {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title.message}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Slug</label>
        <input {...register('slug', { required: 'Slug is required', minLength: { value: 3, message: 'Minimum 3 characters' } })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
        {errors.slug && <div className="text-red-600 text-sm mt-1">{errors.slug.message}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Duration</label>
        <input {...register('duration')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Price text</label>
        <input {...register('priceText')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Description</label>
        <textarea {...register('description', { required: 'Description is required', minLength: { value: 10, message: 'Minimum 10 characters' } })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
        {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description.message}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-sm">Image</label>
        <AdminImageUpload initial={image ? (typeof image === 'string' ? { url: image } : image) : null} onUploaded={handleUploaded} onFileSelect={handleFileSelect} />
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
