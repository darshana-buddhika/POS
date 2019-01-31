import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Login from './Components/Login/Login'
import NavBar from './Components/NavBar/NavBar'
import Orders from './Components/Orders/Orders'
import Order from './Components/Order/Order'

class App extends Component {


  state = {
    isLoggedIn: false
  }

  addOrder = () => {

    const new_order = {
      user_id: this.state.user.user_id,
    }
    this.state.orders.length == 0 ? new_order.id = 1 : new_order.id = this.state.orders[this.state.orders.length - 1].id + 1

    axios.post('http://localhost:5000/api/order/addOrder', { order: new_order }, {
      headers: {
        Authorization: `Bearar ${this.state.token}`
      }
    })
      .then((response) => {
        this.getOrders()

      })
      .catch((err) => {
        console.error(err)
      })
  }

  authenticate = () => {
    this.setState({ isLoggedIn: true })
  }

  render() {

    return (
      <div>
        <NavBar />
        <div className="content">


          <div className="wrapper">

            <Route exact path="/" render={(props) => <Login {...props} />} />

            {localStorage.getItem("token") ?
              <div>
                <Route exact path="/Orders" render={(props) => <Orders {...props}/>} />
                <Route exact path="/orders/:id" render={(props) => <Order order={props} {...props} />} />
              </div>
              :
              null
            }

          </div>

        </div>

      </div >
    )

  }

}
export default App;
