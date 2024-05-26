import React, { useEffect,useContext, useState } from 'react'
import { Link, useLocation,useHistory } from "react-router-dom";

import NoteContext from '../context/notes/NoteContext';

const Navbar = (props) => {
  const context = useContext(NoteContext);
  const { isAuthenticated,getuser,name } = context;
  let location = useLocation();
  let history = useHistory();
  const [isok,setisok] = useState(false);
  
useEffect(()=>{
  
},[location])

const logout=()=>{
 
  localStorage.removeItem('token')
  history.push('/login')
  props.ShowAlert("successfully log out", "warning")

}

  return (

 <nav className="navbar navbar-dark navbar-expand-lg" style={{backgroundColor: '#04080F', color:'white'}} >
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Inotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`}  to="/about">About</Link>
        </li>
        
     
      </ul>
      <form className="d-flex" role="search">
       
      {!isAuthenticated ? (
              <>
                <Link className="btn btn-outline-primary mx-2" to="/login">Login</Link>
                <Link className="btn btn-outline-primary mx-2" to="/signup">Signup</Link>
              </>
            ) : (
              <div className="d-flex align-items-center mx-2 my-2" >
                <span className="navbar-text mx-2" style={{color:'black',backgroundColor:'whte',borderRadius:'10px'}}>Hello {name}</span>
                <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
              </div>
            )}
      </form>
    </div>
  </div>
</nav>
   
  )
}

export default Navbar
