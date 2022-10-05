import { configureStore } from '@reduxjs/toolkit'
import transactionsSliceReducer from './transactionsSlice'

export const store = configureStore({
  reducer: {
    transactions: transactionsSliceReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch