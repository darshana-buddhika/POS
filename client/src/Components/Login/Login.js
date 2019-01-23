import React, { Component } from 'react';

import './Login.css'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            warning: ""
        }
    }


    submitLoginInfo() {

    }


    handleSubmit = (event) => {
        this.setState({warning : ""})
        if (this.state.username && this.state.password) {

        } else {
            this.setState({ warning: "* Username and Password is Required" })
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
                        <p>{this.state.warning}</p>
                    </div>
                </form>
            </div >
        )
    }

}

export default Login;