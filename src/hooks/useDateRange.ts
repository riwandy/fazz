import { Dispatch, SetStateAction, useState } from "react"

const useDateRange = (): [
  string,
  string,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<string>>
] => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  return [startDate, endDate, setStartDate, setEndDate]
}

export default useDateRange