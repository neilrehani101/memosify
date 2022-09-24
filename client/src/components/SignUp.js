import { Alert } from 'bootstrap';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "", name: "" });
    const host = "https://memosify-backend.herokuapp.com"
    let navigate = useNavigate()
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/auth/createUser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': '*/*'
            },
            mode: 'no-cors',
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header

        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/")
            props.showAlert("Memosify account successfully created. You are also logged in!", "success")

        }
        else {
            if (json.error) {
                props.showAlert(json.error, "danger")
            }
            else {
                props.showAlert("Invalid credentials", "danger")
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <br></br> 
            <div className="form-floating mb-3">
                <input onChange={onChange} type="text" className="form-control" id="name" placeholder="Name" value={credentials.name} name="name" required minLength={2} />
                <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={onChange} type="email" className="form-control" id="email" placeholder="name@example.com" value={credentials.email} name="email" required />
                <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={onChange} type="password" value={credentials.password} className="form-control" id="password" placeholder="Password" name="password" required minLength={5} />
                <label htmlFor="password">Password</label>
            </div>
            <br />
            <button type="submit" className="btn btn-warning" >Sign Up</button>
        </form>
    )
}

export default SignUp
