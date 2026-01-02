import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchBookings = createAsyncThunk('bookings/fetch', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(baseUrl + '/api/bookings', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const updateBooking = createAsyncThunk('bookings/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(baseUrl + '/api/bookings/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const createBooking = createAsyncThunk('bookings/create', async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(baseUrl + '/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

const slice = createSlice({ name: 'bookings', initialState: { items: [], status: 'idle', error: null }, reducers: {}, extraReducers(builder) {
  builder
    .addCase(fetchBookings.pending, (s) => { s.status = 'loading' })
    .addCase(fetchBookings.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload })
    .addCase(fetchBookings.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload })
    .addCase(updateBooking.fulfilled, (s, a) => { s.items = s.items.map(i => i._id === a.payload._id ? a.payload : i) })
    .addCase(createBooking.fulfilled, (s, a) => { s.items.unshift(a.payload) })
}
})

export default slice.reducer
