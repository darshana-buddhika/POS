import React, { Component } from 'react';

import './NavBar.css';
import App from '../../App';
import Auth from '../../Auth/Auth'

class NavBar extends Component {
    render() {
        return (
            <div className="header">
                <div className="wrapper">

                    <div className="appName">POS Application</div>

                  {
                      Auth.isAuthenticated ? <button onClick={Auth.signOut} className="navItems">Logout</button> : ""
                  }
                    

                </div>
            </div>
        )
    }
}

export default NavBar;