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


    handleAuthentication = (response) => {
        if (response.status === 400) {
            this.setState({ error: "*"+response.message })
        } else if (response.status === 200) {
            this.props.userLogin(response.message, response.token)
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

    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.value })
    }

    render() {

        return (
            <div className="login" >
                Login
                < form >
                    <div>
                        <label >Username</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>

                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>

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