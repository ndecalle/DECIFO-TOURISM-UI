import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const res = await fetch(baseUrl + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')
  return data
})

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  status: 'idle',
  error: null
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    },
    setUser(state, action) {
      state.user = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { logout, setUser } = slice.actions

// Selectors
export const selectToken = (state) => state.auth.token
export const selectUser = (state) => state.auth.user
export const selectAuthStatus = (state) => state.auth.status
export const selectAuthError = (state) => state.auth.error
export const selectIsAuthenticated = (state) => !!state.auth.token
// Selectors

export const selectTours = (state) => state.tours.items

export const selectToursStatus = (state) => state.tours.status

export const selectToursError = (state) => state.tours.error

export const selectTourById = (state, id) => state.tours.items.find(tour => tour._id === id)
// Selectors

export const selectDestinations = (state) => state.destinations.items

export const selectDestinationsStatus = (state) => state.destinations.status

export const selectDestinationsError = (state) => state.destinations.error

export const selectDestinationById = (state, id) => state.destinations.items.find(destination => destination._id === id)
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

export default slice.reducer




