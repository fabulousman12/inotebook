import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import "../Signin.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Signup = (props) => {

  const [credential,setCredential] = useState({name:"",email:"",password:"",cpassword:""})
  const context = useContext(noteContext);
  const { setIsAuthenticated,getuser,name } = context;
  const history = useHistory();

  const handleClick=async(e)=>{
    e.preventDefault();
    const {name,email,password,cpassword} = credential;
    const host = "https://inotebook-backend-2-8kpe.onrender.com";
    const response = await fetch(`${host}/api/auth/createuser`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({email,name,password })
      });
      const json = await response.json();
      if(json.success){
       localStorage.setItem('token',json.authtoken)
      setIsAuthenticated(true)
      // Inside a function or event handler where you want to trigger a page refresh

      props.ShowAlert("Account created successfully","success")
        history.push("/home")
    }else{
        props.ShowAlert("Invalid credential","danger")
    }


  }
  const onchange = (e) =>{
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }
  return (
//     <div className="container my-2 mx-2">
//   <div className="mb-3">
//   <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
//   <input onChange={onchange} name="name" required minLength={3} type="text" className="form-control" id="exampleFormControlInput1" placeholder="name"/>
// </div>
// <div className="mb-3">
//   <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
//   <input onChange={onchange} type="email" name="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
// </div>

// <label htmlFor="inputPassword5" className="form-label">Password</label>
// <input onChange={onchange} required minLength={8} type="password" name="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
// <div id="passwordHelpBlock" className="form-text">
//   Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
// </div>
// <label htmlFor="inputPassword5" className="form-label">Confirm your password</label>
// <input onChange={onchange} required minLength={8} type="password" id="inputPassword5" name="cpassword" className="form-control" aria-describedby="passwordHelpBlock"/>
// <div id="passwordHelpBlock" className="form-text">
//   Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
// </div>
// <button type="button" className="btn btn-info" onClick={handleClick}>Submit</button>
      
//     </div>
<div className="container gg">
<div className="wrapper signup-wrapper">
<h2>Registration</h2>
<form action="#">
  <div className="input-box signup-input-box">
  <input onChange={onchange} name="name" required minLength={3} type="text" className="form-control" id="exampleFormControlInput1" placeholder="name"/>
  </div>
  <div className="input-box signup-input-box">
  <input onChange={onchange} type="email" name="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
  </div>
  <div className="input-box signup-input-box">
  <input onChange={onchange} required minLength={8} type="password" name="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
  </div>
  <div className="input-box signup-input-box">
  <input onChange={onchange} required minLength={8} type="password" id="inputPassword5" name="cpassword" className="form-control" aria-describedby="passwordHelpBlock"/>
  </div>
  <div className="policy signup-policy">
    <input type="checkbox" />
    <h3>I accept all terms & condition</h3>
  </div>
  <div className="input-box button signup-button">
   <button type="button" className="btn btn-info" onClick={handleClick}>Sign up</button>
  </div>
  <div className="text signup-text">
    <h3>Already have an account? <Link to="/login">Login now</Link></h3>
  </div>
</form>
</div>
</div>
  )
}

export default Signup
