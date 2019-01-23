import React, { Component } from 'react';

import './App.css';
import Login from './Components/Login/Login'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username : "",
      token : "",
      logedin : false
    }
   
  }
  render() {

    const headerItems = ["Home", "Logout"];

    return (
      <div>
        <div className="content">
          <div className="wrapper">
            <Login />
          </div>
        </div>
      </div >
    )

  }

}
export default App;
