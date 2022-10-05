import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions } from '../../api'
import Pagination from './components/Pagination'
import { RootState } from '../../redux/store'
import { loadTransactions } from '../../redux/transactionsSlice'

const TransactionsPage = () => {
  const dispatch = useDispatch()
  const transactions = useSelector((state: RootState) => state.transactions.transactions)

  useEffect(() => {
    (async () => {
      const res = await fetchTransactions()
      dispatch(loadTransactions(res.accounts))
    }) ()
  }, [])

  if (transactions.length === 0) {
    return (
      <div>No Transaction</div>
    )
  } else {
    return (
      <Pagination data={transactions} />
    )
  }
}

export default TransactionsPage