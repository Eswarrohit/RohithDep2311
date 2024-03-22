import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Home() {
  let storeObj = useSelector((store)=>{
    return store;
  })
  return (
    <div>
      <TopNavigation/>
        <h1>Home</h1>
        <h2>{storeObj.userDetails.firstName}
        {storeObj.userDetails.lastName}</h2>
        <img src={`/${storeObj.userDetails.profilePic}`}></img>
    </div>
  )
}

export default Home