import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useDateRange from '../../../../hooks/useDateRange';
import { TransactionDetails } from '../../../../types';
import DateRangePicker from '../../../../components/DateRangePicker';
import Table, { SORT_STATUS } from '../Table';
import PaginationNav from './components/PaginationNav';
import './style.css'

type PaginationProps = {
  data: TransactionDetails[]
};

const RECORD_PER_PAGE = 10

const Pagination: React.FC<PaginationProps> = ({
  data,
}) => {
  const [startDate, endDate, setStartDate, setEndDate] = useDateRange()

  let headers = Object.keys(data[0]).map(h => ({title: h, sortable: h === 'transactionDate'}))
  const [headerSortStatus, setHeaderSortStatus] = useState(
    headers
      .filter(h => h.sortable)
      .reduce((res, h) => ({...res, [h.title]: SORT_STATUS.DESC}), {} as {[key: string]: any})
  )

  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedPage, setSelectedPage] = useState(1)

  const startIndex = RECORD_PER_PAGE * (selectedPage - 1)
  const nextStartIndex = RECORD_PER_PAGE * (selectedPage)

  let filteredData = searchKeyword === '' 
    ? data
    : data
      .filter((data) => {
        return data.description.toLowerCase().includes(searchKeyword.toLowerCase())
      })

  filteredData = startDate === '' || endDate === ''
    ? filteredData
    : filteredData
      .filter((data) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const transactionDate = new Date(data.transactionDate) 
        return transactionDate >= start && transactionDate <= end
      })

  let sortedData = filteredData
  Object.keys(headerSortStatus).forEach((key) => {
    sortedData = [...sortedData].sort((a: any,b: any) => {
      const da = (new Date(a[key])).getTime()
      const db = (new Date(b[key])).getTime()
 
      return headerSortStatus[key] === SORT_STATUS.ASC? da - db : db - da
    })
  })
  
  const slicedData = sortedData.slice(startIndex, nextStartIndex)
  const numberOfPage = Math.ceil(sortedData.length / RECORD_PER_PAGE)

  if (data.length === 0) {
    return (
      <div>Empty</div>
    )
  }

  return (
    <div id='pagination'>
      <div id='search-and-filter'>
        <DateRangePicker setEndDate={setEndDate} setStartDate={setStartDate} startDate={startDate} />
        <input
          id='search-bar'
          placeholder='search'
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      <Table
        headers={headers}
        headerSortStatus={headerSortStatus}
        setHeaderSortStatus={setHeaderSortStatus}
        data={slicedData}
        actions={(id: number) => [<Link to={`/transaction-detail/${id}`}>View</Link>]}
      />
      <PaginationNav
        numberOfPage={numberOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
    </div>
  )
}

export default Pagination