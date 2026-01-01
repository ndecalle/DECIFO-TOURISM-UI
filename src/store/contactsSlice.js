import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchContacts = createAsyncThunk('contacts/fetch', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(baseUrl + '/api/contacts', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const sendReply = createAsyncThunk('contacts/reply', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(baseUrl + '/api/admin/reply/' + id, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) })
    const data = await res.json()
    if (!res.ok) return rejectWithValue(data)
    return data
  } catch (err) { return rejectWithValue(err.message) }
})

export const createContact = createAsyncThunk('contacts/create', async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(baseUrl + '/api/contacts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
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

// Selectors

export const selectContacts = (state) => state.contacts.items

export const selectContactsStatus = (state) => state.contacts.status

export const selectContactsError = (state) => state.contacts.error

export const selectContactById = (state, id) => state.contacts.items.find(contact => contact._id === id)

export default slice.reducer
