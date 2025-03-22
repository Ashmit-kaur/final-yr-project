import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const user=useSelector(selectUser)
  const navigate=useNavigate()

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
