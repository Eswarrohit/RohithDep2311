import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {
    let firstNameInputRef=useRef();
    let lastNameInputRef=useRef();
    let ageInputRef=useRef();
    let emailInputRef=useRef();
    let mobieInputRef=useRef();
    let PasswordInputRef=useRef();
    let profileInputRef=useRef();

    let [profilePic,setProfilePic]=useState("./images/no.jpg");

let clickOnSignup= async()=>{

    let dataSendingToServer={
        firstName:firstNameInputRef.current.value,
        lastName:lastNameInputRef.current.value,
        age:ageInputRef.current.value,
        email:emailInputRef.current.value,
        password:PasswordInputRef.current.value,
        mobileNo:mobieInputRef.current.value,
        profilePic:profileInputRef.current.value,
    }
    console.log(dataSendingToServer);
    let myHeader=new Headers();
    myHeader.append("content-type","application/json");

    let requestOptions={
        method:"POST",
        body:JSON.stringify(dataSendingToServer),
        headers:myHeader
    }

    let signupJSONData= await fetch("/Signup",requestOptions);
    let signupObjectData =await signupJSONData.json();
    console.log(signupObjectData);

};

let clickOnSignupUsingURL= async ()=>{
let dataToSend= new URLSearchParams();
dataToSend.append("firstName",firstNameInputRef.current.value);
dataToSend.append("lastName",lastNameInputRef.current.value);
dataToSend.append("age",ageInputRef.current.value);
dataToSend.append("email",emailInputRef.current.value);
dataToSend.append("mobileNo",mobieInputRef.current.value);
dataToSend.append("password",PasswordInputRef.current.value);
dataToSend.append("profilePic",profileInputRef.current.value);

let myHeader=new Headers();
myHeader.append("content-type","application/x-www-form-urlencoded")


  let requestOptions={
    method:"POST",
    body:dataToSend,
    headers:myHeader
  }

  let SignupData= await fetch("/Signup",requestOptions);
  let SignupObjectData= await SignupData.json();
  console.log(SignupObjectData);

}

let clickOnSignupUsingFormData= async ()=>{
  let dataToSend= new FormData();
  dataToSend.append("firstName",firstNameInputRef.current.value);
  dataToSend.append("lastName",lastNameInputRef.current.value);
  dataToSend.append("age",ageInputRef.current.value);
  dataToSend.append("email",emailInputRef.current.value);
  dataToSend.append("mobileNo",mobieInputRef.current.value);
  dataToSend.append("password",PasswordInputRef.current.value);
for(let i=0;i<profileInputRef.current.files.length; i++){
  dataToSend.append("profilePic",profileInputRef.current.files[i]);

}

  
 
    let requestOptions={
      method:"POST",
      body:dataToSend
    }
  
    let SignupData= await fetch("/Signup",requestOptions);
    let SignupObjectData= await SignupData.json();
    console.log(SignupObjectData);
  
  }

  return (
    <div className='App'> <form>
        <h2>Sign-up</h2>
    <div>
      <label>First Name:</label>
      <input ref={firstNameInputRef}></input>
    </div>
    <div>
      <label>Last Name:</label>
      <input ref={lastNameInputRef}></input>
    </div>
    <div>
      <label>Age:</label>
      <input ref={ageInputRef}></input>
    </div>
    <div>
      <label>Email:</label>
      <input ref={emailInputRef}></input>
    </div>
    <div>
      <label>Password:</label>
      <input ref={PasswordInputRef}></input>
    </div>
    <div>
      <label>Mobile No:</label>
      <input ref={mobieInputRef}></input>
    </div>
    <div>
      <label>Profile Pic:</label>
      <input ref={profileInputRef} type="file" onChange={(eventObject)=>{
        let selectImagePath=URL.createObjectURL(eventObject.target.files[0]);
        setProfilePic(selectImagePath);

      }}></input>
    </div>
    <div>
      <img className='profilePic' src={profilePic} alt=''></img>
    </div>
    <div>
        <button type='button' onClick={()=>{
          clickOnSignup();
        }}>click here</button>
        <button type='button' onClick={()=>{
clickOnSignupUsingURL();
        }}>click here [URL]</button>
        <button type='button' onClick={()=>{
clickOnSignupUsingFormData();
        }}>
click here [Form Data]
        </button>
    </div>
   </form>
   <br></br>
   <Link to='/'>Login</Link>
   </div>
  )
}

export default Signup