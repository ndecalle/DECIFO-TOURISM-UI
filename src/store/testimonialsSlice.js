import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE } from '../services/config'

export const fetchTestimonials = createAsyncThunk('testimonials/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(API_BASE + '/api/testimonials')
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const createTestimonial = createAsyncThunk('testimonials/create', async (item, { rejectWithValue }) => {
  try {
    const res = await fetch(API_BASE + '/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const approveTestimonial = createAsyncThunk('testimonials/approve', async ({ id }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(API_BASE + '/api/testimonials/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ approved: true }) })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const deleteTestimonial = createAsyncThunk('testimonials/delete', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(API_BASE + '/api/testimonials/' + id, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
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

export default slice.reducer
