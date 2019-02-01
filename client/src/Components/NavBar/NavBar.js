import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'


import './NavBar.css';
import App from '../../App';
import Auth from '../../Auth/Auth'

import SignOutButton from '../SignOutButton'

class NavBar extends Component {
    render() {
        return (
            <div className="header">
                <div className="wrapper">

                    <div className="appName">POS Application</div>

                    {
                        Auth.isAthenticated() ? <SignOutButton/> : ""
                    }


                </div>
            </div>
        )
    }
}

export default withRouter(NavBar)