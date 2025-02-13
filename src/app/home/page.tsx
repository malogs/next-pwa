"use client"

import Nav from '@/components/Nav'
import { useEffect, useState } from 'react'

const Home = () => {
  const [name, setName] = useState("")
  useEffect(() => {
    const userJSON = localStorage.getItem("maL_user");
    if (userJSON) {
      setName(JSON.parse(userJSON).displayName)
    }
  }, [])
  return (
    <>
    <Nav />
    <div className='mx-4 my-6'>
      <p className='text-2xl'>Hi {name},</p>
      <p>Keep track of your expenses here.</p>

    </div>
    </>
  )
}

export default Home