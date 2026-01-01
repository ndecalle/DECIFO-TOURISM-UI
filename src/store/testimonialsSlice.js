import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchTestimonials = createAsyncThunk('testimonials/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(baseUrl + '/api/testimonials')
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const createTestimonial = createAsyncThunk('testimonials/create', async (item, { rejectWithValue }) => {
  try {
    const res = await fetch(baseUrl + '/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const approveTestimonial = createAsyncThunk('testimonials/approve', async ({ id }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(baseUrl + '/api/testimonials/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ approved: true }) })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const deleteTestimonial = createAsyncThunk('testimonials/delete', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(baseUrl + '/api/testimonials/' + id, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return id
  } catch (err) { return rejectWithValue(err.message) }
})

const slice = createSlice({ name: 'testimonials', initialState: { items: [], status: 'idle', error: null }, reducers: {}, extraReducers(builder) {
  builder
    .addCase(fetchTestimonials.pending, (s) => { s.status = 'loading' })
    .addCase(fetchTestimonials.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload })
    .addCase(fetchTestimonials.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload })
    .addCase(createTestimonial.fulfilled, (s, a) => { s.items.unshift(a.payload) })
    .addCase(approveTestimonial.fulfilled, (s, a) => { s.items = s.items.map(i => i._id === a.payload._id ? a.payload : i) })
    .addCase(deleteTestimonial.fulfilled, (s, a) => { s.items = s.items.filter(i => i._id !== a.payload) })
}
})

// Selectors

export const selectTestimonials = (state) => state.testimonials.items

export const selectTestimonialsStatus = (state) => state.testimonials.status

export const selectTestimonialsError = (state) => state.testimonials.error

export const selectTestimonialById = (state, id) => state.testimonials.items.find(testimonial => testimonial._id === id)
// Selectors

export const selectContacts = (state) => state.contacts.items

export const selectContactsStatus = (state) => state.contacts.status

export const selectContactsError = (state) => state.contacts.error

export const selectContactById = (state, id) => state.contacts.items.find(contact => contact._id === id)
// Selectors

export const selectBookings = (state) => state.bookings.items

export const selectBookingsStatus = (state) => state.bookings.status

export const selectBookingsError = (state) => state.bookings.error

export const selectBookingById = (state, id) => state.bookings.items.find(booking => booking._id === id)
// Selectors

export const selectImages = (state) => state.images.items

export const selectImagesStatus = (state) => state.images.status

export const selectImagesError = (state) => state.images.error

export const selectImageById = (state, id) => state.images.items.find(image => image._id === id)

export default slice.reducer



