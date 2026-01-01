import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchDestinations = createAsyncThunk('destinations/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(baseUrl + '/api/destinations')
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const createDestination = createAsyncThunk('destinations/create', async (item, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const isForm = typeof FormData !== 'undefined' && item instanceof FormData
    const headers = isForm ? { Authorization: `Bearer ${token}` } : { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    const body = isForm ? item : JSON.stringify(item)
    const res = await fetch(baseUrl + '/api/destinations', { method: 'POST', headers, body })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const updateDestination = createAsyncThunk('destinations/update', async ({ id, item }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const isForm = typeof FormData !== 'undefined' && item instanceof FormData
    const headers = isForm ? { Authorization: `Bearer ${token}` } : { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    const body = isForm ? item : JSON.stringify(item)
    const res = await fetch(baseUrl + '/api/destinations/' + id, { method: 'PUT', headers, body })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const deleteDestination = createAsyncThunk('destinations/delete', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(baseUrl + '/api/destinations/' + id, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return id
  } catch (err) { return rejectWithValue(err.message) }
})

const slice = createSlice({ name: 'destinations', initialState: { items: [], status: 'idle', error: null }, reducers: {}, extraReducers(builder) {
  builder
    .addCase(fetchDestinations.pending, (s) => { s.status = 'loading' })
    .addCase(fetchDestinations.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload })
    .addCase(fetchDestinations.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload })
    .addCase(createDestination.fulfilled, (s, a) => { s.items.unshift(a.payload) })
    .addCase(updateDestination.fulfilled, (s, a) => { s.items = s.items.map(i => i._id === a.payload._id ? a.payload : i) })
    .addCase(deleteDestination.fulfilled, (s, a) => { s.items = s.items.filter(i => i._id !== a.payload) })
}
})

export default slice.reducer
