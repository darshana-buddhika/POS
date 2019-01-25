import React, { Component } from 'react';

import './NavBar.css';
import App from '../../App';

class NavBar extends Component {
    render() {
        return (
            <div className="header">
                <div className="wrapper">
                    <ul>
                        <li>Home</li>
                        {this.props.logedIn ? <li>Logout</li> : ""} 
                       
                    </ul>
                </div>
            </div>
        )
    }
}

export default NavBar;