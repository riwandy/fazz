import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectTransactionById } from '../../redux/selectors'
import './style.css'

const TransactionDetailPage = () => {
  const { id } = useParams()
  const transaction = useSelector(selectTransactionById(id ? parseInt(id) : null))

  if (!transaction) {
    return (
      <div id='header'>
        <div id='title'>Transaction not found</div>
        <Link to='/transactions'>Back</Link>
      </div>
    )
  }
  return (
    <div id=''>
      <div id='title'>Transaction Detail</div>
      <div id='detail-box'>
        <div>
          <div>Transaction Date</div>
          <div>Description</div>
          <div>Category</div>
          <div>Debit</div>
          <div>Credit</div>
          <div>Id</div>
        </div>
        <div>
          <div>{transaction.transactionDate}</div>
          <div>{transaction.description}</div>
          <div>{transaction.category}</div>
          <div id='debit'>{transaction.debit ?? 0}</div>
          <div id='credit'>{transaction.credit ?? 0}</div>
          <div>{transaction.id}</div>
        </div>
        <div></div>
      </div>
      <Link to='/transactions'>
        <div id='back-btn'>Back</div>
      </Link>
    </div>
  )
}

export default TransactionDetailPage