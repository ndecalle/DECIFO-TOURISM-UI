import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import toursReducer from './toursSlice'
import destinationsReducer from './destinationsSlice'
import testimonialsReducer from './testimonialsSlice'
import contactsReducer from './contactsSlice'
import bookingsReducer from './bookingsSlice'
import imagesReducer from './imagesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tours: toursReducer,
    destinations: destinationsReducer,
    testimonials: testimonialsReducer,
    contacts: contactsReducer,
    bookings: bookingsReducer
    ,images: imagesReducer
  }
})
