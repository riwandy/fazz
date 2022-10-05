import { RootState } from "./store";

export const selectTransactionById = (id: number | null) => (state: RootState) => {
  if (id === null) return null
  return state.transactions.transactions.filter(transaction => transaction.id === id)?.[0] ?? null
}