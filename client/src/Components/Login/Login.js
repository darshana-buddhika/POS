import React, { Component } from 'react';

import './Login.css'

import axios from 'axios'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: ""
        }
    }


    handleAuthentication = (data) => {
        if (data.status === 400) {
            this.setState({ error: "*" + data.message })
        } else if (data.status === 200) {
            localStorage.setItem('token', data.token)
        }
    }


    handleSubmit = (event) => {
        this.setState({ error: "" })
        if (this.state.username && this.state.password) {

            axios.post('http://localhost:5000/api/user/signin', { username: this.state.username, password: this.state.password })
                .then((response) => {
                    console.log(response.data)
                    this.handleAuthentication(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {
            this.setState({ error: "* Username and Password is Required" })
        }
        event.preventDefault();

    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    }

    render() {

        return (
            <div className="login" >
                Login
                < form >
                    <div>
                        <label >Username</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange}></input>

                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}></input>

                    </div>
                    <div className="submit">
                        <button onClick={this.handleSubmit}>Login</button>
                        <p>{this.state.error}</p>
                    </div>
                </form>
            </div >
        )
    }

}

export default Login;