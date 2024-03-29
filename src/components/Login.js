import React, { useState } from "react";
import './Login.css'
import axios from "axios";
import {useAuth} from "../AuthContext"

const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const {login} = useAuth();
    
        
    const onButtonClick = () => {

        // Set initial error values to empty
        setUsernameError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === username) {
            setUsernameError("Please enter your username")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}login`, {
            username: username,
            password: password
        })
        .then(response => {
            const token = response.data.token;
            // Store the token in localStorage or sessionStorage
            login(token)
        })
        .catch(error => {
            window.alert("You are not the admin")
            console.error('Login failed:', error.response ? error.response.data : error.message);
        });
    };


    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <h1>Admin Login</h1>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={username}
                placeholder="Username"
                onChange={ev => setUsername(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{usernameError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
    </div>
}

export default Login