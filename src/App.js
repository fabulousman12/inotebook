import React,{useState,useEffect} from 'react';

import { BrowserRouter as Router, Route,Switch,Redirect } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import './NoteItem.css';
import "./login.css";
import "./Signin.css";
function App() {
    

  const [alert,setalert] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);
  const ShowAlert = (message,type) =>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null)
    },2000);
  }
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
};


  return (
    <>

<NoteState>
            <Router>
                <Navbar ShowAlert={ShowAlert} />
                <Alert alert={alert} />
                <div className="container">
                    <Switch>
                    <Route exact path="/" render={(props) => isAuthenticated ? <Home {...props} ShowAlert={ShowAlert} /> : <Redirect to="/login" />} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/home" render={(props) => <Home {...props}  ShowAlert={ShowAlert} />} />
                        <Route exact path="/login" render={(props) => <Login {...props} onLoginSuccess={handleLoginSuccess} ShowAlert={ShowAlert} />} />
                        <Route exact path="/signup" render={(props) => <Signup {...props} onLoginSuccess={handleLoginSuccess} ShowAlert={ShowAlert} />} />
                    </Switch>
                </div>
            </Router>
        </NoteState>
    </>
  );
}

export default App;

// Main entry point
