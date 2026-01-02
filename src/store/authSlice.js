import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE } from '../services/config'
import { create } from 'node:domain'

export const login = createAsyncThunk('auth/login', async ({ email, password, baseUrl }) => {
  const res = await fetch(API_BASE + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')
  return data
})

const Register = createAsyncThunk('auth/register', async ({ name, email, password }) => {
  const res = await fetch(API_BASE + '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Registration failed')
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
export default slice.reducer
