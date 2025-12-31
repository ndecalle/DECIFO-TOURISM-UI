import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchTours = createAsyncThunk('tours/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(baseUrl + '/api/tours')
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const createTour = createAsyncThunk('tours/create', async (tour, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(baseUrl + '/api/tours', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(tour) })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const updateTour = createAsyncThunk('tours/update', async ({ id, tour }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(baseUrl + '/api/tours/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(tour) })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const deleteTour = createAsyncThunk('tours/delete', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(baseUrl + '/api/tours/' + id, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return id
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const slice = createSlice({
  name: 'tours',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTours.pending, (state) => { state.status = 'loading' })
      .addCase(fetchTours.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload })
      .addCase(fetchTours.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload })
      .addCase(createTour.fulfilled, (state, action) => { state.items.unshift(action.payload) })
      .addCase(updateTour.fulfilled, (state, action) => { state.items = state.items.map(i => i._id === action.payload._id ? action.payload : i) })
      .addCase(deleteTour.fulfilled, (state, action) => { state.items = state.items.filter(i => i._id !== action.payload) })
  }
})

export default slice.reducer
