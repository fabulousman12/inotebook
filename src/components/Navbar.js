import React, { useEffect,useContext, useState,useRef } from 'react'
import { Link, useLocation,useHistory } from "react-router-dom";

import NoteContext from '../context/notes/NoteContext';

const Navbar = (props) => {
  const context = useContext(NoteContext);
  const { isAuthenticated,getuser,name,getimg,categories ,setchosecat,chosecat} = context;
  let location = useLocation();
  let history = useHistory();
  const [isok,setisok] = useState(false);
  const dropdownRef = useRef(null);
  const categoriestt = ['All','Maths', 'Physics', 'Bio', 'Chem' , 'Stat' , 'Computer' , 'English' , 'Constituition','Electronics','tech','others'];
useEffect(()=>{
  getuser(localStorage.getItem('token'));

},[location])

const logout=()=>{
 
  localStorage.removeItem('token')

  props.ShowAlert("successfully log out", "warning")

}
const handle = (e)=>{
setchosecat(e)


}
const dropdown = dropdownRef.current;
if (dropdown) {
  const dropdownInstance = window.bootstrap.Dropdown.getInstance(dropdown);
  dropdownInstance?.hide();
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
     
        <li className="nav-item dropdown">
          <a className={`nav-link  ${location.pathname==="/notesimg"?"active":""} dropdown-toggle`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </a>
          <ul className="dropdown-menu" ref={dropdownRef}>

            

             {categories.map((category, index) => (
                    <li key={index} > 
                        <Link to="/notesimg" ref={dropdownRef} className={`nav-link ${location.pathname===category?"active":""}`}style={{color:"black"}} onClick={()=>handle(category)}>{category}</Link>
                        
                    </li>
                ))}
           
          </ul>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/MyNotes"?"active":""}`}  to="/MyNotes">MyNotes</Link>
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
                <span className="navbar-text mx-2 my-2" style={{color:'white',borderRadius:'10px'}}>Hello {name}</span>
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
