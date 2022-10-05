export type TransactionDetails = {
  transactionDate: string,
  description: string,
  category: string,
  debit: number | null,
  credit: number | null,
  id: number
}