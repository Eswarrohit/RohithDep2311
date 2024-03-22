import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
    let navigate=useNavigate();
    let dispatch = useDispatch();

    let validateLogin=async()=>{

        let dataToSend= new FormData()
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        let requestOptions={
            method:"POST",
            body:dataToSend,
        }

        let validateLoginData= await fetch("/Login",requestOptions);
        let vaildateObjectData=await validateLoginData.json();
        if(vaildateObjectData.status === "success"){
            dispatch({type:"Login",data:vaildateObjectData.data})
            navigate("/Home");
        }else{
            alert(vaildateObjectData.msg);
        }

        console.log(vaildateObjectData);
    }
  return (
    <div className='App'><form>
        <h2>Login</h2>
        <div>
            <label>Email:</label>
            <input ref={emailInputRef}></input>
        </div>
        <div>
            <label>Password:</label>
            <input ref={passwordInputRef}></input>
        </div>
        <div>
            <button type='button' onClick={()=>{
             validateLogin();
            }}>Login</button>
        </div>
        </form>
        <br></br>
        <Link to='/Signup'>Signup</Link>
        </div>
  )
}

export default Login