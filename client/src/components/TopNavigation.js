import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

function TopNavigation() {
  let naviagte = useNavigate();
  let storeObj = useSelector((store)=>{
    return store;
  })
  useEffect(()=>{
   if(storeObj.userDetails.email){

   }else{
        naviagte("/");
   }
  },[])
  return (
   <nav>
    <NavLink to="/Home">Home</NavLink>
    <NavLink to="/Tasks">Tasks</NavLink>
    <NavLink to="/Editprofile">Editprofile</NavLink>
    <NavLink to="/">Logout</NavLink>
   </nav>
  )
}

export default TopNavigation