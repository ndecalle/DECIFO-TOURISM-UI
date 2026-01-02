import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE } from '../services/config'

export const fetchImages = createAsyncThunk('images/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(API_BASE + '/api/uploads')
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

const slice = createSlice({ name: 'images', initialState: { items: [], status: 'idle', error: null }, reducers: {}, extraReducers(builder) {
  builder
    .addCase(fetchImages.pending, (s) => { s.status = 'loading' })
    .addCase(fetchImages.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload })
    .addCase(fetchImages.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload })
} })

export default slice.reducer
