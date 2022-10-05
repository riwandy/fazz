import React, { ReactElement } from 'react'
import { TransactionDetails } from '../../../../types'
import { camelToSentenceCase } from '../Pagination/utils'
import './style.css'

type HeaderType = {
  title: string
  sortable: boolean
}

export enum SORT_STATUS {
  'ASC',
  'DESC',
}

const SORT_STATUS_DISPLAY: {[key: number]: string} = {
  0: 'ASC',
  1: 'DESC',
}

type TableProps = {
  headers: HeaderType[]
  headerSortStatus: {[heaeder: string]: number}
  setHeaderSortStatus: Function
  data: TransactionDetails[]
  actions?: (id: number) => ReactElement[]
}

const Table: React.FC<TableProps> = ({
  headers,
  headerSortStatus,
  setHeaderSortStatus,
  data,
  actions
}) => {

  const handleSortClick = (h: HeaderType) => {
    return () => {
      setHeaderSortStatus(
        {
          ...headerSortStatus,
          [h.title]: (headerSortStatus[h.title] + 1) % 2
        }
      )   
    }
  }

  const renderHeader = (headers: HeaderType[]) => (
    <div className='row header'>
      {
        headers.map((h) => (
          <div className='cell' key={h.title}>
            {camelToSentenceCase(h.title)}
            <div className='sort-btn' onClick={handleSortClick(h)}>
              {h.sortable ? SORT_STATUS_DISPLAY[headerSortStatus[h.title]] : ''}
            </div>
          </div>
        ))
      }
      {actions && <div className='cell'></div>}
    </div>
  )

  const renderRows = (dataRows: TransactionDetails[]) => (
    dataRows.map((dataRow) => (
      <div className='row' key={dataRow.id}>
        {
          Object.entries(dataRow)
            .map(([key, dataPoint]) => (
              <div
                className={`cell${['debit', 'credit'].includes(key) ? ` ${key}` : '' }`}
                key={`${dataRow.id}-${dataPoint}`}
              >
                {dataPoint}
              </div>
            ))
        }
        {actions && <div className='cell' key={`${dataRow.id}-action`}>{actions(dataRow.id)}</div>}
      </div>
    ))
  )

  return (
    <div className="table">
      <thead>
        {renderHeader(headers)}
      </thead>
      <tbody>
        {renderRows(data)}
      </tbody>
    </div>
  )
}

export default Table