import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE } from '../services/config'

export const fetchContacts = createAsyncThunk('contacts/fetch', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(API_BASE + '/api/contacts', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const sendReply = createAsyncThunk('contacts/reply', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(API_BASE + '/api/admin/reply/' + id, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const createContact = createAsyncThunk('contacts/create', async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(API_BASE + '/api/contacts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

const slice = createSlice({ name: 'contacts', initialState: { items: [], status: 'idle', error: null }, reducers: {}, extraReducers(builder) {
  builder
    .addCase(fetchContacts.pending, (s) => { s.status = 'loading' })
    .addCase(fetchContacts.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload })
    .addCase(fetchContacts.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload })
    .addCase(sendReply.fulfilled, (s, a) => { /* no change to list */ })
    .addCase(createContact.fulfilled, (s, a) => { s.items.unshift(a.payload) })
}
})

export default slice.reducer
