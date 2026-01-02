"use client"

import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from 'react-redux'
import { createContact } from '../store/contactsSlice'

const ContactForm = () => {
  const dispatch = useDispatch()
  const tours = useSelector(s => s.tours.items)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tourInterest: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await dispatch(createContact(formData))
      if (res.meta && res.meta.requestStatus === 'fulfilled') {
        toast.success('Thank you for your message! We will get back to you soon.')
        setFormData({ name: '', email: '', phone: '', tourInterest: '', message: '' })
      } else {
        toast.error(res.payload?.message || 'Something went wrong. Please try again later.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('An error occurred. Please try again later.')
    } finally { setIsSubmitting(false) }
  }

  return (
    <div data-reveal className="reveal relative">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-green-700">Get in Touch</h3>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent" />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent" />
        </div>

        <div className="mb-4">
          <label htmlFor="tourInterest" className="block text-gray-700 font-medium mb-2">Tour Interest</label>
          <select id="tourInterest" name="tourInterest" value={formData.tourInterest} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent">
            <option value="">Select a tour</option>
            {tours.map(t => <option key={t._id} value={t.slug || t._id}>{t.title}</option>)}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"></textarea>
        </div>

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center" disabled={isSubmitting}>
          {isSubmitting && (<svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>)}
          Send Message
        </button>
      </form>
    </div>
  )
}

export default ContactForm

