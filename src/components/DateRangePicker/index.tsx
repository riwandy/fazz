import React, { Dispatch } from 'react'
import './style.css'

type DateRangePickerProps = {
  startDate: string
  setStartDate: Dispatch<React.SetStateAction<string>>
  setEndDate: Dispatch<React.SetStateAction<string>>
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  setStartDate,
  setEndDate
}) => {
  const TODAY = new Date().toISOString().split('T')[0]

  return (
    <div id='date-range-picker'>
      <input
        type="date"
        className="date-picker"
        name="start"
        max={TODAY}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        className="date-picker"
        name="end"
        min={startDate}
        max={TODAY}
        onChange={(e) => setEndDate(e.target.value)}
        />
    </div>
  )
}

export default DateRangePicker