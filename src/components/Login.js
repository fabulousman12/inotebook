import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import "../login.css";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const Login = (props) => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const history = useHistory();
    const context = useContext(noteContext);
    const { setIsAuthenticated } = context;

    useEffect(() => {
      const checkToken = async () => {
          const token = localStorage.getItem('token');
          if (token) {
              try {
                console.log("workjing" + token)
                  const host = "http://localhost:5000";
                  const response = await fetch(`${host}/api/auth/getuser`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Auth': token
                      },
                  });
                  const json = await response.json();
                  console.log(json)
                  if (json) {
                      setIsAuthenticated(true);
                      console.log('good')
                      history.push("/");
                  }
              } catch (error) {
                  console.error('Error checking token:', error);
              }
          }
      };

      checkToken();
  }, [history]);


    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        if (json.success) {
            // Save token and set authentication state
            localStorage.setItem('token', json.authtoken);
            props.onLoginSuccess();
            setIsAuthenticated(true);
            props.ShowAlert("Log in successfully","success")
            history.push("/home");
        } else {
          props.ShowAlert("Invalid credential","danger")
        }
    };

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handleSignupRedirect = () => {
        history.push('/signup');
    };

    return (
        <div className="container my-3">
            <div className="mb-2">
                <div className="unique-background mb-2">
                    <div className="unique-shape one"></div>
                    <div className="unique-shape two"></div>
                    <form className="unique-form mx-2 my-3" onSubmit={handleSubmit}>
                        <h3 className="unique-form-title">Login Here</h3>
                        <label htmlFor="unique-email">Email</label>
                        <input
                            type="email"
                            id="unique-email"
                            name="email"
                            className="form-control"
                            value={credential.email}
                            onChange={onChange}
                            autoComplete="email"
                        />
                        <label htmlFor="unique-password">Password</label>
                        <input
                            type="password"
                            id="unique-password"
                            name="password"
                            className="form-control"
                            value={credential.password}
                            onChange={onChange}
                            autoComplete="current-password"
                        />
                        <div className="btn-container md-2 my-3">
                            <button type="submit" className="unique-btn">Log In</button>
                            <button type="button" className="unique-btn" onClick={handleSignupRedirect}>Sign Up</button>
                        </div>
                        <div className="unique-social">
                            <div className="unique-go">
                                <i className="fab fa-google"></i> Google
                            </div>
                            <div className="unique-fb">
                                <i className="fab fa-facebook"></i> Facebook
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
