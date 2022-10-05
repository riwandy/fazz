import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TransactionDetails } from '../types'

export interface TransactionsState {
  // bankDetails: any,
  transactions: TransactionDetails[]
}

const initialState: TransactionsState = {
  // bankDetails: {},
  transactions: []
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    loadTransactions: (state, action: PayloadAction<TransactionDetails[]>) => {
      state.transactions = action.payload
    }
  },
})

export const { loadTransactions } = transactionsSlice.actions

export default transactionsSlice.reducer