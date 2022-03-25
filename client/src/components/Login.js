import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password:""});
    const host = "https://memosify.herokuapp.com"
    let navigate = useNavigate()
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzYjQ3ZGU0MmFkYTk5YzUwNTkwNWY1In0sImlhdCI6MTY0ODE4Mzc0MH0.9bRxr6t6qqxnXEG_mV4-N8GR_bi5O68OPc8C1S5c-IU"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}) // body data type must match "Content-Type" header

        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/")
            props.showAlert("Logged in to Memosify successfully!", "success")
        }
        else {
            props.showAlert(json.error, "danger")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <br></br>
            <div className="form-floating mb-3">
                <input onChange={onChange} type="email" className="form-control" id="email" placeholder="name@example.com" value={credentials.email} name="email"/>
                    <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating">
                <input onChange={onChange} type="password" value={credentials.password} className="form-control" id="password" placeholder="Password" name="password"/>
                    <label htmlFor="password">Password</label>
            </div>
            <br />
            <button type="submit" className="btn btn-warning" >Login</button>
        </form>
    )
}

export default Login