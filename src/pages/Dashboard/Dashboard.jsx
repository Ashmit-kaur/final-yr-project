import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate=useNavigate()
  const user=useSelector(selectUser)

  useEffect(()=>{
    if(!user)navigate("/signin")
  },[])

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
