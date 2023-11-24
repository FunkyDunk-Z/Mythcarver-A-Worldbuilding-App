import React, { useState } from 'react'
import axios from 'axios'
import MyButton from './MyButton'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function ShowData() {
  const [data, setData] = useState([])
  const { user } = useAuthContext()

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/v1/codex/${user.codex}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const codex = res.data.data
      setData(codex)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFetch = () => {
    fetchData()
  }

  return (
    <div>
      <MyButton handleClick={handleFetch}>Show data</MyButton>
      <div>
        <p>{data.campaigns}</p>
        <p>here is the data</p>
      </div>
    </div>
  )
}
